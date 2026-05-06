import dynamic from 'next/dynamic';
import HeroScroll from '@/components/HeroScroll';
import AmbientBackdrop from '@/components/AmbientBackdrop';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';

/**
 * Sections from SalesAgent onwards are below the fold on all viewports.
 * Loading them with next/dynamic splits them into separate JS chunks that
 * are only evaluated after the above-fold content is interactive.
 *
 * All sections are SSR-rendered (ssr: true default) so they appear in the
 * initial HTML for SEO — only the JS bundle is deferred.
 */
const SalesAgentSection = dynamic(() => import('@/components/sections/SalesAgentSection'));
const TechSection = dynamic(() => import('@/components/sections/TechSection'));
const ResultsSection = dynamic(() => import('@/components/sections/ResultsSection'));
const IntegrationSection = dynamic(() => import('@/components/sections/IntegrationSection'));
const TimelineSection = dynamic(() => import('@/components/sections/TimelineSection'));
const OffersSection = dynamic(() => import('@/components/sections/OffersSection'));
const FoundersSection = dynamic(() => import('@/components/sections/FoundersSection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Page() {
  return (
    <main className="relative">
      <HeroScroll />

      <div className="relative">
        <AmbientBackdrop />
        <div className="relative z-10">
          <ProblemSection />
          <SolutionSection />
          <SalesAgentSection />
          <TechSection />
          <ResultsSection />
          <IntegrationSection />
          <TimelineSection />
          <OffersSection />
          <FoundersSection />
          <CTASection />
        </div>
      </div>

      <Footer />
    </main>
  );
}
