import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ALL_TOUR_PACKAGES, TourPackageDetail } from "@/data/tourPackagesData";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import {
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import { SpotlightCard, StarBorder, ShinyText } from "@/components/reactbits";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_TOUR_PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = ALL_TOUR_PACKAGES.find((p) => p.slug === slug);
  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.title} | Sky Cabs Bangalore`,
    description: `${pkg.tagline}. Outstation tour from Bengaluru with vehicle options including sedan, Ertiga, Innova, Fortuner, Urbania and passenger buses. Confirm availability and final fare before booking.`,
    alternates: {
      canonical: `https://skycabsbangalore.com/package/${pkg.slug}`,
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = ALL_TOUR_PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  const defaultWaMessage = `Hello Sky Cabs Bangalore, I would like to enquire about the *${pkg.title}* (${pkg.duration}). Please share vehicle availability and a final quotation.`;

  return (
    <div className="nc-PackageDetailPage py-10 sm:py-16">
      <div className="container space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-primary-6000 transition">Home</Link>
          <span>/</span>
          <Link href="/package" className="hover:text-primary-6000 transition">Tour Packages</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-bold truncate">{pkg.title}</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl p-6 sm:p-10 text-white min-h-[360px] flex flex-col justify-end">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 text-xs font-black uppercase tracking-wider">
                {pkg.heroBadge}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                {pkg.state} · {pkg.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                {pkg.distanceKm} KM Round Trip
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {pkg.title}
            </h1>
            <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              {pkg.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${encodeURIComponent(defaultWaMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Booking</span>
              </a>

              <a
                href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white font-bold text-xs sm:text-sm border border-neutral-700 transition"
              >
                <PhoneIcon className="w-4 h-4 text-amber-400" />
                <span>+91 {SKY_CABS_CONTACT.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Overview Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
          <h2 className="text-lg sm:text-xl font-black uppercase text-neutral-900 dark:text-white mb-2">
            PILGRIMAGE & TRIP OVERVIEW
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {pkg.overview}
          </p>
          {pkg.templeTimings && (
            <div className="mt-3 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 shrink-0" />
              <span>Temple Darshan Hours: {pkg.templeTimings}</span>
            </div>
          )}
        </div>

        {/* PER-VEHICLE PRICING: STRICT SIDE-BY-SIDE CARDS */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500">
              Guaranteed Best Rates
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 dark:text-white">
              PER-VEHICLE COMPLETE TOUR PRICING
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Includes dedicated commercial vehicle, fuel, driver batta, tolls & interstate permits.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {pkg.vehicleRates.map((vRate) => {
              const bookingText = `Hello Sky Cabs Bangalore, I would like to check availability of ${vRate.name} for *${pkg.title}* at ${vRate.priceDisplay}.`;

              return (
                <SpotlightCard
                  key={vRate.vehicleId}
                  className="p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-amber-500 transition"
                  spotlightColor="rgba(245, 158, 11, 0.15)"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 truncate">
                        {vRate.category}
                      </span>
                      {vRate.badge && (
                        <span className="text-[8px] font-extrabold uppercase px-1 py-0.5 rounded bg-amber-500 text-neutral-950 truncate">
                          {vRate.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-xs sm:text-sm text-neutral-900 dark:text-white leading-snug">
                      {vRate.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      {vRate.capacity}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="font-black text-sm sm:text-base text-amber-600 dark:text-amber-400 mb-2">
                      {vRate.priceDisplay}
                    </div>

                    <a
                      href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${encodeURIComponent(bookingText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition"
                    >
                      <WhatsAppIcon className="w-3 h-3 fill-white" />
                      <span>Book</span>
                    </a>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* Day-by-Day Detailed Itinerary */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500">
              Trip Schedule & Highlights
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 dark:text-white">
              DETAILED DAY-BY-DAY ITINERARY
            </h2>
          </div>

          <div className="space-y-4">
            {pkg.itinerary.map((day) => (
              <div
                key={day.day}
                className="p-5 sm:p-6 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                      D{day.day}
                    </span>
                    <h3 className="font-black text-sm sm:text-base text-neutral-900 dark:text-white">
                      {day.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-neutral-400 flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{day.time}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  {day.description}
                </p>

                <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400 block mb-2">
                    Key Halts & Schedule
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    {day.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side-by-Side Inclusions & Exclusions */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {/* Inclusions */}
          <div className="p-4 sm:p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
            <h3 className="font-black text-xs sm:text-base uppercase text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>WHAT&apos;S INCLUDED</span>
            </h3>
            <ul className="space-y-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300">
              {pkg.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="p-4 sm:p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40">
            <h3 className="font-black text-xs sm:text-base uppercase text-rose-700 dark:text-rose-400 mb-3 flex items-center gap-1.5">
              <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>WHAT&apos;S EXCLUDED</span>
            </h3>
            <ul className="space-y-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300">
              {pkg.exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Booking Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-white text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-black uppercase">
            Ready to Plan Your Bengaluru Outstation Trip?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Doorstep pickup across Begur, Electronic City, Koramangala, Whitefield and other Bengaluru areas. Vehicle availability and final fare are confirmed before booking.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${encodeURIComponent(defaultWaMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Book on WhatsApp</span>
            </a>

            <Link
              href="/package"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs sm:text-sm border border-neutral-700 transition"
            >
              <span>Explore Other Packages</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
