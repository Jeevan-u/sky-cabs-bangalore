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
  title: "About Us - 24x7 Cab & Bus Travel Service in Hyderabad",
  description:
    "Learn about Sri Sadhguru Tours & Travels, founded and managed by Sri Rathan Kanna. 50+ commercial vehicles across Kukatpally, KPHB, Miyapur, Hitec City & Gandhari.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/about",
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
          rightImg="/images/sri-sadhguru-travels-banner.jpg"
          heading="About Sri Sadhguru Tours & Travels"
          btnText=""
          subHeading="Founded with central hubs in Kukatpally (Hyderabad) and Gandhari (Kamareddy), Sri Sadhguru Tours & Travels is committed to passenger safety, punctuality, and fair transparent pricing. Led by proprietor Rathan Kanna, we provide 5-seater sedans to 50-seater luxury coaches across South India."
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
