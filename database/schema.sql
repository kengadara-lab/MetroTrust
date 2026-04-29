create extension if not exists "uuid-ossp";

create type app_role as enum ('super_admin', 'manager', 'staff', 'driver', 'investor');
create type record_status as enum ('Active', 'Inactive', 'Maintenance', 'Paid', 'Pending', 'Completed', 'Scheduled', 'Overdue', 'Cancelled');

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique,
  full_name text not null,
  email text not null unique,
  role app_role not null default 'staff',
  active boolean not null default true,
  driver_id uuid,
  investor_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists drivers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  license text not null,
  staff_no text not null unique,
  status text not null default 'Active',
  join_date date,
  target_daily numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists investors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text,
  payout_method text not null default 'Bank',
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key default uuid_generate_v4(),
  plate text not null unique,
  make text not null,
  model text not null,
  year integer,
  category text,
  status text not null default 'Active',
  driver_id uuid references drivers(id) on delete set null,
  investor_id uuid references investors(id) on delete set null,
  daily_target numeric(12,2) not null default 0,
  mileage integer not null default 0,
  next_service_date date,
  acquisition_cost numeric(14,2) default 0,
  created_at timestamptz not null default now()
);

alter table drivers
  add column if not exists assigned_vehicle_id uuid references vehicles(id) on delete set null;

alter table profiles
  add constraint profiles_driver_id_fkey foreign key (driver_id) references drivers(id) on delete set null;

alter table profiles
  add constraint profiles_investor_id_fkey foreign key (investor_id) references investors(id) on delete set null;

create table if not exists remittances (
  id uuid primary key default uuid_generate_v4(),
  paid_on date not null,
  driver_id uuid references drivers(id) on delete set null,
  vehicle_id uuid references vehicles(id) on delete set null,
  period text not null default 'Daily',
  amount numeric(12,2) not null,
  method text not null,
  reference text,
  status text not null default 'Paid',
  note text,
  created_at timestamptz not null default now()
);

create table if not exists maintenance_logs (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid references vehicles(id) on delete cascade,
  service_date date not null,
  service_type text not null,
  provider text,
  cost numeric(12,2) not null default 0,
  odometer integer default 0,
  status text not null default 'Completed',
  next_due date,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text not null unique,
  invoice_type text not null,
  issue_date date not null,
  due_date date,
  party_name text not null,
  related_id text,
  status text not null default 'Pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists invoice_items (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  description text not null,
  qty numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_profile_id uuid references profiles(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table drivers enable row level security;
alter table investors enable row level security;
alter table vehicles enable row level security;
alter table remittances enable row level security;
alter table maintenance_logs enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;
alter table audit_logs enable row level security;

create or replace function public.current_profile_role()
returns text
language sql
stable
as $$
  select role::text from profiles where auth_user_id = auth.uid() limit 1
$$;

create policy "authenticated read profiles" on profiles
  for select using (auth.role() = 'authenticated');

create policy "admin manage profiles" on profiles
  for all using (public.current_profile_role() = 'super_admin')
  with check (public.current_profile_role() = 'super_admin');

create policy "staff read operations" on vehicles
  for select using (auth.role() = 'authenticated');

create policy "staff manage vehicles" on vehicles
  for all using (public.current_profile_role() in ('super_admin','manager','staff'))
  with check (public.current_profile_role() in ('super_admin','manager','staff'));

create policy "staff manage drivers" on drivers
  for all using (public.current_profile_role() in ('super_admin','manager','staff'))
  with check (public.current_profile_role() in ('super_admin','manager','staff'));

create policy "manager manage investors" on investors
  for all using (public.current_profile_role() in ('super_admin','manager'))
  with check (public.current_profile_role() in ('super_admin','manager'));

create policy "staff manage remittances" on remittances
  for all using (public.current_profile_role() in ('super_admin','manager','staff'))
  with check (public.current_profile_role() in ('super_admin','manager','staff'));

create policy "staff manage maintenance" on maintenance_logs
  for all using (public.current_profile_role() in ('super_admin','manager','staff'))
  with check (public.current_profile_role() in ('super_admin','manager','staff'));

create policy "staff manage invoices" on invoices
  for all using (public.current_profile_role() in ('super_admin','manager','staff'))
  with check (public.current_profile_role() in ('super_admin','manager','staff'));

create policy "staff manage invoice items" on invoice_items
  for all using (public.current_profile_role() in ('super_admin','manager','staff'))
  with check (public.current_profile_role() in ('super_admin','manager','staff'));
