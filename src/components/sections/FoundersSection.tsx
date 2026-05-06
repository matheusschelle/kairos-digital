'use client';

import Image from 'next/image';
import Reveal from '../Reveal';

type Founder = {
  name: string;
  role: string;
  badge: string;
  badgeAccent: 'cyan' | 'amber';
  speciality: string;
  description: string;
  brandLine: string;
  tags: string[];
  whatsapp: { label: string; href: string };
  instagram: { label: string; href: string };
  /** Initials shown in the avatar tile when no portrait is wired up. */
  initials: string;
  /** Optional portrait URL — drop a file at this path to replace the gradient avatar. */
  portrait?: string;
  /** Pair of accent colors for the gradient avatar fallback. */
  accent: { from: string; to: string };
};

const founders: Founder[] = [
  {
    name: 'Matheus Schelle',
    role: 'CEO & Fundador',
    badge: 'CEO & FUNDADOR',
    badgeAccent: 'cyan',
    speciality: 'Especialista em Vendas · Cripto & Investimentos · Trader · IA & Tech',
    description:
      'Empreendedor nato com visão estratégica e mente criativa. CEO do IBCCF, especialista em mercado cripto e investimentos. Certificado pela Anthropic em IA aplicada. Empresário visionário com base em Goiânia.',
    brandLine: 'PROJETO KAIROS',
    tags: ['Anthropic Claude Code', 'IBCCF', 'Trader · Cripto'],
    whatsapp: {
      label: '(62) 98155-4992',
      href: 'https://wa.me/5562981554992?text=Quero%20conversar%20com%20a%20KAIROS%20sobre%20IA%20estratégica',
    },
    instagram: {
      label: '@_matheusschelle',
      href: 'https://www.instagram.com/_matheusschelle/',
    },
    initials: 'MS',
    portrait: '/founders/matheus.webp',
    accent: { from: '#3aa6ff', to: '#9b6bff' },
  },
  {
    name: 'Vilson Mota',
    role: 'Co-CEO & Fundador',
    badge: 'CO-CEO & FUNDADOR',
    badgeAccent: 'amber',
    speciality: 'Especialista em Vendas · IA & Tech · Corretor',
    description:
      'Vendedor nato presente em mais de 20 estados brasileiros. Ex-consultor Porto Seguro, corretor em Goiânia e pioneiro em DeFi. Certificado pela Anthropic em IA aplicada. Membro do time de elite do Cultura Builder.',
    brandLine: 'CULTURA BUILDER',
    tags: ['Anthropic Claude Code', 'Cultura Builder', 'Corretor · Goiânia', '20+ estados'],
    whatsapp: {
      label: '(62) 98445-2548',
      href: 'https://wa.me/5562984452548?text=Quero%20conversar%20com%20a%20KAIROS%20sobre%20IA%20estratégica',
    },
    instagram: {
      label: '@motavilson',
      href: 'https://www.instagram.com/motavilson/',
    },
    initials: 'VM',
    portrait: '/founders/vilson.webp',
    accent: { from: '#ff5cd1', to: '#9b6bff' },
  },
];

export default function FoundersSection() {
  return (
    <section id="equipe" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-cyan/60" />
            <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
              NOSSA EQUIPE
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-neon-cyan/60" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-tight">
            <span className="silver-gradient">As mentes por trás da </span>
            <span className="neon-gradient">Kairos</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-silver-200">
            Dois empreendedores. Um propósito: transformar inteligência artificial em
            crescimento real para empresas que não esperam o futuro chegar.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={0.1 * i + 0.2}>
              <FounderCard founder={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderCard({ founder: f }: { founder: Founder }) {
  const badgeClass =
    f.badgeAccent === 'cyan'
      ? 'from-neon-cyan via-neon-blue to-neon-violet'
      : 'from-amber-300 via-amber-400 to-pink-400';
  return (
    <article className="glass glow-edge group relative overflow-hidden rounded-3xl p-3 transition-transform duration-500 hover:-translate-y-1 sm:p-4">
      {/* Portrait tile */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${f.accent.from}33 0%, ${f.accent.to}33 100%), #0b0d18`,
        }}
      >
        {/* Portrait — next/image handles lazy loading, WebP/AVIF negotiation and sizing */}
        {f.portrait ? (
          <Image
            src={f.portrait}
            alt={f.name}
            fill
            className="object-cover object-top opacity-0 transition-opacity duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = '1';
            }}
          />
        ) : null}

        {/* Initials fallback — visible until portrait covers it */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[6rem] font-black tracking-[0.06em] opacity-30"
            style={{
              background: `linear-gradient(135deg, ${f.accent.from}, ${f.accent.to})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {f.initials}
          </span>
        </div>

        {/* Brand-line watermark (top-left) */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <KairosGlyph className="h-6 w-6" />
          <span className="font-display text-[10px] font-bold tracking-[0.32em] text-white/85">
            {f.brandLine}
          </span>
        </div>

        {/* Subtle scrim */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/85 via-bg/20 to-transparent" />

        {/* Role badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span
            className={`inline-flex rounded-full bg-gradient-to-r ${badgeClass} px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.32em] text-bg shadow-lg`}
          >
            {f.badge}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-2 pb-2 pt-5 sm:px-3">
        <h3 className="font-display text-2xl font-bold leading-tight neon-gradient">
          {f.name}
        </h3>
        <p className="mt-1 font-display text-[11px] tracking-[0.18em] text-neon-cyan/90">
          {f.speciality}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-silver-200">{f.description}</p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {f.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-[0.14em] text-silver-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/80" />
              {t}
            </span>
          ))}
        </div>

        {/* Contact buttons */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={f.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 font-display text-[10px] font-semibold tracking-[0.16em] text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/20"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {f.whatsapp.label}
          </a>
          <a
            href={f.instagram.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-400/10 px-4 py-1.5 font-display text-[10px] font-semibold tracking-[0.16em] text-pink-200 transition hover:border-pink-300 hover:bg-pink-400/20"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
            {f.instagram.label}
          </a>
        </div>
      </div>
    </article>
  );
}

function KairosGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <g stroke="white" strokeOpacity="0.85" strokeWidth="2.5" fill="none" strokeLinejoin="round">
        <path d="M14 8h32v6L34 30l12 16v6H14v-6l12-16L14 14z" />
      </g>
    </svg>
  );
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.41c-.003 6.557-5.337 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.881.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.881-.001 2.225.651 3.891 1.746 5.634L2.5 21.5l4.154-1.307zm6.595-5.339c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.099 1.099 0 0 0-.795.372c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  );
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
