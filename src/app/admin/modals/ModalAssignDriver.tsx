"use client";

import React, { useState } from "react";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { BookingItem, DriverUserItem } from "../types";
import { formatPickupDateTime } from "@/utils/formatPickupDateTime";

interface ModalAssignDriverProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingItem | null;
  drivers: DriverUserItem[];
  onAssigned: () => void;
}

export default function ModalAssignDriver({
  isOpen,
  onClose,
  booking,
  drivers,
  onAssigned,
}: ModalAssignDriverProps) {
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [sendWhatsApp, setSendWhatsApp] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen || !booking) return null;

  const chosenDriver = drivers.find((d) => d.id === selectedDriverId) || drivers[0];

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chosenDriver) {
      alert("Please select a chauffeur.");
      return;
    }

    setLoading(true);
    try {
      const vNum = vehicleNumber.trim() || chosenDriver.assigned_vehicle || "TS 08 UB 4512";

      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: booking.id,
          driverName: chosenDriver.name,
          driverPhone: chosenDriver.phone,
          vehicleNumber: vNum,
          status: "Driver Assigned",
        }),
      });

      if (res.ok) {
        if (sendWhatsApp) {
          const cleanPhone = chosenDriver.phone.replace(/[^0-9]/g, "");
          const targetPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

          const text =
            `*SRI SADHGURU TRAVELS - TRIP DISPATCH*\n\n` +
            `*Trip ID:* ${booking.id}\n` +
            `*Passenger:* ${booking.customerName}\n` +
            `*Passenger Phone:* ${booking.customerPhone}\n` +
            `*Vehicle:* ${booking.vehicleName} (${vNum})\n` +
            `*Pickup:* ${formatPickupDateTime(booking.pickupDateTime)}\n` +
            `*From:* ${booking.pickupLocation}\n` +
            `*To:* ${booking.dropLocation}\n` +
            `*Google Maps Route:* https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(booking.pickupLocation)}&destination=${encodeURIComponent(booking.dropLocation)}\n` +
            `*Duty Slip Link:* https://srisadgurutoursandtravels.com/trip-sheet?booking=${booking.id}\n\n` +
            `Report 15 mins prior. Drive safe!`;

          const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
          window.open(waUrl, "_blank");
        }

        onAssigned();
        onClose();
      } else {
        alert("Failed to assign chauffeur.");
      }
    } catch (err) {
      console.error("Assignment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Assign Chauffeur
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Allocate verified driver for {booking.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Trip snapshot */}
        <div className="mt-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-white">
            <span>{booking.customerName}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black">₹{booking.estimatedPrice}</span>
          </div>
          <p className="text-neutral-500 font-medium truncate flex items-center gap-1">
            <span>{booking.pickupLocation}</span>
            <ArrowRightIcon className="w-3 h-3 text-neutral-400 inline shrink-0" />
            <span>{booking.dropLocation}</span>
          </p>
          <p className="text-primary-600 dark:text-primary-400 font-bold">
            Pickup: {formatPickupDateTime(booking.pickupDateTime)}
          </p>
        </div>

        <form onSubmit={handleAssign} className="mt-5 space-y-4 text-xs">
          {/* Driver select */}
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Select Chauffeur *
            </label>
            <select
              value={selectedDriverId}
              onChange={(e) => {
                setSelectedDriverId(e.target.value);
                const d = drivers.find((x) => x.id === e.target.value);
                if (d?.assigned_vehicle) {
                  setVehicleNumber(d.assigned_vehicle);
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium outline-none"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.duty_status || "Available"}) — {d.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle plate number */}
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Vehicle Plate Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="e.g. TS 08 UB 4512"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          {/* Send WhatsApp checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="sendWa"
              checked={sendWhatsApp}
              onChange={(e) => setSendWhatsApp(e.target.checked)}
              className="w-4 h-4 rounded-md text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="sendWa" className="text-neutral-700 dark:text-neutral-300 font-semibold select-none">
              Open WhatsApp with pre-filled dispatch manifest
            </label>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold shadow-md shadow-primary-6000/25 active:scale-95 transition-all"
            >
              {loading ? "Allocating..." : "Confirm & Dispatch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
