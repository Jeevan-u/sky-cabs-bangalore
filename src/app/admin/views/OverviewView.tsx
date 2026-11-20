"use client";

import React from "react";
import {
  TruckIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  UserPlusIcon,
  ArrowRightIcon,
  PrinterIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import StatusBadge from "../components/StatusBadge";
import { AdminTabType, BookingItem, DutySlipItem, DriverUserItem } from "../types";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";

interface OverviewViewProps {
  bookings: BookingItem[];
  dutySlips: DutySlipItem[];
  drivers: DriverUserItem[];
  onNavigateTab: (tab: AdminTabType) => void;
  onOpenAssignModal: (booking: BookingItem) => void;
  onOpenNewBookingModal: () => void;
  onOpenPrintModal: (slip: DutySlipItem) => void;
  onOpenBookingDetails?: (booking: BookingItem) => void;
  searchFilter?: string;
}

export default function OverviewView({
  bookings,
  dutySlips,
  drivers,
  onNavigateTab,
  onOpenAssignModal,
  onOpenNewBookingModal,
  onOpenPrintModal,
  onOpenBookingDetails,
  searchFilter = "",
}: OverviewViewProps) {
  const pendingBookings = bookings.filter((b) => b.status === "Pending");
  const activeBookings = bookings.filter(
    (b) => b.status === "Confirmed" || b.status === "Driver Assigned" || b.status === "In Progress"
  );
  const totalRevenue = dutySlips.reduce((sum, s) => sum + (s.total_amount || 0), 0);
  const availableDrivers = drivers.filter(
    (d) => d.duty_status === "Available" || (!d.duty_status && d.role === "driver")
  );

  const filteredBookings = bookings.filter((b) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      b.id?.toLowerCase().includes(q) ||
      b.customerName?.toLowerCase().includes(q) ||
      b.customerPhone?.includes(q) ||
      b.driverName?.toLowerCase().includes(q) ||
      b.vehicleName?.toLowerCase().includes(q) ||
      b.pickupLocation?.toLowerCase().includes(q) ||
      b.dropLocation?.toLowerCase().includes(q) ||
      b.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 font-sans">
      {/* 1. ReactBits Spotlight KPI Cards with Animated Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Active Dispatches */}
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.22)"
          onClick={() => onNavigateTab("dispatch")}
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400">
              Active Dispatches
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40 shadow-2xs">
              <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              <AnimatedCounter to={activeBookings.length} duration={1.2} />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Fleet Live
            </span>
          </div>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 sm:line-clamp-none">
            Trips currently on road or scheduled
          </p>
        </SpotlightCard>

        {/* Gross Completed Fare */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.22)"
          onClick={() => onNavigateTab("dutyslips")}
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400">
              Gross Completed Fare
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 shadow-2xs">
              <CurrencyRupeeIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              <AnimatedCounter
                to={totalRevenue}
                prefix="₹"
                formatter={(v) => v.toLocaleString("en-IN")}
                duration={1.5}
              />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 sm:px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 sm:line-clamp-none">
            {dutySlips.length} digital duty slips verified
          </p>
        </SpotlightCard>

        {/* Urgent Leads Pending */}
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.25)"
          onClick={() => onNavigateTab("dispatch")}
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400">
              Urgent Leads Pending
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40 shadow-2xs">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-500 tracking-tight">
              <AnimatedCounter to={pendingBookings.length} duration={1} />
            </span>
            {pendingBookings.length > 0 ? (
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                Action Needed
              </span>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                All Assigned
              </span>
            )}
          </div>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 sm:line-clamp-none">
            Requires immediate chauffeur assignment
          </p>
        </SpotlightCard>

        {/* Google Reputation */}
        <SpotlightCard
          spotlightColor="rgba(217, 70, 239, 0.22)"
          onClick={() => onNavigateTab("reviews")}
          className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400">
              Google Reputation
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40 shadow-2xs">
              <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-500 tracking-tight flex items-center gap-1">
              4.9 <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 inline fill-amber-400 text-amber-400" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-1.5 sm:px-2 py-0.5 rounded-full">
              Shielded
            </span>
          </div>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 sm:line-clamp-none">
            Protected by AI Review Gating
          </p>
        </SpotlightCard>
      </div>

      {/* 2. Urgent Action Alert (Landing Page ChisFis Glassmorphism Card) */}
      {pendingBookings.length > 0 && (
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-amber-500/30 dark:border-neutral-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500 text-neutral-950 font-bold shrink-0 shadow-md shadow-amber-500/20">
              <ClockIcon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>
                  {pendingBookings.length} Customer Booking{pendingBookings.length > 1 ? "s" : ""} Waiting for Driver Assignment
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase border border-amber-400/30">
                  Priority Lead
                </span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5 font-medium">
                Allocate a chauffeur now to generate the instant WhatsApp assignment notification.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenAssignModal(pendingBookings[0])}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 active:scale-95 transition-all self-end md:self-auto shrink-0"
          >
            <UserPlusIcon className="w-4 h-4 stroke-[2.2]" />
            Assign Driver for {pendingBookings[0].id}
          </button>
        </div>
      )}

      {/* 3. Main Grid: Live Dispatch Snapshot + Recent Duty Slips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Dispatches */}
        <div className="lg:col-span-2 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
                Live Dispatch Control
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Recent bookings, assigned chauffeurs, and destination status
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("dispatch")}
              className="text-xs font-bold text-primary-6000 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              View All ({searchFilter.trim() ? `${filteredBookings.length} matched` : bookings.length})
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-14 text-neutral-400">
              <p className="text-sm">
                {searchFilter.trim()
                  ? `No bookings match "${searchFilter}".`
                  : "No bookings recorded yet."}
              </p>
              <button
                onClick={onOpenNewBookingModal}
                className="mt-3 px-5 py-2.5 text-xs font-bold rounded-2xl bg-primary-6000 text-white shadow-md shadow-primary-6000/20"
              >
                Create First Booking
              </button>
            </div>
          ) : (
            <>
              {/* Mobile View: High-Density Booking Cards */}
              <div className="block md:hidden space-y-3">
                {filteredBookings.slice(0, 6).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onOpenBookingDetails && onOpenBookingDetails(b)}
                    className="p-4 rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 space-y-3 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-neutral-200/80 dark:bg-neutral-700 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {b.id}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {new Date(b.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <StatusBadge status={b.status} size="sm" />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-200/50 dark:border-neutral-700/50">
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {b.customerName}
                        </div>
                        <a
                          href={`tel:${b.customerPhone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-primary-600 dark:text-primary-400 font-medium"
                        >
                          {b.customerPhone}
                        </a>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                          ₹{b.estimatedPrice?.toLocaleString("en-IN")}
                        </span>
                        <span className="block text-[10px] text-neutral-400 truncate max-w-[120px]">
                          {b.vehicleName}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-600 dark:text-neutral-300 bg-white/70 dark:bg-neutral-900/60 p-2 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{b.pickupLocation}</span>
                        <ArrowRightIcon className="w-3 h-3 text-neutral-400 inline shrink-0 mx-0.5" />
                        <span className="truncate">{b.dropLocation}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="text-xs">
                        {b.driverName ? (
                          <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1 text-[11px]">
                            Chauffeur: {b.driverName}
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            Unassigned
                          </span>
                        )}
                      </div>
                      {b.status === "Pending" ? (
                        <button
                          onClick={() => onOpenAssignModal(b)}
                          className="px-3.5 py-1.5 rounded-xl bg-primary-6000 text-white font-bold text-[11px] shadow-sm active:scale-95 transition-all"
                        >
                          Assign Driver
                        </button>
                      ) : (
                        <button
                          onClick={() => (onOpenBookingDetails ? onOpenBookingDetails(b) : onNavigateTab("dispatch"))}
                          className="px-3.5 py-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-[11px] active:scale-95 transition-all"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View with Full Width & No Cramping */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-[800px] w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px] font-extrabold tracking-wider">
                      <th className="py-3 px-3 w-28 whitespace-nowrap">Booking ID</th>
                      <th className="py-3 px-3 min-w-[140px]">Customer</th>
                      <th className="py-3 px-3 min-w-[140px]">Vehicle</th>
                      <th className="py-3 px-3 min-w-[180px]">Route</th>
                      <th className="py-3 px-3 min-w-[130px]">Driver</th>
                      <th className="py-3 px-3 w-28 whitespace-nowrap">Status</th>
                      <th className="py-3 px-3 w-24 text-right whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                    {filteredBookings.slice(0, 6).map((b) => (
                      <tr
                        key={b.id}
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer"
                        onClick={() => onOpenBookingDetails && onOpenBookingDetails(b)}
                      >
                        <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100 font-mono whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-bold border border-neutral-200 dark:border-neutral-700">
                            {b.id}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                              {(b.customerName || "C").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-neutral-900 dark:text-white truncate max-w-[130px]">
                                {b.customerName}
                              </div>
                              <div className="text-[10px] text-neutral-400 font-mono">{b.customerPhone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs block truncate max-w-[150px]">
                            {b.vehicleName}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 max-w-[200px]">
                          <p className="truncate text-neutral-600 dark:text-neutral-300 font-medium text-xs flex items-center gap-1">
                            <span className="truncate">{b.pickupLocation}</span>
                            <ArrowRightIcon className="w-3 h-3 text-neutral-400 inline shrink-0" />
                            <span className="truncate">{b.dropLocation}</span>
                          </p>
                        </td>
                        <td className="py-3.5 px-3">
                          {b.driverName ? (
                            <div>
                              <span className="font-bold text-neutral-900 dark:text-neutral-200 block truncate max-w-[130px]">
                                {b.driverName}
                              </span>
                              <span className="block text-[10px] text-neutral-400 font-mono">
                                {b.vehicleNumber}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <StatusBadge status={b.status} size="sm" />
                        </td>
                        <td className="py-3.5 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          {b.status === "Pending" ? (
                            <button
                              onClick={() => onOpenAssignModal(b)}
                              className="px-3 py-1.5 rounded-xl bg-primary-6000 hover:bg-primary-700 text-white font-bold text-[11px] shadow-sm shadow-primary-6000/20 active:scale-95 transition-all"
                            >
                              Assign
                            </button>
                          ) : (
                            <button
                              onClick={() => (onOpenBookingDetails ? onOpenBookingDetails(b) : onNavigateTab("dispatch"))}
                              className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] font-semibold hover:bg-neutral-200 transition-colors"
                            >
                              Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Right 1 Col: Quick Dispatch Launcher + Signed Duty Slips + Chauffeur Status */}
        <div className="space-y-6">
          {/* Rapid Dispatch Launcher matching Landing Page Hero Widget */}
          <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <SparklesIcon className="w-4 h-4 text-amber-500" />
                  Quick Dispatch Trigger
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                  Direct dispatch launch for phone or desk walk-in
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onOpenNewBookingModal}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-primary-6000 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-primary-6000/20 active:scale-98 transition-all group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Launch New Trip Order</span>
                </span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={onOpenNewBookingModal}
                  className="p-2.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 text-center transition-colors border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block uppercase">Airport</span>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200">RGIA Fly</span>
                </button>
                <button
                  onClick={onOpenNewBookingModal}
                  className="p-2.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 text-center transition-colors border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block uppercase">Pilgrim</span>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200">Darshan</span>
                </button>
                <button
                  onClick={onOpenNewBookingModal}
                  className="p-2.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 text-center transition-colors border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block uppercase">Convoy</span>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200">VIP Fleet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Duty Slips Feed */}
          <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Signed Duty Slips
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  Customer touchscreen verified
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("dutyslips")}
                className="text-xs font-bold text-primary-6000 dark:text-primary-400 hover:underline"
              >
                All
              </button>
            </div>

            <div className="space-y-3">
              {dutySlips.length === 0 ? (
                <p className="text-xs text-neutral-400 py-6 text-center">
                  No completed duty slips logged yet.
                </p>
              ) : (
                dutySlips.slice(0, 4).map((slip) => (
                  <div
                    key={slip.id}
                    className="p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between gap-3 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-neutral-900 dark:text-white">
                          {slip.customer_name}
                        </span>
                        <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate font-medium">
                        {slip.trip_route} • {slip.total_km} KM
                      </p>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        ₹{slip.total_amount?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenPrintModal(slip)}
                      className="p-2 rounded-xl bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 shadow-2xs shrink-0 transition-colors"
                      title="Print Official Tax Invoice"
                    >
                      <PrinterIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chauffeur Readiness Tile */}
          <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Chauffeur Readiness
              </h3>
              <button
                onClick={() => onNavigateTab("fleet")}
                className="text-xs font-bold text-primary-6000 dark:text-primary-400 hover:underline"
              >
                Roster
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                <span>Available for Duty</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold">
                  {availableDrivers.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-400 border border-primary-500/20 text-xs font-bold">
                <span>Currently on Highway Trip</span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-6000 text-white font-extrabold">
                  {drivers.length - availableDrivers.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
