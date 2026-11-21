"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
  PrinterIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import {
  SpotlightCard,
  StarBorder,
  MagneticButton,
  ShinyText,
  Confetti,
  BorderBeam,
} from "@/components/reactbits";

const PayPage: FC = () => {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  // Extract query parameters passed from checkout
  const bookingId = searchParams?.get("bookingId") || "BK-1002";
  const customerName = searchParams?.get("customerName") || "Valued Customer";
  const customerPhone = searchParams?.get("customerPhone") || "";
  const vehicle = searchParams?.get("vehicle") || "Toyota Innova Crysta";
  const pickup = searchParams?.get("pickup") || "Begur, Bengaluru";
  const drop = searchParams?.get("drop") || "Kempegowda International Airport (BLR)";
  const date = searchParams?.get("date") || "Scheduled as requested";
  const price = searchParams?.get("price") || "1,999";
  const payment = searchParams?.get("payment") === "advance_token" ? "Advance Token" : "Pay to Chauffeur at End";

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Sky Cabs Bangalore, I just confirmed booking *${bookingId}* for ${vehicle}.\nRoute: ${pickup} -> ${drop}\nPassenger: ${customerName} (${customerPhone})\nScheduled: ${date}\nEstimated Fare: ₹${price}. Please share chauffeur details.`
  );

  return (
    <div className="nc-PayPage min-h-screen bg-neutral-50/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 font-sans">
      <main className="container max-w-3xl mx-auto px-4 relative">
        {/* React Bits Canvas Confetti Celebration */}
        <Confetti count={120} duration={4000} />

        {/* SUCCESS CELEBRATION HERO */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/20 mb-2 animate-bounce">
            <CheckCircleIcon className="w-12 h-12 stroke-[2.2]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 dark:text-white tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Thank you, <span className="font-bold text-neutral-900 dark:text-white">{customerName}</span>. Your vehicle reservation with Sky Cabs Bangalore is confirmed.
          </p>

          {/* Booking Reference Pill */}
          <div className="inline-block mt-2">
            <StarBorder as="div" color="#10b981" speed="4s">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Booking ID:</span>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">{bookingId}</span>
                <button
                  onClick={handleCopyId}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition"
                  title="Copy Booking ID"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                </button>
                {copied && <span className="text-[10px] font-bold text-emerald-600 animate-fade-in">Copied!</span>}
              </div>
            </StarBorder>
          </div>
        </div>

        {/* DISPATCH STATUS TIMELINE */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.1)"
          className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
              Live Dispatch Progress
            </h3>
            <ShinyText text="GPS Chauffeur Tracking Active" speed={3.5} className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                <CheckIcon className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="font-bold text-emerald-800 dark:text-emerald-300">Booking Registered</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">Recorded in dispatch hub</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center shrink-0 text-[11px] animate-pulse">
                2
              </span>
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-300">Driver Assignment</p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">Allocating closest chauffeur</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-start gap-3 opacity-60">
              <span className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </span>
              <div>
                <p className="font-bold text-neutral-700 dark:text-neutral-300">Doorstep Arrival</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">15-20 min before schedule</p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* TRIP SUMMARY TICKET */}
        <SpotlightCard
          spotlightColor="rgba(217, 119, 6, 0.12)"
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl space-y-6 mb-6 relative overflow-hidden"
        >
          <BorderBeam size={260} duration={8} colorFrom="#10b981" colorTo="#f59e0b" borderWidth={1.5} />
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Reserved Vehicle</span>
              <h2 className="text-xl font-extrabold text-neutral-950 dark:text-white mt-0.5">{vehicle}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Fare</span>
              <p className="text-2xl font-black text-emerald-600 font-mono">₹{price}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">PICKUP LOCATION</span>
                <span className="font-bold text-neutral-900 dark:text-white">{pickup}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPinIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">DESTINATION</span>
                <span className="font-bold text-neutral-900 dark:text-white">{drop}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">JOURNEY DATE & TIME</span>
                <span className="font-bold text-neutral-900 dark:text-white">{date}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">PAYMENT MODE</span>
                <span className="font-bold text-neutral-900 dark:text-white">{payment}</span>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* PRIMARY ACTION LAUNCHPAD */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Track My Trip Button */}
            <MagneticButton distance={0.2} className="w-full">
              <Link
                href={`/track-booking?id=${encodeURIComponent(bookingId)}` as any}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-6000/25 active:scale-95 transition-all"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Track Live Trip Status</span>
              </Link>
            </MagneticButton>

            {/* WhatsApp Confirmation */}
            <MagneticButton distance={0.2} className="w-full">
              <a
                href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Confirm on WhatsApp</span>
              </a>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>Print Confirmation Receipt</span>
            </button>

            <a
              href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>24x7 Help: +91 {SKY_CABS_CONTACT.primaryPhone}</span>
            </a>

            <Link
              href="/"
              className="text-xs font-bold text-primary-6000 hover:underline flex items-center gap-1"
            >
              <span>Back to Home</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayPage;
