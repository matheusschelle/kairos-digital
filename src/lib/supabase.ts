import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** Returns null when env vars are not configured — callers must guard. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type Lead = {
  id?: string;
  nome: string;
  empresa?: string;
  whatsapp: string;
  objetivo?: string;
  orcamento?: string;
  oferta: string;
  created_at?: string;
};

export type Payment = {
  id?: string;
  nome: string;
  whatsapp: string;
  oferta: string;
  valor: number;
  comprovante_url?: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
  created_at?: string;
};
