'use client';

import { useEffect, useState } from 'react';

async function mpCheckout(offerId: string, title: string, price: number) {
  const res = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price, offerId }),
  });
  const data = await res.json() as { init_point?: string };
  if (data.init_point) window.location.href = data.init_point;
}

export default function StickyCTA() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.9;
    const onScroll = () => {
      if (!dismissed && window.scrollY > threshold) setVisible(true);
      else if (window.scrollY <= threshold) setVisible(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  const handleClick = async () => {
    setLoading(true);
    await mpCheckout(
      'estrutura-express',
      'Estrutura Express - KAIROS DIGITAL',
      1400,
    ).catch(() => setLoading(false));
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[150] transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Oferta rápida"
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
      <div className="bg-bg/90 backdrop-blur-xl px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden h-2 w-2 animate-pulse rounded-full bg-neon-cyan shadow-[0_0_10px_#7cf2ff] sm:block flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-display text-[10px] font-bold tracking-[0.42em] text-neon-cyan">OFERTA IMPERDÍVEL</p>
              <p className="truncate text-xs text-silver-100">
                Estrutura Express — IA ativa em 7 dias por{' '}
                <span className="font-bold text-white">R$ 1.400</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleClick}
              disabled={loading}
              className="btn-neon btn-neon-solid !px-5 !py-2 !text-[10px] disabled:opacity-60"
              data-cursor-hover
            >
              {loading ? 'ABRINDO…' : 'GARANTIR AGORA'}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-silver-300 hover:border-white/30 hover:text-white transition"
              aria-label="Fechar barra"
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
