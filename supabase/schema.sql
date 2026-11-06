-- Run this once in Supabase: SQL Editor > New query > paste > Run
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_hi text,
  name_en text not null,
  city text not null check (city in ('Kanpur','Unnao')),
  location text,
  rates int[] not null default '{}',
  plot_sizes text,
  status text not null default 'available' check (status in ('available','selling_fast','sold_out')),
  description text,
  facilities text[] not null default '{}',
  documents text[] not null default '{}',
  maps_url text,
  images text[] not null default '{}',
  published boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.sites enable row level security;
create policy "public reads published" on public.sites for select using (published = true);
create policy "admin reads all" on public.sites for select to authenticated using (true);
create policy "admin inserts" on public.sites for insert to authenticated with check (true);
create policy "admin updates" on public.sites for update to authenticated using (true) with check (true);
create policy "admin deletes" on public.sites for delete to authenticated using (true);

insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true) on conflict (id) do nothing;
create policy "public reads images" on storage.objects for select using (bucket_id = 'site-images');
create policy "admin uploads images" on storage.objects for insert to authenticated with check (bucket_id = 'site-images');
create policy "admin changes images" on storage.objects for update to authenticated using (bucket_id = 'site-images');
create policy "admin deletes images" on storage.objects for delete to authenticated using (bucket_id = 'site-images');
