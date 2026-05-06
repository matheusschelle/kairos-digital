'use client';

import Reveal from '../Reveal';

const features = [
  {
    n: '01',
    title: 'Detecção de intenção',
    body: 'A IA identifica o momento exato de compra — adapta tom, ritmo e gatilhos para converter leads em clientes reais instantaneamente.',
  },
  {
    n: '02',
    title: 'Follow-up incansável',
    body: 'Fim das oportunidades perdidas. O agente acompanha cada contato com humanidade calibrada até o fechamento.',
  },
  {
    n: '03',
    title: 'Presença omnichannel',
    body: 'WhatsApp, Instagram, Web — uma única inteligência de vendas, distribuída em todos os pontos de contato.',
  },
];

export default function SalesAgentSection() {
  return (
    <section className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-pink/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-pink">
              03 — VENDEDORES VIRTUAIS
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
            <span className="silver-gradient">Domínio total</span>
            <br />
            <span className="silver-gradient">do </span>
            <span className="neon-gradient">funil de vendas.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Left: feature list */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <Reveal key={f.n} delay={i * 0.1 + 0.15}>
                <article className="glass glow-edge group flex gap-5 rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.03]">
                  <div className="font-display text-2xl font-black neon-gradient">
                    {f.n}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver-200">{f.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Right: chat preview */}
          <Reveal delay={0.3}>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
              <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet shadow-[0_0_20px_rgba(124,242,255,0.5)]" />
                  <div>
                    <div className="font-display text-xs tracking-[0.3em]">KAIROS</div>
                    <div className="text-[10px] text-silver-200">online • respondendo</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-violet animate-pulse [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>

              <div className="space-y-3">
                <ChatBubble side="them">
                  Oi, vi o anúncio. Vocês conseguem entregar em 24h?
                </ChatBubble>
                <ChatBubble side="us">
                  Conseguimos sim. Antes de fechar, posso entender o volume? Quantos
                  pedidos por dia hoje?
                </ChatBubble>
                <ChatBubble side="them">É variável. Uns 80 a 120.</ChatBubble>
                <ChatBubble side="us">
                  Perfeito. Pelo seu volume, faz mais sentido o plano de operação
                  contínua — ROI em 21 dias. Te chamo no WhatsApp para fechar?
                </ChatBubble>
                <div className="flex items-center gap-2 pl-1 text-[11px] text-silver-300">
                  <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-neon-cyan" />
                  digitando…
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-silver-300">
                <span>POWERED BY CLAUDE OPUS 4.7</span>
                <span className="font-display tracking-[0.3em] text-neon-cyan">98% PRECISÃO</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: 'us' | 'them';
}) {
  const us = side === 'us';
  return (
    <div className={`flex ${us ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug',
          us
            ? 'rounded-br-sm bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 border border-white/10 text-white'
            : 'rounded-bl-sm bg-white/[0.04] border border-white/10 text-silver-100',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}
