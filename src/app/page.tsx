import React from "react";
import { Metadata } from "next";
import { PageGradientASCII, SectionTransitionWave } from "@/components/ClientVisualEffects";

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
      <PageGradientASCII />

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
        <ScrollReveal animation="fade-up" delay={0.1}>
          <SectionTrustBadges />
        </ScrollReveal>

        {/* 2. STATS COUNTER */}
        <ScrollReveal animation="zoom-in" delay={0.15}>
          <SectionStatsCounter />
        </ScrollReveal>

        {/* 3. OPERATIONAL HUBS */}
        <ScrollReveal animation="fade-up">
          <SectionSliderNewCategories
            categories={POPULAR_HUBS}
            heading="Popular Hubs & RGIA Airport Routes"
            subHeading="Prompt 24x7 doorstep pickups across Kukatpally, KPHB, Miyapur, Hitec City, Medchal & Shamshabad Airport"
          />
        </ScrollReveal>

        {/* 4. POPULAR OUTSTATION ROUTES FROM CLONE */}
        <ScrollReveal animation="fade-up">
          <SectionPopularRoutes />
        </ScrollReveal>

        {/* 4.1 LIVE INTERACTIVE OUTSTATION CORRIDOR RADAR BEAM */}
        <ScrollReveal animation="zoom-in">
          <AnimatedRouteBeam />
        </ScrollReveal>

        {/* REACT BITS ON-SCROLL DYNAMIC VELOCITY TICKER 1 */}
        <div className="py-6 overflow-hidden rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20">
          <ScrollVelocity
            texts={[
              "HYDERABAD TO SRISAILAM · 24X7 AIRPORT TAXI · FIXED NON-SURGE RATES ·",
              "KUKATPALLY · KPHB · MIYAPUR · HITEC CITY · SHAMSHABAD RGIA ·",
            ]}
            velocity={22}
            className="text-amber-600 dark:text-amber-400 font-black tracking-wider text-sm sm:text-lg md:text-xl uppercase"
          />
        </div>

        {/* FLUID ANIMATED TRANSITION WAVE */}
        <SectionTransitionWave lineColor="rgba(245, 158, 11, 0.4)" waveAmpX={28} waveAmpY={14} waveSpeedX={0.012} className="opacity-35 dark:opacity-20" />

        {/* 5. DEDICATED SRISAILAM TOUR PACKAGE */}
        <ScrollReveal animation="slide-left">
          <SectionSrisailamPackage />
        </ScrollReveal>

        {/* 6. SOUTH INDIA STATE PACKAGES (AP, KA, TN, KL) */}
        <ScrollReveal animation="fade-up">
          <SectionStatePackages />
        </ScrollReveal>

        {/* 7. COMPLETE 5 TO 50 SEATER FLEET OVERVIEW */}
        <ScrollReveal animation="zoom-in">
          <SectionFleetOverview />
        </ScrollReveal>

        {/* REACT BITS ON-SCROLL DYNAMIC VELOCITY TICKER 2 */}
        <div className="py-6 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
          <ScrollVelocity
            texts={[
              "SWIFT DZIRE · TOYOTA INNOVA CRYSTA · MARUTI ERTIGA · TEMPO TRAVELLER · LUXURY BUS ·",
              "VERIFIED CHAUFFEURS · 2,400+ SUCCESSFUL TOURS · 100% ON-TIME GUARANTEE ·",
            ]}
            velocity={-22}
            className="text-neutral-700 dark:text-neutral-300 font-extrabold tracking-wider text-sm sm:text-lg uppercase"
          />
        </div>

        {/* 8. WHY CHOOSE SRI SADHGURU TRAVELS */}
        <ScrollReveal animation="slide-right">
          <SectionWhyChooseUs />
        </ScrollReveal>

        {/* 9. HOW IT WORKS (3 SIMPLE STEPS) */}
        <ScrollReveal animation="fade-up">
          <SectionHowItWork />
        </ScrollReveal>

        {/* 10. OUR BENEFITS */}
        <ScrollReveal animation="fade-up">
          <SectionOurFeatures />
        </ScrollReveal>

        {/* FLUID ANIMATED TRANSITION WAVE */}
        <SectionTransitionWave lineColor="rgba(14, 165, 233, 0.4)" waveAmpX={24} waveAmpY={12} waveSpeedX={0.01} className="opacity-30 dark:opacity-15" />

        {/* 11. COMPANY LEGACY & PROPRIETOR RATHAN KANNA */}
        <ScrollReveal animation="slide-left">
          <SectionLegacy />
        </ScrollReveal>

        {/* 12. CALLOUT BANNER FOR WEDDINGS & CORPORATE */}
        <ScrollReveal animation="zoom-in">
          <div className="relative py-14">
            <BackgroundSection className="bg-orange-50/60 dark:bg-black/20" />
            <SectionBecomeAnAuthor />
          </div>
        </ScrollReveal>

        {/* 13. FREQUENTLY ASKED QUESTIONS */}
        <ScrollReveal animation="fade-up">
          <SectionFaq />
        </ScrollReveal>

        {/* 14. CUSTOMER REVIEWS */}
        <ScrollReveal animation="fade-up">
          <div className="relative py-14">
            <BackgroundSection />
            <SectionClientSay />
          </div>
        </ScrollReveal>

        {/* 15. CONTACT & NEWSLETTER */}
        <ScrollReveal animation="fade-up">
          <SectionSubscribe2 />
        </ScrollReveal>
      </div>
    </main>
  );
}

export default PageHome;
