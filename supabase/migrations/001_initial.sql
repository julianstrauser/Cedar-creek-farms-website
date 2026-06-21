-- Cedar Creek Farms: database schema, RLS, storage, and seed data

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

create type public.product_availability as enum ('available', 'sold_out', 'hidden');

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price text,
  size text,
  category text,
  image_url text,
  availability public.product_availability not null default 'available',
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  alt_text text,
  caption text,
  category text,
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type public.order_status as enum ('new', 'contacted', 'fulfilled', 'archived');

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text,
  customer_phone text,
  message text,
  requested_items text,
  status public.order_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Updated-at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists gallery_updated_at on public.gallery;
create trigger gallery_updated_at
  before update on public.gallery
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Admin helper (security definer)
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.gallery enable row level security;
alter table public.orders enable row level security;

-- Profiles: admins can read all; users can read their own row only
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_admin_update" on public.profiles;
create policy "profiles_admin_update"
  on public.profiles for update
  using (public.is_admin());

-- Products: public read available/sold_out; admin full access
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (availability in ('available', 'sold_out'));

drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- Gallery: public read visible; admin full access
drop policy if exists "gallery_public_read" on public.gallery;
create policy "gallery_public_read"
  on public.gallery for select
  using (visible = true);

drop policy if exists "gallery_admin_all" on public.gallery;
create policy "gallery_admin_all"
  on public.gallery for all
  using (public.is_admin())
  with check (public.is_admin());

-- Orders: public insert only; admin read/update
drop policy if exists "orders_public_insert" on public.orders;
create policy "orders_public_insert"
  on public.orders for insert
  with check (true);

drop policy if exists "orders_admin_select" on public.orders;
create policy "orders_admin_select"
  on public.orders for select
  using (public.is_admin());

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket for site images
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "site_images_public_read" on storage.objects;
create policy "site_images_public_read"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site_images_admin_insert" on storage.objects;
create policy "site_images_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "site_images_admin_update" on storage.objects;
create policy "site_images_admin_update"
  on storage.objects for update
  using (bucket_id = 'site-images' and public.is_admin())
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "site_images_admin_delete" on storage.objects;
create policy "site_images_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed starter inventory and gallery (placeholder SVG images)
-- ---------------------------------------------------------------------------

insert into public.products (name, description, price, size, category, image_url, availability, sort_order, featured)
values
  ('Live Oak', 'Strong shade tree for large landscapes, driveways, and ranch-style properties.', 'Call for pricing', '45 gal', 'Shade Tree', '/assets/tree-live-oak.svg', 'available', 1, true),
  ('Cedar Elm', 'Hardy option with good drought tolerance and a clean upright shape.', 'Call for pricing', '30 gal', 'Shade Tree', '/assets/tree-cedar-elm.svg', 'available', 2, true),
  ('Texas Red Oak', 'Great color and strong specimen presence for larger residential landscapes.', 'Call for pricing', '65 gal', 'Shade Tree', '/assets/tree-red-oak.svg', 'available', 3, true),
  ('Bur Oak', 'Big, impressive tree for customers wanting a long-term statement tree.', 'Call for pricing', '95 gal', 'Specimen Tree', '/assets/tree-bur-oak.svg', 'available', 4, false),
  ('Desert Willow', 'Smaller ornamental option with seasonal blooms and low-water appeal.', 'Call for pricing', '15 gal', 'Ornamental Tree', '/assets/tree-desert-willow.svg', 'available', 5, false),
  ('Monterrey Oak', 'Clean, dependable shade tree option for modern landscapes.', 'Call for pricing', '30 gal', 'Shade Tree', '/assets/tree-monterrey-oak.svg', 'available', 6, false);

insert into public.gallery (title, image_url, alt_text, caption, category, sort_order, visible)
values
  ('Farm Rows', '/assets/gallery-farm-rows.svg', 'Organized tree rows at the farm', 'Organized tree rows ready for customer selection.', 'Farm', 1, true),
  ('Large Tree Install', '/assets/gallery-install.svg', 'Finished tree planting project', 'Example placeholder for a finished tree planting project.', 'Transplanting', 2, true),
  ('Equipment Ready', '/assets/gallery-equipment.svg', 'Tree farm equipment', 'Show customers the equipment used for digging, moving, and planting trees.', 'Equipment', 3, true),
  ('Specimen Tree', '/assets/gallery-specimen.svg', 'Premium specimen tree', 'Use this section for hero trees, mature trees, and premium inventory.', 'Trees', 4, true),
  ('Before & After', '/assets/gallery-before-after.svg', 'Transplanting before and after', 'Add project comparison photos to build trust with buyers.', 'Transplanting', 5, true),
  ('Delivery Day', '/assets/gallery-delivery.svg', 'Tree delivery day', 'Photos of delivery and planting help customers understand the process.', 'Equipment', 6, true);
