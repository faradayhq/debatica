begin;

alter table public.reports
  add column if not exists comment_id bigint;

update public.reports
set comment_id = target_id::bigint
where target_type = 'comment'
  and comment_id is null
  and target_id ~ '^[0-9]+$';

update public.reports
set thread_id = null
where thread_id is not null
  and thread_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

alter table public.reports
  alter column thread_id type uuid using thread_id::uuid;

update public.reports r
set thread_id = null
where thread_id is not null
  and not exists (select 1 from public.threads t where t.id = r.thread_id);

update public.reports r
set comment_id = null
where comment_id is not null
  and not exists (select 1 from public.comments c where c.id = r.comment_id);

alter table public.reports
  drop constraint if exists reports_thread_id_fkey,
  drop constraint if exists reports_comment_id_fkey;

alter table public.reports
  add constraint reports_thread_id_fkey
    foreign key (thread_id) references public.threads(id) on delete cascade,
  add constraint reports_comment_id_fkey
    foreign key (comment_id) references public.comments(id) on delete cascade;

create index if not exists reports_thread_id_idx on public.reports(thread_id);
create index if not exists reports_comment_id_idx on public.reports(comment_id);

drop policy if exists "MVP reports are readable" on public.reports;
revoke select on public.reports from anon, authenticated;
grant insert on public.reports to anon, authenticated;

commit;
