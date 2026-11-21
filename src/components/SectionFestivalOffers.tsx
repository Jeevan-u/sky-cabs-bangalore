"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { SparklesIcon, TagIcon, CalendarDaysIcon, ArrowRightIcon, TruckIcon } from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import { FESTIVAL_POSTERS, FestivalPoster } from "@/data/festivalOffers";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { SpotlightCard } from "@/components/reactbits";

export interface SectionFestivalOffersProps {
  className?: string;
}

const SectionFestivalOffers: FC<SectionFestivalOffersProps> = ({ className = "" }) => {
  const [posters, setPosters] = useState<FestivalPoster[]>(FESTIVAL_POSTERS);

  useEffect(() => {
    async function loadDynamicOffers() {
      try {
        const res = await fetch("/api/festivals");
        const data = await res.json();
        if (data.success && Array.isArray(data.offers) && data.offers.length > 0) {
          const mapped: FestivalPoster[] = data.offers.map((o: any) => ({
            id: o.id,
            festivalName: o.festival_name || o.festivalName,
            occasion: o.occasion,
            discountBadge: o.discount_badge || o.discountBadge,
            bannerTitle: o.banner_title || o.bannerTitle,
            description: o.description,
            recommendedDestinations: Array.isArray(o.recommended_destinations)
              ? o.recommended_destinations
              : o.recommendedDestinations || [],
            bookingCode: o.booking_code || o.bookingCode,
            startDate: o.start_date || o.startDate,
            endDate: o.end_date || o.endDate,
            posterImage: o.image_url || "/images/festivals/sankranti-offer.jpg",
            isActive: o.is_active !== undefined ? Boolean(o.is_active) : (o.isActive !== undefined ? Boolean(o.isActive) : true),
          }));
          setPosters(mapped);
        }
      } catch (e) {
        // Fallback to static FESTIVAL_POSTERS
      }
    }
    loadDynamicOffers();
  }, []);

  const activePosters = posters.filter((p) => p.isActive);

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
          const waMessage = `Hello Sky Cabs Bangalore, I want to book festival offer '${poster.festivalName}' with code *${poster.bookingCode}*. Please share available vehicles.`;

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

                {/* Recommended Destinations */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {poster.recommendedDestinations.slice(0, 3).map((dest, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {dest}
                    </span>
                  ))}
                  {poster.recommendedDestinations.length > 3 && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                      +{poster.recommendedDestinations.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">Coupon Code</span>
                  <span className="font-mono font-black text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                    {poster.bookingCode}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition active:scale-95"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Claim Offer</span>
                  <span className="sm:hidden">Book</span>
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
