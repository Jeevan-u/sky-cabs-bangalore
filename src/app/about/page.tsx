import React, { FC } from "react";
import { Metadata } from "next";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionFleetOverview from "@/components/SectionFleetOverview";

export const metadata: Metadata = {
  title: "About Us - 24x7 Cab & Bus Travel Service in Bengaluru",
  description:
    "Learn about Sky Cabs Bangalore, founded and managed by Sky Cabs Bangalore. a wide range of vehicles across Begur, Electronic City, Koramangala, Whitefield & Jayanagar.",
  alternates: {
    canonical: "https://skycabsbangalore.com/about",
  },
};

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-24 space-y-16 lg:space-y-24">
        <SectionHero
          rightImg="/images/sky-cabs-banner.jpg"
          heading="About Sky Cabs Bangalore"
          btnText=""
          subHeading="Founded with central hubs in Begur (Bengaluru) and Jayanagar (Yelahanka), Sky Cabs Bangalore is committed to passenger safety, punctuality, and fair transparent pricing. Led by Sky Cabs Bangalore, we provide Prime Sedan (4+1) to 52-seater luxury coaches across South India."
        />

        <SectionStatistic />

        <SectionFleetOverview />

        <SectionFounder />

        <div className="relative py-12">
          <BackgroundSection />
          <SectionClientSay />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
