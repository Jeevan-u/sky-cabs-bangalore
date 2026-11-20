"use client";

import React, { FC, useState, useEffect } from "react";
import { XMarkIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

interface ModalRouteProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingRoute?: any | null;
}

export default function ModalRoute({
  isOpen,
  onClose,
  onSaved,
  editingRoute,
}: ModalRouteProps) {
  const [title, setTitle] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [category, setCategory] = useState<"outstation_route" | "popular_hub" | "tour_package">("outstation_route");
  const [distanceKm, setDistanceKm] = useState("150");
  const [sedanPrice, setSedanPrice] = useState("3500");
  const [suvPrice, setSuvPrice] = useState("4800");
  const [ttPrice, setTtPrice] = useState("7500");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingRoute) {
      setTitle(editingRoute.title || "");
      setFromLocation(editingRoute.from_location || "");
      setToLocation(editingRoute.to_location || "");
      setCategory(editingRoute.category || "outstation_route");
      setDistanceKm(editingRoute.distance_km ? editingRoute.distance_km.toString() : "150");
      setSedanPrice(editingRoute.sedan_price ? editingRoute.sedan_price.toString() : "3500");
      setSuvPrice(editingRoute.suv_price ? editingRoute.suv_price.toString() : "4800");
      setTtPrice(editingRoute.tt_price ? editingRoute.tt_price.toString() : "7500");
      setDescription(editingRoute.description || "");
      setIsPublished(editingRoute.is_published !== false);
    } else {
      setTitle("");
      setFromLocation("");
      setToLocation("");
      setCategory("outstation_route");
      setDistanceKm("150");
      setSedanPrice("3500");
      setSuvPrice("4800");
      setTtPrice("7500");
      setDescription("");
      setIsPublished(true);
    }
  }, [editingRoute, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fromLocation.trim() || !toLocation.trim()) {
      alert("Please provide Title, Starting Location, and Destination.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        from_location: fromLocation.trim(),
        to_location: toLocation.trim(),
        category,
        distance_km: parseInt(distanceKm, 10) || 100,
        sedan_price: parseInt(sedanPrice, 10) || 2000,
        suv_price: parseInt(suvPrice, 10) || 3000,
        tt_price: parseInt(ttPrice, 10) || 5000,
        description: description.trim(),
        is_published: isPublished,
      };

      let res;
      if (editingRoute?.id) {
        res = await fetch("/api/routes-cms", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingRoute.id, ...payload }),
        });
      } else {
        res = await fetch("/api/routes-cms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to save route.");
      }
    } catch (err) {
      console.error("Save route error:", err);
      alert("Failed to save route.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <GlobeAltIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              {editingRoute ? "Edit Outstation Route" : "Add Outstation Route"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live Landing Page Outstation Route Corridor
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Route Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hyderabad to Srisailam Jyotirlinga Yatra"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                From Location *
              </label>
              <input
                type="text"
                required
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="Hyderabad / Kukatpally"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                To Destination *
              </label>
              <input
                type="text"
                required
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="Srisailam / Tirupati"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Distance (KM)
              </label>
              <input
                type="number"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Sedan (₹)
              </label>
              <input
                type="number"
                value={sedanPrice}
                onChange={(e) => setSedanPrice(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                SUV (₹)
              </label>
              <input
                type="number"
                value={suvPrice}
                onChange={(e) => setSuvPrice(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Tempo (₹)
              </label>
              <input
                type="number"
                value={ttPrice}
                onChange={(e) => setTtPrice(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Route Highlights & Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Scenic highway drive with ghat road certified chauffeur."
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="route-published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="route-published" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Publish on Live Landing Page Outstation Grid
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
              {isSubmitting ? "Saving..." : editingRoute ? "Update Route" : "Create Route"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
