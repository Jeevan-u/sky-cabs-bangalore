import React from "react";
import { Metadata } from "next";
import { PageGradientASCII, SectionTransitionWave } from "@/components/ClientVisualEffects";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://skycabsbangalore.com",
  },
};
import SectionHero from "@/app/(server-components)/SectionHero";
import AnimatedHeroGallery from "@/components/AnimatedHeroGallery";
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
import SectionMysuruPackage from "@/components/SectionMysuruPackage";
import SectionStatePackages from "@/components/SectionStatePackages";
import SectionFleetOverview from "@/components/SectionFleetOverview";
import SectionWhyChooseUs from "@/components/SectionWhyChooseUs";
import SectionLegacy from "@/components/SectionLegacy";
import SectionFaq from "@/components/SectionFaq";
import SectionFestivalOffers from "@/components/SectionFestivalOffers";
import SectionCorporateMobility from "@/components/SectionCorporateMobility";
import SectionCompaniesServed from "@/components/SectionCompaniesServed";
import HomepageFaqSchema from "@/components/HomepageFaqSchema";
import { AnimatedRouteBeam, ScrollReveal, ScrollVelocity } from "@/components/reactbits";

const POPULAR_HUBS: TaxonomyType[] = [
  {
    id: "1",
    href: "/cabs-in-begur" as any,
    name: "Begur (Bengaluru East)",
    taxonomy: "category",
    count: 240,
    thumbnail: "/images/hubs/begur-hub.jpg",
  },
  {
    id: "2",
    href: "/kempegowda-airport-taxi" as any,
    name: "Kempegowda International Airport (BLR)",
    taxonomy: "category",
    count: 512,
    thumbnail: "/images/hubs/kempegowda-airport.jpg",
  },
  {
    id: "3",
    href: "/cabs-in-electronic-city" as any,
    name: "Electronic City (Nexus Mall)",
    taxonomy: "category",
    count: 180,
    thumbnail: "/images/hubs/koramangala-hub.jpg",
  },
  {
    id: "4",
    href: "/cabs-in-whitefield" as any,
    name: "Whitefield (IT Corridor)",
    taxonomy: "category",
    count: 320,
    thumbnail: "/images/hubs/electronic-city.jpg",
  },
  {
    id: "5",
    href: "/cabs-in-koramangala" as any,
    name: "Koramangala (80 Feet Road)",
    taxonomy: "category",
    count: 155,
    thumbnail: "/images/hubs/whitefield-hub.jpg",
  },
  {
    id: "6",
    href: "/cabs-in-hsr-layout" as any,
    name: "HSR Layout (Sector 2)",
    taxonomy: "category",
    count: 140,
    thumbnail: "/images/hubs/hsr-layout-hub.jpg",
  },
  {
    id: "7",
    href: "/cabs-in-indiranagar" as any,
    name: "Indiranagar (12th Main)",
    taxonomy: "category",
    count: 360,
    thumbnail: "/images/hubs/jayanagar-hub.jpg",
  },
  {
    id: "8",
    href: "/cabs-in-jayanagar" as any,
    name: "Jayanagar (4th Block)",
    taxonomy: "category",
    count: 210,
    thumbnail: "/images/images1.jpg",
  },
  {
    id: "9",
    href: "/cabs-in-yelahanka" as any,
    name: "Yelahanka (Airport Road)",
    taxonomy: "category",
    count: 175,
    thumbnail: "/images/images2.jpg",
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
        <SectionHero className="pt-6 sm:pt-8 lg:pt-14" />

        {/* 1.1 INTERACTIVE HERO QUICK BOOKING WIDGET */}
        <div className="relative -mt-6 sm:-mt-10 lg:-mt-16 z-20">
          <HeroQuickBookingWidget />
        </div>

        {/* 1.2 MOBILE FLEET 3D SHOWCASE (Directly below booking widget on mobile) */}
        <div className="block lg:hidden pt-2 pb-4">
          <AnimatedHeroGallery />
        </div>

        {/* 1.2 ENTERPRISE TRUST & COMPLIANCE BADGES */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <SectionTrustBadges />
        </ScrollReveal>

        {/* 2. STATS COUNTER */}
        <ScrollReveal animation="zoom-in" delay={0.15}>
          <SectionStatsCounter />
        </ScrollReveal>

        {/* 2.1 FESTIVAL SPECIALS & PROMOTIONAL OFFERS */}
        <ScrollReveal animation="fade-up">
          <SectionFestivalOffers />
        </ScrollReveal>

        {/* 3. OPERATIONAL HUBS */}
        <ScrollReveal animation="fade-up">
          <SectionSliderNewCategories
            categories={POPULAR_HUBS}
            heading="Popular Bengaluru Hubs & Kempegowda Airport Routes"
            subHeading="24x7 doorstep pickups across Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar, Yelahanka and Kempegowda International Airport (BLR). Vehicles subject to availability."
            sliderStyle="style2"
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
              "BENGALURU TO MYSURU · 24X7 KEMPEGOWDA AIRPORT TAXI · TRANSPARENT FARES ·",
              "BEGUR · ELECTRONIC CITY · KORAMANGALA · WHITEFIELD · KEMPEGOWDA BLR ·",
            ]}
            velocity={1.6}
            className="text-amber-600 dark:text-amber-400 font-black tracking-wider text-sm sm:text-lg md:text-xl uppercase"
          />
        </div>

        {/* FLUID ANIMATED TRANSITION WAVE */}
        <SectionTransitionWave lineColor="rgba(245, 158, 11, 0.4)" waveAmpX={28} waveAmpY={14} waveSpeedX={0.012} className="opacity-35 dark:opacity-20" />

        {/* 5. DEDICATED MYSURU TOUR PACKAGE */}
        <ScrollReveal animation="slide-left">
          <SectionMysuruPackage />
        </ScrollReveal>

        {/* 6. KARNATAKA & SOUTH INDIA GETAWAY PACKAGES */}
        <ScrollReveal animation="fade-up">
          <SectionStatePackages />
        </ScrollReveal>

        {/* 7. COMPLETE 4+1 TO 52-SEATER FLEET OVERVIEW */}
        <ScrollReveal animation="zoom-in">
          <SectionFleetOverview />
        </ScrollReveal>

        {/* REACT BITS ON-SCROLL DYNAMIC VELOCITY TICKER 2 */}
        <div className="py-6 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
          <ScrollVelocity
            texts={[
              "PRIME SEDAN · MARUTI SUZUKI ERTIGA · TOYOTA INNOVA CRYSTA · FORCE URBANIA · PASSENGER BUS ·",
              "VERIFIED CHAUFFEURS · SUBJECT TO AVAILABILITY · CONFIRM BEFORE BOOKING ·",
            ]}
            velocity={-1.6}
            className="text-neutral-700 dark:text-neutral-300 font-extrabold tracking-wider text-sm sm:text-lg uppercase"
          />
        </div>

        {/* 8. WHY CHOOSE SKY CABS BANGALORE */}
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

        {/* 10.1 CORPORATE & SPECIALIZED EMPLOYEE MOBILITY */}
        <ScrollReveal animation="fade-up">
          <SectionCorporateMobility />
        </ScrollReveal>

        {/* FLUID ANIMATED TRANSITION WAVE */}
        <SectionTransitionWave lineColor="rgba(14, 165, 233, 0.4)" waveAmpX={24} waveAmpY={12} waveSpeedX={0.01} className="opacity-30 dark:opacity-15" />

        {/* 11. SKY CABS BANGALORE STORY & SERVICE LEGACY */}
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

        {/* 12.1 COMPANIES WE'VE SERVED TRUST MARQUEE (Directly above testimonials) */}
        <ScrollReveal animation="fade-up">
          <SectionCompaniesServed />
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
