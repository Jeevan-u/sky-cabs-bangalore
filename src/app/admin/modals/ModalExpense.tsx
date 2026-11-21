"use client";

import React, { FC, useState, useEffect } from "react";
import { XMarkIcon, BanknotesIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ExpenseItem } from "../types";
import { SKY_CABS_FLEET } from "@/data/skyCabsFleet";

interface ModalExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingExpense?: ExpenseItem | null;
}

const CATEGORIES = [
  "Fuel (Diesel/Petrol)",
  "FASTag & Tolls",
  "Vehicle Maintenance & Repairs",
  "Chauffeur Batta & Food",
  "Permits & Border Tax",
  "Tyres, Oil & Spares",
  "Insurance & RTA Compliance",
  "Miscellaneous",
];

const PAYMENT_MODES = [
  "FASTag Wallet",
  "Cash",
  "UPI / GPay",
  "Company Card",
  "Bank Transfer",
];

export default function ModalExpense({
  isOpen,
  onClose,
  onSaved,
  editingExpense,
}: ModalExpenseProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [vehicleNumber, setVehicleNumber] = useState("KA 09 UB 4455");
  const [vehicleName, setVehicleName] = useState("Prime Sedan");
  const [driverName, setDriverName] = useState("K. Shiva Kumar");
  const [category, setCategory] = useState("Fuel (Diesel/Petrol)");
  const [amount, setAmount] = useState("2500");
  const [paymentMode, setPaymentMode] = useState("Company Card");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Paid");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setDate(editingExpense.date || new Date().toISOString().split("T")[0]);
      setVehicleNumber(editingExpense.vehicle_number || "KA 09 UB 4455");
      setVehicleName(editingExpense.vehicle_name || "");
      setDriverName(editingExpense.driver_name || "");
      setCategory(editingExpense.category || "Fuel (Diesel/Petrol)");
      setAmount(editingExpense.amount ? editingExpense.amount.toString() : "2500");
      setPaymentMode(editingExpense.payment_mode || "Company Card");
      setNotes(editingExpense.notes || "");
      setStatus(editingExpense.status || "Paid");
      setReceiptUrl(editingExpense.receipt_url || "");
    } else {
      setDate(new Date().toISOString().split("T")[0]);
      setVehicleNumber("KA 09 UB 4455");
      setVehicleName("Prime Sedan");
      setDriverName("K. Shiva Kumar");
      setCategory("Fuel (Diesel/Petrol)");
      setAmount("2500");
      setPaymentMode("Company Card");
      setNotes("");
      setStatus("Paid");
      setReceiptUrl("");
    }
  }, [editingExpense, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNumber.trim() || !amount.trim()) {
      alert("Please provide vehicle number and expense amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        date,
        vehicle_number: vehicleNumber.trim(),
        vehicle_name: vehicleName.trim(),
        driver_name: driverName.trim(),
        category,
        amount: parseFloat(amount) || 0,
        payment_mode: paymentMode,
        notes: notes.trim(),
        status,
        receipt_url: receiptUrl.trim(),
      };

      let res;
      if (editingExpense?.id) {
        res = await fetch("/api/expenses", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingExpense.id, ...payload }),
        });
      } else {
        res = await fetch("/api/expenses", {
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
        alert(err.message || "Failed to record expense.");
      }
    } catch (err) {
      console.error("Save expense error:", err);
      alert("Failed to record expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <BanknotesIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              {editingExpense ? "Edit Expense Entry" : "Record Vehicle & Fleet Expense"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Fuel, FASTag, Maintenance, Chauffeur Batta & Spares
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Expense Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="2500"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono font-bold text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Vehicle Number *
              </label>
              <input
                type="text"
                required
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="KA 09 UB 4455"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Vehicle Model
              </label>
              <input
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                placeholder="Innova Crysta / Prime Sedan"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Expense Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              >
                {PAYMENT_MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Incurred By / Driver
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="K. Shiva Kumar"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                Audit Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              >
                <option value="Paid">Paid</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Reimbursed">Reimbursed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Description / Vendor Details / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. IOCL Begur (Full Tank Diesel), Invoice #98221"
              className="w-full p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">
              Bill / Receipt URL or Image
            </label>
            <input
              type="text"
              value={receiptUrl}
              onChange={(e) => setReceiptUrl(e.target.value)}
              placeholder="https://... or /images/receipts/fuel-1001.jpg"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
            />
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
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-lg shadow-rose-500/25 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : editingExpense ? "Update Expense" : "Record Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
