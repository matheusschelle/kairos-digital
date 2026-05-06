'use client';

import type { ReactNode } from 'react';

const KAIROS_WHATSAPP = '5562981554992';

type Variant = 'solid' | 'outline' | 'ghost';

type Props = {
  /** Pre-filled message — encoded automatically. */
  message?: string;
  /** Visible label. */
  children?: ReactNode;
  variant?: Variant;
  className?: string;
  /** Override the destination number. Defaults to KAIROS HQ. */
  number?: string;
};

/**
 * Premium WhatsApp call-to-action.
 *
 * Single source of truth for "Fale com a KAIROS" buttons. Routes the user
 * straight to our AI agent (no funnels, no VSLs) which handles
 * qualification → recommendation → conversion end-to-end.
 */
export default function WhatsAppCTA({
  message = 'Olá KAIROS, quero conversar com vocês.',
  children = 'Fale com a KAIROS',
  variant = 'solid',
  className = '',
  number = KAIROS_WHATSAPP,
}: Props) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  const base =
    'btn-neon group relative inline-flex items-center gap-2 will-change-transform';
  const styles: Record<Variant, string> = {
    solid: 'btn-neon-solid',
    outline: '',
    ghost:
      '!border-emerald-400/40 !bg-emerald-400/10 !text-emerald-100 hover:!border-emerald-300/70',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles[variant]} ${className}`}
      data-cursor-hover
    >
      <WhatsAppGlyph className="h-4 w-4" />
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.41c-.003 6.557-5.337 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.881.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.881-.001 2.225.651 3.891 1.746 5.634L2.5 21.5l4.154-1.307zm6.595-5.339c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.099 1.099 0 0 0-.795.372c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
