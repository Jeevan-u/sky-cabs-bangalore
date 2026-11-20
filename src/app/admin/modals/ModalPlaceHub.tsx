"use client";

import React, { FC, useState, useEffect } from "react";
import { XMarkIcon, MapPinIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { PlaceHubItem } from "../types";

interface ModalPlaceHubProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingHub?: PlaceHubItem | null;
}

export default function ModalPlaceHub({
  isOpen,
  onClose,
  onSaved,
  editingHub,
}: ModalPlaceHubProps) {
  const [name, setName] = useState("");
  const [href, setHref] = useState("/shamshabad-airport-taxi");
  const [count, setCount] = useState("250");
  const [thumbnail, setThumbnail] = useState("/images/hubs/kukatpally-hq.jpg");
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingHub) {
      setName(editingHub.name);
      setHref(editingHub.href);
      setCount(editingHub.count ? editingHub.count.toString() : "250");
      setThumbnail(editingHub.thumbnail);
      setIsPublished(editingHub.is_published !== false);
    } else {
      setName("");
      setHref("/shamshabad-airport-taxi");
      setCount("250");
      setThumbnail("/images/hubs/kukatpally-hq.jpg");
      setIsPublished(true);
    }
  }, [editingHub, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter hub/place name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        href: href.trim() || "/shamshabad-airport-taxi",
        count: parseInt(count, 10) || 100,
        thumbnail: thumbnail.trim() || "/images/hubs/kukatpally-hq.jpg",
        is_published: isPublished,
      };

      let res;
      if (editingHub?.id) {
        res = await fetch("/api/places-cms", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingHub.id, ...payload }),
        });
      } else {
        res = await fetch("/api/places-cms", {
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
        alert(err.message || "Failed to save operational hub.");
      }
    } catch (err) {
      console.error("Save place hub error:", err);
      alert("Failed to save operational hub.");
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
          <div className="w-10 h-10 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
            <MapPinIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              {editingHub ? "Edit Operational Hub" : "Add Operational Hub"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Live Landing Page 24x7 Pickup Stations Carousel
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Hub / Landmark Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kukatpally (IDL Lake) or RGIA Shamshabad"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Target Route URL
              </label>
              <input
                type="text"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="/cabs-in-kukatpally"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Monthly Rides Served
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="240"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Hub Photo (Local path or URL)
            </label>
            <div className="relative">
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="/images/hubs/kukatpally-hq.jpg or https://..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
              />
              <PhotoIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="hub-published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="hub-published" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Publish on Live Landing Page Carousel
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
              {isSubmitting ? "Saving..." : editingHub ? "Update Hub" : "Create Hub"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
