'use client';

import Reveal from '../Reveal';

const steps = [
  {
    week: 'SEMANA 01',
    title: 'Diagnóstico estratégico',
    body: 'Mapeamento profundo das dores operacionais e definição dos fluxos do agente. Imersão na sua marca.',
  },
  {
    week: 'SEMANA 02–03',
    title: 'Desenvolvimento & treinamento',
    body: 'Criação da inteligência personalizada, integração com os sistemas atuais, calibragem de tom de voz.',
  },
  {
    week: 'SEMANA 04',
    title: 'Lançamento & escala',
    body: 'Go-live do agente em produção. Otimização contínua de resultados a partir do dia um.',
  },
];

export default function TimelineSection() {
  return (
    <section className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-pink/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-pink">
              07 — CRONOGRAMA ÁGIL
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
            <span className="silver-gradient">Impacto em </span>
            <span className="neon-gradient">poucas semanas.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver-200">
            Da assinatura ao go-live em 4 semanas. Sem ciclos infinitos de
            consultoria. Sem promessas vagas. Apenas execução cirúrgica.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-neon-cyan/30 via-neon-violet/30 to-neon-pink/30 md:block" />

          <div className="space-y-10 md:space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.week} delay={i * 0.15 + 0.2}>
                <div
                  className={[
                    'grid items-center gap-6 md:grid-cols-2 md:gap-12',
                    i % 2 === 1 ? 'md:[direction:rtl]' : '',
                  ].join(' ')}
                >
                  <div className="md:[direction:ltr]">
                    <div className="glass glow-edge rounded-3xl p-7">
                      <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
                        {s.week}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-silver-200">
                        {s.body}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center justify-center md:flex md:[direction:ltr]">
                    <div className="relative">
                      <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-pink blur-md opacity-60" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-bg/80 font-display text-2xl font-black neon-gradient backdrop-blur-md">
                        0{i + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
