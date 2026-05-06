'use client';

import { useState } from 'react';
import Reveal from '../Reveal';
import WhatsAppCTA from '../WhatsAppCTA';
import dynamic from 'next/dynamic';

const LeadModal     = dynamic(() => import('../LeadModal'),     { ssr: false });
const CheckoutModal = dynamic(() => import('../CheckoutModal'), { ssr: false });

/* ─── Offer definitions ────────────────────────────────────────────── */

type OfferAction =
  | { type: 'lead';     oferta: string }
  | { type: 'checkout'; oferta: string; valor: number; valorLabel: string; accentColor: 'cyan' | 'pink' | 'amber' };

type Offer = {
  id: string;
  tag: string;
  kicker: string;
  title: string;
  subtitle: string;
  features: string[];
  bullet: string;
  price: string;
  priceDetail?: string;
  ctaLabel: string;
  action: OfferAction;
  accent: 'cyan' | 'pink' | 'amber';
  /** Featured badge text — shown prominently when set */
  featuredBadge?: string;
  /** Secondary info badges */
  badges?: string[];
  /** Visual prominence tier: hero > featured > standard */
  tier: 'hero' | 'featured' | 'standard';
};

const OFFERS: Offer[] = [
  /* ── Offer 02: Estrutura Express (HERO — most prominent) ── */
  {
    id: 'estrutura-express',
    tag: 'OFERTA 02 · MAIS POPULAR',
    kicker: 'SETUP COMPLETO DE IA',
    title: 'Estrutura Express',
    subtitle: 'Sua empresa com IA rodando em 7 dias.',
    features: [
      'Agente de IA personalizado para vendas',
      'Automação WhatsApp Business 24/7',
      'Integração com CRM ou planilha',
      'Funil de atendimento automatizado',
      'Dashboard de performance',
      'Suporte técnico por 30 dias',
    ],
    bullet:
      'Implantação rápida sem burocracia. Ideal para MEIs, pequenas e médias empresas que querem IA funcionando agora.',
    price: 'R$ 1.400',
    priceDetail: '+ R$ 320/mês',
    ctaLabel: 'QUERO A ESTRUTURA EXPRESS',
    action: {
      type: 'checkout',
      oferta: 'Estrutura Express',
      valor: 1400,
      valorLabel: 'R$ 1.400',
      accentColor: 'cyan',
    },
    accent: 'cyan',
    featuredBadge: 'OFERTA IMPERDÍVEL',
    badges: ['IA ATIVA EM 7 DIAS', 'CLAUDE OPUS 4.7', 'SEM FIDELIDADE'],
    tier: 'hero',
  },

  /* ── Offer 04: Mentoria Flash (FEATURED) ── */
  {
    id: 'mentoria-flash',
    tag: 'OFERTA 04 · FORMAÇÃO',
    kicker: 'MENTORIA INTENSIVA',
    title: 'Mentoria Flash',
    subtitle: '7 dias para dominar IA e sair na frente.',
    features: [
      'Cronograma diário de 7 dias',
      'Agentes do zero ao primeiro cliente',
      'Automações com n8n + Anthropic',
      'Monetização e precificação de serviços',
      'Suporte direto via WhatsApp',
    ],
    bullet:
      'Método KAIROS condensado em 7 dias intensivos. Para quem não pode esperar — e quer resultado.',
    price: 'R$ 1.000',
    ctaLabel: 'QUERO A MENTORIA FLASH',
    action: {
      type: 'checkout',
      oferta: 'Mentoria Flash',
      valor: 1000,
      valorLabel: 'R$ 1.000',
      accentColor: 'amber',
    },
    accent: 'amber',
    featuredBadge: 'FORMAÇÃO INTENSIVA',
    badges: ['7 DIAS', 'SUPORTE DIRETO', 'VAGAS LIMITADAS'],
    tier: 'featured',
  },

  /* ── Offer 01: Implementação Premium ── */
  {
    id: 'implementacao-premium',
    tag: 'OFERTA 01 · DONE-FOR-YOU',
    kicker: 'IMPLEMENTAÇÃO COMPLETA',
    title: 'Implementação Premium',
    subtitle: 'Construímos a máquina para o seu negócio.',
    features: [
      'Agentes de IA 100% personalizados',
      'Automações de ponta a ponta',
      'Sites & landing pages premium',
      'Automação Instagram & DMs',
      'Integração com todos os seus sistemas',
      'Go-live garantido em 4 semanas',
    ],
    bullet:
      'Você nos passa o briefing. A KAIROS entrega a operação rodando — sem você precisar entender de tecnologia.',
    price: 'R$ 4.997',
    ctaLabel: 'QUERO A IMPLEMENTAÇÃO',
    action: { type: 'lead', oferta: 'Implementação Premium' },
    accent: 'cyan',
    badges: ['IMPLANTAÇÃO 4 SEMANAS', 'CLAUDE OPUS 4.7', 'LGPD'],
    tier: 'standard',
  },

  /* ── Offer 03: Mentoria Completa ── */
  {
    id: 'mentoria-completa',
    tag: 'OFERTA 03 · CERTIFICAÇÃO',
    kicker: 'MENTORIA KAIROS',
    title: 'Mentoria Completa',
    subtitle: 'Do zero ao deploy. Com certificação KAIROS.',
    features: [
      'Agentes de IA do zero ao deploy',
      'Automações & workflows reais',
      'Sites e landing pages que vendem',
      'Git, GitHub e infraestrutura',
      'VPS, deploy e produção',
      'Estratégias de monetização',
    ],
    bullet:
      'Ao final, você recebe a Certificação KAIROS DIGITAL — credencial reconhecida no nosso ecossistema.',
    price: 'R$ 1.997',
    ctaLabel: 'QUERO A MENTORIA',
    action: {
      type: 'checkout',
      oferta: 'Mentoria Completa',
      valor: 1997,
      valorLabel: 'R$ 1.997',
      accentColor: 'pink',
    },
    accent: 'pink',
    badges: ['CERTIFICAÇÃO KAIROS', 'TURMAS LIMITADAS', 'ACESSO VITALÍCIO'],
    tier: 'standard',
  },
];

/* ─── Section ──────────────────────────────────────────────────────── */

export default function OffersSection() {
  const [leadModal, setLeadModal]         = useState<{ open: boolean; oferta: string }>({
    open: false, oferta: '',
  });
  const [checkoutModal, setCheckoutModal] = useState<{
    open: boolean; oferta: string; valor: number; valorLabel: string; accentColor: 'cyan' | 'pink' | 'amber';
  }>({ open: false, oferta: '', valor: 0, valorLabel: '', accentColor: 'cyan' });

  const openOffer = (action: OfferAction) => {
    if (action.type === 'lead') {
      setLeadModal({ open: true, oferta: action.oferta });
    } else {
      setCheckoutModal({
        open: true,
        oferta: action.oferta,
        valor: action.valor,
        valorLabel: action.valorLabel,
        accentColor: action.accentColor,
      });
    }
  };

  const hero     = OFFERS.find((o) => o.tier === 'hero')!;
  const featured = OFFERS.find((o) => o.tier === 'featured')!;
  const standards = OFFERS.filter((o) => o.tier === 'standard');

  return (
    <>
      <section id="ofertas" className="relative px-6 py-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-violet/60" />
              <span className="font-display text-[10px] tracking-[0.5em] text-neon-violet">
                HUB COMERCIAL KAIROS
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-neon-violet/60" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 text-center font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
              <span className="silver-gradient">Escolha como você </span>
              <span className="neon-gradient">redefine o futuro.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-silver-200">
              Quatro caminhos. Um destino: IA trabalhando pelo seu negócio 24 horas por dia.
            </p>
          </Reveal>

          {/* Row 1: Hero (2/3) + Featured (1/3) */}
          <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Reveal delay={0.2} className="lg:col-span-2">
              <HeroCard offer={hero} onCta={() => openOffer(hero.action)} />
            </Reveal>
            <Reveal delay={0.28}>
              <FeaturedCard offer={featured} onCta={() => openOffer(featured.action)} />
            </Reveal>
          </div>

          {/* Row 2: Standard × 2 */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {standards.map((o, i) => (
              <Reveal key={o.id} delay={0.36 + i * 0.08}>
                <StandardCard offer={o} onCta={() => openOffer(o.action)} />
              </Reveal>
            ))}
          </div>

          {/* Still unsure */}
          <Reveal delay={0.5}>
            <div className="glass mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl px-7 py-5 text-center md:flex-row md:text-left">
              <div>
                <div className="font-display text-[10px] tracking-[0.42em] text-neon-cyan">
                  AINDA EM DÚVIDA?
                </div>
                <p className="mt-1 text-sm text-silver-100">
                  Converse com a KAIROS e descubra qual oferta faz mais sentido para o seu momento.
                </p>
              </div>
              <WhatsAppCTA
                variant="solid"
                message="Olá KAIROS! Quero entender qual oferta é ideal para mim."
              >
                Converse com a KAIROS
              </WhatsAppCTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modals */}
      <LeadModal
        open={leadModal.open}
        onClose={() => setLeadModal((s) => ({ ...s, open: false }))}
        oferta={leadModal.oferta}
        accentColor="cyan"
      />
      <CheckoutModal
        open={checkoutModal.open}
        onClose={() => setCheckoutModal((s) => ({ ...s, open: false }))}
        oferta={checkoutModal.oferta}
        valor={checkoutModal.valor}
        valorLabel={checkoutModal.valorLabel}
        accentColor={checkoutModal.accentColor}
      />
    </>
  );
}

/* ─── Hero Card (Estrutura Express) ───────────────────────────────── */
function HeroCard({ offer: o, onCta }: { offer: Offer; onCta: () => void }) {
  return (
    <article className="glass glow-edge group relative h-full overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9">
      {/* Neon aura */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-neon-cyan/35 via-neon-blue/15 to-transparent blur-3xl" />
      {/* Bottom aura */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-neon-violet/20 to-transparent blur-2xl" />

      {/* Featured badge */}
      <div className="relative mb-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.32em] text-bg shadow-[0_0_20px_rgba(124,242,255,0.4)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bg/80" />
          {o.featuredBadge}
        </span>
        <span className="font-display text-[9px] tracking-[0.32em] text-silver-300">{o.tag}</span>
      </div>

      <header className="relative">
        <p className="font-display text-[10px] tracking-[0.42em] text-neon-cyan/90">{o.kicker}</p>
        <h3 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight">
          <span className="neon-gradient">{o.title}</span>
        </h3>
        <p className="mt-2 font-display text-[11px] tracking-[0.18em] text-silver-200">{o.subtitle}</p>
      </header>

      {/* Features */}
      <ul className="relative mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {o.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-silver-100">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-cyan shadow-[0_0_8px_#7cf2ff]" />
            {f}
          </li>
        ))}
      </ul>

      {/* Bullet */}
      <div className="relative mt-5 rounded-2xl border border-neon-cyan/15 bg-neon-cyan/[0.04] p-4">
        <p className="text-sm leading-relaxed text-silver-200">{o.bullet}</p>
      </div>

      {/* Badges */}
      <div className="relative mt-5 flex flex-wrap gap-2">
        {o.badges?.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-3 py-1 font-display text-[9px] tracking-[0.28em] text-neon-cyan/90"
          >
            <span className="h-1 w-1 rounded-full bg-neon-cyan" />
            {b}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-display text-[10px] tracking-[0.32em] text-silver-300/70">INVESTIMENTO</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-3xl font-black neon-gradient">{o.price}</span>
            {o.priceDetail && (
              <span className="font-display text-[11px] text-neon-cyan/70">{o.priceDetail}</span>
            )}
          </div>
        </div>
        <button
          onClick={onCta}
          className="btn-neon btn-neon-solid inline-flex items-center gap-2"
          data-cursor-hover
        >
          {o.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

/* ─── Featured Card (Mentoria Flash) ─────────────────────────────── */
function FeaturedCard({ offer: o, onCta }: { offer: Offer; onCta: () => void }) {
  const amberGrad = 'from-amber-300 via-amber-400 to-pink-400';
  return (
    <article className="glass glow-edge group relative h-full overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
      {/* Aura */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-amber-400/25 via-pink-400/10 to-transparent blur-3xl" />

      {/* Featured badge */}
      <div className="relative mb-5 flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${amberGrad} px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.32em] text-bg shadow-lg`}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bg/80" />
          {o.featuredBadge}
        </span>
      </div>

      <header className="relative">
        <p className="font-display text-[9px] tracking-[0.38em] text-amber-300/80">{o.kicker}</p>
        <h3 className="mt-2 font-display text-2xl font-black leading-tight">
          <span
            style={{
              background: 'linear-gradient(135deg,#f59e0b,#f472b6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {o.title}
          </span>
        </h3>
        <p className="mt-1.5 font-display text-[10px] tracking-[0.18em] text-silver-200">{o.subtitle}</p>
      </header>

      {/* Features */}
      <ul className="relative mt-5 flex flex-col gap-2">
        {o.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-silver-100">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            {f}
          </li>
        ))}
      </ul>

      {/* Bullet */}
      <div className="relative mt-5 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4">
        <p className="text-sm leading-relaxed text-silver-200">{o.bullet}</p>
      </div>

      {/* Badges */}
      <div className="relative mt-4 flex flex-wrap gap-2">
        {o.badges?.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1 font-display text-[9px] tracking-[0.28em] text-amber-300/90"
          >
            <span className="h-1 w-1 rounded-full bg-amber-400" />
            {b}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-display text-[10px] tracking-[0.32em] text-silver-300/70">INVESTIMENTO</div>
          <span
            className="mt-1 block font-display text-3xl font-black"
            style={{
              background: 'linear-gradient(135deg,#f59e0b,#f472b6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {o.price}
          </span>
        </div>
        <button
          onClick={onCta}
          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${amberGrad} px-5 py-2.5 font-display text-[10px] font-bold tracking-[0.28em] text-bg shadow-lg transition hover:opacity-90`}
          data-cursor-hover
        >
          GARANTIR VAGA
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
}

/* ─── Standard Card (Premium + Completa) ─────────────────────────── */
function StandardCard({ offer: o, onCta }: { offer: Offer; onCta: () => void }) {
  const isCyan = o.accent === 'cyan';
  const accentHex = isCyan ? '#7cf2ff' : '#ff5cd1';
  const aura = isCyan
    ? 'from-neon-cyan/20 via-neon-blue/10 to-transparent'
    : 'from-neon-pink/20 via-neon-violet/10 to-transparent';
  const tagColor = isCyan ? 'text-neon-cyan' : 'text-neon-pink';
  const dotColor = isCyan ? 'bg-neon-cyan' : 'bg-neon-pink';
  const badgeBorder = isCyan ? 'border-neon-cyan/15 bg-neon-cyan/[0.04] text-neon-cyan/80' : 'border-neon-pink/15 bg-neon-pink/[0.04] text-neon-pink/80';
  const bulletBorder = isCyan ? 'border-neon-cyan/10 bg-neon-cyan/[0.025]' : 'border-neon-pink/10 bg-neon-pink/[0.025]';

  return (
    <article className="glass glow-edge group relative h-full overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9">
      <div className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${aura} blur-3xl opacity-70`} />

      <header className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-display text-[10px] tracking-[0.5em] ${tagColor}`}>{o.tag}</span>
          <span className="h-px w-6 bg-white/15" />
          <span className="font-display text-[9px] tracking-[0.28em] text-silver-300">{o.kicker}</span>
        </div>
        <h3 className="mt-4 font-display text-[clamp(1.5rem,2.5vw,2rem)] font-black leading-tight">
          <span className="silver-gradient">{o.title}</span>
        </h3>
        <p className="mt-1.5 font-display text-[10px] tracking-[0.18em] text-silver-300/80">{o.subtitle}</p>
      </header>

      <ul className="relative mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {o.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-silver-100">
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotColor}`} />
            {f}
          </li>
        ))}
      </ul>

      <div className={`relative mt-5 rounded-2xl border ${bulletBorder} p-4`}>
        <p className="text-sm leading-relaxed text-silver-200">{o.bullet}</p>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {o.badges?.map((b) => (
          <span
            key={b}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-display text-[9px] tracking-[0.28em] ${badgeBorder}`}
          >
            <span className={`h-1 w-1 rounded-full ${dotColor}`} />
            {b}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-display text-[10px] tracking-[0.32em] text-silver-300/70">INVESTIMENTO</div>
          <span
            className="mt-1 block font-display text-2xl font-black"
            style={{ color: accentHex }}
          >
            {o.price}
          </span>
        </div>
        <button
          onClick={onCta}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-display text-[10px] font-bold tracking-[0.28em] transition hover:opacity-90 ${
            isCyan
              ? 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20'
              : 'border-neon-pink/40 bg-neon-pink/10 text-neon-pink hover:bg-neon-pink/20'
          }`}
          data-cursor-hover
        >
          {o.ctaLabel}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
