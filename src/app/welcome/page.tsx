import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bem-vindo | KAIROS DIGITAL',
  description: 'Seus próximos passos na KAIROS DIGITAL.',
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    number: '01',
    title: 'Entre no grupo exclusivo',
    description:
      'Acesse o grupo de WhatsApp da KAIROS — onde acontecem os bastidores, as atualizações e o suporte direto.',
    action: {
      label: 'ENTRAR NO GRUPO',
      href: 'https://wa.me/5562981554992?text=Ol%C3%A1%21+Acabei+de+me+inscrever+na+KAIROS+e+quero+acessar+o+grupo.',
      external: true,
    },
    accent: '#7cf2ff',
  },
  {
    number: '02',
    title: 'Agende seu onboarding',
    description:
      'Uma reunião de 30 minutos com o time KAIROS para alinhar objetivos, timeline e acesso aos materiais.',
    action: {
      label: 'AGENDAR REUNIÃO',
      href: 'https://wa.me/5562981554992?text=Quero+agendar+minha+reuni%C3%A3o+de+onboarding.',
      external: true,
    },
    accent: '#9b6bff',
  },
  {
    number: '03',
    title: 'Acesse os materiais',
    description:
      'Módulos, aulas e ferramentas disponíveis na área de membros — disponível 24/7 no seu ritmo.',
    action: {
      label: 'ACESSAR ÁREA DE MEMBROS',
      href: '/members',
      external: false,
    },
    accent: '#ff5cd1',
  },
  {
    number: '04',
    title: 'Primeiro resultado em 7 dias',
    description:
      'Siga o roteiro do Dia 1 na área de membros. A KAIROS foi construída para gerar resultado rápido.',
    action: null,
    accent: '#f59e0b',
  },
];

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen bg-bg px-6 py-20 md:px-12">
      {/* Background aura */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-violet/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <KairosMark className="h-9 w-9" />
          <span className="font-display text-[11px] font-semibold tracking-[0.42em] text-silver-100">
            KAIROS<span className="ml-2 text-neon-pink">DIGITAL</span>
          </span>
        </div>

        {/* Hero */}
        <div className="mt-14 text-center">
          <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
            BEM-VINDO À FAMÍLIA
          </span>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1] tracking-tight silver-gradient">
            O futuro começa agora.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-silver-200">
            Sua jornada KAIROS está ativa. Siga os próximos passos abaixo para garantir o melhor
            aproveitamento da sua experiência.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 flex flex-col gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="glass glow-edge relative overflow-hidden rounded-3xl p-6 sm:p-8"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Aura */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-20"
                style={{ background: step.accent }}
              />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                {/* Number */}
                <span
                  className="flex-shrink-0 font-display text-5xl font-black opacity-25 leading-none"
                  style={{ color: step.accent }}
                >
                  {step.number}
                </span>

                <div className="flex-1">
                  <h2
                    className="font-display text-lg font-bold"
                    style={{ color: step.accent }}
                  >
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-silver-200">{step.description}</p>

                  {step.action && (
                    <div className="mt-4">
                      {step.action.external ? (
                        <a
                          href={step.action.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border px-5 py-2 font-display text-[10px] font-bold tracking-[0.28em] transition hover:opacity-80"
                          style={{
                            borderColor: `${step.accent}50`,
                            background: `${step.accent}12`,
                            color: step.accent,
                          }}
                        >
                          {step.action.label}
                          <ExternalIcon className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          href={step.action.href}
                          className="inline-flex items-center gap-2 rounded-full border px-5 py-2 font-display text-[10px] font-bold tracking-[0.28em] transition hover:opacity-80"
                          style={{
                            borderColor: `${step.accent}50`,
                            background: `${step.accent}12`,
                            color: step.accent,
                          }}
                        >
                          {step.action.label}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to site */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="font-display text-[10px] tracking-[0.32em] text-silver-300 hover:text-white transition"
          >
            ← VOLTAR AO SITE
          </Link>
        </div>
      </div>
    </main>
  );
}

function KairosMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <defs>
        <linearGradient id="wk-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7cf2ff" />
          <stop offset="50%" stopColor="#9b6bff" />
          <stop offset="100%" stopColor="#ff5cd1" />
        </linearGradient>
      </defs>
      <g stroke="url(#wk-grad)" strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M14 8h32v6L34 30l12 16v6H14v-6l12-16L14 14z" />
        <path d="M22 12h16M22 48h16" strokeOpacity="0.6" />
        <path d="M30 26v8" strokeOpacity="0.7" />
      </g>
    </svg>
  );
}
function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ExternalIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L6 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
