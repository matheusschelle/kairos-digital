'use client';

import Reveal from '../Reveal';

const pillars = [
  {
    icon: '∞',
    label: 'DISPONIBILIDADE 24/7',
    title: 'Seus melhores talentos nunca dormem.',
    body: 'A IA atende, vende e resolve enquanto você dorme — sem feriados, sem fadiga, sem hora de saída.',
  },
  {
    icon: '◇',
    label: 'CONSISTÊNCIA ABSOLUTA',
    title: 'Excelência em 100% das interações.',
    body: 'Nunca esquece um script. Nunca quebra o tom de voz. Mantém o padrão da sua marca em escala global.',
  },
  {
    icon: '↗',
    label: 'ESCALA INFINITA',
    title: 'Mil conversas simultâneas, zero estresse.',
    body: 'Multiplicar atendimento não significa mais headcount. A inteligência se replica, o custo não.',
  },
];

export default function SolutionSection() {
  return (
    <section id="solucao" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-cyan/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
              02 — A MUDANÇA DE PARADIGMA
            </span>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
              <span className="silver-gradient">Você não </span>
              <span className="neon-gradient">busca talentos.</span>
              <br />
              <span className="silver-gradient">Você </span>
              <span className="neon-gradient">constrói inteligência.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-silver-200 lg:max-w-md lg:text-right">
              A KAIROS transforma expertise em escalabilidade infinita. Treinamos
              agentes que carregam o DNA do seu negócio — e operam com a precisão
              da elite da inteligência artificial.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={0.1 * i + 0.2}>
              <article className="glass glow-edge group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute -right-10 -top-10 font-display text-[140px] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06]">
                  {p.icon}
                </div>
                <div className="relative">
                  <span className="font-display text-[10px] tracking-[0.42em] text-neon-pink/90">
                    {p.label}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-silver-200">
                    {p.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
