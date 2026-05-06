'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth-scroll + GSAP ScrollTrigger sync.
 *
 * Performance notes
 * ─────────────────
 * • On touch / coarse-pointer devices Lenis is skipped entirely.
 *   Native iOS/Android scroll is already smooth and well-tuned; intercepting
 *   it with Lenis adds latency and a perpetual 60 fps RAF loop for no gain.
 * • On mobile the HeroScroll animation is static (no ScrollTrigger instance),
 *   so ScrollTrigger.update() is never needed anyway.
 * • On desktop the Lenis RAF is the only perpetual loop — cursor and
 *   AmbientBackdrop now idle when the pointer is stationary.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip on touch devices — native scroll is superior there.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
