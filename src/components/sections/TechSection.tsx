'use client';

import Reveal from '../Reveal';

export default function TechSection() {
  return (
    <section id="tecnologia" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-blue/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-blue">
              04 — TECNOLOGIA DE ELITE
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
            <span className="silver-gradient">Padrão ouro:</span>
            <br />
            <span className="neon-gradient">Claude Opus & Anthropic.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal delay={0.1}>
            <TechCard
              tag="MODELO"
              title="Claude Opus 4.7"
              body="O modelo mais avançado da Anthropic. Raciocínio lógico superior, precisão cirúrgica em automações complexas."
              meta="ANTHROPIC CERTIFIED"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <TechCard
              tag="VELOCIDADE"
              title="Claude Code"
              body="Entregamos integrações complexas em dias — não meses. A agilidade que o mercado exige, sem o trade-off de qualidade."
              meta="48H DE GO-LIVE"
              accent="cyan"
            />
          </Reveal>
          <Reveal delay={0.3}>
            <TechCard
              tag="SEGURANÇA"
              title="Enterprise-Grade"
              body="Infraestrutura desenhada para escalar globalmente — proteção de dados, conformidade LGPD, isolamento total por cliente."
              meta="ZERO DATA RETENTION"
              accent="pink"
            />
          </Reveal>
        </div>

        {/* Logos / certifications strip */}
        <Reveal delay={0.4}>
          <div className="glass mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl px-8 py-5 text-[11px] tracking-[0.32em] text-silver-200">
            <span className="font-display">CERTIFICAÇÕES & PARCEIROS</span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-display">
              <span>ANTHROPIC</span>
              <span className="text-white/30">•</span>
              <span>CLAUDE CODE</span>
              <span className="text-white/30">•</span>
              <span>VERCEL</span>
              <span className="text-white/30">•</span>
              <span>OPENROUTER</span>
              <span className="text-white/30">•</span>
              <span>GOOGLE CLOUD</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TechCard({
  tag,
  title,
  body,
  meta,
  accent = 'violet',
}: {
  tag: string;
  title: string;
  body: string;
  meta: string;
  accent?: 'violet' | 'cyan' | 'pink';
}) {
  const colorMap = {
    violet: 'text-neon-violet',
    cyan: 'text-neon-cyan',
    pink: 'text-neon-pink',
  } as const;
  return (
    <article className="glass glow-edge group relative h-full overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
      <div className={`font-display text-[10px] tracking-[0.42em] ${colorMap[accent]}`}>
        {tag}
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-silver-200">{body}</p>

      <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="font-display text-[9px] tracking-[0.4em] text-silver-300">{meta}</span>
        <span className={`text-2xl ${colorMap[accent]}`}>↗</span>
      </div>

      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
          accent === 'violet'
            ? 'bg-neon-violet/15'
            : accent === 'cyan'
            ? 'bg-neon-cyan/15'
            : 'bg-neon-pink/15'
        } opacity-0 group-hover:opacity-100`}
      />
    </article>
  );
}
