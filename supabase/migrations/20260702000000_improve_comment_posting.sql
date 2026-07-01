begin;

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
  normalized_body text := btrim(p_body);
  previous_comment public.comments;
  created public.comments;
begin
  if p_guest_id !~ '^[A-HJ-NP-Z2-9]{6}$'
     or p_author_name <> 'Guest #' || p_guest_id
     or p_side not in ('agree', 'disagree', 'neutral')
     or normalized_body is null
     or normalized_body = ''
     or (p_age_range is not null and p_age_range not in ('13–17', '18–24', '25–34', '35–44', '45–54', '55+'))
     or (p_country_code is not null and p_country_code !~ '^[A-Z]{2}$')
     or (p_reply_to is not null and not exists (select 1 from public.comments where id = p_reply_to and thread_id = p_thread_id)) then
    raise exception using errcode = '22023', message = 'Invalid comment input.';
  end if;
  if char_length(normalized_body) > 500 then
    raise exception using errcode = '22023', message = 'COMMENT_TOO_LONG';
  end if;
  if normalized_body ~* '(https?|www)' then
    raise exception using errcode = '22023', message = 'URL_NOT_ALLOWED';
  end if;

  fingerprint := public.request_rate_limit_fingerprint(p_guest_id);
  perform pg_advisory_xact_lock(hashtextextended('comment:' || p_guest_id, 0));
  select * into previous_comment from public.comments
    where guest_id = p_guest_id order by created_at desc limit 1;
  if previous_comment.created_at >= now() - interval '3 seconds' then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:comment';
  end if;
  if previous_comment.body is not null and btrim(previous_comment.body) = normalized_body then
    raise exception using errcode = 'P0001', message = 'DUPLICATE_COMMENT';
  end if;

  insert into public.comments(thread_id, guest_id, author_name, side, body, reply_to, age_range, country_code, rate_limit_fingerprint)
  values (p_thread_id, p_guest_id, p_author_name, p_side, normalized_body, p_reply_to, p_age_range, p_country_code, fingerprint)
  returning * into created;
  return created;
end;
$$;

commit;
