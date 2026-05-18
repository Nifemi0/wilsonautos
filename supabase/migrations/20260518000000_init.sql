-- Create cars table
create table if not exists public.cars (
  id uuid default gen_random_uuid() primary key,
  make text not null,
  model text not null,
  year integer not null,
  price bigint not null,
  condition text not null,
  location text not null,
  mileage integer,
  transmission text,
  fuel_type text,
  body_type text,
  colour text,
  description text,
  whatsapp_number text not null,
  status text default 'available',
  featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS for cars
alter table public.cars enable row level security;

-- Create policies for public cars access
create policy "Allow public read access to available cars"
  on public.cars for select
  using (status = 'available');

create policy "Allow all actions for authenticated admins"
  on public.cars for all
  to authenticated
  using (true)
  with check (true);

-- Create car images table
create table if not exists public.car_images (
  id uuid default gen_random_uuid() primary key,
  car_id uuid references public.cars(id) on delete cascade,
  image_url text not null,
  is_primary boolean default false
);

-- Enable RLS for car_images
alter table public.car_images enable row level security;

-- Create policies for public car_images access
create policy "Allow public read access to car images"
  on public.car_images for select
  using (true);

create policy "Allow all actions for authenticated admins on car images"
  on public.car_images for all
  to authenticated
  using (true)
  with check (true);

-- Create enquiries table
create table if not exists public.enquiries (
  id uuid default gen_random_uuid() primary key,
  car_id uuid references public.cars(id) on delete set null,
  buyer_name text,
  buyer_phone text,
  message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS for enquiries
alter table public.enquiries enable row level security;

-- Create policies for enquiries
create policy "Allow public inserts on enquiries"
  on public.enquiries for insert
  with check (true);

create policy "Allow all actions for authenticated admins on enquiries"
  on public.enquiries for all
  to authenticated
  using (true)
  with check (true);
