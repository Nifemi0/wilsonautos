-- Add status column to enquiries table
alter table public.enquiries add column if not exists status text default 'pending';
