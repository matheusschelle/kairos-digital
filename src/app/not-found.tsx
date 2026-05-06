import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="aurora left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 bg-neon-violet/40" />
      <div className="relative z-10">
        <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
          ERROR — 404
        </span>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,7rem)] font-black leading-none silver-gradient">
          PERDIDO NO TEMPO
        </h1>
        <p className="mx-auto mt-6 max-w-md text-silver-200">
          Esta página atravessou a ampulheta. Voltemos ao agora.
        </p>
        <Link href="/" className="btn-neon btn-neon-solid mt-10 inline-flex">
          Retornar ao início
        </Link>
      </div>
    </main>
  );
}
