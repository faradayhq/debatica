create or replace function public.request_rate_limit_fingerprint(p_guest_id text)
returns text
language plpgsql
stable
set search_path = public, extensions, pg_temp
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
  return encode(extensions.digest(
    p_guest_id || ':' || coalesce(request_ip, 'ip-unavailable'),
    'sha256'
  ), 'hex');
end;
$$;

revoke all on function public.request_rate_limit_fingerprint(text) from public;
