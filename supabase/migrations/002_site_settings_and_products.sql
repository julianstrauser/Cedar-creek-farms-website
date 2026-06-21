-- Site settings + extended product fields

alter table public.products
  add column if not exists common_name text,
  add column if not exists best_use text,
  add column if not exists sun_needs text,
  add column if not exists water_needs text,
  add column if not exists mature_size text;

create table if not exists public.site_settings (
  id text primary key default 'main',
  business_name text not null default 'Cedar Creek Farms',
  contact_email text not null default 'cedarcreekfarmstx@gmail.com',
  phone_display text,
  phone_tel text,
  service_area text not null default 'West Texas and surrounding areas',
  contact_page_intro text,
  footer_note text not null default 'Contact for current pricing and availability.',
  facebook_url text,
  instagram_url text,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

insert into public.site_settings (
  id,
  business_name,
  contact_email,
  phone_display,
  phone_tel,
  service_area,
  contact_page_intro,
  footer_note
) values (
  'main',
  'Cedar Creek Farms',
  'cedarcreekfarmstx@gmail.com',
  '[OWNER PHONE NUMBER]',
  null,
  'West Texas and surrounding areas',
  'For current pricing, availability, or questions about trees, please contact us directly. Availability is updated regularly, but pricing may vary depending on tree type, size, quantity, and delivery needs.',
  'Contact for current pricing and availability.'
) on conflict (id) do nothing;
