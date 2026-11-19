"use client";

import React, { useRef } from "react";
import { XMarkIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { DutySlipItem } from "../types";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

interface ModalPrintInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  slip: DutySlipItem | null;
}

export default function ModalPrintInvoice({
  isOpen,
  onClose,
  slip,
}: ModalPrintInvoiceProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !slip) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Modal Controls (Hidden in print) */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">Tax Invoice & Digital Duty Slip</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
              Verified & Signed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <PrinterIcon className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div ref={printAreaRef} className="pt-6 space-y-6 text-xs text-neutral-800 dark:text-neutral-200 font-sans">
          {/* Header & Logo */}
          <div className="flex items-start justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-4">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                SRI SADHGURU TOURS & TRAVELS
              </h1>
              <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mt-0.5">
                Premium Car Rentals • Airport Transfers • Outstation Packages
              </p>
              <p className="text-[10px] text-neutral-600 dark:text-neutral-400 mt-1 max-w-md">
                KPHB Colony, Kukatpally, Hyderabad - 500072 & Gandhari, Kamareddy
              </p>
              <p className="text-[10px] text-neutral-600 dark:text-neutral-400">
                Phone: <span className="font-semibold">{SADHGURU_CONTACT.primaryPhoneFormatted}</span> | Email: sadhgurutravels.hyd@gmail.com
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-xs uppercase font-mono">
                INVOICE
              </span>
              <p className="text-xs font-mono font-bold mt-1.5">{slip.id}</p>
              <p className="text-[10px] text-neutral-500">
                Date: {new Date(slip.completed_at || Date.now()).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          {/* Passenger & Vehicle Details Grid */}
          <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Billed To (Passenger)</p>
              <p className="font-bold text-sm text-neutral-950 dark:text-white mt-1">{slip.customer_name}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Phone: {slip.customer_phone}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Route: {slip.trip_route}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Duty / Vehicle Details</p>
              <p className="font-bold text-sm text-neutral-950 dark:text-white mt-1">
                {slip.vehicle_model} ({slip.vehicle_number})
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Chauffeur: {slip.driver_name}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Booking Reference: {slip.booking_id || "Direct Dispatch"}
              </p>
            </div>
          </div>

          {/* Odometer & Fare Breakdown Table */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase text-[10px] tracking-wider border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Reading / Qty</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                <tr>
                  <td className="py-2.5 px-3">
                    <p className="font-semibold text-neutral-900 dark:text-white">Total Distance Traveled</p>
                    <p className="text-[10px] text-neutral-500">
                      Start Odometer: {slip.start_km} KM | End Odometer: {slip.end_km} KM
                    </p>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold">
                    {slip.total_km} KM
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-neutral-900 dark:text-white">
                    ₹{(slip.total_amount - (slip.toll_parking || 0) - (slip.driver_bata || 0)).toLocaleString("en-IN")}
                  </td>
                </tr>

                {slip.toll_parking > 0 && (
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-white">
                      Toll Gate & Airport Parking Charges
                    </td>
                    <td className="py-2.5 px-3 text-center text-neutral-500">Actuals</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-neutral-900 dark:text-white">
                      ₹{slip.toll_parking.toLocaleString("en-IN")}
                    </td>
                  </tr>
                )}

                {slip.driver_bata > 0 && (
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-white">
                      Chauffeur Day / Night Allowance (Bata)
                    </td>
                    <td className="py-2.5 px-3 text-center text-neutral-500">Standard</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-neutral-900 dark:text-white">
                      ₹{slip.driver_bata.toLocaleString("en-IN")}
                    </td>
                  </tr>
                )}

                <tr className="bg-neutral-50 dark:bg-neutral-800/50 font-bold text-sm">
                  <td colSpan={2} className="py-3 px-3 text-right text-neutral-950 dark:text-white">
                    Grand Total Fare:
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 text-base">
                    ₹{slip.total_amount?.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signatures & Payment Footer */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Customer Digital Touch Signature</p>
              <div className="mt-2 h-16 w-48 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-xl flex items-center justify-center p-1 overflow-hidden">
                {slip.signature_data_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={slip.signature_data_url}
                    alt="Customer Signature"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-[10px] text-neutral-400 italic">Signed Digitally</span>
                )}
              </div>
              <p className="text-[9px] text-neutral-400 mt-1">Verified on driver touchscreen</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-neutral-400">For Sri Sadhguru Tours & Travels</p>
              <div className="mt-6">
                <p className="font-bold text-xs text-neutral-900 dark:text-white">Authorized Signatory</p>
                <p className="text-[10px] text-neutral-500">Sri Rathan Kanna (Proprietor)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
