begin;

alter table public.threads
  add column if not exists thumbnail_data_url text
  check (thumbnail_data_url is null or (
    char_length(thumbnail_data_url) <= 7000000
    and thumbnail_data_url ~ '^data:image/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+=*$'
  ));

create or replace view public.thread_summaries
with (security_invoker = true) as
select
  t.id, t.title, t.description, t.category, t.guest_id, t.created_at,
  count(distinct c.id)::integer as comment_count,
  count(distinct v.guest_id)::integer as vote_count,
  count(distinct v.guest_id) filter (where v.choice = 'agree')::integer as agree_count,
  count(distinct v.guest_id) filter (where v.choice = 'disagree')::integer as disagree_count,
  t.thumbnail_data_url
from public.threads t
left join public.comments c on c.thread_id = t.id
left join public.thread_votes v on v.thread_id = t.id
group by t.id;

drop function if exists public.create_thread_limited(text, text, text, text);
create function public.create_thread_limited(
  p_title text, p_description text, p_category text, p_guest_id text, p_thumbnail_data_url text
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
     or p_category not in ('Society', 'Politics', 'Work & Business', 'Money', 'Relationships', 'Technology', 'Entertainment', 'Sports', 'Education', 'Lifestyle')
     or (p_thumbnail_data_url is not null and (
       char_length(p_thumbnail_data_url) > 7000000
       or p_thumbnail_data_url !~ '^data:image/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+=*$'
     )) then
    raise exception using errcode = '22023', message = 'Invalid thread input.';
  end if;
  fingerprint := public.request_rate_limit_fingerprint(p_guest_id);
  perform pg_advisory_xact_lock(hashtextextended('thread:' || p_guest_id, 0));
  if (select count(*) from public.threads where (guest_id = p_guest_id or rate_limit_fingerprint = fingerprint) and created_at >= now() - interval '10 minutes') >= 3 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT:thread';
  end if;
  insert into public.threads(title, description, category, guest_id, rate_limit_fingerprint, thumbnail_data_url)
  values (p_title, nullif(p_description, ''), p_category, p_guest_id, fingerprint, p_thumbnail_data_url)
  returning * into created;
  return created;
end;
$$;

revoke all on function public.create_thread_limited(text, text, text, text, text) from public;
grant execute on function public.create_thread_limited(text, text, text, text, text) to anon, authenticated;
grant select on public.thread_summaries to anon, authenticated;

commit;
