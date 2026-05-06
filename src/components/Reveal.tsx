'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  /** @deprecated kept for API compat — CSS handles the Y translation */
  y?: number;
  className?: string;
  /** @deprecated always fires once */
  once?: boolean;
  /** @deprecated kept for API compat — CSS handles duration */
  duration?: number;
};

/**
 * Zero-dependency reveal wrapper.
 *
 * Uses native IntersectionObserver + the `.reveal` / `.reveal.in` CSS classes
 * defined in globals.css.  Replaces the previous framer-motion implementation
 * to eliminate the ~172 KB framer-motion chunk from the initial bundle.
 */
export default function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (delay) el.style.transitionDelay = `${delay}s`;
        el.classList.add('in');
        io.unobserve(el);
      },
      { rootMargin: '-60px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
