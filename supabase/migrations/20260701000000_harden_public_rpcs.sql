begin;

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
  fingerprint text;
  created public.threads;
begin
  if p_guest_id !~ '^[A-HJ-NP-Z2-9]{6}$'
     or p_category not in ('Society', 'Politics', 'Work & Business', 'Money', 'Relationships', 'Technology', 'Entertainment', 'Sports', 'Education', 'Lifestyle') then
    raise exception using errcode = '22023', message = 'Invalid thread input.';
  end if;
  fingerprint := public.request_rate_limit_fingerprint(p_guest_id);
  perform pg_advisory_xact_lock(hashtextextended('thread:' || p_guest_id, 0));
  if (select count(*) from public.threads where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint) and created_at >= now() - interval '10 minutes') >= 3 then
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
  fingerprint text;
  created public.comments;
begin
  if p_guest_id !~ '^[A-HJ-NP-Z2-9]{6}$'
     or p_author_name <> 'Guest #' || p_guest_id
     or p_side not in ('agree', 'disagree', 'neutral')
     or (p_age_range is not null and p_age_range not in ('13–17', '18–24', '25–34', '35–44', '45–54', '55+'))
     or (p_country_code is not null and p_country_code !~ '^[A-Z]{2}$')
     or (p_reply_to is not null and not exists (select 1 from public.comments where id = p_reply_to and thread_id = p_thread_id)) then
    raise exception using errcode = '22023', message = 'Invalid comment input.';
  end if;
  fingerprint := public.request_rate_limit_fingerprint(p_guest_id);
  perform pg_advisory_xact_lock(hashtextextended('comment:' || p_guest_id, 0));
  if (select count(*) from public.comments where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint) and created_at >= now() - interval '1 minute') >= 5 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:comment';
  end if;
  insert into public.comments(thread_id, guest_id, author_name, side, body, reply_to, age_range, country_code, rate_limit_fingerprint)
  values (p_thread_id, p_guest_id, p_author_name, p_side, p_body, p_reply_to, p_age_range, p_country_code, fingerprint)
  returning * into created;
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
  fingerprint text;
  created public.reports;
begin
  if p_guest_id !~ '^[A-HJ-NP-Z2-9]{6}$'
     or p_target_type not in ('thread', 'comment', 'general')
     or (p_target_type = 'thread' and (p_thread_id is null or p_comment_id is not null or p_target_id is distinct from p_thread_id::text))
     or (p_target_type = 'comment' and (p_thread_id is null or p_comment_id is null or p_target_id is distinct from p_comment_id::text or not exists (select 1 from public.comments where id = p_comment_id and thread_id = p_thread_id)))
     or (p_target_type = 'general' and (p_thread_id is not null or p_comment_id is not null)) then
    raise exception using errcode = '22023', message = 'Invalid report input.';
  end if;
  fingerprint := public.request_rate_limit_fingerprint(p_guest_id);
  perform pg_advisory_xact_lock(hashtextextended('report:' || p_guest_id, 0));
  if (select count(*) from public.reports where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint) and created_at >= now() - interval '10 minutes') >= 5 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:report';
  end if;
  insert into public.reports(target_type, target_id, thread_id, comment_id, guest_id, rate_limit_fingerprint)
  values (p_target_type, p_target_id, p_thread_id, p_comment_id, p_guest_id, fingerprint)
  returning * into created;
  return created;
end;
$$;

revoke all on function public.create_thread_limited(text, text, text, text) from public;
revoke all on function public.create_comment_limited(uuid, text, text, text, text, bigint, text, text) from public;
revoke all on function public.create_report_limited(text, text, uuid, bigint, text) from public;
grant execute on function public.create_thread_limited(text, text, text, text) to anon, authenticated;
grant execute on function public.create_comment_limited(uuid, text, text, text, text, bigint, text, text) to anon, authenticated;
grant execute on function public.create_report_limited(text, text, uuid, bigint, text) to anon, authenticated;

commit;
