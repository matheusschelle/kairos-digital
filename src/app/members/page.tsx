import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Área de Membros | KAIROS DIGITAL',
  description: 'Módulos, aulas e ferramentas exclusivas para membros KAIROS.',
  robots: { index: false, follow: false },
};

type Module = {
  id: string;
  number: string;
  title: string;
  description: string;
  lessons: { title: string; duration?: string; href?: string; locked?: boolean }[];
  accent: string;
};

const MODULES: Module[] = [
  {
    id: 'fundamentos',
    number: '01',
    title: 'Fundamentos da IA',
    description: 'Entenda como os LLMs funcionam, o ecossistema Anthropic e como pensar estrategicamente.',
    accent: '#7cf2ff',
    lessons: [
      { title: 'O que é um agente de IA', duration: '18 min' },
      { title: 'Claude Opus 4 — arquitetura e capacidades', duration: '22 min' },
      { title: 'Thinking models vs. fast models', duration: '15 min' },
      { title: 'O prompt como produto', duration: '25 min' },
    ],
  },
  {
    id: 'agentes',
    number: '02',
    title: 'Construindo Agentes',
    description: 'Do primeiro prompt ao agente completo com memória, ferramentas e deploy.',
    accent: '#9b6bff',
    lessons: [
      { title: 'Anatomia de um agente eficiente', duration: '30 min' },
      { title: 'System prompts que convertem', duration: '28 min' },
      { title: 'Agente de vendas WhatsApp', duration: '45 min' },
      { title: 'Agente de suporte ao cliente', duration: '38 min' },
      { title: 'Agente de qualificação de leads', duration: '32 min' },
    ],
  },
  {
    id: 'automacoes',
    number: '03',
    title: 'Automações & Workflows',
    description: 'n8n, webhooks e integrações reais com CRM, planilhas e APIs.',
    accent: '#ff5cd1',
    lessons: [
      { title: 'n8n do zero — instalação e primeiros nós', duration: '35 min' },
      { title: 'Webhook → Agente → Resposta automática', duration: '42 min' },
      { title: 'Integração com Google Sheets', duration: '28 min' },
      { title: 'Integração com Notion como CRM', duration: '30 min' },
    ],
  },
  {
    id: 'deploy',
    number: '04',
    title: 'Deploy & Infraestrutura',
    description: 'VPS, Docker, variáveis de ambiente e produção real.',
    accent: '#3aa6ff',
    lessons: [
      { title: 'GitHub — versionamento profissional', duration: '20 min' },
      { title: 'Vercel — deploy de apps Next.js', duration: '25 min' },
      { title: 'VPS com Railway/Render', duration: '30 min' },
      { title: 'Supabase — banco de dados para agentes', duration: '35 min' },
    ],
  },
  {
    id: 'monetizacao',
    number: '05',
    title: 'Monetização',
    description: 'Precificação, proposta de valor e como fechar os primeiros clientes.',
    accent: '#f59e0b',
    lessons: [
      { title: 'Nichos com maior ROI em IA', duration: '22 min' },
      { title: 'Precificação de agentes e automações', duration: '25 min' },
      { title: 'Proposta comercial KAIROS', duration: '18 min' },
      { title: 'Fechando o primeiro cliente', duration: '30 min', locked: true },
      { title: 'Escalando para R$ 10k/mês', duration: '35 min', locked: true },
    ],
  },
];

const BONUSES = [
  { title: 'Template: Agente de Vendas WhatsApp', href: '#', accent: '#7cf2ff' },
  { title: 'Swipe file: 50 System Prompts que convertem', href: '#', accent: '#9b6bff' },
  { title: 'Planilha: Precificação de serviços IA', href: '#', accent: '#ff5cd1' },
  { title: 'Checklist: Go-live em 7 dias', href: '#', accent: '#f59e0b' },
];

export default function MembersPage() {
  return (
    <main className="relative min-h-screen bg-bg px-6 py-16 md:px-12">
      {/* Aura */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[50vh] w-[40vw] rounded-full bg-gradient-to-bl from-neon-violet/8 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <KairosMark className="h-9 w-9" />
            <span className="font-display text-[11px] font-semibold tracking-[0.42em] text-silver-100">
              KAIROS<span className="ml-2 text-neon-pink">MEMBROS</span>
            </span>
          </div>
          <Link
            href="/"
            className="font-display text-[10px] tracking-[0.28em] text-silver-300 hover:text-white transition"
          >
            ← VOLTAR
          </Link>
        </div>

        {/* Title */}
        <div className="mt-12">
          <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
            ÁREA EXCLUSIVA
          </span>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1] tracking-tight silver-gradient">
            Sua trilha de aprendizado.
          </h1>
          <p className="mt-3 max-w-xl text-base text-silver-200">
            5 módulos. Mais de 20 aulas. Acesso vitalício. Novos conteúdos toda semana.
          </p>
        </div>

        {/* Progress bar (static for MVP) */}
        <div className="glass mt-8 flex items-center gap-5 rounded-2xl px-6 py-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-display text-[10px] tracking-[0.3em] text-silver-200">PROGRESSO GERAL</span>
              <span className="font-display text-[10px] text-neon-cyan">0%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div className="h-full w-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" />
            </div>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="font-display text-2xl font-black text-neon-cyan">0</div>
            <div className="font-display text-[9px] tracking-[0.28em] text-silver-300">AULAS</div>
          </div>
        </div>

        {/* Modules */}
        <div className="mt-10 flex flex-col gap-5">
          {MODULES.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>

        {/* Bonuses */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-white/8" />
            <span className="font-display text-[10px] tracking-[0.5em] text-amber-400">BÔNUS EXCLUSIVOS</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BONUSES.map((b) => (
              <a
                key={b.title}
                href={b.href}
                className="glass flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:bg-white/[0.06]"
              >
                <DownloadIcon className="h-5 w-5 flex-shrink-0" style={{ color: b.accent }} />
                <span className="text-sm text-silver-100">{b.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="glass mt-8 flex flex-col items-center gap-3 rounded-2xl px-7 py-6 text-center">
          <p className="font-display text-[10px] tracking-[0.38em] text-neon-cyan">PRECISA DE AJUDA?</p>
          <p className="text-sm text-silver-200">
            Fale diretamente com o time KAIROS no WhatsApp — suporte 7 dias por semana.
          </p>
          <a
            href="https://wa.me/5562981554992?text=Ol%C3%A1%21+Sou+membro+KAIROS+e+preciso+de+ajuda."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-2 font-display text-[10px] font-bold tracking-[0.28em] text-emerald-200 transition hover:bg-emerald-400/20"
          >
            <WhatsAppIcon className="h-4 w-4" />
            SUPORTE VIA WHATSAPP
          </a>
        </div>
      </div>
    </main>
  );
}

function ModuleCard({ module: m }: { module: Module }) {
  return (
    <div className="glass glow-edge overflow-hidden rounded-3xl">
      {/* Top border gradient */}
      <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${m.accent}80, transparent)` }} />

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-5">
          <span
            className="flex-shrink-0 font-display text-4xl font-black leading-none opacity-30"
            style={{ color: m.accent }}
          >
            {m.number}
          </span>
          <div className="flex-1">
            <h2 className="font-display text-lg font-bold" style={{ color: m.accent }}>
              {m.title}
            </h2>
            <p className="mt-1 text-sm text-silver-300">{m.description}</p>
          </div>
        </div>

        <ul className="mt-5 flex flex-col gap-1.5">
          {m.lessons.map((lesson, i) => (
            <li key={i}>
              {lesson.locked ? (
                <div className="flex items-center gap-3 rounded-xl px-4 py-2.5 opacity-40">
                  <LockIcon className="h-3.5 w-3.5 flex-shrink-0 text-silver-300" />
                  <span className="flex-1 text-sm text-silver-200">{lesson.title}</span>
                  {lesson.duration && (
                    <span className="font-display text-[9px] text-silver-400">{lesson.duration}</span>
                  )}
                </div>
              ) : (
                <a
                  href={lesson.href ?? '#'}
                  className="group flex items-center gap-3 rounded-xl px-4 py-2.5 transition hover:bg-white/[0.04]"
                >
                  <PlayIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: m.accent }} />
                  <span className="flex-1 text-sm text-silver-100 group-hover:text-white transition">
                    {lesson.title}
                  </span>
                  {lesson.duration && (
                    <span className="font-display text-[9px] text-silver-400">{lesson.duration}</span>
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function KairosMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <defs>
        <linearGradient id="mk-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7cf2ff" />
          <stop offset="50%" stopColor="#9b6bff" />
          <stop offset="100%" stopColor="#ff5cd1" />
        </linearGradient>
      </defs>
      <g stroke="url(#mk-grad)" strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M14 8h32v6L34 30l12 16v6H14v-6l12-16L14 14z" />
        <path d="M22 12h16M22 48h16" strokeOpacity="0.6" />
        <path d="M30 26v8" strokeOpacity="0.7" />
      </g>
    </svg>
  );
}
function PlayIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} style={style}>
      <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
    </svg>
  );
}
function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="7" width="10" height="8" rx="1" />
      <path d="M5 7V5a3 3 0 016 0v2" strokeLinecap="round" />
    </svg>
  );
}
function DownloadIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.41c-.003 6.557-5.337 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.881.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.881-.001 2.225.651 3.891 1.746 5.634L2.5 21.5l4.154-1.307zm6.595-5.339c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.099 1.099 0 0 0-.795.372c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}
