"use client";

import React, { FC } from "react";
import Link from "next/link";
import { SparklesIcon, TagIcon, CalendarDaysIcon, ArrowRightIcon, TruckIcon } from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import { FESTIVAL_POSTERS, FestivalPoster } from "@/data/festivalOffers";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { SpotlightCard } from "@/components/reactbits";

export interface SectionFestivalOffersProps {
  className?: string;
}

const SectionFestivalOffers: FC<SectionFestivalOffersProps> = ({ className = "" }) => {
  const activePosters = FESTIVAL_POSTERS.filter((p) => p.isActive);

  if (activePosters.length === 0) return null;

  return (
    <section className={`nc-SectionFestivalOffers py-10 relative overflow-hidden ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Seasonal Celebrations & Savings</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
            FESTIVAL SPECIALS & PROMOTIONAL OFFERS
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Exclusive fixed rates & guaranteed fleet availability for upcoming holidays & village yatras.
          </p>
        </div>

        <Link
          href="/package"
          className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
        >
          <span>View All Tour Packages</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Side-by-Side Responsive Grid: 2 columns on mobile, 3 on desktop (never single stacked) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {activePosters.map((poster) => {
          const waMessage = `Hello Sri Sadhguru Travels, I want to book festival offer '${poster.festivalName}' with code *${poster.bookingCode}*. Please share available vehicles.`;

          return (
            <SpotlightCard
              key={poster.id}
              className="p-4 sm:p-5 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-amber-500/50 transition-all duration-300"
              spotlightColor="rgba(245, 158, 11, 0.18)"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 truncate">
                    {poster.discountBadge}
                  </span>
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1 shrink-0">
                    <CalendarDaysIcon className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                </div>

                {/* Festival Title */}
                <h3 className="text-sm sm:text-base font-black uppercase text-neutral-900 dark:text-white leading-tight">
                  {poster.bannerTitle}
                </h3>
                <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                  {poster.festivalName}
                </p>

                {/* Description */}
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {poster.description}
                </p>

                {/* Recommended Destinations Chips */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {poster.recommendedDestinations.map((dest, dIdx) => (
                    <span
                      key={dIdx}
                      className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-neutral-400">Coupon Code</span>
                  <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400 truncate">
                    {poster.bookingCode}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition shrink-0"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>Claim</span>
                </a>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

export default SectionFestivalOffers;
