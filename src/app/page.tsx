import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroPrototype } from "@/components/sections/HeroPrototype";
import { AboutSection } from "@/components/sections/AboutSection";
import { HostSection } from "@/components/sections/HostSection";
import { EpisodeMomentsSection } from "@/components/sections/EpisodeMomentsSection";
import { GuestsSection } from "@/components/sections/GuestsSection";
import { EpisodesSection } from "@/components/sections/EpisodesSection";
import { SeasonImpactSection } from "@/components/sections/SeasonImpactSection";
import { ProMediaSection } from "@/components/sections/ProMediaSection";
import { SponsorshipSection } from "@/components/sections/SponsorshipSection";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroPrototype />
        <AboutSection />
        <HostSection />
        <EpisodeMomentsSection />
        <GuestsSection />
        <EpisodesSection />
        <SeasonImpactSection />
        <ProMediaSection />
        <SponsorshipSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
