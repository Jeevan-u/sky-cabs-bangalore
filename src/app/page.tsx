import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const GradientASCII = dynamic(
  () => import("@/components/reactbits/GradientASCII"),
  { ssr: false }
);

const Waves = dynamic(
  () => import("@/components/reactbits/Waves"),
  { ssr: false }
);

export const metadata: Metadata = {
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com",
  },
};
import SectionHero from "@/app/(server-components)/SectionHero";
import HeroQuickBookingWidget from "@/components/HeroQuickBookingWidget";
import SectionTrustBadges from "@/components/SectionTrustBadges";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionClientSay from "@/components/SectionClientSay";
import SectionStatsCounter from "@/components/SectionStatsCounter";
import SectionPopularRoutes from "@/components/SectionPopularRoutes";
import SectionSrisailamPackage from "@/components/SectionSrisailamPackage";
import SectionStatePackages from "@/components/SectionStatePackages";
import SectionFleetOverview from "@/components/SectionFleetOverview";
import SectionWhyChooseUs from "@/components/SectionWhyChooseUs";
import SectionLegacy from "@/components/SectionLegacy";
import SectionFaq from "@/components/SectionFaq";
import HomepageFaqSchema from "@/components/HomepageFaqSchema";
import { AnimatedRouteBeam, ScrollReveal, ScrollVelocity } from "@/components/reactbits";

const POPULAR_HUBS: TaxonomyType[] = [
  {
    id: "1",
    href: "/cabs-in-kukatpally" as any,
    name: "Kukatpally (IDL Lake)",
    taxonomy: "category",
    count: 240,
    thumbnail: "/images/hubs/kukatpally-hq.jpg",
  },
  {
    id: "2",
    href: "/shamshabad-airport-taxi" as any,
    name: "Shamshabad Airport (RGIA)",
    taxonomy: "category",
    count: 512,
    thumbnail: "/images/hubs/shamshabad-airport.jpg",
  },
  {
    id: "3",
    href: "/cabs-in-kphb" as any,
    name: "KPHB Colony (Nexus Mall)",
    taxonomy: "category",
    count: 180,
    thumbnail: "/images/hubs/kphb-colony.jpg",
  },
  {
    id: "4",
    href: "/cabs-in-hitec-city" as any,
    name: "Hitec City (Cyber Towers)",
    taxonomy: "category",
    count: 320,
    thumbnail: "/images/hubs/hitec-city.jpg",
  },
  {
    id: "5",
    href: "/cabs-in-miyapur" as any,
    name: "Miyapur (Ameenpur Lake)",
    taxonomy: "category",
    count: 155,
    thumbnail: "/images/hubs/miyapur-hub.jpg",
  },
  {
    id: "6",
    href: "/cabs-in-medchal" as any,
    name: "Medchal (Oxygen Park)",
    taxonomy: "category",
    count: 140,
    thumbnail: "/images/hubs/medchal-kompally.jpg",
  },
  {
    id: "7",
    href: "/cabs-in-kamareddy-gandhari" as any,
    name: "Gandhari & Kamareddy Hub",
    taxonomy: "category",
    count: 360,
    thumbnail: "/images/hubs/kamareddy-gandhari.jpg",
  },
];

function PageHome() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      {/* HOMEPAGE AEO FAQ SCHEMA */}
      <HomepageFaqSchema />

      {/* REACT BITS GRADIENT ASCII BACKGROUND */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:h-[720px] lg:h-[820px] pointer-events-none -z-10 overflow-hidden opacity-25 dark:opacity-35">
        <GradientASCII
          shape="horizon"
          colors={["#f59e0b", "#d97706", "#0284c7", "#0f172a"]}
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.7}
          glyphOpacity={0.75}
          glow={0.3}
          speed={0.4}
          mouseInteraction={true}
        />
      </div>

      {/* GLASSMORPHISM BACKGROUND */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* 1. HERO SECTION */}
        <SectionHero className="pt-8 lg:pt-14" />

        {/* 1.1 INTERACTIVE HERO QUICK BOOKING WIDGET */}
        <div className="relative -mt-10 sm:-mt-16 z-20">
          <HeroQuickBookingWidget />
        </div>

        {/* 1.2 ENTERPRISE TRUST & COMPLIANCE BADGES */}
        <SectionTrustBadges />

        {/* 2. STATS COUNTER */}
        <SectionStatsCounter />

        {/* 3. OPERATIONAL HUBS */}
        <SectionSliderNewCategories
          categories={POPULAR_HUBS}
          heading="Popular Hubs & RGIA Airport Routes"
          subHeading="Prompt 24x7 doorstep pickups across Kukatpally, KPHB, Miyapur, Hitec City, Medchal & Shamshabad Airport"
        />

        {/* 4. POPULAR OUTSTATION ROUTES FROM CLONE */}
        <SectionPopularRoutes />

        {/* 4.1 LIVE INTERACTIVE OUTSTATION CORRIDOR RADAR BEAM */}
        <AnimatedRouteBeam />

        {/* FLUID ANIMATED TRANSITION WAVE */}
        <div className="w-full h-14 sm:h-20 overflow-hidden relative opacity-35 dark:opacity-20 pointer-events-none -my-8">
          <Waves lineColor="rgba(245, 158, 11, 0.4)" waveAmpX={28} waveAmpY={14} waveSpeedX={0.012} />
        </div>

        {/* 5. DEDICATED SRISAILAM TOUR PACKAGE */}
        <SectionSrisailamPackage />

        {/* 6. SOUTH INDIA STATE PACKAGES (AP, KA, TN, KL) */}
        <SectionStatePackages />

        {/* 7. COMPLETE 5 TO 50 SEATER FLEET OVERVIEW */}
        <SectionFleetOverview />

        {/* 8. WHY CHOOSE SRI SADHGURU TRAVELS */}
        <SectionWhyChooseUs />

        {/* 9. HOW IT WORKS (3 SIMPLE STEPS) */}
        <SectionHowItWork />

        {/* 10. OUR BENEFITS */}
        <SectionOurFeatures />

        {/* FLUID ANIMATED TRANSITION WAVE */}
        <div className="w-full h-14 sm:h-20 overflow-hidden relative opacity-30 dark:opacity-15 pointer-events-none -my-8">
          <Waves lineColor="rgba(14, 165, 233, 0.4)" waveAmpX={24} waveAmpY={12} waveSpeedX={0.01} />
        </div>

        {/* 11. COMPANY LEGACY & PROPRIETOR RATHAN KANNA */}
        <SectionLegacy />

        {/* 12. CALLOUT BANNER FOR WEDDINGS & CORPORATE */}
        <div className="relative py-14">
          <BackgroundSection className="bg-orange-50/60 dark:bg-black/20" />
          <SectionBecomeAnAuthor />
        </div>

        {/* 13. FREQUENTLY ASKED QUESTIONS */}
        <SectionFaq />

        {/* 14. CUSTOMER REVIEWS */}
        <div className="relative py-14">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        {/* 15. CONTACT & NEWSLETTER */}
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome;
