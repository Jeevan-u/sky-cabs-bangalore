"use client";

import React, { FC, useState, useEffect } from "react";
import {
  CameraIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { SpotlightCard } from "@/components/reactbits";

interface OdometerRecord {
  id: string;
  booking_id: string;
  driver_id: string;
  driver_name?: string;
  vehicle_number?: string;
  start_km: number;
  end_km?: number;
  total_km?: number;
  start_photo_url: string;
  end_photo_url?: string;
  start_time: string;
  end_time?: string;
  status: "Start_Submitted" | "Awaiting_Admin_Verification" | "Admin_Approved" | "Admin_Rejected" | "Customer_Confirmed" | "Auto_Approved";
  rejection_reason?: string;
  customer_otp?: string;
  customer_otp_verified?: boolean;
}

const OdometerVerificationView: FC = () => {
  const [records, setRecords] = useState<OdometerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/odometer");
      const data = await res.json();
      if (data.success && Array.isArray(data.records)) {
        setRecords(data.records);
      }
    } catch (err) {
      console.error("Failed to load odometer records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/odometer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Admin_Approved" }),
      });
      if (res.ok) {
        fetchRecords();
      }
    } catch (err) {
      console.error("Approval error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejecting the odometer reading.");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/odometer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Admin_Rejected", rejection_reason: rejectReason.trim() }),
      });
      if (res.ok) {
        setRejectingId(null);
        setRejectReason("");
        fetchRecords();
      }
    } catch (err) {
      console.error("Rejection error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary-6000">
            <CameraIcon className="w-4 h-4" />
            <span>Digital Speedometer & Distance Audit</span>
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-1 tracking-tight">
            Odometer Photo Verification Center
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
            Compare driver camera captures (Departure vs. Arrival), verify calculated distance, and issue customer verification OTP.
          </p>
        </div>

        <button
          onClick={fetchRecords}
          disabled={loading}
          className="px-5 py-2.5 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 text-neutral-700 dark:text-neutral-300 font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
        >
          <ArrowPathIcon className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Audit Queue
        </button>
      </div>

      {/* Verification Records List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading odometer audit records...</div>
      ) : records.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl text-neutral-400 text-xs">
          No odometer submissions currently in the queue.
        </div>
      ) : (
        <div className="space-y-6">
          {records.map((rec) => {
            const isAutoApproved = rec.status === "Auto_Approved";
            const isPendingAdmin = rec.status === "Awaiting_Admin_Verification";
            const isApproved = rec.status === "Admin_Approved" || rec.status === "Customer_Confirmed" || isAutoApproved;
            const isRejected = rec.status === "Admin_Rejected";

            return (
              <div
                key={rec.id}
                className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl space-y-5"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/40 flex items-center justify-center text-base shadow-2xs">
                      <CameraIcon className="w-5 h-5 text-primary-6000" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary-6000">{rec.id}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="font-bold text-neutral-900 dark:text-white text-xs">Trip #{rec.booking_id}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        Chauffeur: <strong>{rec.driver_name || "K. Shiva Kumar"}</strong> ({rec.vehicle_number || "Commercial Vehicle"})
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isAutoApproved && (
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                        <span>✅ Auto-Approved via OCR ({rec.total_km || 0} KM)</span>
                      </span>
                    )}
                    {!isAutoApproved && isPendingAdmin && (
                      <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[11px] border border-amber-500/30 flex items-center gap-1.5 animate-pulse">
                        <ClockIcon className="w-3.5 h-3.5 text-amber-500" />
                        <span>Awaiting Admin Approval</span>
                      </span>
                    )}
                    {!isAutoApproved && isApproved && (
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircleIcon className="w-3.5 h-3.5" /> Approved by Admin
                      </span>
                    )}
                    {isRejected && (
                      <span className="px-3.5 py-1.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-extrabold text-[11px] border border-rose-500/30 flex items-center gap-1.5">
                        <XCircleIcon className="w-3.5 h-3.5" /> Rejected (Recapture Sent)
                      </span>
                    )}
                  </div>
                </div>

                {/* Side-by-Side Photos & Readings with SpotlightCard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Start Odometer Card */}
                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.12)"
                    className="p-5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Starting Departure Photo
                      </span>
                      <span className="font-mono font-black text-base text-neutral-900 dark:text-white">
                        {rec.start_km.toLocaleString("en-IN")} KM
                      </span>
                    </div>

                    <div className="w-full h-48 rounded-xl bg-neutral-950 overflow-hidden relative border border-neutral-200 dark:border-neutral-700 shadow-inner">
                      {rec.start_photo_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={rec.start_photo_url} alt="Start Odometer" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          No Photo Uploaded
                        </div>
                      )}
                    </div>
                  </SpotlightCard>

                  {/* End Odometer Card */}
                  <SpotlightCard
                    spotlightColor="rgba(244, 63, 94, 0.12)"
                    className="p-5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        Ending Arrival Photo
                      </span>
                      <span className="font-mono font-black text-base text-neutral-900 dark:text-white">
                        {rec.end_km ? `${rec.end_km.toLocaleString("en-IN")} KM` : "In Progress..."}
                      </span>
                    </div>

                    <div className="w-full h-48 rounded-xl bg-neutral-950 overflow-hidden relative border border-neutral-200 dark:border-neutral-700 shadow-inner">
                      {rec.end_photo_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={rec.end_photo_url} alt="End Odometer" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          Trip in progress, final photo pending
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </div>

                {/* Distance Calculation Summary */}
                <div className="p-4 rounded-2xl bg-primary-50/80 dark:bg-primary-950/40 backdrop-blur-md border border-primary-200/60 dark:border-primary-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-primary-700 dark:text-primary-300">
                      Verified Distance Formula:
                    </span>
                    <span className="font-mono font-medium ml-2 text-neutral-700 dark:text-neutral-300">
                      {rec.end_km ? `${rec.end_km} - ${rec.start_km}` : "..."} ={" "}
                      <strong className="text-primary-6000 dark:text-primary-400 text-sm">
                        {rec.total_km ? `${rec.total_km} KM` : "Calculating..."}
                      </strong>
                    </span>
                  </div>

                  {rec.customer_otp && (
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">Customer OTP:</span>
                      <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-xs px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs inline-flex items-center gap-1">
                        <span>{rec.customer_otp}</span>
                        {rec.customer_otp_verified ? (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold">
                            (Verified <CheckCircleIcon className="w-3 h-3 text-emerald-500" />)
                          </span>
                        ) : (
                          <span className="text-neutral-400 font-normal">(Pending Confirmation)</span>
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Rejection reason notice if rejected */}
                {rec.rejection_reason && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold flex items-center gap-1.5">
                    <ExclamationTriangleIcon className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Rejection Note sent to driver: &quot;{rec.rejection_reason}&quot;</span>
                  </div>
                )}

                {/* Action Controls for Admin */}
                {isPendingAdmin && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                    {rejectingId === rec.id ? (
                      <div className="w-full flex items-center gap-2">
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Enter reason (e.g. Digits unreadable, meter glare)..."
                          className="flex-1 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs outline-none"
                        />
                        <button
                          onClick={() => handleReject(rec.id)}
                          disabled={actionLoading}
                          className="px-5 py-2 rounded-full bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20"
                        >
                          Confirm Reject
                        </button>
                        <button
                          onClick={() => setRejectingId(null)}
                          className="px-3 py-2 text-xs text-neutral-400 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setRejectingId(rec.id)}
                          disabled={actionLoading}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 font-bold text-xs transition"
                        >
                          Reject & Request Driver Recapture
                        </button>
                        <button
                          onClick={() => handleApprove(rec.id)}
                          disabled={actionLoading}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                          Approve Kilometres & Issue Customer OTP
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OdometerVerificationView;
