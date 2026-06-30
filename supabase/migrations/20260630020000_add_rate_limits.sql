begin;

alter table public.threads add column if not exists rate_limit_fingerprint text;
alter table public.comments add column if not exists rate_limit_fingerprint text;
alter table public.reports add column if not exists rate_limit_fingerprint text;

create index if not exists threads_rate_limit_idx
  on public.threads(guest_id, rate_limit_fingerprint, created_at desc);
create index if not exists comments_rate_limit_idx
  on public.comments(guest_id, rate_limit_fingerprint, created_at desc);
create index if not exists reports_rate_limit_idx
  on public.reports(guest_id, rate_limit_fingerprint, created_at desc);

create or replace function public.request_rate_limit_fingerprint(p_guest_id text)
returns text
language plpgsql
stable
set search_path = public, pg_temp
as $$
declare
  raw_headers text := current_setting('request.headers', true);
  headers jsonb;
  request_ip text;
begin
  headers := case when nullif(raw_headers, '') is null then '{}'::jsonb else raw_headers::jsonb end;
  request_ip := nullif(split_part(coalesce(
    headers ->> 'cf-connecting-ip',
    headers ->> 'x-forwarded-for',
    headers ->> 'x-real-ip',
    ''
  ), ',', 1), '');
  return encode(digest(p_guest_id || ':' || coalesce(request_ip, 'ip-unavailable'), 'sha256'), 'hex');
end;
$$;

create or replace function public.create_thread_limited(
  p_title text,
  p_description text,
  p_category text,
  p_guest_id text
)
returns public.threads
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  fingerprint text := public.request_rate_limit_fingerprint(p_guest_id);
  created public.threads;
begin
  perform pg_advisory_xact_lock(hashtextextended('thread:' || p_guest_id, 0));
  if (select count(*) from public.threads
      where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint)
        and created_at >= now() - interval '10 minutes') >= 3 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:thread';
  end if;

  insert into public.threads(title, description, category, guest_id, rate_limit_fingerprint)
  values (p_title, nullif(p_description, ''), p_category, p_guest_id, fingerprint)
  returning * into created;
  return created;
end;
$$;

create or replace function public.create_comment_limited(
  p_thread_id uuid,
  p_guest_id text,
  p_author_name text,
  p_side text,
  p_body text,
  p_reply_to bigint,
  p_age_range text,
  p_country_code text
)
returns public.comments
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  fingerprint text := public.request_rate_limit_fingerprint(p_guest_id);
  created public.comments;
begin
  perform pg_advisory_xact_lock(hashtextextended('comment:' || p_guest_id, 0));
  if (select count(*) from public.comments
      where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint)
        and created_at >= now() - interval '1 minute') >= 5 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:comment';
  end if;

  insert into public.comments(
    thread_id, guest_id, author_name, side, body, reply_to,
    age_range, country_code, rate_limit_fingerprint
  ) values (
    p_thread_id, p_guest_id, p_author_name, p_side, p_body, p_reply_to,
    p_age_range, p_country_code, fingerprint
  ) returning * into created;
  return created;
end;
$$;

create or replace function public.create_report_limited(
  p_target_type text,
  p_target_id text,
  p_thread_id uuid,
  p_comment_id bigint,
  p_guest_id text
)
returns public.reports
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  fingerprint text := public.request_rate_limit_fingerprint(p_guest_id);
  created public.reports;
begin
  perform pg_advisory_xact_lock(hashtextextended('report:' || p_guest_id, 0));
  if (select count(*) from public.reports
      where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint)
        and created_at >= now() - interval '10 minutes') >= 5 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:report';
  end if;

  insert into public.reports(
    target_type, target_id, thread_id, comment_id, guest_id, rate_limit_fingerprint
  ) values (
    p_target_type, p_target_id, p_thread_id, p_comment_id, p_guest_id, fingerprint
  ) returning * into created;
  return created;
end;
$$;

revoke insert on public.threads from anon, authenticated;
revoke insert on public.comments from anon, authenticated;
revoke insert on public.reports from anon, authenticated;

drop policy if exists "Guests can create threads" on public.threads;
drop policy if exists "Guests can create comments" on public.comments;
drop policy if exists "Guests can create reports" on public.reports;

revoke all on function public.request_rate_limit_fingerprint(text) from public;
revoke all on function public.create_thread_limited(text, text, text, text) from public;
revoke all on function public.create_comment_limited(uuid, text, text, text, text, bigint, text, text) from public;
revoke all on function public.create_report_limited(text, text, uuid, bigint, text) from public;

grant execute on function public.create_thread_limited(text, text, text, text) to anon, authenticated;
grant execute on function public.create_comment_limited(uuid, text, text, text, text, bigint, text, text) to anon, authenticated;
grant execute on function public.create_report_limited(text, text, uuid, bigint, text) to anon, authenticated;

commit;
