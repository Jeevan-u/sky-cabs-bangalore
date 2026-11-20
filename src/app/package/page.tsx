import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ALL_TOUR_PACKAGES } from "@/data/tourPackagesData";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import {
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import { SpotlightCard, StarBorder, ShinyText } from "@/components/reactbits";

export const metadata: Metadata = {
  title: "Pilgrimage & South India Tour Packages | SRI SADHGURU TOURS & TRAVELS",
  description:
    "Explore customized 1-Day to 6-Day pilgrimage and leisure tour packages from Hyderabad to Srisailam, Tirupati Balaji, Shirdi, Yadagirigutta, Andhra Temple Circuit, and South India. Transparent per-vehicle pricing with verified hill chauffeurs.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/package",
  },
};

export default function PackagesCatalogPage() {
  return (
    <div className="nc-PackagesCatalogPage py-10 sm:py-16">
      <div className="container space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <StarBorder as="div" color="#f59e0b" speed="3.5s" className="shadow-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-500">
                <SparklesIcon className="w-3.5 h-3.5" />
                <ShinyText text="Pilgrimage & Leisure Circuits" speed={2.5} />
              </div>
            </StarBorder>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
            SRI SADHGURU PILGRIMAGE & TOUR PACKAGES
          </h1>
          <p className="mt-3 text-xs sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            All-inclusive temple yatras and South India holiday tours with doorstep pickup across Hyderabad. Every package includes verified senior chauffeurs, commercial interstate permits, and zero-surge guaranteed pricing.
          </p>
        </div>

        {/* Side-by-Side Responsive Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {ALL_TOUR_PACKAGES.map((pkg) => {
            const waBookingUrl = `https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20want%20to%20book%20the%20${encodeURIComponent(
              pkg.title
            )}%20package.`;

            return (
              <SpotlightCard
                key={pkg.slug}
                className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 group"
                spotlightColor="rgba(245, 158, 11, 0.16)"
              >
                {/* Image Banner */}
                <div className="relative w-full h-36 sm:h-52 overflow-hidden bg-neutral-900">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 shadow-md truncate">
                      {pkg.state}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shrink-0">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="text-[10px] sm:text-xs font-bold text-amber-400 block line-clamp-1">
                      {pkg.distanceKm} KM · Round Trip
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm sm:text-lg font-black uppercase text-neutral-900 dark:text-white leading-tight">
                      {pkg.title}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-snug">
                      {pkg.tagline}
                    </p>

                    {/* Highlights summary */}
                    <ul className="mt-3 space-y-1 border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
                      {pkg.inclusions.slice(0, 2).map((inc, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-1 text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-300">
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Starting From</span>
                      <span className="text-base sm:text-xl font-black text-amber-600 dark:text-amber-400">
                        ₹{pkg.startingPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/package/${pkg.slug}`}
                        className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-bold transition text-center"
                      >
                        <span>Itinerary</span>
                        <ArrowRightIcon className="w-3 h-3" />
                      </Link>

                      <a
                        href={waBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm text-center"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                        <span>Book</span>
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
