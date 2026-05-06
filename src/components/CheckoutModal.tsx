'use client';

import { useEffect, useRef, useState } from 'react';
import { buildPixPayload, pixQrUrl } from '@/lib/pix';

const PIX_KEY  = process.env.NEXT_PUBLIC_PIX_KEY  ?? 'upmatheusschelle@gmail.com';
const PIX_NAME = process.env.NEXT_PUBLIC_PIX_NAME ?? 'KAIROS DIGITAL';
const PIX_CITY = 'GOIANIA';

type Step = 1 | 2 | 3;

type Props = {
  open: boolean;
  onClose: () => void;
  oferta: string;
  valor: number;
  /** Value label shown (e.g. "R$ 1.400" or "R$ 1.400 + R$320/mês") */
  valorLabel: string;
  accentColor?: 'cyan' | 'pink' | 'amber';
};

export default function CheckoutModal({
  open, onClose, oferta, valor, valorLabel, accentColor = 'cyan',
}: Props) {
  const [step, setStep]         = useState<Step>(1);
  const [nome, setNome]         = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [file, setFile]         = useState<File | null>(null);
  const [fileB64, setFileB64]   = useState<string>('');
  const [copied, setCopied]     = useState(false);
  const [sending, setSending]   = useState(false);
  const backdropRef             = useRef<HTMLDivElement>(null);

  const pixPayload = buildPixPayload(PIX_KEY, PIX_NAME, PIX_CITY, valor);
  const qrUrl      = pixQrUrl(pixPayload, 200);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setNome(''); setWhatsapp(''); setFile(null); setFileB64(''); setCopied(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const accent = accentColor === 'cyan'  ? '#7cf2ff'
               : accentColor === 'pink'  ? '#ff5cd1'
               : '#f59e0b'; // amber

  const accentCls = accentColor === 'cyan'  ? 'border-neon-cyan/40 focus:border-neon-cyan/80 focus:ring-neon-cyan/20'
                  : accentColor === 'pink'  ? 'border-neon-pink/40 focus:border-neon-pink/80 focus:ring-neon-pink/20'
                  : 'border-amber-400/40 focus:border-amber-400/80 focus:ring-amber-400/20';

  const btnGradient = accentColor === 'cyan'  ? 'from-neon-cyan via-neon-blue to-neon-violet'
                    : accentColor === 'pink'  ? 'from-neon-pink via-neon-violet to-neon-cyan'
                    : 'from-amber-300 via-amber-400 to-pink-400';

  const copyKey = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setFileB64(ev.target?.result as string ?? '');
    reader.readAsDataURL(f);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim()) return;
    setSending(true);

    await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome, whatsapp, oferta, valor,
        comprovante_url: fileB64 ? '[anexo]' : undefined,
        status: 'pendente',
      }),
    }).catch(() => {});

    setSending(false);
    setStep(3);

    setTimeout(() => {
      const msg = encodeURIComponent(
        `Olá KAIROS! Me chamo ${nome}. Acabei de realizar o pagamento PIX da ${oferta} ` +
        `no valor de ${valorLabel}. WhatsApp: ${whatsapp}. Segue o comprovante.`,
      );
      window.open(`https://wa.me/5562981554992?text=${msg}`, '_blank');
    }, 1800);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-bg/85 backdrop-blur-md" />

      <article
        className="glass-strong relative w-full max-w-lg rounded-3xl animate-fadeUp overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout PIX"
      >
        {/* Gradient top border */}
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        {/* Step indicator */}
        <div className="flex items-center justify-between px-7 pt-5">
          <StepDots step={step} accent={accent} />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-silver-200 hover:border-white/30 hover:text-white transition"
            aria-label="Fechar"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-7 pb-8 pt-4">
          {step === 1 && (
            <Step1
              oferta={oferta}
              valorLabel={valorLabel}
              pixKey={PIX_KEY}
              qrUrl={qrUrl}
              copied={copied}
              onCopy={copyKey}
              accent={accent}
              accentCls={accentCls}
              btnGradient={btnGradient}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2
              nome={nome}
              whatsapp={whatsapp}
              file={file}
              fileB64={fileB64}
              onNome={setNome}
              onWhatsapp={setWhatsapp}
              onFile={handleFile}
              onSubmit={handleConfirm}
              accentCls={accentCls}
              btnGradient={btnGradient}
              sending={sending}
              accent={accent}
            />
          )}
          {step === 3 && <Step3 nome={nome} accent={accent} />}
        </div>
      </article>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
}

/* ─── Step 1: PIX instructions ─── */
function Step1({
  oferta, valorLabel, pixKey, qrUrl, copied, onCopy, accent,
  accentCls, btnGradient, onNext,
}: {
  oferta: string; valorLabel: string; pixKey: string; qrUrl: string;
  copied: boolean; onCopy: () => void; accent: string;
  accentCls: string; btnGradient: string; onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="font-display text-[10px] tracking-[0.5em]" style={{ color: accent }}>
          CHECKOUT · {oferta}
        </span>
        <h2 className="mt-2 font-display text-2xl font-black leading-tight silver-gradient">
          Realize o pagamento via PIX
        </h2>
        <p className="mt-1 text-sm text-silver-200">
          Escaneie o QR Code ou copie a chave abaixo.
        </p>
      </div>

      {/* Price badge */}
      <div
        className="inline-flex items-baseline gap-2 rounded-2xl px-5 py-3 self-start"
        style={{ background: `${accent}18`, border: `1px solid ${accent}40` }}
      >
        <span className="font-display text-3xl font-black" style={{ color: accent }}>
          {valorLabel}
        </span>
        <span className="text-xs text-silver-300">pagamento único</span>
      </div>

      {/* QR + key side by side on sm+ */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* QR */}
        <div
          className="flex-shrink-0 rounded-2xl p-2.5"
          style={{ background: '#05060c', border: `1px solid ${accent}40` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt="QR Code PIX"
            width={160}
            height={160}
            className="rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p className="text-xs text-silver-200 leading-relaxed">
            Abra seu app do banco → <span className="text-white">PIX</span> →
            <span className="text-white"> Copia e Cola</span> → cole a chave abaixo:
          </p>

          {/* Copy key */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: `${accent}0d`, border: `1px solid ${accent}30` }}
          >
            <span
              className="flex-1 truncate font-mono text-xs"
              style={{ color: accent }}
            >
              {pixKey}
            </span>
            <button
              onClick={onCopy}
              className="flex-shrink-0 flex items-center gap-1 rounded-lg px-3 py-1.5 font-display text-[9px] tracking-[0.25em] transition"
              style={{
                background: copied ? `${accent}33` : `${accent}1a`,
                border: `1px solid ${accent}${copied ? '66' : '33'}`,
                color: accent,
              }}
            >
              {copied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
              {copied ? 'COPIADO!' : 'COPIAR'}
            </button>
          </div>

          <p className="text-[10px] text-silver-300/70 leading-relaxed">
            Após o pagamento, clique em <span className="text-white">Avançar</span> para enviar seu comprovante.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className={`w-full rounded-2xl bg-gradient-to-r ${btnGradient} px-6 py-3.5 font-display text-[11px] font-bold tracking-[0.32em] text-bg shadow-lg transition hover:opacity-90`}
      >
        JÁ PAGUEI — AVANÇAR →
      </button>
    </div>
  );
}

/* ─── Step 2: Comprovante + dados ─── */
function Step2({
  nome, whatsapp, file, fileB64,
  onNome, onWhatsapp, onFile, onSubmit,
  accentCls, btnGradient, sending, accent,
}: {
  nome: string; whatsapp: string; file: File | null; fileB64: string;
  onNome: (v: string) => void; onWhatsapp: (v: string) => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  accentCls: string; btnGradient: string; sending: boolean; accent: string;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <span className="font-display text-[10px] tracking-[0.5em]" style={{ color: accent }}>
          PASSO 2 DE 2
        </span>
        <h2 className="mt-2 font-display text-2xl font-black leading-tight silver-gradient">
          Confirme seus dados
        </h2>
        <p className="mt-1 text-sm text-silver-200">
          Seus dados + comprovante garantem o acesso imediato.
        </p>
      </div>

      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <label className="font-display text-[10px] tracking-[0.3em] text-silver-200">SEU NOME *</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => onNome(e.target.value)}
          placeholder="Ex: Maria Fernanda"
          className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-sm text-silver-50 placeholder:text-silver-300/40 outline-none focus:ring-2 transition ${accentCls}`}
        />
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label className="font-display text-[10px] tracking-[0.3em] text-silver-200">WHATSAPP *</label>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => onWhatsapp(e.target.value)}
          placeholder="(62) 9 0000-0000"
          className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-sm text-silver-50 placeholder:text-silver-300/40 outline-none focus:ring-2 transition ${accentCls}`}
        />
      </div>

      {/* Comprovante */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[10px] tracking-[0.3em] text-silver-200">
          COMPROVANTE DE PAGAMENTO
        </label>
        <label
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-center transition cursor-pointer hover:border-white/30"
          style={{ borderColor: file ? `${accent}60` : undefined }}
        >
          <input type="file" accept="image/*,application/pdf" onChange={onFile} className="sr-only" />
          {fileB64 && file?.type.startsWith('image/') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fileB64} alt="Comprovante" className="max-h-32 rounded-lg object-contain" />
          ) : (
            <>
              <UploadIcon className="h-8 w-8 text-silver-300/50" />
              <span className="text-xs text-silver-300">
                {file ? file.name : 'Clique para anexar comprovante (opcional)'}
              </span>
            </>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={sending || !nome.trim() || !whatsapp.trim()}
        className={`w-full rounded-2xl bg-gradient-to-r ${btnGradient} px-6 py-3.5 font-display text-[11px] font-bold tracking-[0.32em] text-bg shadow-lg transition disabled:opacity-50 hover:opacity-90`}
      >
        {sending ? 'CONFIRMANDO…' : 'CONFIRMAR PAGAMENTO →'}
      </button>
    </form>
  );
}

/* ─── Step 3: Success ─── */
function Step3({ nome, accent }: { nome: string; accent: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
      >
        <CheckIcon style={{ color: accent }} className="h-8 w-8" />
      </div>
      <div>
        <p className="font-display text-xl font-bold silver-gradient">
          Pagamento enviado, {nome.split(' ')[0]}!
        </p>
        <p className="mt-2 text-sm text-silver-200">
          Redirecionando para o WhatsApp para finalizar o acesso…
        </p>
        <p className="mt-1 text-xs text-silver-300/60">
          Ativação em até 2 horas úteis após confirmação.
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: accent, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Step dots ─── */
function StepDots({ step, accent }: { step: Step; accent: string }) {
  return (
    <div className="flex items-center gap-2">
      {([1, 2, 3] as Step[]).map((s) => (
        <span
          key={s}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: step === s ? '24px' : '6px',
            background: step >= s ? accent : 'rgba(255,255,255,0.15)',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Icons ─── */
function CloseIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} style={style}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CopyIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}
function UploadIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
