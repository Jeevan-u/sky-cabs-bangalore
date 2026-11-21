"use client";

import React from "react";
import {
  Bars3Icon,
  ArrowPathIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AdminTabType } from "../types";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import { ShinyText } from "@/components/reactbits";

interface AdminHeaderProps {
  activeTab: AdminTabType;
  onOpenMobileSidebar: () => void;
  onOpenNewBookingModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  quickMetrics?: {
    activeTrips: number;
    pendingBookings: number;
  };
}

export default function AdminHeader({
  activeTab,
  onOpenMobileSidebar,
  onOpenNewBookingModal,
  searchQuery,
  setSearchQuery,
  isRefreshing,
  onRefresh,
  quickMetrics,
}: AdminHeaderProps) {
  const titles: Record<AdminTabType, { title: string; subtitle: string }> = {
    overview: {
      title: "Executive Command Center & P&L Analytics",
      subtitle: "Real-time Gross Revenue, Incurred Expenses, Operating Margins, and Fleet Operations Telemetry",
    },
    dispatch: {
      title: "Live Dispatch Control",
      subtitle: "Allocate verified chauffeurs and dispatch instant WhatsApp links",
    },
    odometer: {
      title: "Odometer Photo Verification",
      subtitle: "Compare driver speedometer captures (Start vs End) and approve trip distance",
    },
    quotations: {
      title: "Custom Quotations Manager",
      subtitle: "Review custom non-hub routes, calculate distances on Google Maps, and send quotes",
    },
    tours_cms: {
      title: "Tour & Pilgrimage Packages CMS",
      subtitle: "Manage landing page South India Pilgrimage & State Tour Packages",
    },
    places_cms: {
      title: "Operational Hubs & Places CMS",
      subtitle: "Configure 24x7 doorstep pickup stations shown in the Popular Hubs carousel",
    },
    routes_cms: {
      title: "Outstation Routes CMS",
      subtitle: "Configure one-way, round trip, and per-km pricing for highway travel corridors",
    },
    fleet_catalog: {
      title: "Fleet Management & Rate Card Engine",
      subtitle: "Manage 5 to 50-seater passenger fleet specs, per-km tariffs, airport flat rates, and driver batta",
    },
    dutyslips: {
      title: "Digital Duty Slips & Invoices",
      subtitle: "Verified customer touch signatures, KM readings, and tax invoices",
    },
    drivers: {
      title: "Chauffeur & Driver Roster",
      subtitle: "Manage highway-certified pilots, assigned vehicles, contact details, and instant dispatch duty statuses",
    },
    fleet: {
      title: "Fleet Management & Rate Card Engine",
      subtitle: "Manage 5 to 50-seater passenger fleet specs, per-km tariffs, airport flat rates, and driver batta",
    },
    expenses: {
      title: "Fleet Operations Expenses Ledger",
      subtitle: "Track fuel, FASTag tolls, garage maintenance, chauffeur batta, and state permits",
    },
    festivals: {
      title: "Festival Posters, Offers & Client Logos",
      subtitle: "Manage seasonal festival campaigns, generate AI promo banners, and manage corporate logos",
    },
    reviews: {
      title: "AI Reputation Shield",
      subtitle: "Google Maps 5-star reviews and intercepted private feedback",
    },
    analytics: {
      title: "Executive Command Center & P&L Analytics",
      subtitle: "Real-time Gross Revenue, Incurred Expenses, Operating Margins, and Fleet Operations Telemetry",
    },
  };

  const current = titles[activeTab] || titles.analytics;

  return (
    <header className="shrink-0 z-20 sticky top-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Hamburger & Titles (ChisFis typography) */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 rounded-2xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
            aria-label="Open Navigation"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight truncate flex items-center gap-2">
              <span>{current.title}</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate hidden sm:block font-medium">
              <ShinyText text={current.subtitle} speed={4} />
            </p>
          </div>
        </div>

        {/* Center: Global Search Bar & Operational Pill */}
        <div className="hidden lg:flex items-center flex-1 max-w-lg mx-4 gap-3">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer, phone, or booking ID..."
              className="w-full pl-10 pr-8 py-2 text-xs rounded-full bg-neutral-100/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs font-bold"
                aria-label="Clear search"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Operational Status Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-[11px] font-bold text-neutral-600 dark:text-neutral-300 shrink-0 select-none">
            {searchQuery.trim() ? (
              <>
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
                <span className="text-primary-600 dark:text-primary-400">Filtering Records</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Begur Dispatch Live</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Urgent Pending Counter if any */}
          {quickMetrics && quickMetrics.pendingBookings > 0 && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>{quickMetrics.pendingBookings} Pending Leads</span>
            </div>
          )}
          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-colors shadow-2xs"
            title="Refresh Real-time Data"
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-primary-500" : ""}`}
            />
          </button>

          {/* Dark Mode */}
          <div className="border-l border-neutral-200 dark:border-neutral-800 pl-2">
            <SwitchDarkMode className="p-2.5 rounded-full" />
          </div>

          {/* New Booking CTA (Matching Landing Page ButtonPrimary: Royal Indigo with smooth shadow) */}
          <button
            onClick={onOpenNewBookingModal}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-6000/25 active:scale-95 transition-all"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">New Booking</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>
      </div>
    </header>
  );
}
