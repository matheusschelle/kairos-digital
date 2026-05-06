'use client';

import { useEffect, useRef } from 'react';

/**
 * AI Orb cursor — glowing core, outer halo, particle trail.
 * Renders nothing on touch devices (pointer: coarse).
 *
 * Performance notes
 * ─────────────────
 * • Canvas is only cleared + redrawn when the cursor is moving OR trail
 *   particles still have life > 0.01.  When the cursor is fully settled the
 *   loop keeps ticking (so it stays responsive) but does zero draw work.
 * • A single `ctx.clearRect` drains the canvas once all particles die.
 * • `createRadialGradient` objects are reused per-particle in the same frame
 *   rather than cached across frames (gradients reference live coordinates).
 */
export default function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const core = coreRef.current;
    const halo = haloRef.current;
    const canvas = trailCanvasRef.current;
    if (!core || !halo || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const core_pos = { x: target.x, y: target.y };
    const halo_pos = { x: target.x, y: target.y };
    const trail: { x: number; y: number; life: number }[] = [];
    let hovering = false;
    /** True once all particles die and the cursor is settled — lets us skip draw. */
    let needsClear = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onDown = () => core.classList.add('cursor-press');
    const onUp = () => core.classList.remove('cursor-press');

    const sel = 'a, button, [role="button"], input, textarea, [data-cursor-hover]';
    const onOver = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(sel)) {
        hovering = true;
        core.classList.add('cursor-hover');
      }
    };
    const onOut = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(sel)) {
        hovering = false;
        core.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);

    let raf = 0;
    const tick = () => {
      const dx = target.x - core_pos.x;
      const dy = target.y - core_pos.y;
      const moving = Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15;

      // Always lerp so the cursor feels live.
      core_pos.x += dx * 0.32;
      core_pos.y += dy * 0.32;
      halo_pos.x += (target.x - halo_pos.x) * 0.13;
      halo_pos.y += (target.y - halo_pos.y) * 0.13;

      core.style.transform = `translate3d(${core_pos.x}px, ${core_pos.y}px, 0) translate(-50%, -50%)`;
      halo.style.transform = `translate3d(${halo_pos.x}px, ${halo_pos.y}px, 0) translate(-50%, -50%)`;

      // Age existing particles every frame.
      for (const p of trail) p.life *= 0.92;

      // Only push new trail points while the cursor is moving.
      if (moving) {
        trail.push({ x: core_pos.x, y: core_pos.y, life: 1 });
        if (trail.length > 22) trail.shift();
      }

      const hasTrail = trail.some((p) => p.life > 0.01);

      if (hasTrail || moving) {
        // Active: draw the trail.
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i];
          if (p.life < 0.01) continue;
          const alpha = p.life * 0.5;
          const radius = 1.4 + (i / trail.length) * 4;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
          grad.addColorStop(0, `rgba(180, 200, 255, ${alpha})`);
          grad.addColorStop(0.45, `rgba(155, 107, 255, ${alpha * 0.6})`);
          grad.addColorStop(1, 'rgba(155, 107, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        needsClear = true;
      } else if (needsClear) {
        // One final clear when particles fully die — then stop drawing.
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        needsClear = false;
      }
      // Else: cursor is idle, skip all draw work.

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
    };
  }, []);

  return (
    <>
      <canvas
        ref={trailCanvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
        aria-hidden
      />
      <div
        ref={haloRef}
        className="cursor-halo pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        aria-hidden
      />
      <div
        ref={coreRef}
        className="cursor-core pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        aria-hidden
      />
      <style jsx global>{`
        .cursor-core {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 35% 30%,
            #ffffff 0%,
            #cfd8ff 30%,
            #6e9bff 65%,
            #1f2a55 100%
          );
          box-shadow:
            0 0 12px rgba(124, 242, 255, 0.9),
            0 0 30px rgba(155, 107, 255, 0.7),
            0 0 60px rgba(255, 92, 209, 0.35);
          transition:
            width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
            height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
            background 0.4s ease;
        }
        .cursor-halo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(180, 200, 255, 0.35);
          background: radial-gradient(
            circle,
            rgba(155, 107, 255, 0.18) 0%,
            rgba(58, 166, 255, 0.08) 50%,
            transparent 70%
          );
          backdrop-filter: blur(2px);
          transition:
            width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.4s ease;
        }
        .cursor-core.cursor-hover { width: 16px; height: 16px; }
        .cursor-core.cursor-press { width: 6px; height: 6px; }
        .cursor-halo.cursor-hover,
        .cursor-core.cursor-hover ~ .cursor-halo {
          width: 64px;
          height: 64px;
          border-color: rgba(255, 92, 209, 0.6);
        }
      `}</style>
    </>
  );
}
