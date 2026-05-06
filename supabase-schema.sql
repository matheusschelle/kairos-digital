-- KAIROS DIGITAL — Supabase Schema
-- Run this in the Supabase SQL Editor after creating your project.

-- Leads table: captures interest from Offer 01 (Implementação Premium)
create table if not exists leads (
  id          uuid default gen_random_uuid() primary key,
  nome        text not null,
  empresa     text,
  whatsapp    text not null,
  objetivo    text,
  orcamento   text,
  oferta      text not null,
  created_at  timestamptz default now()
);

-- Payments table: captures PIX checkout submissions
create table if not exists payments (
  id               uuid default gen_random_uuid() primary key,
  nome             text not null,
  whatsapp         text not null,
  oferta           text not null,
  valor            numeric(10,2) not null,
  comprovante_url  text,
  status           text default 'pendente' check (status in ('pendente','confirmado','cancelado')),
  created_at       timestamptz default now()
);

-- Row Level Security (recommended — restrict public writes to insert only)
alter table leads    enable row level security;
alter table payments enable row level security;

-- Allow anonymous inserts (for the checkout / lead forms)
create policy "anon insert leads"    on leads    for insert with check (true);
create policy "anon insert payments" on payments for insert with check (true);

-- Only authenticated users (your admin) can read
create policy "auth read leads"    on leads    for select using (auth.role() = 'authenticated');
create policy "auth read payments" on payments for select using (auth.role() = 'authenticated');
