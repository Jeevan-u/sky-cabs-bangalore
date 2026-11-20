"use client";

import React, { FC, useState, useEffect } from "react";
import { XMarkIcon, UsersIcon } from "@heroicons/react/24/outline";
import { DriverUserItem } from "../types";

interface ModalEditDriverProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  driver: DriverUserItem | null;
}

export default function ModalEditDriver({
  isOpen,
  onClose,
  onSaved,
  driver,
}: ModalEditDriverProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [assignedVehicle, setAssignedVehicle] = useState("");
  const [dutyStatus, setDutyStatus] = useState<"Available" | "On Duty" | "Off Duty">("Available");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (driver) {
      setName(driver.name || "");
      setPhone(driver.phone || "");
      setAssignedVehicle(driver.assigned_vehicle || "");
      setDutyStatus(driver.duty_status || "Available");
    }
  }, [driver, isOpen]);

  if (!isOpen || !driver) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please provide name and phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: driver.id,
          name: name.trim(),
          phone: phone.trim(),
          assigned_vehicle: assignedVehicle.trim(),
          duty_status: dutyStatus,
        }),
      });

      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update chauffeur.");
      }
    } catch (err) {
      console.error("Update chauffeur error:", err);
      alert("Failed to update chauffeur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
            <UsersIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              Edit Chauffeur Profile
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Verified Highway Pilot Information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Assigned Vehicle & Number
            </label>
            <input
              type="text"
              value={assignedVehicle}
              onChange={(e) => setAssignedVehicle(e.target.value)}
              placeholder="e.g. TS 09 UB 4455 (Dzire)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Duty Status
            </label>
            <select
              value={dutyStatus}
              onChange={(e) => setDutyStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="Available">Available (Ready for Dispatch)</option>
              <option value="On Duty">On Duty (In Transit)</option>
              <option value="Off Duty">Off Duty (Rest Period)</option>
            </select>
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
