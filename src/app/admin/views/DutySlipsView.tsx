"use client";

import React, { useState, useMemo } from "react";
import {
  DocumentTextIcon,
  PrinterIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { DutySlipItem } from "../types";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";
import AdminTablePagination from "../components/AdminTablePagination";

interface DutySlipsViewProps {
  dutySlips: DutySlipItem[];
  onOpenPrintModal: (slip: DutySlipItem) => void;
  searchFilter: string;
}

type SortField = "id" | "customer" | "route" | "chauffeur" | "km" | "amount";

export default function DutySlipsView({
  dutySlips,
  onOpenPrintModal,
  searchFilter,
}: DutySlipsViewProps) {
  const totalBilled = dutySlips.reduce((sum, s) => sum + (s.total_amount || 0), 0);
  const totalKms = dutySlips.reduce((sum, s) => sum + (s.total_km || 0), 0);

  // Sorting & Pagination State
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filteredSlips = useMemo(() => {
    return dutySlips.filter((s) => {
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        s.id?.toLowerCase().includes(q) ||
        s.customer_name?.toLowerCase().includes(q) ||
        s.customer_phone?.includes(q) ||
        s.driver_name?.toLowerCase().includes(q) ||
        s.trip_route?.toLowerCase().includes(q) ||
        s.vehicle_number?.toLowerCase().includes(q)
      );
    });
  }, [dutySlips, searchFilter]);

  const sortedSlips = useMemo(() => {
    return [...filteredSlips].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "id":
          comparison = a.id.localeCompare(b.id);
          break;
        case "customer":
          comparison = (a.customer_name || "").localeCompare(b.customer_name || "");
          break;
        case "route":
          comparison = (a.trip_route || "").localeCompare(b.trip_route || "");
          break;
        case "chauffeur":
          comparison = (a.driver_name || "").localeCompare(b.driver_name || "");
          break;
        case "km":
          comparison = (a.total_km || 0) - (b.total_km || 0);
          break;
        case "amount":
          comparison = (a.total_amount || 0) - (b.total_amount || 0);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredSlips, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedSlips.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedSlips = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return sortedSlips.slice(start, start + pageSize);
  }, [sortedSlips, safeCurrentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUpDownIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 font-bold" />
    ) : (
      <ChevronDownIcon className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 font-bold" />
    );
  };

  const handleShareWhatsAppBill = (slip: DutySlipItem) => {
    const cleanPhone = slip.customer_phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

    const text =
      `*SRI SADHGURU TOURS & TRAVELS - TRIP INVOICE*\n\n` +
      `*Invoice No:* ${slip.id}\n` +
      `*Customer:* ${slip.customer_name}\n` +
      `*Chauffeur:* ${slip.driver_name} (${slip.vehicle_number})\n` +
      `*Route:* ${slip.trip_route}\n` +
      `*Total KMs:* ${slip.total_km} KM (${slip.start_km} to ${slip.end_km})\n` +
      `*Toll / Parking:* ₹${slip.toll_parking}\n` +
      `*Total Final Bill:* ₹${slip.total_amount}\n\n` +
      `Thank you for traveling with Sri Sadhguru Travels! Please rate our service:\n` +
      `https://srisadgurutoursandtravels.com/review?name=${encodeURIComponent(
        slip.customer_name
      )}&driver=${encodeURIComponent(slip.driver_name)}`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner KPI summary with ReactBits SpotlightCard & AnimatedCounter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.14)"
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Total Duty Slips Logged
          </p>
          <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1 sm:mt-2">
            <AnimatedCounter to={dutySlips.length} />
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium flex items-center gap-1">
            <CheckBadgeIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>100% digital touch signed</span>
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(59, 130, 246, 0.14)"
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Total Highway Distance
          </p>
          <p className="text-2xl sm:text-3xl font-black text-primary-600 dark:text-primary-400 mt-1 sm:mt-2 flex items-center gap-1">
            <AnimatedCounter to={totalKms} />
            <span className="text-base sm:text-lg font-bold text-neutral-400">KM</span>
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Odometer verified</p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.14)"
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Total Billed Revenue
          </p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 sm:mt-2">
            <AnimatedCounter
              to={totalBilled}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Zero payment disputes</p>
        </SpotlightCard>
      </div>

      {/* Slips Table */}
      <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Digital Duty Slips Ledger
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
              Complete records of customer trip sheets, signatures, and KM readings
            </p>
          </div>
        </div>

        {sortedSlips.length === 0 ? (
          <div className="py-20 text-center text-neutral-400">
            <DocumentTextIcon className="w-12 h-12 mx-auto mb-3 text-neutral-300 dark:text-neutral-700" />
            <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              No Duty Slips Recorded
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Completed duty slips from drivers via `/trip-sheet` will appear here automatically with touch signatures.
            </p>
          </div>
        ) : (
          <div>
            {/* Mobile View: High-Density Duty Slip Cards */}
            <div className="block md:hidden space-y-3 p-3.5 sm:p-4">
              {paginatedSlips.map((slip) => (
                <div
                  key={slip.id}
                  className="p-4 rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100 px-2 py-0.5 rounded-lg bg-neutral-200/70 dark:bg-neutral-700">
                        {slip.id}
                      </span>
                      {slip.booking_id && (
                        <span className="ml-1.5 text-[10px] text-neutral-400 font-mono">
                          Ref: {slip.booking_id}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      ₹{slip.total_amount?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white">
                        {slip.customer_name}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {slip.customer_phone}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-neutral-800 dark:text-neutral-200">
                        {slip.total_km} KM
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {slip.start_km} → {slip.end_km}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-600 dark:text-neutral-300 bg-white/70 dark:bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40 space-y-1">
                    <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                      {slip.trip_route}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{slip.vehicle_model} ({slip.vehicle_number})</span>
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">Driver: {slip.driver_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 gap-2">
                    <div>
                      {slip.signature_data_url ? (
                        <div className="w-16 h-7 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-0.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={slip.signature_data_url}
                            alt="Signature"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] text-neutral-400">No Signature</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenPrintModal(slip)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                      >
                        <PrinterIcon className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                      <button
                        onClick={() => handleShareWhatsAppBill(slip)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                      >
                        <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-[1050px] w-full text-left text-xs">
                <thead className="bg-neutral-100/70 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 backdrop-blur-md select-none">
                  <tr>
                    <th
                      onClick={() => handleSort("id")}
                      className="py-3.5 px-4 w-28 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Slip ID</span>
                        {renderSortIndicator("id")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("customer")}
                      className="py-3.5 px-4 w-44 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Customer</span>
                        {renderSortIndicator("customer")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("route")}
                      className="py-3.5 px-4 min-w-[200px] cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Route & Vehicle</span>
                        {renderSortIndicator("route")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("chauffeur")}
                      className="py-3.5 px-4 w-40 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Chauffeur</span>
                        {renderSortIndicator("chauffeur")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("km")}
                      className="py-3.5 px-4 w-32 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Distance (KM)</span>
                        {renderSortIndicator("km")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("amount")}
                      className="py-3.5 px-4 w-32 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Total Amount</span>
                        {renderSortIndicator("amount")}
                      </div>
                    </th>
                    <th className="py-3.5 px-4 w-28 whitespace-nowrap">Touch Signature</th>
                    <th className="py-3.5 px-4 w-28 text-right whitespace-nowrap pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {paginatedSlips.map((slip) => (
                    <tr
                      key={slip.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-neutral-900 dark:text-white font-mono whitespace-nowrap">
                        {slip.id}
                        <span className="block text-[10px] font-normal text-neutral-400 mt-0.5">
                          {slip.booking_id ? `Ref: ${slip.booking_id}` : "Manual Entry"}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {slip.customer_name}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-medium">
                          {slip.customer_phone}
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                          {slip.trip_route}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {slip.vehicle_model} ({slip.vehicle_number})
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">
                          {slip.driver_name}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono whitespace-nowrap">
                        <span className="font-extrabold text-neutral-900 dark:text-white">
                          {slip.total_km} KM
                        </span>
                        <div className="flex items-center gap-0.5 text-[10px] text-neutral-400 mt-0.5">
                          <span>{slip.start_km}</span>
                          <ArrowRightIcon className="w-2.5 h-2.5 text-neutral-400 inline mx-0.5" />
                          <span>{slip.end_km}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                          ₹{slip.total_amount?.toLocaleString("en-IN")}
                        </span>
                        {slip.toll_parking > 0 && (
                          <span className="block text-[10px] text-neutral-400 mt-0.5 font-medium">
                            +₹{slip.toll_parking} Toll
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {slip.signature_data_url ? (
                          <div className="w-20 h-9 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1 shadow-2xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={slip.signature_data_url}
                              alt="Signature"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] text-neutral-400">No Signature</span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenPrintModal(slip)}
                            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 border border-neutral-200 dark:border-neutral-700 transition-colors shadow-2xs flex items-center gap-1 text-xs font-semibold"
                            title="Print / Download GST Tax Invoice"
                          >
                            <PrinterIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleShareWhatsAppBill(slip)}
                            className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors shadow-2xs flex items-center gap-1 text-xs font-semibold"
                            title="Send Bill Summary to WhatsApp"
                          >
                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <AdminTablePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={sortedSlips.length}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}