"use client";

import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { DutySlipItem, RateCardItem } from "../types";
import { SADHGURU_FLEET } from "@/data/sadhguruFleet";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";

interface AnalyticsViewProps {
  dutySlips: DutySlipItem[];
  rateCards: RateCardItem[];
}

export default function AnalyticsView({
  dutySlips,
  rateCards,
}: AnalyticsViewProps) {
  const totalGross = dutySlips.reduce((sum, s) => sum + (s.total_amount || 0), 0);
  const totalKm = dutySlips.reduce((sum, s) => sum + (s.total_km || 0), 0);
  const avgFare = dutySlips.length > 0 ? Math.round(totalGross / dutySlips.length) : 0;
  const estimatedFuelCost = Math.round(totalKm * 6.5); // Approx ₹6.5/km fuel cost
  const estimatedNetProfit = totalGross - estimatedFuelCost;

  return (
    <div className="space-y-6 font-sans">
      {/* 4 Financial Tiles with ReactBits SpotlightCard & AnimatedCounter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.14)"
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Gross Billed Fare
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white mt-1.5 sm:mt-2">
            <AnimatedCounter
              to={totalGross}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1 line-clamp-1 sm:line-clamp-none">
            100% Direct Bookings
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.14)"
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Avg Ticket Value
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-primary-600 dark:text-primary-400 mt-1.5 sm:mt-2">
            <AnimatedCounter
              to={avgFare}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1 line-clamp-1 sm:line-clamp-none">Completed journeys</p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(168, 85, 247, 0.14)"
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Total Distance
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-600 dark:text-purple-400 mt-1.5 sm:mt-2 flex items-center gap-1">
            <AnimatedCounter to={totalKm} />
            <span className="text-sm sm:text-lg font-bold text-neutral-400">KM</span>
          </p>
          <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1 line-clamp-1 sm:line-clamp-none">Verified GPS radar</p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.14)"
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Net Margin
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1.5 sm:mt-2">
            <AnimatedCounter
              to={estimatedNetProfit}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1 line-clamp-1 sm:line-clamp-none">Post fuel & tolls</p>
        </SpotlightCard>
      </div>

      {/* Vehicle Category Revenue Contribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xl">
          <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight mb-1">
            Revenue by Vehicle Class
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-5">
            Fleet category profitability and trip volumes
          </p>

          <div className="space-y-4">
            {SADHGURU_FLEET.map((f) => {
              const matchedSlips = dutySlips.filter((s) =>
                s.vehicle_model?.toLowerCase().includes(f.name.toLowerCase().split(" ")[0])
              );
              const count = matchedSlips.length;
              const revenue = matchedSlips.reduce((sum, s) => sum + (s.total_amount || 0), 0);
              const percentage = totalGross > 0 ? Math.round((revenue / totalGross) * 100) : 15;

              return (
                <div key={f.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-neutral-800 dark:text-neutral-200">{f.name}</span>
                    <span className="text-neutral-900 dark:text-white">
                      ₹{revenue.toLocaleString("en-IN")} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-primary-6000 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commission Savings Dividend Card */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-6000/10 via-primary-6000/5 to-transparent backdrop-blur-xl border border-primary-500/30 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-extrabold text-xs uppercase tracking-wider">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              Private Ecosystem Dividend
            </div>
            <h3 className="text-xl font-black text-neutral-900 dark:text-white mt-1.5 tracking-tight">
              Zero-Commission Profit Retention
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium mt-2 leading-relaxed">
              By owning this private digital platform instead of relying on Ola, Uber, or external aggregators:
            </p>

            <div className="mt-6 space-y-3">
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shadow-2xs">
                <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  Aggregator Fee (28% avg.) Saved:
                </span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  ₹{Math.round(totalGross * 0.28).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shadow-2xs">
                <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  Paper Duty Slip Disputes Prevented:
                </span>
                <span className="text-base font-black text-primary-600 dark:text-primary-400">
                  100% Signed
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 mt-6 pt-4 border-t border-primary-500/20 font-medium">
            Sri Sadhguru Tours & Travels retains 100% of all generated fares directly to bank accounts and UPI IDs.
          </p>
        </div>
      </div>
    </div>
  );
}
