'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  oferta: string;
  accentColor?: 'cyan' | 'pink';
};

const OBJETIVOS = [
  'Vender mais',
  'Atender clientes 24/7',
  'Automatizar processos',
  'Escalar meu negócio',
  'Criar agentes de IA',
  'Outro',
];
const ORCAMENTOS = [
  'Até R$ 3.000',
  'R$ 3.000 – R$ 7.000',
  'R$ 7.000 – R$ 15.000',
  'Acima de R$ 15.000',
];

export default function LeadModal({ open, onClose, oferta, accentColor = 'cyan' }: Props) {
  const [nome, setNome]           = useState('');
  const [empresa, setEmpresa]     = useState('');
  const [whatsapp, setWhatsapp]   = useState('');
  const [objetivo, setObjetivo]   = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [sending, setSending]     = useState(false);
  const [done, setDone]           = useState(false);
  const backdropRef               = useRef<HTMLDivElement>(null);

  /* Trap scroll while open */
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const accent   = accentColor === 'cyan' ? '#7cf2ff' : '#ff5cd1';
  const accentCls = accentColor === 'cyan'
    ? 'border-neon-cyan/40 focus:border-neon-cyan/80 focus:ring-neon-cyan/20'
    : 'border-neon-pink/40 focus:border-neon-pink/80 focus:ring-neon-pink/20';
  const btnCls = accentColor === 'cyan'
    ? 'bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet text-bg'
    : 'bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan text-bg';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim()) return;
    setSending(true);

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, empresa, whatsapp, objetivo, orcamento, oferta }),
    }).catch(() => {});

    setSending(false);
    setDone(true);

    /* Redirect to WhatsApp after 1.5 s */
    setTimeout(() => {
      const msg = encodeURIComponent(
        `Olá KAIROS! Me chamo ${nome}${empresa ? ` da ${empresa}` : ''}. ` +
        `Tenho interesse na ${oferta}. ` +
        `Meu objetivo: ${objetivo || 'a definir'}. Orçamento: ${orcamento || 'a combinar'}.`,
      );
      window.open(`https://wa.me/5562981554992?text=${msg}`, '_blank');
      onClose();
    }, 1500);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/85 backdrop-blur-md" />

      <article
        className="glass-strong relative w-full max-w-lg rounded-3xl p-7 sm:p-9 animate-fadeUp"
        role="dialog"
        aria-modal="true"
        aria-label="Formulário de interesse"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-silver-200 hover:border-white/30 hover:text-white transition"
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>

        {done ? (
          <SuccessState name={nome} accent={accent} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-7">
              <span
                className="font-display text-[10px] tracking-[0.5em]"
                style={{ color: accent }}
              >
                {oferta}
              </span>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight silver-gradient">
                Vamos entender o seu negócio
              </h2>
              <p className="mt-2 text-sm text-silver-200">
                Preencha abaixo — em breve um especialista KAIROS entra em contato.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Nome */}
              <Field
                label="Seu nome *"
                type="text"
                value={nome}
                onChange={setNome}
                placeholder="Ex: João Silva"
                accent={accentCls}
              />
              {/* Empresa */}
              <Field
                label="Empresa / negócio"
                type="text"
                value={empresa}
                onChange={setEmpresa}
                placeholder="Ex: Clínica Vida Nova"
                accent={accentCls}
              />
              {/* WhatsApp */}
              <Field
                label="WhatsApp *"
                type="tel"
                value={whatsapp}
                onChange={setWhatsapp}
                placeholder="(62) 9 0000-0000"
                accent={accentCls}
              />
              {/* Objetivo */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] tracking-[0.3em] text-silver-200">
                  PRINCIPAL OBJETIVO
                </label>
                <select
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-sm text-silver-50 outline-none focus:ring-2 transition ${accentCls}`}
                >
                  <option value="">Selecione…</option>
                  {OBJETIVOS.map((o) => (
                    <option key={o} value={o} className="bg-[#0d0e1a]">{o}</option>
                  ))}
                </select>
              </div>
              {/* Orçamento */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] tracking-[0.3em] text-silver-200">
                  ORÇAMENTO DISPONÍVEL
                </label>
                <select
                  value={orcamento}
                  onChange={(e) => setOrcamento(e.target.value)}
                  className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-sm text-silver-50 outline-none focus:ring-2 transition ${accentCls}`}
                >
                  <option value="">Selecione…</option>
                  {ORCAMENTOS.map((o) => (
                    <option key={o} value={o} className="bg-[#0d0e1a]">{o}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={sending || !nome.trim() || !whatsapp.trim()}
                className={`mt-2 w-full rounded-2xl px-6 py-3.5 font-display text-[11px] font-bold tracking-[0.32em] transition disabled:opacity-50 ${btnCls} shadow-lg`}
              >
                {sending ? 'ENVIANDO…' : 'QUERO SER CONTACTADO →'}
              </button>

              <p className="text-center text-[10px] text-silver-300/60">
                Sem compromisso · Resposta em até 2 horas úteis
              </p>
            </form>
          </>
        )}
      </article>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
}

function Field({
  label, type, value, onChange, placeholder, accent,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; accent: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-display text-[10px] tracking-[0.3em] text-silver-200">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-sm text-silver-50 placeholder:text-silver-300/40 outline-none focus:ring-2 transition ${accent}`}
      />
    </div>
  );
}

function SuccessState({ name, accent }: { name: string; accent: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
      >
        <CheckIcon style={{ color: accent }} className="h-8 w-8" />
      </div>
      <div>
        <p className="font-display text-xl font-bold silver-gradient">
          Recebido, {name.split(' ')[0]}!
        </p>
        <p className="mt-2 text-sm text-silver-200">
          Redirecionando para o WhatsApp…
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: accent, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} style={style}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
