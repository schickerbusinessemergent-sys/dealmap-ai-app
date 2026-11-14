create table if not exists public.agreement_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  agreement_key text not null,
  agreement_version text not null,
  context text not null,
  accepted_at timestamptz not null default now()
);
alter table public.agreement_acceptances enable row level security;
create policy "users read own agreement acceptances" on public.agreement_acceptances for select using (auth.uid() = user_id);
revoke insert, update, delete on public.agreement_acceptances from anon, authenticated;
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (display_name) on public.profiles to authenticated;
grant execute on function public.refund_generation_credit(uuid) to service_role;
grant execute on function public.grant_age_verification_credits(uuid,text) to service_role;
