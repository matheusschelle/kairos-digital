'use client';

import { KairosMark } from './HeroScroll';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bg/80 px-6 py-14 backdrop-blur md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <KairosMark className="h-9 w-9" />
              <span className="font-display text-sm tracking-[0.42em] text-silver-50">
                KAIROS<span className="ml-2 text-neon-pink">DIGITAL</span>
              </span>
            </div>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-silver-300">
              Inteligência Artificial Estratégica. Agentes que vendem, atendem e
              escalam — com tecnologia Anthropic e a precisão do Claude Opus 4.7.
            </p>
            <p className="mt-5 text-[10px] tracking-[0.32em] text-silver-300">
              GOIÂNIA, BRASIL — OPERAÇÃO GLOBAL
            </p>
          </div>

          <FooterCol
            title="Solução"
            links={[
              ['Vendedores Virtuais', '#solucao'],
              ['Tecnologia', '#tecnologia'],
              ['Resultados', '#resultados'],
              ['Cronograma', '#contato'],
            ]}
          />
          <FooterCol
            title="Empresa"
            links={[
              ['Manifesto', '#problema'],
              ['Equipe', '/team.html'],
              ['Script de prospecção', '/script.html'],
            ]}
          />
          <FooterCol
            title="Contato"
            links={[
              ['WhatsApp', 'https://wa.me/5562981554992'],
              ['Instagram', 'https://www.instagram.com/_kairosdigital_/'],
              ['upmatheusschelle@gmail.com', 'mailto:upmatheusschelle@gmail.com'],
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-[10px] tracking-[0.3em] text-silver-300 md:flex-row">
          <span>© {new Date().getFullYear()} KAIROS DIGITAL — TODOS OS DIREITOS RESERVADOS</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan" />
            POWERED BY ANTHROPIC • CLAUDE OPUS 4.7
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-[10px] tracking-[0.42em] text-silver-100">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-silver-200">
        {links.map(([label, href]) => (
          <li key={label}>
            <a className="transition hover:text-white" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
