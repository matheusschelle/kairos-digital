'use client';

import Reveal from '../Reveal';

const integrations = [
  'WhatsApp Business',
  'Instagram Direct',
  'Telegram',
  'Google Calendar',
  'CRMs',
  'ERPs',
  'Slack',
  'Notion',
  'Stripe',
  'Mercado Pago',
  'HubSpot',
  'Salesforce',
];

export default function IntegrationSection() {
  return (
    <section className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-violet/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-violet">
              06 — INTEGRAÇÃO TOTAL
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
            <span className="silver-gradient">Ecossistema conectado.</span>
            <br />
            <span className="neon-gradient">Segurança enterprise.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: copy + LGPD card */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="glass glow-edge rounded-3xl p-7">
                <div className="font-display text-[10px] tracking-[0.42em] text-neon-cyan/80">
                  ECOSSISTEMA
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                  O agente aprende seu tom de voz.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-200">
                  Conecta-se aos seus CRMs, ERPs e ferramentas atuais. Evolui a
                  cada interação, carregando o DNA da sua marca em cada conversa.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass glow-edge rounded-3xl p-7">
                <div className="font-display text-[10px] tracking-[0.42em] text-neon-pink/90">
                  CONFORMIDADE
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                  LGPD por design.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-200">
                  Privacidade e ética como pilares arquiteturais — não como
                  acessório. Zero data retention via gateway homologado.
                </p>
                <div className="mt-5 flex items-center gap-4 text-[10px] tracking-[0.3em] text-silver-200">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    LGPD
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    SOC 2
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    ISO 27001
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: integrations grid */}
          <Reveal delay={0.2}>
            <div className="glass-strong relative h-full overflow-hidden rounded-3xl p-7">
              <div className="font-display text-[10px] tracking-[0.42em] text-silver-200">
                CONECTORES NATIVOS
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {integrations.map((label, i) => (
                  <div
                    key={label}
                    className="group flex h-16 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] px-3 text-center text-xs font-medium text-silver-100 transition hover:border-white/30 hover:bg-white/[0.06]"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-gradient-to-br from-neon-violet/30 to-neon-pink/30 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
