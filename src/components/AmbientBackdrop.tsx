'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle parallax aurora that drifts behind sections.
 *
 * Performance notes
 * ─────────────────
 * • RAF loop only starts when the pointer moves and stops automatically once
 *   the aurora has settled (delta < 0.05 px) — no perpetual 60 fps drain.
 * • On touch / coarse-pointer devices there is no mouse to track, so the RAF
 *   loop is never started at all.
 * • CSS animations on the .aurora blobs are GPU-composited (transform/opacity
 *   via `animation: drift`), independent of this JS loop.
 */
export default function AmbientBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Touch devices have no mouse — skip the parallax loop entirely.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let settled = true;

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 30;
      target.y = (e.clientY / window.innerHeight - 0.5) * 20;
      // Restart loop only if it has gone idle.
      if (settled) {
        settled = false;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      // Stop when sufficiently settled — saves GPU work when cursor is idle.
      if (
        Math.abs(target.x - current.x) < 0.05 &&
        Math.abs(target.y - current.y) < 0.05
      ) {
        settled = true;
        return; // intentionally skip next rAF scheduling
      }
      raf = requestAnimationFrame(tick);
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 will-change-transform"
    >
      <div className="aurora left-[-10%] top-[10%] h-[55vh] w-[55vh] bg-neon-violet/40" />
      <div className="aurora right-[-15%] top-[40%] h-[70vh] w-[70vh] bg-neon-blue/30 [animation-delay:-6s]" />
      <div className="aurora bottom-[-20%] left-[20%] h-[60vh] w-[60vh] bg-neon-pink/30 [animation-delay:-3s]" />
      <div className="starfield" />
    </div>
  );
}
