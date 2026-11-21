"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SKY_CABS_FLEET } from "@/data/skyCabsFleet";
import { RateCardItem } from "../types";

interface ModalRateCardProps {
  isOpen: boolean;
  onClose: () => void;
  rateCards: RateCardItem[];
  onRatesUpdated: () => void;
}

export default function ModalRateCard({
  isOpen,
  onClose,
  rateCards,
  onRatesUpdated,
}: ModalRateCardProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("prime-sedan");

  const currentFleet = SKY_CABS_FLEET.find((f) => f.id === selectedVehicleId) || SKY_CABS_FLEET[0];
  const existingCard = rateCards.find((r) => r.vehicle_id === selectedVehicleId);

  const [perKm, setPerKm] = useState<number>(existingCard?.per_km_rate || currentFleet.perKmRate);
  const [airport, setAirport] = useState<number>(existingCard?.airport_flat_rate || currentFleet.airportFlatRate);
  const [local, setLocal] = useState<number>(existingCard?.local_8hr_80km || currentFleet.local8hr80km);
  const [bata, setBata] = useState<number>(existingCard?.driver_bata_per_day || 500);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    const fl = SKY_CABS_FLEET.find((f) => f.id === id) || SKY_CABS_FLEET[0];
    const ex = rateCards.find((r) => r.vehicle_id === id);
    setPerKm(ex?.per_km_rate || fl.perKmRate);
    setAirport(ex?.airport_flat_rate || fl.airportFlatRate);
    setLocal(ex?.local_8hr_80km || fl.local8hr80km);
    setBata(ex?.driver_bata_per_day || 500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_id: selectedVehicleId,
          name: currentFleet.name,
          category: currentFleet.category,
          capacity: currentFleet.capacity,
          per_km_rate: Number(perKm),
          airport_flat_rate: Number(airport),
          local_8hr_80km: Number(local),
          driver_bata_per_day: Number(bata),
          night_bata: 300,
          min_km_per_day: 300,
        }),
      });

      if (res.ok) {
        onRatesUpdated();
        onClose();
      } else {
        alert("Failed to update rate card.");
      }
    } catch (err) {
      console.error("Rate update error:", err);
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
              Update Rate Slabs
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Adjust standard fares for Bengaluru operations</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Select Vehicle Tier
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium outline-none"
            >
              {SKY_CABS_FLEET.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Outstation Rate / KM (₹)
              </label>
              <input
                type="number"
                required
                value={perKm}
                onChange={(e) => setPerKm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Airport Flat Rate (₹)
              </label>
              <input
                type="number"
                required
                value={airport}
                onChange={(e) => setAirport(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Local 8hr/80km Package (₹)
              </label>
              <input
                type="number"
                required
                value={local}
                onChange={(e) => setLocal(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Driver Bata / Day (₹)
              </label>
              <input
                type="number"
                required
                value={bata}
                onChange={(e) => setBata(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
              />
            </div>
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
              {loading ? "Saving..." : "Save Rate Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
