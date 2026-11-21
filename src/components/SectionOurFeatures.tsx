"use client";

import React, { FC } from "react";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";
import { SpotlightCard, ShinyText, TiltedCard, Float } from "@/components/reactbits";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className={`w-full relative ${type === "type1" ? "lg:col-span-6" : "lg:col-span-6 lg:order-last"}`}>
        <Float duration={4.5} offset={8} className="absolute -top-3 -right-2 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-emerald-500/30 text-xs font-bold text-neutral-900 dark:text-white shadow-xl flex items-center gap-1.5">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
            <span>100% Commercial RTA Insured</span>
          </div>
        </Float>

        <TiltedCard
          captionText="Sky Cabs Bangalore Excellence"
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={8}
          scaleOnHover={1.03}
          showMobileWarning={false}
          showTooltip={false}
        >
          <div className="w-full relative">
            <Image src={rightImg} alt="Sky Cabs Bangalore Features" className="drop-shadow-2xl" />
          </div>
        </TiltedCard>
      </div>
      <div
        className={`w-full ${
          type === "type1" ? "lg:col-span-6" : "lg:col-span-6"
        }`}
      >
        <span className="uppercase text-sm text-primary-6000 dark:text-primary-400 font-bold tracking-widest">
          Key Benefits
        </span>
        <h2 className="font-bold text-3xl sm:text-4xl mt-3 text-neutral-900 dark:text-neutral-100">
          Why Travelers Trust <ShinyText text="Sky Cabs Bangalore" speed={3} className="text-primary-600 font-extrabold" />
        </h2>

        <div className="space-y-4 mt-8">
          <SpotlightCard className="p-5 !rounded-2xl hover:border-amber-400/40" spotlightColor="rgba(245, 158, 11, 0.2)">
            <Badge name="Passenger Safety" color="green" />
            <span className="block text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-2">
              Reliable Cabs Across Bengaluru
            </span>
            <span className="block text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium mt-1">
              Every vehicle undergoes strict mechanical inspections. Chauffeurs are verified, experienced in long-distance highway routes and temple ghat roads.
            </span>
          </SpotlightCard>

          <SpotlightCard className="p-5 !rounded-2xl hover:border-primary-500/40" spotlightColor="rgba(56, 189, 248, 0.2)">
            <Badge color="yellow" name="Guaranteed Best Rates" />
            <span className="block text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-2">
              100% Transparent Quotations
            </span>
            <span className="block text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium mt-1">
              Clear upfront per-km and round-trip package pricing with driver bata clearly specified. No hidden charges or unexpected surcharges.
            </span>
          </SpotlightCard>

          <SpotlightCard className="p-5 !rounded-2xl hover:border-emerald-500/40" spotlightColor="rgba(16, 185, 129, 0.2)">
            <Badge color="blue" name="24x7 Dispatch" />
            <span className="block text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-2">
              Punctual Doorstep Pickups
            </span>
            <span className="block text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-medium mt-1">
              Operating across Begur, Electronic City, Koramangala, Whitefield, Kempegowda International Airport (BLR) & Jayanagar. Guaranteed timely arrivals for flights and dawn departures.
            </span>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
