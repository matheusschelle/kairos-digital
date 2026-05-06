'use client';

import { useEffect, useRef } from 'react';

/**
 * Mobile-only neon energy orb.
 *
 * As the user scrolls, the orb traces a piecewise zigzag path through the
 * viewport — like AI energy travelling between sections.  Hidden on lg+.
 *
 * Performance notes
 * ─────────────────
 * • The rAF loop is started by a scroll event and automatically cancelled
 *   ~150 ms after the last scroll tick — no perpetual 60 fps drain.
 * • Path SVG is updated only when scroll progress changes by > 0.0005.
 * • An initial single rAF draws the orb at its starting position on mount.
 */
export default function MobileEnergyOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: fine)').matches) return;

    const orb = orbRef.current;
    const path = pathRef.current;
    if (!orb || !path) return;

    const SEG = 8;
    const xLeft = 8;
    const xRight = 92;

    const positionAt = (idx: number) => {
      const onRight = Math.floor(idx / 2) % 2 === 1;
      return { x: idx % 2 === 0 ? (onRight ? xRight : xLeft) : (onRight ? xLeft : xRight) };
    };

    let last = -1;
    let raf = 0;
    let scrollTimer = 0;
    let active = false;

    const draw = () => {
      const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / docH));

      const t = progress * SEG;
      const i = Math.min(SEG - 1, Math.floor(t));
      const lt = t - i;

      const a = positionAt(i);
      const b = positionAt(Math.min(SEG - 1, i + 1));
      const x = i % 2 === 0 ? a.x : a.x + (b.x - a.x) * lt;
      const y = progress * 100;

      orb.style.transform = `translate3d(${x}vw, ${y}vh, 0) translate(-50%, -50%)`;
      orb.style.opacity = progress > 0.005 && progress < 0.995 ? '1' : '0';

      if (Math.abs(progress - last) > 0.0005) {
        last = progress;
        const tailSteps = 14;
        const pts: Array<[number, number]> = [];
        for (let s = tailSteps; s >= 0; s--) {
          const tp = Math.max(0, progress - (s / tailSteps) * 0.04);
          const tt = tp * SEG;
          const ti = Math.min(SEG - 1, Math.floor(tt));
          const tlt = tt - ti;
          const ta = positionAt(ti);
          const tb = positionAt(Math.min(SEG - 1, ti + 1));
          const tx = ti % 2 === 0 ? ta.x : ta.x + (tb.x - ta.x) * tlt;
          pts.push([tx, tp * 100]);
        }
        path.setAttribute(
          'd',
          pts.map(([px, py], idx) => `${idx === 0 ? 'M' : 'L'}${px},${py}`).join(' '),
        );
      }
    };

    const tick = () => {
      draw();
      if (active) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      clearTimeout(scrollTimer);
      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
      // Stop the loop ~150 ms after scrolling ceases.
      scrollTimer = window.setTimeout(() => {
        active = false;
        cancelAnimationFrame(raf);
        draw(); // one final draw to settle position
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Draw initial position without waiting for a scroll event.
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[40] h-screen w-screen lg:hidden"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="orb-trail-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(124, 242, 255, 0)" />
            <stop offset="60%" stopColor="rgba(124, 242, 255, 0.55)" />
            <stop offset="100%" stopColor="rgba(155, 107, 255, 0.9)" />
          </linearGradient>
          <filter id="orb-trail-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d=""
          fill="none"
          stroke="url(#orb-trail-grad)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#orb-trail-glow)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[41] lg:hidden"
        style={{ transition: 'opacity 0.6s ease' }}
      >
        <div className="orb-core" />
        <style jsx>{`
          .orb-core {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: radial-gradient(
              circle at 35% 30%,
              #ffffff 0%,
              #cfd8ff 30%,
              #6e9bff 65%,
              #1f2a55 100%
            );
            box-shadow:
              0 0 14px rgba(124, 242, 255, 0.85),
              0 0 36px rgba(155, 107, 255, 0.6),
              0 0 70px rgba(255, 92, 209, 0.25);
            animation: orb-pulse 2.6s ease-in-out infinite;
          }
          @keyframes orb-pulse {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.18); filter: brightness(1.25); }
          }
        `}</style>
      </div>
    </>
  );
}
