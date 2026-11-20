"use client";

import React, { FC, useState, useEffect } from "react";
import { XMarkIcon, TruckIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { FleetVehicleItem } from "../types";

interface ModalVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingVehicle?: FleetVehicleItem | null;
}

const CATEGORIES = ["Sedan", "SUV", "Premium SUV", "Tempo Traveller", "Luxury Coach"];

export default function ModalVehicle({
  isOpen,
  onClose,
  onSaved,
  editingVehicle,
}: ModalVehicleProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Sedan");
  const [capacity, setCapacity] = useState("4+1 Passenger");
  const [luggage, setLuggage] = useState("2 Large Bags");
  const [ac, setAc] = useState(true);
  const [image, setImage] = useState("/images/fleet/swift-dzire.jpg");
  const [perKmRate, setPerKmRate] = useState("12");
  const [airportFlatRate, setAirportFlatRate] = useState("1299");
  const [local8hr80km, setLocal8hr80km] = useState("2199");
  const [driverBattaPerDay, setDriverBattaPerDay] = useState("500");
  const [nightBatta, setNightBatta] = useState("300");
  const [minKmPerDay, setMinKmPerDay] = useState("300");
  const [extraHourRate, setExtraHourRate] = useState("150");
  const [features, setFeatures] = useState("Dual AC, Clean & Sanitized, Fastag Enabled");
  const [description, setDescription] = useState("");
  const [bestFor, setBestFor] = useState("Airport Drops, Local & Outstation Journeys");
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingVehicle) {
      setName(editingVehicle.name);
      setCategory(editingVehicle.category);
      setCapacity(editingVehicle.capacity);
      setLuggage(editingVehicle.luggage);
      setAc(editingVehicle.ac !== false);
      setImage(editingVehicle.image);
      setPerKmRate(editingVehicle.perKmRate ? editingVehicle.perKmRate.toString() : "12");
      setAirportFlatRate(editingVehicle.airportFlatRate ? editingVehicle.airportFlatRate.toString() : "1299");
      setLocal8hr80km(editingVehicle.local8hr80km ? editingVehicle.local8hr80km.toString() : "2199");
      setDriverBattaPerDay(editingVehicle.driverBattaPerDay ? editingVehicle.driverBattaPerDay.toString() : "500");
      setNightBatta(editingVehicle.nightBatta ? editingVehicle.nightBatta.toString() : "300");
      setMinKmPerDay(editingVehicle.minKmPerDay ? editingVehicle.minKmPerDay.toString() : "300");
      setExtraHourRate(editingVehicle.extraHourRate ? editingVehicle.extraHourRate.toString() : "150");
      setFeatures(Array.isArray(editingVehicle.features) ? editingVehicle.features.join(", ") : "");
      setDescription(editingVehicle.description || "");
      setBestFor(editingVehicle.bestFor || "");
      setIsPublished(editingVehicle.is_published !== false);
    } else {
      setName("");
      setCategory("Sedan");
      setCapacity("4+1 Passenger");
      setLuggage("2 Large Bags");
      setAc(true);
      setImage("/images/fleet/swift-dzire.jpg");
      setPerKmRate("12");
      setAirportFlatRate("1299");
      setLocal8hr80km("2199");
      setDriverBattaPerDay("500");
      setNightBatta("300");
      setMinKmPerDay("300");
      setExtraHourRate("150");
      setFeatures("Dual AC, Clean & Sanitized, Fastag Enabled");
      setDescription("Pristine maintained commercial vehicle with commercial transport permit.");
      setBestFor("Airport Drops, Local & Outstation Journeys");
      setIsPublished(true);
    }
  }, [editingVehicle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter vehicle model name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        category,
        capacity: capacity.trim() || "4+1 Passenger",
        luggage: luggage.trim() || "2 Large Bags",
        ac,
        image: image.trim() || "/images/fleet/swift-dzire.jpg",
        perKmRate: parseInt(perKmRate, 10) || 12,
        airportFlatRate: parseInt(airportFlatRate, 10) || 1299,
        local8hr80km: parseInt(local8hr80km, 10) || 2199,
        driverBattaPerDay: parseInt(driverBattaPerDay, 10) || 500,
        nightBatta: parseInt(nightBatta, 10) || 300,
        minKmPerDay: parseInt(minKmPerDay, 10) || 300,
        extraHourRate: parseInt(extraHourRate, 10) || 150,
        features: features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        description: description.trim() || "Pristine maintained commercial passenger vehicle.",
        bestFor: bestFor.trim() || "Airport Drops & Outstation Trips",
        is_published: isPublished,
      };

      let res;
      if (editingVehicle?.id) {
        res = await fetch("/api/fleet", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingVehicle.id, ...payload }),
        });
      } else {
        res = await fetch("/api/fleet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to save vehicle.");
      }
    } catch (err) {
      console.error("Save vehicle error:", err);
      alert("Failed to save vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <TruckIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              {editingVehicle ? "Edit Fleet Vehicle" : "Add New Fleet Vehicle"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live Landing Page Fleet Overview & Booking Catalog
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Vehicle Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Toyota Innova Crysta"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Passenger Seating
              </label>
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="7+1 / 6+1 Captain Seats"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Luggage Space
              </label>
              <input
                type="text"
                value={luggage}
                onChange={(e) => setLuggage(e.target.value)}
                placeholder="4 Large + 3 Small Bags"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
          </div>

          {/* Rate Card Engine Pricing Block */}
          <div className="p-4 rounded-2xl bg-primary-50/50 dark:bg-primary-950/20 border border-primary-200/60 dark:border-primary-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Rate Card Engine & Pricing Slabs
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">Standard Fares</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  Outstation / KM (₹)
                </label>
                <input
                  type="number"
                  value={perKmRate}
                  onChange={(e) => setPerKmRate(e.target.value)}
                  placeholder="19"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-bold text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  Airport Flat (₹)
                </label>
                <input
                  type="number"
                  value={airportFlatRate}
                  onChange={(e) => setAirportFlatRate(e.target.value)}
                  placeholder="2199"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-bold text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  Local 8h/80km (₹)
                </label>
                <input
                  type="number"
                  value={local8hr80km}
                  onChange={(e) => setLocal8hr80km(e.target.value)}
                  placeholder="3699"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-bold text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  Driver Batta / Day (₹)
                </label>
                <input
                  type="number"
                  value={driverBattaPerDay}
                  onChange={(e) => setDriverBattaPerDay(e.target.value)}
                  placeholder="500"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  Night Batta (₹)
                </label>
                <input
                  type="number"
                  value={nightBatta}
                  onChange={(e) => setNightBatta(e.target.value)}
                  placeholder="300"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  Min KM / Day
                </label>
                <input
                  type="number"
                  value={minKmPerDay}
                  onChange={(e) => setMinKmPerDay(e.target.value)}
                  placeholder="300"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Vehicle Image (Local path or URL)
            </label>
            <div className="relative">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/fleet/innova-crysta.jpg or https://..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
              <PhotoIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Features (Comma separated)
            </label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Captain Seats, Dual Automatic AC, Highway Cruiser"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="veh-published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="veh-published" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Publish on Live Landing Page Fleet Showcase
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-primary-6000 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : editingVehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
