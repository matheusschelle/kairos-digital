'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 151;
/** Pixels of scroll allotted per frame. */
const SCROLL_PER_FRAME = 8;

type Tier = 'mobile' | 'tablet' | 'desktop';

function pickTier(width: number): Tier {
  if (width < 720) return 'mobile';
  if (width < 1280) return 'tablet';
  return 'desktop';
}

function frameUrl(tier: Tier, n: number) {
  return `/frames/${tier}/frame-${String(n).padStart(3, '0')}.webp`;
}

/**
 * Scroll-driven canvas frame animation — active on all devices.
 *
 * Mobile optimizations (pointer: coarse):
 *  • DPR capped at 1.5 instead of 2  → canvas ~44% fewer pixels
 *  • Eager batch of 10 frames         → faster first paint
 *  • Idle batches of 4 frames         → gentler on CPU
 *  • scrub: 1 (vs 0.5 desktop)        → smoother GSAP response
 *
 * Desktop optimizations:
 *  • DPR capped at 2
 *  • Eager batch of 20 frames
 *  • Idle batches of 8 frames
 *  • scrub: 0.5
 *
 * The scroll-extension height is the same on all devices so the animation
 * always plays through all 151 frames regardless of screen size.
 */
export default function HeroScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const tierRef = useRef<Tier>('desktop');
  const [loadedPct, setLoadedPct] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const section = sectionRef.current;
    if (!canvas || !sticky || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /** true on phones / tablets (touch screen) */
    const mobile = !window.matchMedia('(pointer: fine)').matches;

    // Device-specific knobs
    const DPR_CAP   = mobile ? 1.5 : 2;
    const EAGER     = mobile ? 10  : 20;
    const BATCH     = mobile ? 4   : 8;
    const SCRUB     = mobile ? 1   : 0.5;

    tierRef.current = pickTier(window.innerWidth);

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = sticky.clientWidth;
      const h = sticky.clientHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    /** object-fit: contain — never crops the frame */
    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const drawW = img.naturalWidth  * scale;
      const drawH = img.naturalHeight * scale;
      const x = (cw - drawW) / 2;
      const y = (ch - drawH) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, drawW, drawH);
    };

    setCanvasSize();

    let loadedCount = 0;
    let cancelled = false;

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        if (framesRef.current[i]) return resolve();
        const img = new Image();
        img.decoding = 'async';
        img.src = frameUrl(tierRef.current, i + 1);
        img.onload = () => {
          framesRef.current[i] = img;
          loadedCount++;
          setLoadedPct(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (i === currentFrameRef.current) drawFrame(i);
          resolve();
        };
        img.onerror = () => { loadedCount++; resolve(); };
      });

    const loadAll = async () => {
      // Eager: first N frames in parallel — controls how soon the canvas shows
      const eager: Promise<void>[] = [];
      for (let i = 0; i < EAGER; i++) eager.push(loadFrame(i));
      await Promise.all(eager);
      if (cancelled) return;
      drawFrame(0);
      setReady(true);

      // Idle: remaining frames in small batches — won't block the main thread
      const remaining = Array.from({ length: TOTAL_FRAMES - EAGER }, (_, idx) => idx + EAGER);
      const idle = (cb: () => void) =>
        'requestIdleCallback' in window
          ? (window as any).requestIdleCallback(cb, { timeout: 2000 })
          : setTimeout(cb, 100);
      const next = () => {
        if (cancelled) return;
        const batch = remaining.splice(0, BATCH);
        if (batch.length === 0) return;
        Promise.all(batch.map(loadFrame)).then(() => idle(next));
      };
      idle(next);
    };
    loadAll();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * SCROLL_PER_FRAME}`,
      scrub: SCRUB,
      onUpdate: (self) => {
        const idx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(self.progress * (TOTAL_FRAMES - 1))),
        );
        if (idx !== currentFrameRef.current) {
          currentFrameRef.current = idx;
          drawFrame(idx);
        }
      },
    });

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const newTier = pickTier(window.innerWidth);
        if (newTier !== tierRef.current) {
          tierRef.current = newTier;
          framesRef.current = Array(TOTAL_FRAMES).fill(null);
          loadAll();
        }
        setCanvasSize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      trigger.kill();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const containerHeight = `calc(100vh + ${TOTAL_FRAMES * SCROLL_PER_FRAME}px)`;

  return (
    <div
      ref={sectionRef}
      data-hero-scroll
      className="relative w-full"
      style={{ height: containerHeight }}
      aria-label="KAIROS Digital cinematic intro"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />

        {/* Cinematic vignette + scrim */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,6,12,0.8)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-bg/95 via-bg/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
          <div className="absolute inset-0 bg-bg/30 lg:bg-bg/15" />
        </div>

        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg">
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-neon-cyan border-r-neon-violet" />
                <div className="absolute inset-2 animate-spin rounded-full border border-transparent border-b-neon-pink [animation-direction:reverse] [animation-duration:1.6s]" />
                <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-white shadow-[0_0_20px_rgba(124,242,255,0.9)]" />
              </div>
              <div className="font-display text-[10px] tracking-[0.5em] text-silver-200">
                INICIANDO • {loadedPct}%
              </div>
            </div>
          </div>
        )}

        <HeroOverlay />
      </div>
    </div>
  );
}

function HeroOverlay() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const y = window.scrollY;
      const h = window.innerHeight;
      const opacity = Math.max(0, 1 - y / (h * 0.85));
      const translate = Math.min(60, y * 0.18);
      wrap.style.opacity = String(opacity);
      wrap.style.transform = `translateY(-${translate}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative z-10 flex h-full flex-col items-center justify-between px-6 pb-12 pt-8 will-change-transform sm:pb-16 md:px-12"
    >
      <header className="flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <KairosMark className="h-9 w-9" />
          <span className="font-display text-[11px] font-semibold tracking-[0.42em] text-silver-100">
            KAIROS<span className="ml-2 text-neon-pink">DIGITAL</span>
          </span>
        </div>
        <nav className="hidden items-center gap-7 text-[11px] tracking-[0.32em] text-silver-200 lg:flex">
          <a href="#problema" className="transition hover:text-white">PROBLEMA</a>
          <a href="#solucao" className="transition hover:text-white">SOLUÇÃO</a>
          <a href="#ofertas" className="transition hover:text-white">OFERTAS</a>
          <a href="#equipe" className="transition hover:text-white">EQUIPE</a>
          <a
            href="https://wa.me/5562981554992?text=Ol%C3%A1%20KAIROS%21"
            target="_blank"
            rel="noreferrer"
            className="btn-neon !px-5 !py-2 !text-[10px]"
            data-cursor-hover
          >
            FALE COM A KAIROS
          </a>
        </nav>
        <a
          href="https://wa.me/5562981554992?text=Ol%C3%A1%20KAIROS%21"
          target="_blank"
          rel="noreferrer"
          className="btn-neon !px-4 !py-2 !text-[10px] lg:hidden"
          data-cursor-hover
        >
          KAIROS
        </a>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan shadow-[0_0_12px_rgba(124,242,255,0.9)]" />
          <span className="font-display text-[10px] tracking-[0.42em] text-silver-100">
            INTELIGÊNCIA ARTIFICIAL ESTRATÉGICA
          </span>
        </div>

        <h1 className="mt-8 font-display text-[clamp(2.4rem,7vw,5.6rem)] font-black leading-[0.95] tracking-tight">
          <span className="silver-gradient block">O FUTURO</span>
          <span className="block">
            <span className="silver-gradient">NÃO </span>
            <span className="neon-gradient">ESPERA.</span>
          </span>
        </h1>

        <p className="mt-7 max-w-2xl font-sans text-base leading-relaxed text-silver-100/85 sm:text-lg">
          Construímos agentes de IA que vendem, atendem e escalam
          <span className="text-white"> 24 horas por dia</span> — com a precisão da
          <span className="text-neon-cyan"> Anthropic</span> e a velocidade do
          <span className="text-neon-pink"> Claude Code</span>.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5562981554992?text=Ol%C3%A1%20KAIROS%21%20Quero%20conversar%20com%20a%20intelig%C3%AAncia%20de%20voc%C3%AAs."
            target="_blank"
            rel="noreferrer"
            className="btn-neon btn-neon-solid"
            data-cursor-hover
          >
            Fale com a KAIROS
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href="#ofertas" className="btn-neon" data-cursor-hover>
            Conhecer a Solução
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="font-display text-[9px] tracking-[0.5em] text-silver-200/70">
          ROLE PARA DESPERTAR
        </span>
        <div className="relative h-10 w-[1px] overflow-hidden bg-white/10">
          <div className="absolute inset-x-0 top-0 h-3 animate-[scrollCue_2.2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </div>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KairosMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <defs>
        <linearGradient id="kairos-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7cf2ff" />
          <stop offset="50%" stopColor="#9b6bff" />
          <stop offset="100%" stopColor="#ff5cd1" />
        </linearGradient>
        <filter id="kairos-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="url(#kairos-grad)" strokeWidth="2" fill="none" strokeLinejoin="round" filter="url(#kairos-glow)">
        <path d="M14 8h32v6L34 30l12 16v6H14v-6l12-16L14 14z" />
        <path d="M22 12h16M22 48h16" strokeOpacity="0.6" />
        <path d="M30 26v8" strokeOpacity="0.7" />
      </g>
    </svg>
  );
}
