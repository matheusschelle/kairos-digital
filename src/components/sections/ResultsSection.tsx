'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '../Reveal';

const stats = [
  {
    value: 50,
    prefix: 'R$ ',
    suffix: 'M',
    label: 'GERADOS PARA NOSSOS CLIENTES',
    body: 'Receita atribuída diretamente aos agentes Kairos em operação.',
    accent: 'from-neon-cyan to-neon-blue',
  },
  {
    value: 98,
    suffix: '%',
    label: 'DE PRECISÃO EM AUTOMAÇÕES',
    body: 'Em fluxos de venda, agendamento e diagnóstico — auditados em produção.',
    accent: 'from-neon-violet to-neon-pink',
  },
  {
    value: 10,
    prefix: '',
    suffix: 'x',
    label: 'MAIS ESCALABILIDADE',
    body: 'Mesma equipe humana. Capacidade multiplicada por uma camada de IA.',
    accent: 'from-neon-pink to-neon-violet',
  },
  {
    value: 237,
    prefix: '+',
    suffix: '%',
    label: 'CRESCIMENTO MÉDIO',
    body: 'Crescimento de receita médio dos clientes 90 dias após a implementação.',
    accent: 'from-neon-cyan to-neon-violet',
  },
];

export default function ResultsSection() {
  return (
    <section id="resultados" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-cyan/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
              05 — RESULTADOS REAIS
            </span>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
              <span className="silver-gradient">Resultados que comprovam</span>
              <br />
              <span className="neon-gradient">a eficácia.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-silver-200 lg:text-right">
              A autoridade da Kairos é sustentada por números reais e mensuráveis —
              auditados em operações que já estão no ar, gerando receita.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i + 0.2}>
              <StatCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  prefix = '',
  suffix = '',
  label,
  body,
  accent,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  body: string;
  accent: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const start = performance.now();
            const duration = 1600;
            const animate = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="glass glow-edge group relative h-full overflow-hidden rounded-3xl p-7"
    >
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40`}
      />
      <div className="relative">
        <div className="font-display text-[clamp(2.4rem,4.5vw,3.5rem)] font-black leading-none neon-gradient">
          {prefix}
          {display}
          {suffix}
        </div>
        <div className="mt-3 font-display text-[10px] tracking-[0.42em] text-silver-100">
          {label}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-silver-300">{body}</p>
      </div>
    </div>
  );
}
