'use client';

import Reveal from '../Reveal';

const items = [
  {
    tag: 'GARGALO HUMANO',
    title: 'Talento ficou caro. E lento.',
    body: 'Contratar pessoas capacitadas virou um obstáculo de meses. O mercado de 2026 não respeita janelas — exige agilidade extrema.',
  },
  {
    tag: 'RISCO OPERACIONAL',
    title: 'Capital humano é teto, não alavanca.',
    body: 'Depender só de gente cria fragilidades — turnover, treinamento, fadiga — que limitam a sua visão de expansão.',
  },
  {
    tag: 'JANELAS PERDIDAS',
    title: 'Cada lead frio é receita queimada.',
    body: 'Sem follow-up incansável, oportunidades evaporam em horas. O custo invisível dorme nas mensagens não respondidas.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problema" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-violet/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-violet">
              01 — O DIAGNÓSTICO
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
            <span className="silver-gradient">A escassez de talentos é o</span>
            <br />
            <span className="neon-gradient">maior gargalo do crescimento.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver-200 sm:text-lg">
            Você não precisa de mais cadeiras no escritório. Precisa de uma camada
            de inteligência que escale com a sua visão — não com sua folha de pagamento.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.tag} delay={0.1 * i + 0.2}>
              <article className="glass glow-edge group relative h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="font-display text-[10px] tracking-[0.42em] text-neon-cyan/80">
                  {item.tag}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-silver-200">
                  {item.body}
                </p>

                <div className="absolute right-7 top-7 h-12 w-12 rounded-full bg-gradient-to-br from-neon-cyan/10 to-neon-pink/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
