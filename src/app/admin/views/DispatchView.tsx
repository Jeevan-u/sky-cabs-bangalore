"use client";

import React, { useState, useMemo } from "react";
import {
  TruckIcon,
  UserPlusIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  TrashIcon,
  PlusIcon,
  EyeIcon,
  ArrowRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import StatusBadge from "../components/StatusBadge";
import AdminTablePagination from "../components/AdminTablePagination";
import { BookingItem, DriverUserItem } from "../types";
import { formatPickupDateTime } from "@/utils/formatPickupDateTime";

interface DispatchViewProps {
  bookings: BookingItem[];
  drivers: DriverUserItem[];
  loading: boolean;
  onUpdateStatus: (id: string, status: BookingItem["status"]) => Promise<void>;
  onDeleteBooking?: (id: string) => Promise<void>;
  onOpenAssignModal: (booking: BookingItem) => void;
  onOpenNewBookingModal: () => void;
  onOpenBookingDetails?: (booking: BookingItem) => void;
  searchFilter: string;
}

type SortField = "id" | "date" | "customer" | "schedule" | "fare" | "driver" | "status";

export default function DispatchView({
  bookings,
  drivers,
  loading,
  onUpdateStatus,
  onDeleteBooking,
  onOpenAssignModal,
  onOpenNewBookingModal,
  onOpenBookingDetails,
  searchFilter,
}: DispatchViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedTripType, setSelectedTripType] = useState<string>("ALL");

  // Sorting State
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Filter Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // 1. Status Filter
      if (selectedStatus !== "ALL" && b.status.toUpperCase() !== selectedStatus) {
        return false;
      }
      // 2. Trip Type Filter
      if (
        selectedTripType !== "ALL" &&
        b.tripType?.toLowerCase() !== selectedTripType.toLowerCase()
      ) {
        return false;
      }
      // 3. Search Query Filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchName = b.customerName?.toLowerCase().includes(q);
        const matchPhone = b.customerPhone?.includes(q);
        const matchId = b.id?.toLowerCase().includes(q);
        const matchDriver = b.driverName?.toLowerCase().includes(q);
        const matchRoute =
          b.pickupLocation?.toLowerCase().includes(q) ||
          b.dropLocation?.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchId && !matchDriver && !matchRoute) {
          return false;
        }
      }
      return true;
    });
  }, [bookings, selectedStatus, selectedTripType, searchFilter]);

  // Sort Bookings
  const sortedBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "id":
          comparison = a.id.localeCompare(b.id);
          break;
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "customer":
          comparison = (a.customerName || "").localeCompare(b.customerName || "");
          break;
        case "schedule":
          comparison = new Date(a.pickupDateTime).getTime() - new Date(b.pickupDateTime).getTime();
          break;
        case "fare":
          comparison = (a.estimatedPrice || 0) - (b.estimatedPrice || 0);
          break;
        case "driver":
          comparison = (a.driverName || "zzz").localeCompare(b.driverName || "zzz");
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredBookings, sortField, sortDirection]);

  // Calculate Pagination Slices
  const totalPages = Math.max(1, Math.ceil(sortedBookings.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBookings = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return sortedBookings.slice(start, start + pageSize);
  }, [sortedBookings, safeCurrentPage, pageSize]);

  // Column Sort Handler
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

  // Generate WhatsApp dispatch message
  const handleSendWhatsAppToDriver = (b: BookingItem) => {
    const phone = b.driverPhone || "9632345415";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

    const text =
      `*SKY CABS BANGALORE - TRIP DISPATCH*\n\n` +
      `*Trip ID:* ${b.id}\n` +
      `*Customer:* ${b.customerName}\n` +
      `*Passenger Phone:* ${b.customerPhone}\n` +
      `*Vehicle:* ${b.vehicleName} (${b.vehicleNumber || "Assigned"})\n` +
      `*Pickup Time:* ${formatPickupDateTime(b.pickupDateTime)}\n` +
      `*Pickup:* ${b.pickupLocation}\n` +
      `*Drop:* ${b.dropLocation}\n` +
      `*Google Maps Route:* https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        b.pickupLocation
      )}&destination=${encodeURIComponent(b.dropLocation)}\n` +
      `*Trip Sheet:* https://skycabsbangalore.com/trip-sheet?booking=${b.id}\n\n` +
      `Please report to pickup 15 mins prior. Safe journey!`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Filters & Control Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs (Horizontally Scrollable Pill Row) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-nowrap w-full md:w-auto max-w-full">
          {["ALL", "PENDING", "CONFIRMED", "DRIVER ASSIGNED", "COMPLETED", "CANCELLED"].map(
            (tab) => {
              const count =
                tab === "ALL"
                  ? bookings.length
                  : bookings.filter((b) => b.status.toUpperCase() === tab).length;

              const isSelected = selectedStatus === tab;

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedStatus(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/25 scale-102"
                      : "bg-neutral-100/80 text-neutral-600 hover:bg-neutral-200/80 dark:bg-neutral-800/70 dark:text-neutral-300 dark:hover:bg-neutral-700/80"
                  }`}
                >
                  {tab === "DRIVER ASSIGNED" ? "ASSIGNED" : tab} ({count})
                </button>
              );
            }
          )}
        </div>

        {/* Trip Type Dropdown & New Booking */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-between sm:justify-end">
          <select
            value={selectedTripType}
            onChange={(e) => {
              setSelectedTripType(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-full text-xs bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700 focus:border-primary-500 text-neutral-800 dark:text-neutral-200 outline-none font-bold shadow-2xs"
          >
            <option value="ALL">All Categories</option>
            <option value="airport">Airport Transfers</option>
            <option value="outstation">Outstation Tours</option>
            <option value="local">Local City (8hr/80km)</option>
            <option value="pilgrimage">Pilgrimage (Mysuru/Tirupati)</option>
          </select>

          <button
            onClick={onOpenNewBookingModal}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 shrink-0 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-neutral-400">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-medium">Refreshing dispatch manifests...</p>
          </div>
        ) : sortedBookings.length === 0 ? (
          <div className="py-20 text-center text-neutral-400">
            <TruckIcon className="w-12 h-12 mx-auto mb-3 text-neutral-300 dark:text-neutral-700" />
            <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              No Bookings Found
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              No dispatch records match the selected status filter or search parameters.
            </p>
          </div>
        ) : (
          <div>
            {/* Mobile View: High-Density Booking Cards */}
            <div className="block md:hidden space-y-3 p-3.5 sm:p-4">
              {paginatedBookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => onOpenBookingDetails && onOpenBookingDetails(b)}
                  className="p-4 rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 space-y-3 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-neutral-200/80 dark:bg-neutral-700 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-600">
                        {b.id}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {new Date(b.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <select
                        value={b.status}
                        onChange={(e) =>
                          onUpdateStatus(b.id, e.target.value as BookingItem["status"])
                        }
                        className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 outline-none shadow-2xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Driver Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white text-sm">
                        {b.customerName}
                      </div>
                      <a
                        href={`tel:${b.customerPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <PhoneIcon className="w-3 h-3" />
                        {b.customerPhone}
                      </a>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                        ₹{b.estimatedPrice?.toLocaleString("en-IN")}
                      </span>
                      <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 font-medium truncate max-w-[140px]">
                        {b.vehicleName}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-600 dark:text-neutral-300 bg-white/70 dark:bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-medium">
                      <ClockIcon className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                      <span>{formatPickupDateTime(b.pickupDateTime)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate pt-0.5 font-medium">
                      <MapPinIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{b.pickupLocation}</span>
                      <ArrowRightIcon className="w-3 h-3 text-neutral-400 inline shrink-0 mx-0.5" />
                      <span className="truncate">{b.dropLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 gap-2" onClick={(e) => e.stopPropagation()}>
                    <div className="text-xs">
                      {b.driverName ? (
                        <div>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1 text-[11px]">
                            {b.driverName} <span className="font-mono text-neutral-400 text-[10px]">({b.vehicleNumber})</span>
                          </span>
                          <button
                            onClick={() => handleSendWhatsAppToDriver(b)}
                            className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <ChatBubbleLeftRightIcon className="w-3 h-3" />
                            WhatsApp
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenAssignModal(b)}
                          className="px-3 py-1 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-[11px] border border-amber-500/30 flex items-center gap-1 active:scale-95"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                          Assign Chauffeur
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {onOpenBookingDetails && (
                        <button
                          onClick={() => onOpenBookingDetails(b)}
                          className="px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-bold active:scale-95 transition-all"
                        >
                          Details
                        </button>
                      )}
                      <button
                        onClick={() => onOpenAssignModal(b)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs active:scale-95 transition-all"
                      >
                        {b.driverName ? "Reassign" : "Assign"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-[980px] w-full text-left text-xs">
                <thead className="bg-neutral-100/70 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-0 backdrop-blur-md z-10 select-none">
                  <tr>
                    <th
                      onClick={() => handleSort("id")}
                      className="py-3.5 px-3.5 w-24 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Booking ID</span>
                        {renderSortIndicator("id")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("customer")}
                      className="py-3.5 px-3.5 w-36 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Passenger Details</span>
                        {renderSortIndicator("customer")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("schedule")}
                      className="py-3.5 px-3.5 min-w-[200px] cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Schedule & Route</span>
                        {renderSortIndicator("schedule")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("fare")}
                      className="py-3.5 px-3.5 w-36 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Vehicle & Fare</span>
                        {renderSortIndicator("fare")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("driver")}
                      className="py-3.5 px-3.5 w-40 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Assigned Chauffeur</span>
                        {renderSortIndicator("driver")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="py-3.5 px-3.5 w-28 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors group whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Status</span>
                        {renderSortIndicator("status")}
                      </div>
                    </th>
                    <th className="py-3.5 px-3.5 w-44 text-right whitespace-nowrap pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {paginatedBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer"
                      onClick={() => onOpenBookingDetails && onOpenBookingDetails(b)}
                    >
                      {/* Booking ID & Time */}
                      <td className="py-3.5 px-3.5 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-bold border border-neutral-200/80 dark:border-neutral-700/80">
                          {b.id}
                        </span>
                        <span className="block text-[10px] font-medium text-neutral-400 mt-0.5">
                          {new Date(b.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Passenger */}
                      <td className="py-3.5 px-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {(b.customerName || "C").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-900 dark:text-white truncate max-w-[120px]">
                              {b.customerName}
                            </div>
                            <a
                              href={`tel:${b.customerPhone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <PhoneIcon className="w-3 h-3" />
                              {b.customerPhone}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Schedule & Route */}
                      <td className="py-3.5 px-3.5 max-w-xs">
                        <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-semibold text-[11px]">
                          <ClockIcon className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                          {formatPickupDateTime(b.pickupDateTime)}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                          <MapPinIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate font-medium">{b.pickupLocation}</span>
                          <ArrowRightIcon className="w-3 h-3 text-neutral-400 inline shrink-0 mx-0.5" />
                          <span className="truncate font-medium">{b.dropLocation}</span>
                        </div>
                      </td>

                      {/* Vehicle & Price */}
                      <td className="py-3.5 px-3.5 whitespace-nowrap">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[150px]">
                          {b.vehicleName}
                        </div>
                        <div className="font-black text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                          ₹{b.estimatedPrice?.toLocaleString("en-IN")}
                        </div>
                      </td>

                      {/* Driver */}
                      <td className="py-3.5 px-3.5" onClick={(e) => e.stopPropagation()}>
                        {b.driverName ? (
                          <div>
                            <p className="font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[140px]">
                              {b.driverName}
                            </p>
                            <p className="text-[10px] text-neutral-400 font-mono">
                              {b.vehicleNumber}
                            </p>
                            <button
                              onClick={() => handleSendWhatsAppToDriver(b)}
                              className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                              title="Dispatch WhatsApp Message"
                            >
                              <ChatBubbleLeftRightIcon className="w-3 h-3" />
                              WhatsApp Dispatch
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onOpenAssignModal(b)}
                            className="px-3 py-1.5 rounded-xl bg-primary-6000 hover:bg-primary-700 text-white font-bold text-[11px] shadow-sm shadow-primary-6000/20 flex items-center gap-1 active:scale-95 transition-all whitespace-nowrap"
                          >
                            <UserPlusIcon className="w-3 h-3" />
                            Assign
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={b.status}
                          onChange={(e) =>
                            onUpdateStatus(b.id, e.target.value as BookingItem["status"])
                          }
                          className="px-2 py-1 rounded-xl text-[11px] font-bold bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 outline-none shadow-2xs"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Driver Assigned">Assigned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3.5 text-right whitespace-nowrap pr-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {onOpenBookingDetails && (
                            <button
                              onClick={() => onOpenBookingDetails(b)}
                              className="px-2.5 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-[11px] font-bold hover:bg-primary-100 dark:hover:bg-primary-900/60 transition-colors flex items-center gap-1"
                            >
                              <EyeIcon className="w-3.5 h-3.5" />
                              <span>Details</span>
                            </button>
                          )}
                          <button
                            onClick={() => onOpenAssignModal(b)}
                            className="px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1"
                          >
                            <UserPlusIcon className="w-3.5 h-3.5" />
                            <span>{b.driverName ? "Reassign" : "Assign"}</span>
                          </button>
                          {onDeleteBooking && (
                            <button
                              onClick={() => onDeleteBooking(b.id)}
                              className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
                              title="Delete Trip Record"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          )}
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
              totalItems={sortedBookings.length}
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