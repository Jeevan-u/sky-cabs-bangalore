"use client";

import React from "react";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { PhoneIcon, WhatsAppIcon, SparklesIcon } from "@/components/icons";
import { ShinyText } from "@/components/reactbits";

export default function TopAnnouncementBar() {
  return (
    <div className="bg-slate-950 text-white text-[11px] sm:text-xs font-semibold py-2 px-3 border-b border-amber-400/30 relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Operational Status */}
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            Live Dispatch:
          </span>
          <span className="text-neutral-300 hidden md:inline">
            Doorstep Cabs in Kukatpally, KPHB, Miyapur, Hitec City & Shamshabad Airport
          </span>
          <span className="text-neutral-300 md:hidden">
            24x7 Cabs & Airport Taxi in Hyderabad
          </span>
        </div>

        {/* Right: Quick Emergency Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 text-[11px]">
          <span className="text-emerald-400 font-bold hidden sm:inline-flex items-center gap-1">
            <SparklesIcon className="w-3.5 h-3.5" />
            <ShinyText text="Zero Surge Pricing Guaranteed" speed={3} />
          </span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="inline-flex items-center gap-1 text-white hover:text-amber-400 transition font-bold"
            title="Call 24x7 Dispatch"
          >
            <PhoneIcon className="w-3 h-3 text-amber-400" />
            <span>+91 {SADHGURU_CONTACT.primaryPhone}</span>
          </a>
          <a
            href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20book%20a%20cab/bus.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xs:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
