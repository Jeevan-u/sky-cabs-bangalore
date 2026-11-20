"use client";

import React, { FC, useState } from "react";
import { COMPANIES_SERVED, ClientCompany } from "@/data/companiesServed";
import { BuildingOfficeIcon, SparklesIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

export interface SectionCompaniesServedProps {
  className?: string;
}

const SectionCompaniesServed: FC<SectionCompaniesServedProps> = ({ className = "" }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to achieve continuous seamless loop
  const marqueeList = [...COMPANIES_SERVED, ...COMPANIES_SERVED];

  return (
    <section className={`nc-SectionCompaniesServed py-10 relative overflow-hidden ${className}`}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-extrabold uppercase tracking-wider mb-2">
          <BuildingOfficeIcon className="w-3.5 h-3.5" />
          <span>Corporate Trust & Credibility</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
          COMPANIES WE&apos;VE SERVED
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Trusted corporate transport partner for organizations across Hyderabad and beyond.
        </p>
      </div>

      {/* Marquee Container with side fade masks */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right gradient masks for smooth fade edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10" />

        {/* Scrolling flex track */}
        <div
          className={`flex gap-3 sm:gap-4 w-max ${
            isPaused ? "animate-none" : "animate-marquee"
          }`}
          style={{
            animation: isPaused ? "none" : "marqueeScroll 32s linear infinite",
          }}
        >
          {marqueeList.map((company, index) => (
            <div
              key={`${company.id}-${index}`}
              className="flex-shrink-0 w-44 sm:w-56 p-3 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 truncate">
                  {company.industry}
                </span>
                <CheckBadgeIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              </div>

              {/* Company Logo Display Pill */}
              <div className="py-2.5 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-center my-1 group-hover:bg-amber-500/10 transition-colors">
                <span
                  className="font-black text-sm sm:text-base tracking-tight truncate"
                  style={{ color: company.accentColor }}
                >
                  {company.logoText}
                </span>
              </div>

              <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col">
                <span className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                  {company.name}
                </span>
                <span className="text-[10px] text-neutral-400 truncate">
                  {company.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS keyframe animation for smooth marquee scroll */}
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default SectionCompaniesServed;
