"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalAddDriverProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverAdded: () => void;
}

export default function ModalAddDriver({
  isOpen,
  onClose,
  onDriverAdded,
}: ModalAddDriverProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [assignedVehicle, setAssignedVehicle] = useState("TS 08 UB 4512 (Innova Crysta)");
  const [password, setPassword] = useState("sadhguru123");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Name and phone number are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          role: "driver",
          password,
          assigned_vehicle: assignedVehicle,
          duty_status: "Available",
        }),
      });

      if (res.ok) {
        onDriverAdded();
        onClose();
      } else {
        alert("Failed to add driver.");
      }
    } catch (err) {
      console.error("Add driver error:", err);
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
              Add Verified Chauffeur
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Register driver for dispatch allocation and duty sheets</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Chauffeur Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. K. Shiva Kumar"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Mobile Phone (Login & WhatsApp) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9948011223"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Assigned Vehicle (Registration No. & Model)
            </label>
            <input
              type="text"
              value={assignedVehicle}
              onChange={(e) => setAssignedVehicle(e.target.value)}
              placeholder="e.g. TS 08 UB 4512 (Innova Crysta)"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Driver Portal Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono outline-none focus:border-primary-500"
            />
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
              {loading ? "Adding..." : "Register Chauffeur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
