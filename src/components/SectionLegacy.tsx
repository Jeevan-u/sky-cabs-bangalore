"use client";

import React, { FC } from "react";
import Image from "next/image";
import Badge from "@/shared/Badge";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { PhoneIcon, WhatsAppIcon, MapPinIcon, SparklesIcon } from "@/components/icons";
import {
  TiltedCard,
  ShinyText,
  MagneticButton,
  StarBorder,
  BorderBeam,
  Float,
  ShimmerButton,
} from "@/components/reactbits";

export interface SectionLegacyProps {
  className?: string;
}

const SectionLegacy: FC<SectionLegacyProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionLegacy relative ${className}`}>
      <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-8 sm:p-14 shadow-sm overflow-hidden relative">
        <BorderBeam size={300} duration={10} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Official Flyer Banner with React Bits TiltedCard 3D perspective */}
          <div className="lg:col-span-5 flex justify-center relative">
            <Float duration={4} offset={8} className="absolute -top-3 -left-2 z-20 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-neutral-900 dark:text-white shadow-xl flex items-center gap-1.5">
                <SparklesIcon className="w-4 h-4 text-amber-500" />
                <span>10+ Years Trust</span>
              </div>
            </Float>
            <TiltedCard maxAngle={10} scale={1.03} className="w-full max-w-sm">
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/40">
                <Image
                  src="/images/sky-cabs-banner.jpg"
                  alt="Sky Cabs Bangalore Official Flyer - "
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </TiltedCard>
          </div>

          {/* Right: Company Story & Proprietor Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <StarBorder as="div" color="#f59e0b" speed="4s" className="p-[1.5px]">
                <span className="text-xs font-bold text-amber-400 px-1">
                  
                </span>
              </StarBorder>
              <Badge name="Begur & Yelahanka" color="blue" />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
              <ShinyText text="Sky Cabs Bangalore" speed={3} />
            </h2>

            <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 italic">
              &ldquo;Reliable Cabs Across Bengaluru · Safe, Comfortable & On-Time Travel&rdquo;
            </p>

            <div className="space-y-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              <p>
                Founded with a strong commitment to passenger safety and punctuality,{" "}
                <strong className="text-neutral-900 dark:text-neutral-100 font-bold">
                  Sky Cabs Bangalore
                </strong>{" "}
                has grown into a trusted travel brand across Bengaluru and Karnataka.
                With our central hubs at <strong className="text-neutral-900 dark:text-neutral-100 font-bold">Begur (Bengaluru)</strong> and{" "}
                <strong className="text-neutral-900 dark:text-neutral-100 font-bold">Jayanagar (Yelahanka)</strong>,
                we operate a seamless fleet of 4+1 to 52-Seater vehicles.
              </p>
              <p>
                Whether you need a swift Kempegowda International Airport (BLR) airport drop, a devotional pilgrimage tour
                to Mysuru or Tirupati, a corporate event convoy, or a luxury tourist bus for a
                grand family wedding, our verified chauffeurs ensure a smooth and memorable journey.
              </p>
            </div>

            {/* Hubs pill list */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                Operational Hubs:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {[
                  "Begur (HQ)",
                  "Electronic City",
                  "Koramangala Highway",
                  "Whitefield / Marathahalli",
                  "Kempegowda International Airport (BLR)",
                  "Hebbal & Yelahanka",
                  "Jayanagar / Yelahanka",
                ].map((hub) => (
                  <span
                    key={hub}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    <MapPinIcon className="w-3.5 h-3.5 text-rose-500" />
                    <span>{hub}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}>
                <ShimmerButton
                  background="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  className="px-6 py-3.5 text-sm font-bold shadow-md shadow-amber-500/25"
                >
                  <PhoneIcon className="w-4 h-4 text-white" />
                  <span>Call +91 {SKY_CABS_CONTACT.primaryPhone}</span>
                </ShimmerButton>
              </a>

              <MagneticButton pullFactor={0.25}>
                <a
                  href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLegacy;
