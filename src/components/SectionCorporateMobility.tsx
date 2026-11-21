"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheckIcon,
  BuildingOffice2Icon,
  BeakerIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon, SparklesIcon } from "@/components/icons";
import { CORPORATE_SERVICES } from "@/data/corporateServices";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { SpotlightCard, StarBorder, ShinyText } from "@/components/reactbits";

export interface SectionCorporateMobilityProps {
  className?: string;
}

const SectionCorporateMobility: FC<SectionCorporateMobilityProps> = ({ className = "" }) => {
  return (
    <section className={`nc-SectionCorporateMobility relative overflow-hidden py-12 ${className}`}>
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 dark:bg-amber-400/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 mb-3">
          <StarBorder as="div" color="#f59e0b" speed="3.5s" className="shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-500 dark:text-amber-400">
              <SparklesIcon className="w-3.5 h-3.5" />
              <ShinyText text="Enterprise & Industrial Mobility" speed={2.5} />
            </div>
          </StarBorder>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
          CORPORATE & SPECIALIZED EMPLOYEE TRANSPORT
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Bengaluru&apos;s most reliable 24x7 shift commute partner for leading pharmaceutical complexes, IT campuses, and multinational organizations. 100% verified chauffeurs, live telematics dispatch, and guaranteed zero downtime.
        </p>
      </div>

      {/* Visual Banners Showcase: 2 Side-by-Side Large Feature Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-10">
        {/* Banner 1: Fleet Boarding Hero */}
        <div className="group relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 shadow-xl flex flex-col justify-end min-h-[220px] sm:min-h-[340px]">
          <Image
            src="/images/corporate/fleet-boarding-corporate.jpg"
            alt="Corporate employees boarding Sky Cabs Bangalore luxury coach bus at Manyata Tech Park"
            fill
            sizes="(max-width: 768px) 50vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          
          <div className="relative p-3.5 sm:p-6 z-10 text-white">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500 text-neutral-950 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 sm:mb-2">
              <TruckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Dedicated Fleet Boarding</span>
            </div>
            <h3 className="text-xs sm:text-lg md:text-xl font-black uppercase text-white leading-tight">
              CYBER TOWERS & FINANCIAL DISTRICT SHUTTLES
            </h3>
            <p className="hidden sm:block text-xs text-neutral-300 mt-1 line-clamp-2">
              Daily comfortable commute on Force Urbania & luxury AC coaches with punctual nodal pickups and zero surge charges.
            </p>
          </div>
        </div>

        {/* Banner 2: Operations Command Center */}
        <div className="group relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 shadow-xl flex flex-col justify-end min-h-[220px] sm:min-h-[340px]">
          <Image
            src="/images/corporate/command-center-dispatch.jpg"
            alt="Sky Cabs Bangalore 24x7 transportation operations control room and command center"
            fill
            sizes="(max-width: 768px) 50vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

          <div className="relative p-3.5 sm:p-6 z-10 text-white">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500 text-neutral-950 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 sm:mb-2">
              <ClockIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>24x7 Operations Command</span>
            </div>
            <h3 className="text-xs sm:text-lg md:text-xl font-black uppercase text-white leading-tight">
              BENGALURU CENTRAL FLEET DISPATCH RADAR
            </h3>
            <p className="hidden sm:block text-xs text-neutral-300 mt-1 line-clamp-2">
              Live GPS telematics, speed tracking, route deviation alerts, and instantaneous standby vehicle deployment.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Specialized Service Pillars: STRICT SIDE-BY-SIDE GRID (2 on mobile, 3 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {CORPORATE_SERVICES.map((service, index) => {
          return (
            <SpotlightCard
              key={service.id}
              className={`p-4 sm:p-6 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-amber-500/50 ${
                index === 2 ? "col-span-2 lg:col-span-1" : ""
              }`}
              spotlightColor="rgba(245, 158, 11, 0.15)"
            >
              <div>
                {/* Header Tag & Icon */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    {service.id === "pharma-transport" && <BeakerIcon className="w-5 h-5" />}
                    {service.id === "it-transport" && <BuildingOffice2Icon className="w-5 h-5" />}
                    {service.id === "women-safety" && <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />}
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 text-right">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base md:text-lg font-black uppercase text-neutral-900 dark:text-white leading-snug">
                  {service.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="mt-3.5 space-y-1.5 sm:space-y-2 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics & Action Bar */}
              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="grid grid-cols-3 gap-1 mb-3 text-center">
                  {service.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                      <div className="text-[11px] sm:text-xs font-black text-amber-600 dark:text-amber-400">
                        {m.value}
                      </div>
                      <div className="text-[9px] font-semibold text-neutral-500 uppercase leading-none mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hello%20Sky%20Cabs%20Bangalore,%20we%20would%20like%20to%20inquire%20about%20Corporate%20Transport%20services%20(${encodeURIComponent(
                      service.title
                    )}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>Inquire</span>
                  </a>

                  <a
                    href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                    className="inline-flex items-center justify-center p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500/20 text-neutral-800 dark:text-neutral-200 transition"
                    title={`Call: +91 ${SKY_CABS_CONTACT.primaryPhone}`}
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCorporateMobility;
