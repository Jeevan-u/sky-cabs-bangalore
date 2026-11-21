"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheckIcon,
  PhoneIcon,
  MapPinIcon,
  CheckBadgeIcon,
  StarIcon,
  TruckIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import CarCard from "@/components/CarCard";
import StartRating from "@/components/StartRating";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import {
  SpotlightCard,
  StarBorder,
  MagneticButton,
  ShinyText,
} from "@/components/reactbits";

export interface AuthorPageProps {}

const AuthorPage: FC<AuthorPageProps> = () => {
  const [activeTab, setActiveTab] = useState<"fleet" | "about" | "reviews">("fleet");

  return (
    <div className="nc-AuthorPage min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-12 font-sans">
      <div className="container max-w-6xl mx-auto px-4">
        {/* PROPRIETOR HERO CARD WITH SPOTLIGHT */}
        <SpotlightCard
          spotlightColor="rgba(217, 119, 6, 0.16)"
          className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          {/* Avatar with verified badge */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-500/30 shadow-2xl bg-neutral-900 relative">
              <Image
                src="/images/logo.jpg"
                alt="Sky Cabs Bangalore"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-white shadow-md" title="Verified Operator">
              <CheckBadgeIcon className="w-5 h-5" />
            </span>
          </div>

          {/* Bio & Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <StarBorder as="div" color="#d97706" speed="4s" className="inline-block">
                <span className="px-3 py-0.5 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Team & Fleet Director
                </span>
              </StarBorder>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                10+ Years Trust
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3 justify-center md:justify-start">
              <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 dark:text-white tracking-tight">
                Sky Cabs Bangalore
              </h1>
              <ShinyText text="Verified Fleet Owner" speed={3} className="text-xs font-bold text-emerald-600 dark:text-emerald-400" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium leading-relaxed">
              Founder & Team of <strong className="text-neutral-900 dark:text-white">Sky Cabs Bangalore</strong>. Under his dedicated leadership, Sky Cabs Bangalore operates an extensive commercial fleet of 50+ vehicles spanning 5-seater sedans to 50-seater luxury coaches across Bengaluru, Begur, Jayanagar, and all of South India.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4 text-primary-6000" />
                Begur (HQ) & Jayanagar Hub
              </span>
              <span className="flex items-center gap-1.5">
                <StarIcon className="w-4 h-4 text-amber-500 fill-amber-500" />
                4.9 Google Verified Rating
              </span>
              <span className="flex items-center gap-1.5">
                <TruckIcon className="w-4 h-4 text-emerald-500" />
                50+ Commercial Yellow-Board Vehicles
              </span>
            </div>

            {/* Direct Contact CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <MagneticButton distance={0.2}>
                <a
                  href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                  className="px-5 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 active:scale-95 transition-all flex items-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Call: +91 {SKY_CABS_CONTACT.primaryPhone}</span>
                </a>
              </MagneticButton>

              <MagneticButton distance={0.2}>
                <a
                  href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sky Cabs Bangalore%20Kanna,%20I%20would%20like%20to%20inquire%20about%20a%20travel%20booking.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Direct</span>
                </a>
              </MagneticButton>

              <Link
                href="/track-booking"
                className="px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition"
              >
                Track My Trip
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 mt-10 mb-8">
          <button
            onClick={() => setActiveTab("fleet")}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === "fleet"
                ? "border-primary-6000 text-primary-6000"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Commercial Fleet ({DEMO_CAR_LISTINGS.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === "about"
                ? "border-primary-6000 text-primary-6000"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Fleet Operations & Standards
          </button>
        </div>

        {/* TAB 1: FLEET SHOWCASE */}
        {activeTab === "fleet" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DEMO_CAR_LISTINGS.map((car) => (
              <CarCard key={car.id} data={car} />
            ))}
          </div>
        )}

        {/* TAB 2: STANDARDS & ABOUT */}
        {activeTab === "about" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6 text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              The Sky Cabs Bangalore Promise · Personal Supervision by Sky Cabs Bangalore
            </h3>
            <p>
              Founded with the vision to deliver dependable, safe, and transparent transportation across Karnataka and South India, Sky Cabs Bangalore prioritizes customer peace of mind above all else. Unlike aggregator apps with fluctuating surge prices and random driver assignments, every trip booked through Sky Cabs Bangalore is personally scheduled, verified, and tracked by our central operations desk.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                <ShieldCheckIcon className="w-8 h-8 text-primary-6000 mb-2" />
                <h4 className="font-bold text-neutral-900 dark:text-white text-base">Verified Chauffeurs</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Experienced highway drivers with background verification and deep knowledge of pilgrim routes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                <DocumentCheckIcon className="w-8 h-8 text-emerald-600 mb-2" />
                <h4 className="font-bold text-neutral-900 dark:text-white text-base">Transparent Billing</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Digital duty slips with starting & ending odometer readings, Fastag toll receipts, and no hidden bata.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                <TruckIcon className="w-8 h-8 text-amber-500 mb-2" />
                <h4 className="font-bold text-neutral-900 dark:text-white text-base">24x7 Rapid Dispatch</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  15-minute doorstep dispatch across Begur, Whitefield, Indiranagar, Whitefield, and Kempegowda International Airport (BLR).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
