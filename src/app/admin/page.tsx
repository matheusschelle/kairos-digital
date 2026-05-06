'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Lead = {
  id: string;
  nome: string;
  empresa?: string;
  whatsapp: string;
  objetivo?: string;
  orcamento?: string;
  oferta: string;
  created_at: string;
};

type Payment = {
  id: string;
  nome: string;
  whatsapp: string;
  oferta: string;
  valor: number;
  status: string;
  created_at: string;
};

type Tab = 'leads' | 'payments' | 'config';

export default function AdminPage() {
  const [authed, setAuthed]     = useState(false);
  const [pw, setPw]             = useState('');
  const [pwError, setPwError]   = useState(false);
  const [tab, setTab]           = useState<Tab>('leads');
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [supaOk, setSupaOk]     = useState<boolean | null>(null);
  const [loading, setLoading]   = useState(false);

  /* Simple localStorage-based auth (replace with proper auth for production) */
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('kairos_admin') === '1') {
      setAuthed(true);
    }
  }, []);

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    /* Change this password before deploy */
    if (pw === 'kairos2025') {
      localStorage.setItem('kairos_admin', '1');
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('kairos_admin');
    setAuthed(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const [lRes, pRes] = await Promise.all([
      fetch('/api/leads'),
      fetch('/api/payments'),
    ]);
    const lData = await lRes.json();
    const pData = await pRes.json();
    setLeads(lData.leads ?? []);
    setPayments(pData.payments ?? []);
    setSupaOk(lData.configured ?? false);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  const downloadCsv = (rows: Record<string, unknown>[], filename: string) => {
    if (rows.length === 0) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(','), ...rows.map((r) =>
      keys.map((k) => JSON.stringify(String(r[k] ?? ''))).join(',')
    )].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-6">
        <div className="glass-strong w-full max-w-sm rounded-3xl p-8">
          <h1 className="font-display text-xl font-black silver-gradient">KAIROS ADMIN</h1>
          <p className="mt-1 text-xs text-silver-300">Área restrita — apenas para o time KAIROS.</p>
          <form onSubmit={tryLogin} className="mt-7 flex flex-col gap-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Senha"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-silver-50 placeholder:text-silver-300/40 outline-none focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20 transition"
            />
            {pwError && (
              <p className="text-xs text-red-400">Senha incorreta.</p>
            )}
            <button
              type="submit"
              className="btn-neon btn-neon-solid w-full py-3 font-display text-[11px] tracking-[0.32em]"
            >
              ENTRAR
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="font-display text-[10px] tracking-[0.28em] text-silver-300 hover:text-white transition">
              ← VOLTAR AO SITE
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-black silver-gradient">KAIROS ADMIN</h1>
            <p className="mt-0.5 text-xs text-silver-300">Painel de gestão comercial</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-display text-[10px] tracking-[0.28em] text-silver-200 transition hover:border-white/20 disabled:opacity-50"
            >
              <RefreshIcon className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              ATUALIZAR
            </button>
            <button
              onClick={logout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 font-display text-[10px] tracking-[0.28em] text-red-300 transition hover:bg-red-500/20"
            >
              SAIR
            </button>
          </div>
        </div>

        {/* Supabase status */}
        <div className={`mt-6 flex items-center gap-3 rounded-2xl border px-5 py-3 ${
          supaOk
            ? 'border-emerald-400/30 bg-emerald-400/[0.06]'
            : 'border-amber-400/30 bg-amber-400/[0.06]'
        }`}>
          <span className={`h-2 w-2 rounded-full ${supaOk ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <p className="text-sm">
            {supaOk
              ? <span className="text-emerald-200">Supabase conectado — dados em tempo real.</span>
              : <span className="text-amber-200">Supabase não configurado. Configure <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_URL</code> e <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> em <code className="text-amber-300">.env.local</code> para persistir dados.</span>
            }
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'LEADS', value: leads.length, accent: '#7cf2ff' },
            { label: 'PAGAMENTOS', value: payments.length, accent: '#9b6bff' },
            { label: 'CONFIRMADOS', value: payments.filter((p) => p.status === 'confirmado').length, accent: '#10b981' },
            { label: 'PENDENTES', value: payments.filter((p) => p.status === 'pendente').length, accent: '#f59e0b' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <div className="font-display text-3xl font-black" style={{ color: s.accent }}>{s.value}</div>
              <div className="mt-1 font-display text-[9px] tracking-[0.32em] text-silver-300">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 rounded-2xl border border-white/8 bg-white/[0.02] p-1 w-fit">
          {(['leads', 'payments', 'config'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-5 py-2 font-display text-[10px] tracking-[0.28em] transition ${
                tab === t
                  ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                  : 'text-silver-300 hover:text-silver-100'
              }`}
            >
              {t === 'leads' ? 'LEADS' : t === 'payments' ? 'PAGAMENTOS' : 'CONFIGURAÇÕES'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {tab === 'leads' && (
            <TableSection
              title="Leads Capturados"
              rows={leads}
              columns={['nome', 'empresa', 'whatsapp', 'objetivo', 'orcamento', 'oferta', 'created_at']}
              onDownload={() => downloadCsv(leads as unknown as Record<string, unknown>[], 'kairos_leads.csv')}
              accent="#7cf2ff"
            />
          )}
          {tab === 'payments' && (
            <TableSection
              title="Pagamentos"
              rows={payments}
              columns={['nome', 'whatsapp', 'oferta', 'valor', 'status', 'created_at']}
              onDownload={() => downloadCsv(payments as unknown as Record<string, unknown>[], 'kairos_payments.csv')}
              accent="#9b6bff"
            />
          )}
          {tab === 'config' && <ConfigSection />}
        </div>
      </div>
    </main>
  );
}

function TableSection({
  title, rows, columns, onDownload, accent,
}: {
  title: string;
  rows: Record<string, unknown>[];
  columns: string[];
  onDownload: () => void;
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm font-bold tracking-[0.28em]" style={{ color: accent }}>
          {title}
        </h2>
        <button
          onClick={onDownload}
          disabled={rows.length === 0}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-display text-[10px] tracking-[0.28em] text-silver-200 transition hover:border-white/20 disabled:opacity-40"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          EXPORTAR CSV
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="glass rounded-2xl px-7 py-12 text-center">
          <p className="text-sm text-silver-300">Nenhum registro ainda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left font-display text-[9px] tracking-[0.32em] text-silver-300"
                  >
                    {col.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-3 text-silver-100">
                      {col === 'created_at' && row[col]
                        ? new Date(row[col] as string).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
                        : col === 'valor'
                        ? `R$ ${Number(row[col]).toLocaleString('pt-BR')}`
                        : col === 'status'
                        ? <StatusBadge status={row[col] as string} />
                        : String(row[col] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    confirmado: { label: 'CONFIRMADO', color: '#10b981' },
    pendente:   { label: 'PENDENTE',   color: '#f59e0b' },
    cancelado:  { label: 'CANCELADO',  color: '#ef4444' },
  };
  const s = map[status] ?? { label: status.toUpperCase(), color: '#9ca3af' };
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-display text-[9px] tracking-[0.2em]"
      style={{ color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}40` }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}

function ConfigSection() {
  const pixKey  = process.env.NEXT_PUBLIC_PIX_KEY  ?? 'upmatheusschelle@gmail.com';
  const pixName = process.env.NEXT_PUBLIC_PIX_NAME ?? 'KAIROS DIGITAL';

  const CONFIG_ITEMS = [
    { label: 'Chave PIX', value: pixKey, env: 'NEXT_PUBLIC_PIX_KEY' },
    { label: 'Nome PIX',  value: pixName, env: 'NEXT_PUBLIC_PIX_NAME' },
    { label: 'Supabase URL',  value: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '(não configurado)', env: 'NEXT_PUBLIC_SUPABASE_URL' },
    { label: 'Supabase Key',  value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '••••••••' : '(não configurado)', env: 'NEXT_PUBLIC_SUPABASE_ANON_KEY' },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-sm font-bold tracking-[0.28em] text-neon-violet mb-4">VARIÁVEIS DE AMBIENTE</h2>
        <p className="text-sm text-silver-200 mb-5">
          Configure essas variáveis em <code className="text-neon-cyan text-xs bg-neon-cyan/10 px-2 py-0.5 rounded">.env.local</code> (local) ou nas configurações de ambiente da Vercel.
        </p>
        <div className="flex flex-col gap-3">
          {CONFIG_ITEMS.map((item) => (
            <div key={item.env} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <span className="font-display text-[9px] tracking-[0.28em] text-silver-300 sm:w-40 flex-shrink-0">{item.label}</span>
              <code className="flex-1 text-xs text-neon-cyan break-all">{item.value}</code>
              <code className="text-[9px] text-silver-400 flex-shrink-0">{item.env}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-sm font-bold tracking-[0.28em] text-amber-400 mb-3">SEGURANÇA</h2>
        <p className="text-sm text-silver-200">
          Esta página usa autenticação por senha básica (localStorage). Para produção com dados reais,
          implemente autenticação com Supabase Auth ou NextAuth.js.
        </p>
        <p className="mt-2 text-sm text-amber-300">
          Senha padrão: <code className="bg-amber-400/10 px-2 py-0.5 rounded text-xs">kairos2025</code> — troque em <code className="text-xs bg-white/5 px-2 py-0.5 rounded">src/app/admin/page.tsx</code>.
        </p>
      </div>
    </div>
  );
}

function RefreshIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
