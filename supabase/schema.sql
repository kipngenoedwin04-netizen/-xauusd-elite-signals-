-- XAUUSD ELITE SIGNALS v1.0
-- Run in Supabase Dashboard > SQL Editor. This is the security boundary for the app.
create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('member', 'admin');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.premium_state as enum ('pending', 'approved', 'suspended');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.signal_direction as enum ('BUY', 'SELL');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.signal_access as enum ('free', 'premium');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.signal_status as enum ('OPEN', 'TP1 HIT', 'TP2 HIT', 'SL HIT', 'CLOSED');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Elite Member' check (char_length(display_name) between 2 and 40),
  email text,
  role public.app_role not null default 'member',
  premium_status public.premium_state not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;

create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  symbol text not null default 'XAUUSD' check (symbol = 'XAUUSD'),
  direction public.signal_direction not null,
  access public.signal_access not null default 'free',
  entry numeric(12,2) not null check (entry > 0),
  stop_loss numeric(12,2) not null check (stop_loss > 0),
  tp1 numeric(12,2) not null check (tp1 > 0),
  tp2 numeric(12,2) not null check (tp2 > 0),
  timeframe text not null check (char_length(timeframe) between 1 and 20),
  analysis text not null check (char_length(analysis) between 1 and 2000),
  status public.signal_status not null default 'OPEN',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists signals_created_at_idx on public.signals(created_at desc);
create index if not exists signals_access_created_at_idx on public.signals(access, created_at desc);
create index if not exists profiles_role_idx on public.profiles(role);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin'::public.app_role);
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, email)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), 'Elite Member'), new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists signals_touch_updated_at on public.signals;
create trigger signals_touch_updated_at before update on public.signals for each row execute procedure public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.signals enable row level security;

revoke all on public.profiles from anon, authenticated;
revoke all on public.signals from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
-- Premium status is changed only through the guarded admin RPC below.
grant select on public.signals to anon;
grant select, insert, update, delete on public.signals to authenticated;

-- Members can only read their own profile. Admin can view all profiles.
drop policy if exists "profile self or admin read" on public.profiles;
create policy "profile self or admin read" on public.profiles for select to authenticated
using ((select auth.uid()) = id or (select public.is_admin()));

-- Users can update their own display name only (column grants prevent role/premium edits).
drop policy if exists "profile self update" on public.profiles;
create policy "profile self update" on public.profiles for update to authenticated
using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Only admins can change membership approval state.
drop policy if exists "admin manages membership" on public.profiles;
create policy "admin manages membership" on public.profiles for update to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

-- Anonymous visitors may read FREE signals only.
drop policy if exists "public reads free signals" on public.signals;
create policy "public reads free signals" on public.signals for select to anon
using (access = 'free'::public.signal_access);

-- Free signals are visible to all signed-in members. Premium rows are visible only to approved members/admins.
drop policy if exists "eligible members read signals" on public.signals;
create policy "eligible members read signals" on public.signals for select to authenticated
using (
  access = 'free'::public.signal_access
  or (select public.is_admin())
  or (access = 'premium'::public.signal_access and exists (
    select 1 from public.profiles p where p.id = (select auth.uid()) and p.premium_status = 'approved'::public.premium_state
  ))
);

-- Signal creation, edits and deletion are admin-only.
drop policy if exists "admins create signals" on public.signals;
create policy "admins create signals" on public.signals for insert to authenticated
with check ((select public.is_admin()) and created_by = (select auth.uid()));
drop policy if exists "admins update signals" on public.signals;
create policy "admins update signals" on public.signals for update to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "admins delete signals" on public.signals;
create policy "admins delete signals" on public.signals for delete to authenticated
using ((select public.is_admin()));


create or replace function public.admin_set_premium_status(target_user_id uuid, new_status public.premium_state)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not (select public.is_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  update public.profiles set premium_status = new_status where id = target_user_id;
  if not found then raise exception 'User profile not found'; end if;
end;
$$;
revoke all on function public.admin_set_premium_status(uuid, public.premium_state) from public;
grant execute on function public.admin_set_premium_status(uuid, public.premium_state) to authenticated;

-- SECURITY: do not add a public policy for profiles or premium signals.
-- Promote the verified PIXLEY021 account only AFTER it has registered:
-- update public.profiles p set role = 'admin'::public.app_role, display_name = 'PIXLEY021'
-- from auth.users u
-- where p.id = u.id and lower(u.email) = lower('YOUR_VERIFIED_ADMIN_EMAIL');
-- Run the statement above manually in SQL Editor, replacing the email. Never expose a service-role key in the browser.
