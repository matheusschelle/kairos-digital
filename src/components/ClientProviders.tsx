'use client';

import dynamic from 'next/dynamic';

/**
 * Thin client-side shell that lazily loads pure-browser enhancements.
 * `ssr: false` is only allowed inside a Client Component, so we can't
 * put these dynamic() calls directly in the Server Component layout.tsx.
 *
 * None of these components produce meaningful server HTML — they are
 * interactive-only (canvas, RAF loops, Lenis).  Skipping SSR eliminates
 * dead HTML and defers their JS evaluation until after hydration.
 */
const CustomCursor    = dynamic(() => import('./CustomCursor'),    { ssr: false });
const SmoothScroll    = dynamic(() => import('./SmoothScroll'),    { ssr: false });
const MobileEnergyOrb = dynamic(() => import('./MobileEnergyOrb'), { ssr: false });
const StickyCTA       = dynamic(() => import('./StickyCTA'),       { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <MobileEnergyOrb />
      <StickyCTA />
    </>
  );
}
