"use client";

import React, { FC, useState, useEffect } from "react";
import { XMarkIcon, SparklesIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { TourPackageItem } from "../types";

interface ModalTourPackageProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingPackage?: TourPackageItem | null;
}

const STATES = ["Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala", "Karnataka"];

export default function ModalTourPackage({
  isOpen,
  onClose,
  onSaved,
  editingPackage,
}: ModalTourPackageProps) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [image, setImage] = useState("/images/images1.jpg");
  const [dist, setDist] = useState("250 KM");
  const [days, setDays] = useState("1-2 Days");
  const [price, setPrice] = useState("4500");
  const [features, setFeatures] = useState("VIP Darshan Assistance, AC Cab, Certified Chauffeur");
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingPackage) {
      setName(editingPackage.name);
      setTagline(editingPackage.tagline);
      setState(editingPackage.state);
      setImage(editingPackage.image);
      setDist(editingPackage.dist);
      setDays(editingPackage.days);
      setPrice(editingPackage.price ? editingPackage.price.toString() : "4500");
      setFeatures(Array.isArray(editingPackage.features) ? editingPackage.features.join(", ") : "");
      setIsPublished(editingPackage.is_published !== false);
    } else {
      setName("");
      setTagline("");
      setState("Andhra Pradesh");
      setImage("/images/images1.jpg");
      setDist("250 KM");
      setDays("1-2 Days");
      setPrice("4500");
      setFeatures("VIP Darshan Assistance, AC Cab, Certified Chauffeur");
      setIsPublished(true);
    }
  }, [editingPackage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tagline.trim()) {
      alert("Please enter package name and tagline.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        tagline: tagline.trim(),
        state,
        image: image.trim() || "/images/images1.jpg",
        dist: dist.trim() || "250 KM",
        days: days.trim() || "1-2 Days",
        price: parseInt(price, 10) || 4500,
        features: features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        is_published: isPublished,
      };

      let res;
      if (editingPackage?.id) {
        res = await fetch("/api/tours-cms", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPackage.id, ...payload }),
        });
      } else {
        res = await fetch("/api/tours-cms", {
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
        alert(err.message || "Failed to save tour package.");
      }
    } catch (err) {
      console.error("Save tour package error:", err);
      alert("Failed to save tour package.");
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
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <SparklesIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              {editingPackage ? "Edit Tour Package" : "Add New Tour Package"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live Landing Page Pilgrimage & Holiday Packages
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Package Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mysuru Dam & Temple"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                State *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
              >
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Tagline / Highlights *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Mallikarjuna Jyotirlinga & Ghat Road"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Distance
              </label>
              <input
                type="text"
                value={dist}
                onChange={(e) => setDist(e.target.value)}
                placeholder="213 KM"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="1-2 Days"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Base Fare (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="4500"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Image URL or Local Path
            </label>
            <div className="relative">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/images1.jpg or https://..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
              <PhotoIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Package Inclusions / Features (Comma separated)
            </label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="VIP Darshan, Sanitized AC Cab, Certified Hill Chauffeur"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="pkg-published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="pkg-published" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Publish on Live Customer Landing Page
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
              {isSubmitting ? "Saving..." : editingPackage ? "Update Package" : "Publish Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
