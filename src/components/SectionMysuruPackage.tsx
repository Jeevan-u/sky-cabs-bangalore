"use client";

import React, { FC } from "react";
import Link from "next/link";
import Badge from "@/shared/Badge";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { PhoneIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/icons";
import {
  SpotlightCard,
  AnimatedCounter,
  ShinyText,
  BorderBeam,
  ShimmerButton,
} from "@/components/reactbits";

export interface SectionMysuruPackageProps {
  className?: string;
}

const oneDaySpots = [
  "Mysuru Palace & museum",
  "Chamundi Hills viewpoint",
  "Brindavan Gardens (evening)",
  "Kariji Lake birdwatching",
  "Local market & silk shops",
  "Flexible pickup from Bengaluru",
];

const twoDaySpots = [
  "Everything in the 1-day tour",
  "Overnight stay in Mysuru",
  "Srikanteshwara Temple visit",
  "Brindavan musical fountains",
  "Coffee estate stop en route",
  "Leisurely return to Bengaluru",
];

const SectionMysuruPackage: FC<SectionMysuruPackageProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionMysuruPackage relative ${className}`}>
      <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-8 sm:p-12 shadow-sm overflow-hidden relative">
        <BorderBeam size={320} duration={12} colorFrom="#f59e0b" colorTo="#10b981" borderWidth={1.5} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Overview and highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge name="Weekend Getaway Special" color="yellow" />
              <Badge name="150 KM from Bengaluru" color="blue" />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
              Explore Royal{" "}
              <ShinyText
                text="Mysuru"
                speed={3}
                className="text-primary-6000 dark:text-primary-400"
              />
            </h2>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
              A relaxed road trip from Bengaluru to the palace city, with Chamundi Hills,
              Brindavan Gardens and comfortable doorstep travel. Choose a vehicle from our
              fleet and confirm availability before booking.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
                <span className="text-2xl font-black text-neutral-900 dark:text-neutral-100 block font-mono">
                  <AnimatedCounter to={150} duration={1.5} suffix=" KM" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Distance
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
                <span className="text-2xl font-black text-neutral-900 dark:text-neutral-100 block font-mono">
                  24/7
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Pickups
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block font-mono flex items-center justify-center">
                  <span>₹</span>
                  <AnimatedCounter
                    to={4500}
                    duration={1.5}
                    formatter={(v) => v.toLocaleString("en-IN")}
                  />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Starts At
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20would%20like%20to%20enquire%20about%20a%20Mysuru%20trip%20from%20Bengaluru.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShimmerButton
                  background="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  className="px-6 py-3.5 text-sm font-bold shadow-md"
                >
                  <span>Enquire About Mysuru Trip</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </ShimmerButton>
              </a>

              <a
                href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 font-semibold text-sm transition text-neutral-800 dark:text-neutral-200"
              >
                <PhoneIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Call: {SKY_CABS_CONTACT.primaryPhoneFormatted}</span>
              </a>

              <Link
                href="/bangalore-to-mysuru-cabs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-6000 hover:underline"
              >
                <span>View Mysuru Route & Fares</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Itinerary cards */}
          <div className="lg:col-span-6 space-y-5">
            <SpotlightCard
              className="p-6 !rounded-2xl hover:border-amber-400/40"
              spotlightColor="rgba(245, 158, 11, 0.2)"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
                  1-Day Express Tour
                </span>
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Same Day Return
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium pt-2">
                {oneDaySpots.map((spot, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard
              className="p-6 !rounded-2xl hover:border-primary-500/40"
              spotlightColor="rgba(56, 189, 248, 0.2)"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-primary-6000 dark:text-primary-400 bg-primary-100 dark:bg-primary-950/60 px-3 py-1 rounded-full">
                  2-Day Leisure Tour
                </span>
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Overnight Stay
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium pt-2">
                {twoDaySpots.map((spot, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionMysuruPackage;
