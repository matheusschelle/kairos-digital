'use client';

import Reveal from '../Reveal';
import WhatsAppCTA from '../WhatsAppCTA';

export default function CTASection() {
  return (
    <section id="contato" className="relative px-6 py-40 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="font-display text-[10px] tracking-[0.5em] text-neon-cyan">
            08 — O PRÓXIMO PASSO
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight">
            <span className="silver-gradient block">VAMOS</span>
            <span className="block">
              <span className="silver-gradient">REDEFINIR </span>
              <span className="neon-gradient">SEU FUTURO?</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-silver-200 sm:text-lg">
            O tempo é o seu ativo mais precioso. Não o desperdice procurando
            pessoas quando você pode <span className="text-white">construir inteligência</span>.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppCTA
              variant="solid"
              message="Olá KAIROS! Quero conversar com a inteligência por trás do agente — vamos redefinir o futuro do meu negócio."
            >
              Fale com a KAIROS
            </WhatsAppCTA>
            <a
              href="https://www.instagram.com/_kairosdigital_/"
              target="_blank"
              rel="noreferrer"
              className="btn-neon"
              data-cursor-hover
            >
              Conheça os bastidores
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 grid gap-3 text-[11px] tracking-[0.32em] text-silver-300 sm:grid-cols-3">
            <div className="glass rounded-2xl px-5 py-4">
              <div className="font-display text-neon-cyan">RESPOSTA EM 24H</div>
              <div className="mt-2 text-silver-200">Diagnóstico gratuito</div>
            </div>
            <div className="glass rounded-2xl px-5 py-4">
              <div className="font-display text-neon-violet">4 SEMANAS</div>
              <div className="mt-2 text-silver-200">Do briefing ao go-live</div>
            </div>
            <div className="glass rounded-2xl px-5 py-4">
              <div className="font-display text-neon-pink">SEM AMARRAS</div>
              <div className="mt-2 text-silver-200">Cancele quando quiser</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
