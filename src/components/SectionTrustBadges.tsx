"use client";

import React, { FC } from "react";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  BoltIcon,
  CheckBadgeIcon,
  StarRating,
  SparklesIcon,
} from "@/components/icons";
import { SpotlightCard, ShinyText, DecryptedText, BorderBeam, Float } from "@/components/reactbits";

export interface SectionTrustBadgesProps {
  className?: string;
}

const trustItems = [
  {
    icon: <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />,
    title: "Commercial RTA Permits",
    desc: "100% authorized yellow-plate fleet with valid fitness & passenger insurance.",
    spotlight: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: <DocumentTextIcon className="w-5 h-5 text-primary-500" />,
    title: "GST Invoicing",
    desc: "Instant GST-compliant tax invoices for corporate employee travel claims.",
    spotlight: "rgba(217, 119, 6, 0.15)",
  },
  {
    icon: <BoltIcon className="w-5 h-5 text-amber-500" />,
    title: "Digital Duty Slip",
    desc: "Transparent odometer reading photos with customer digital signature.",
    spotlight: "rgba(245, 158, 11, 0.15)",
  },
  {
    icon: <CheckBadgeIcon className="w-5 h-5 text-sky-500" />,
    title: "Verified Chauffeurs",
    desc: "Punctual, polite drivers with 10+ years of highway and temple hill road experience.",
    spotlight: "rgba(14, 165, 233, 0.15)",
  },
];

const SectionTrustBadges: FC<SectionTrustBadgesProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionTrustBadges ${className}`}>
      <SpotlightCard
        className="p-5 sm:p-7 !rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-md backdrop-blur-xl relative overflow-hidden"
        spotlightColor="rgba(245, 158, 11, 0.2)"
      >
        <BorderBeam size={240} duration={12} colorFrom="#10b981" colorTo="#f59e0b" borderWidth={1.5} />
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-5 border-b border-neutral-100 dark:border-neutral-800/80 gap-3">
          <div className="flex items-center gap-2.5">
            <SparklesIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100">
                <ShinyText text="Bengaluru's Trusted Commercial Travel Partner" speed={3} />
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Operating under Sky Cabs Bangalore with a wide range of vehicles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400">
              <StarRating rating={5} className="w-3.5 h-3.5 text-amber-400" />
              <span>4.9 / 5.0 (5,000+ Reviews)</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40 hidden sm:inline-block">
              Zero Advance Required
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={item.spotlight}
              className="flex items-start gap-3 p-3.5 !rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-amber-400/40 transition-all duration-300"
            >
              <Float duration={4} offset={4} delay={idx * 0.2}>
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 shadow-xs border border-neutral-200/60 dark:border-neutral-700">
                  {item.icon}
                </div>
              </Float>
              <div>
                <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h5>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug mt-0.5 font-medium">
                  {item.desc}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
};

export default SectionTrustBadges;
