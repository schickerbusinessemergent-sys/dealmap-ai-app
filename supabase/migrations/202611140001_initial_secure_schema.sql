create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  credits integer not null default 0 check (credits >= 0),
  age_verified boolean not null default false,
  subscription_status text not null default 'inactive' check (subscription_status in ('inactive','trialing','active','past_due','canceled')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null check (amount <> 0),
  reason text not null check (reason in ('age_verification_grant','ai_generation','generation_refund','admin_adjustment')),
  reference_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null check (char_length(prompt) between 1 and 8000),
  output jsonb,
  status text not null default 'processing' check (status in ('processing','completed','failed')),
  credits_used integer not null check (credits_used > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

create table if not exists public.age_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  provider text not null,
  provider_reference text unique,
  status text not null check (status in ('pending','verified','failed')),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'display_name','')) on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.ai_generations enable row level security;
alter table public.stripe_webhook_events enable row level security;
alter table public.age_verifications enable row level security;

create policy "profile owner reads own profile" on public.profiles for select using (auth.uid() = id);
create policy "profile owner updates display name" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "users read own credit ledger" on public.credit_ledger for select using (auth.uid() = user_id);
create policy "users read own generations" on public.ai_generations for select using (auth.uid() = user_id);
create policy "users read own verification status" on public.age_verifications for select using (auth.uid() = user_id);

revoke insert, update, delete on public.credit_ledger from anon, authenticated;
revoke insert, update, delete on public.stripe_webhook_events from anon, authenticated;
revoke insert, update, delete on public.age_verifications from anon, authenticated;
revoke insert, update, delete on public.ai_generations from anon, authenticated;
revoke update on public.profiles from anon, authenticated;
grant update (display_name) on public.profiles to authenticated;

create or replace function public.spend_generation_credit(p_generation_id uuid, p_prompt text, p_cost integer)
returns integer language plpgsql security definer set search_path = '' as $$
declare current_balance integer;
begin
  if auth.uid() is null or p_cost < 1 or char_length(p_prompt) not between 1 and 8000 then raise exception 'invalid request'; end if;
  update public.profiles set credits = credits - p_cost, updated_at = now() where id = auth.uid() and credits >= p_cost returning credits into current_balance;
  if current_balance is null then raise exception 'insufficient credits'; end if;
  insert into public.ai_generations(id,user_id,prompt,status,credits_used) values(p_generation_id,auth.uid(),p_prompt,'processing',p_cost);
  insert into public.credit_ledger(user_id,amount,reason,reference_id) values(auth.uid(),-p_cost,'ai_generation',p_generation_id::text);
  return current_balance;
end; $$;
grant execute on function public.spend_generation_credit(uuid,text,integer) to authenticated;

create or replace function public.refund_generation_credit(p_generation_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare owner_id uuid; cost integer;
begin
  select user_id, credits_used into owner_id,cost from public.ai_generations where id=p_generation_id and status='processing';
  if owner_id is null then return; end if;
  update public.profiles set credits=credits+cost,updated_at=now() where id=owner_id;
  update public.ai_generations set status='failed' where id=p_generation_id;
  insert into public.credit_ledger(user_id,amount,reason,reference_id) values(owner_id,cost,'generation_refund','refund:'||p_generation_id::text) on conflict do nothing;
end; $$;
revoke all on function public.refund_generation_credit(uuid) from public, anon, authenticated;

create or replace function public.complete_generation(p_generation_id uuid,p_output jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.ai_generations set output=p_output,status='completed' where id=p_generation_id and status='processing' and user_id=auth.uid();
  if not found then raise exception 'generation not found'; end if;
end; $$;
grant execute on function public.complete_generation(uuid,jsonb) to authenticated;

create or replace function public.grant_age_verification_credits(p_user_id uuid,p_reference text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.age_verifications where user_id=p_user_id and status='verified') then raise exception 'verification not successful'; end if;
  update public.profiles set age_verified=true,credits=credits+200,updated_at=now() where id=p_user_id and age_verified=false;
  if found then insert into public.credit_ledger(user_id,amount,reason,reference_id) values(p_user_id,200,'age_verification_grant',p_reference); end if;
end; $$;
revoke all on function public.grant_age_verification_credits(uuid,text) from public, anon, authenticated;
