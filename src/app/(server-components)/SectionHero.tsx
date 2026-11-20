"use client";

import React, { FC } from "react";
import imagePng from "@/images/hero-right.png";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Route } from "@/routers/types";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import {
  SparklesIcon,
  WhatsAppIcon,
  AirplaneIcon,
  TempleIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  TruckIcon,
} from "@/components/icons";
import {
  WarpText,
  RotatingText,
  ShinyText,
  MagneticButton,
  SpotlightCard,
  StarBorder,
  TiltedCard,
  Squares,
  Meteors,
  Float,
  ShimmerButton,
  GradientText,
} from "@/components/reactbits";
import Link from "next/link";
import AnimatedHeroGallery from "@/components/AnimatedHeroGallery";

export interface SectionHeroProps {
  className?: string;
}

const HERO_SPECIALTIES = [
  "Shamshabad Airport Taxi (Fixed Non-Surge Rates)",
  "Srisailam Mallikarjuna & Tirupati Tour Packages",
  "24x7 Cabs in Kukatpally, KPHB & Hitec City",
  "12 to 50 Seater Luxury Tempo Travellers & Buses",
];

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      {/* Background Interactive Squares Grid & Meteors */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-20 rounded-3xl">
        <Squares
          direction="diagonal"
          speed={0.35}
          squareSize={44}
          borderColor="rgba(245, 158, 11, 0.08)"
          hoverFillColor="rgba(245, 158, 11, 0.22)"
          className="w-full h-full"
        />
        <Meteors number={12} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center py-6 sm:py-10 lg:py-14">
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start space-y-6 sm:space-y-8">
          
          {/* React Bits StarBorder & ShinyText Badge */}
          <StarBorder
            as="div"
            color="#f59e0b"
            speed="3.5s"
            className="shadow-sm"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <ShinyText text="24x7 Cab & Bus Travel Services" speed={2.5} />
            </div>
          </StarBorder>

          <h1 className="w-full text-neutral-900 dark:text-neutral-100">
            {/* Screen reader / SEO primary brand text */}
            <span className="sr-only">Sri Sadhguru Tours & Travels</span>

            {/* React Bits WarpText with interactive WebGL liquid refraction */}
            <div className="w-full max-w-xl h-[135px] sm:h-[160px] md:h-[185px] lg:h-[200px] relative">
              <WarpText
                text={"Sri Sadhguru\nTours & Travels"}
                align="left"
                fontSize="clamp(2.4rem, 4.8vw, 3.8rem)"
                fontWeight={800}
                lineHeight={1.05}
                letterSpacing="-0.03em"
                warpStrength={0.08}
                warpScale={1.7}
                speed={0.55}
                lens="bulge"
                pointerInfluence={0.42}
                pointerStrength={0.38}
                refraction={0.018}
                chromatic={0.35}
                idleDrift={0.2}
                ripple
                clickRipple
                intro
                className="text-neutral-900 dark:text-neutral-100"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* React Bits RotatingText for dynamic service highlights */}
            <div className="mt-3 sm:mt-4 min-h-[36px] sm:min-h-[42px]">
              <RotatingText
                texts={HERO_SPECIALTIES}
                interval={3000}
                className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-amber-600 dark:text-amber-400"
              />
            </div>
          </h1>

          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
            Travel Safe... Travel Happy... Your Journey, Our Responsibility.
            5-Seater to 50-Seater Vehicles Available 24x7 across Kukatpally,
            KPHB, Miyapur, Hitec City, Shamshabad Airport & Gandhari.
          </p>

          {/* CTAs with ShimmerButton & MagneticButton */}
          <div className="flex flex-wrap gap-3.5 items-center pt-2">
            <Link href="/listing-car">
              <ShimmerButton
                background="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                className="px-6 py-3.5 sm:px-8 text-sm sm:text-base font-bold shadow-lg"
              >
                <span>Explore Fleet & Rates</span>
                <span className="text-xs">→</span>
              </ShimmerButton>
            </Link>

            <MagneticButton pullFactor={0.25}>
              <a
                href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20book%20a%20cab/bus`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md hover:shadow-emerald-500/30 transition"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Booking</span>
              </a>
            </MagneticButton>
          </div>

          {/* Quick Service Highlights with SpotlightCard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 w-full max-w-xl">
            <SpotlightCard className="p-3 !rounded-2xl" spotlightColor="rgba(56, 189, 248, 0.2)">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <AirplaneIcon className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>Airport Transfers</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-3 !rounded-2xl" spotlightColor="rgba(245, 158, 11, 0.2)">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <TempleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Pilgrimage Tours</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-3 !rounded-2xl" spotlightColor="rgba(16, 185, 129, 0.2)">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <UserGroupIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Family & Group</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-3 !rounded-2xl" spotlightColor="rgba(99, 102, 241, 0.2)">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <BuildingOffice2Icon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>Corporate Travel</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-3 !rounded-2xl" spotlightColor="rgba(244, 63, 94, 0.2)">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <SparklesIcon className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Wedding Transport</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-3 !rounded-2xl" spotlightColor="rgba(245, 158, 11, 0.2)">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <TruckIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>5 to 50 Seaters</span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Right Column: Floating Interactive Gallery */}
        <div className="lg:col-span-6 xl:col-span-6 w-full">
          <AnimatedHeroGallery />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
