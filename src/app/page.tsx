import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroPrototype } from "@/components/sections/HeroPrototype";
import { AboutSection } from "@/components/sections/AboutSection";
import { SeasonImpactSection } from "@/components/sections/SeasonImpactSection";
import { GuestsSection } from "@/components/sections/GuestsSection";
import { EpisodesSection } from "@/components/sections/EpisodesSection";
import { HostSection } from "@/components/sections/HostSection";
import { ProMediaSection } from "@/components/sections/ProMediaSection";
import { SponsorshipSection } from "@/components/sections/SponsorshipSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroPrototype />
        <AboutSection />
        <SeasonImpactSection />
        <GuestsSection />
        <EpisodesSection />
        <HostSection />
        <ProMediaSection />
        <SponsorshipSection />
      </main>
      <SiteFooter />
    </>
  );
}
