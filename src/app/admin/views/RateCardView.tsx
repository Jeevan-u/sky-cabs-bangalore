"use client";

import React from "react";
import {
  PencilSquareIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { RateCardItem } from "../types";
import { SADHGURU_FLEET } from "@/data/sadhguruFleet";
import { SpotlightCard } from "@/components/reactbits";

interface RateCardViewProps {
  rateCards: RateCardItem[];
  onOpenRateCardModal: () => void;
}

export default function RateCardView({
  rateCards,
  onOpenRateCardModal,
}: RateCardViewProps) {
  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Transparent Rate Card Engine
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
            Standard outstation rates, flat airport fares, and driver batas for Hyderabad & Telangana
          </p>
        </div>
        <button
          onClick={onOpenRateCardModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 transition-all shrink-0 active:scale-95"
        >
          <PencilSquareIcon className="w-4 h-4" />
          Edit Rate Cards
        </button>
      </div>

      {/* Cards Grid with ReactBits SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SADHGURU_FLEET.map((fleet) => {
          const customRate = rateCards.find((r) => r.vehicle_id === fleet.id);
          const perKm = customRate ? customRate.per_km_rate : fleet.perKmRate;
          const airport = customRate ? customRate.airport_flat_rate : fleet.airportFlatRate;
          const local = customRate ? customRate.local_8hr_80km : fleet.local8hr80km;
          const bata = customRate ? customRate.driver_bata_per_day : 500;

          return (
            <SpotlightCard
              key={fleet.id}
              spotlightColor="rgba(99, 102, 241, 0.12)"
              className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden flex flex-col hover:border-primary-500/40 transition-all"
            >
              {/* Header */}
              <div className="p-5 bg-neutral-50/70 dark:bg-neutral-800/40 border-b border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">
                    {fleet.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                    {fleet.category} • {fleet.capacity}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-[10px] font-extrabold uppercase">
                  Active
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="p-5 flex-1 space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/80">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Outstation Per KM</span>
                  <span className="font-black text-neutral-900 dark:text-white text-sm">
                    ₹{perKm} / KM
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/80">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Airport Transfer (Kukatpally)</span>
                  <span className="font-black text-primary-600 dark:text-primary-400 text-sm">
                    ₹{airport}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/80">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Local 8 Hr / 80 KM</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    ₹{local}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/80">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Driver Bata per Day</span>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">
                    ₹{bata}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Min Outstation Distance</span>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">
                    300 KM / Day
                  </span>
                </div>
              </div>

              {/* Best For Tag */}
              <div className="px-5 py-3.5 bg-neutral-50/70 dark:bg-neutral-800/30 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">{fleet.bestFor}</span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
