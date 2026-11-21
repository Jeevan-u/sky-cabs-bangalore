"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SKY_CABS_FLEET } from "@/data/skyCabsFleet";
import { RateCardItem } from "../types";

interface ModalNewBookingProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated: () => void;
  rateCards: RateCardItem[];
}

export default function ModalNewBooking({
  isOpen,
  onClose,
  onBookingCreated,
  rateCards,
}: ModalNewBookingProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tripType, setTripType] = useState<string>("airport");
  const [vehicleId, setVehicleId] = useState<string>("innova-crysta");
  const [pickupLocation, setPickupLocation] = useState("Begur, Bengaluru");
  const [dropLocation, setDropLocation] = useState("Devanahalli RGI Airport");
  const [pickupDateTime, setPickupDateTime] = useState(
    new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );
  const [priceOverride, setPriceOverride] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const selectedVehicle = SKY_CABS_FLEET.find((f) => f.id === vehicleId) || SKY_CABS_FLEET[2];

  const computedPrice =
    tripType === "airport"
      ? selectedVehicle.airportFlatRate
      : tripType === "local"
      ? selectedVehicle.local8hr80km
      : selectedVehicle.perKmRate * 300;

  const finalPrice = priceOverride !== "" ? Number(priceOverride) : computedPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please provide customer name and phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          tripType,
          vehicleId: selectedVehicle.id,
          vehicleName: selectedVehicle.name,
          pickupLocation,
          dropLocation,
          pickupDateTime: new Date(pickupDateTime).toISOString(),
          estimatedPrice: finalPrice,
          notes,
        }),
      });

      if (res.ok) {
        onBookingCreated();
        onClose();
      } else {
        alert("Failed to create booking.");
      }
    } catch (err) {
      console.error("Booking creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Create New Dispatch Lead
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Manual booking intake for phone or walk-in inquiries</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Passenger details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Passenger Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Reddy"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. 9848012345"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Trip Type & Vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Trip Classification
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none font-medium"
              >
                <option value="airport">Airport Transfer (Devanahalli)</option>
                <option value="outstation">Outstation Round-Trip</option>
                <option value="local">Local City (8hr / 80km)</option>
                <option value="pilgrimage">Temple Pilgrimage</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Vehicle Model
              </label>
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none font-medium"
              >
                {SKY_CABS_FLEET.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup & Drop */}
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Pickup Address
            </label>
            <input
              type="text"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Destination / Drop Address
            </label>
            <input
              type="text"
              required
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          {/* Date & Time and Fare */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Pickup Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={pickupDateTime}
                onChange={(e) => setPickupDateTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Estimated Price (₹)
              </label>
              <input
                type="number"
                placeholder={`Auto: ₹${computedPrice}`}
                value={priceOverride}
                onChange={(e) =>
                  setPriceOverride(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none font-bold text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Special Instructions / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Flight 6E-512, need neat cab, senior citizens onboard"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 active:scale-95 transition-all"
            >
              {loading ? "Creating..." : `Confirm Booking (₹${finalPrice})`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
