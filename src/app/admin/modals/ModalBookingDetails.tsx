"use client";

import React, { FC } from "react";
import {
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import StatusBadge from "../components/StatusBadge";
import { BookingItem } from "../types";
import { formatPickupDateTime } from "@/utils/formatPickupDateTime";

interface ModalBookingDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingItem | null;
  onOpenAssignModal?: (booking: BookingItem) => void;
  onUpdateStatus?: (id: string, status: BookingItem["status"]) => Promise<void>;
  onNavigateTab?: (tab: any) => void;
}

export default function ModalBookingDetails({
  isOpen,
  onClose,
  booking,
  onOpenAssignModal,
  onUpdateStatus,
  onNavigateTab,
}: ModalBookingDetailsProps) {
  if (!isOpen || !booking) return null;

  const cleanCustomerPhone = (booking.customerPhone || "").replace(/[^0-9]/g, "");
  const targetCustomerPhone = cleanCustomerPhone.startsWith("91")
    ? cleanCustomerPhone
    : `91${cleanCustomerPhone}`;

  const cleanDriverPhone = (booking.driverPhone || "").replace(/[^0-9]/g, "");
  const targetDriverPhone = cleanDriverPhone.startsWith("91")
    ? cleanDriverPhone
    : `91${cleanDriverPhone}`;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    booking.pickupLocation
  )}&destination=${encodeURIComponent(booking.dropLocation)}`;

  const handleCustomerWhatsApp = () => {
    const text =
      `*Sky Cabs Bangalore - Trip Update*\n\n` +
      `Namaste ${booking.customerName}!\n` +
      `Your booking *#${booking.id}* is currently: *${booking.status}*.\n` +
      `• Vehicle: ${booking.vehicleName} (${booking.vehicleNumber || "Assigned"})\n` +
      `• Pickup: ${booking.pickupLocation}\n` +
      `• Drop: ${booking.dropLocation}\n` +
      `• Time: ${formatPickupDateTime(booking.pickupDateTime)}\n` +
      (booking.driverName
        ? `• Chauffeur: ${booking.driverName} (+91 ${booking.driverPhone})\n\n`
        : `• Chauffeur allocation in progress.\n\n`) +
      `Live Journey Tracking: https://skycabsbangalore.com/track-booking?id=${booking.id}\n\n` +
      `24x7 Helpline: +91 96323 45415. Have a safe journey!`;

    window.open(`https://wa.me/${targetCustomerPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleDriverWhatsApp = () => {
    if (!booking.driverPhone) return;
    const text =
      `*SKY CABS BANGALORE - TRIP DISPATCH*\n\n` +
      `*Trip ID:* ${booking.id}\n` +
      `*Passenger:* ${booking.customerName}\n` +
      `*Phone:* ${booking.customerPhone}\n` +
      `*Vehicle:* ${booking.vehicleName} (${booking.vehicleNumber || "Commercial"})\n` +
      `*Pickup Time:* ${formatPickupDateTime(booking.pickupDateTime)}\n` +
      `*Pickup:* ${booking.pickupLocation}\n` +
      `*Drop:* ${booking.dropLocation}\n` +
      `*Google Maps Route:* ${googleMapsUrl}\n\n` +
      `Please report 15 mins prior. Drive safe!`;

    window.open(`https://wa.me/${targetDriverPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-mono font-bold border border-neutral-200 dark:border-neutral-700">
                #{booking.id}
              </span>
              <StatusBadge status={booking.status} />
              <span className="text-[11px] text-neutral-400 capitalize font-medium">
                • {booking.tripType} Booking
              </span>
            </div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white mt-1.5">
              Trip Dispatch Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-xs">
          {/* Passenger Information Tile */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-md shadow-primary-500/20">
                {(booking.customerName || "P").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Passenger Contact
                </p>
                <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">
                  {booking.customerName}
                </h4>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">{booking.customerPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${booking.customerPhone}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-bold text-neutral-800 dark:text-neutral-200 hover:border-primary-500 transition shadow-2xs"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-primary-600" />
                <span>Call Passenger</span>
              </a>
              <button
                type="button"
                onClick={handleCustomerWhatsApp}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm shadow-emerald-600/20"
              >
                <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Route & Schedule Tile */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4 text-primary-6000" />
                Pickup Schedule: {formatPickupDateTime(booking.pickupDateTime)}
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-6000 dark:text-primary-400 hover:underline"
              >
                <span>Google Maps Route</span>
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Pickup Location
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-white text-xs mt-0.5">
                    {booking.pickupLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Drop Destination
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-white text-xs mt-0.5">
                    {booking.dropLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle & Chauffeur Assignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vehicle Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <TruckIcon className="w-3.5 h-3.5" />
                Vehicle Category & Fare
              </p>
              <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">
                {booking.vehicleName}
              </h4>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                ₹{booking.estimatedPrice?.toLocaleString("en-IN")}{" "}
                <span className="text-[10px] font-normal text-neutral-400">(Customer Fare)</span>
              </p>
            </div>

            {/* Chauffeur Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                Assigned Chauffeur
              </p>
              {booking.driverName ? (
                <div>
                  <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">
                    {booking.driverName}
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                    {booking.vehicleNumber} • {booking.driverPhone}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handleDriverWhatsApp}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs hover:bg-emerald-500"
                    >
                      <ChatBubbleLeftRightIcon className="w-3 h-3" />
                      Chauffeur WhatsApp
                    </button>
                    {onOpenAssignModal && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAssignModal(booking);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-[10px] hover:bg-neutral-300"
                      >
                        Reassign
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-amber-600 dark:text-amber-400 font-bold text-xs">
                    No Chauffeur Assigned
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Allocate an available driver to begin telemetry
                  </p>
                  {onOpenAssignModal && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAssignModal(booking);
                      }}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-primary-6000 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-primary-700"
                    >
                      <UserPlusIcon className="w-3.5 h-3.5" />
                      Assign Chauffeur
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Status Updater */}
          {onUpdateStatus && (
            <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between gap-3">
              <span className="font-bold text-neutral-700 dark:text-neutral-300 text-xs">
                Trip Lifecycle Status:
              </span>
              <select
                value={booking.status}
                onChange={(e) => onUpdateStatus(booking.id, e.target.value as BookingItem["status"])}
                className="px-3 py-1.5 rounded-xl font-bold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs outline-none focus:border-primary-500"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Driver Assigned">Driver Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="text-[11px] text-neutral-400 font-mono">
            Created: {new Date(booking.createdAt).toLocaleString("en-IN")}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-xs text-neutral-800 dark:text-neutral-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
