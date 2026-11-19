"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MagnifyingGlassIcon,
  TruckIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon, ExclamationTriangleIcon } from "@/components/icons";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { formatPickupDateTime } from "@/utils/formatPickupDateTime";
import {
  SpotlightCard,
  StarBorder,
  MagneticButton,
  ShinyText,
  BorderBeam,
  ShimmerButton,
} from "@/components/reactbits";

interface TrackedBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  tripType: string;
  vehicleName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  estimatedPrice: number;
  status: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
}

export default function TrackBookingPage() {
  const searchParams = useSearchParams();
  const initialId = searchParams?.get("id") || searchParams?.get("bookingId") || "";

  const [searchTerm, setSearchTerm] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackedBooking | null>(null);
  const [searched, setSearched] = useState(false);
  const [odometerRecord, setOdometerRecord] = useState<any | null>(null);
  const [customerOtp, setCustomerOtp] = useState<string>("");
  const [otpVerifying, setOtpVerifying] = useState<boolean>(false);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState<string>("");
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");

  const fetchBooking = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    setOtpSuccessMessage("");
    setOtpErrorMessage("");
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        const q = query.trim().toLowerCase();
        const found = data.bookings.find(
          (b: any) =>
            b.id?.toLowerCase() === q ||
            b.customer_phone?.replace(/[^0-9]/g, "") === q.replace(/[^0-9]/g, "")
        );

        if (found) {
          setResult({
            id: found.id,
            customerName: found.customer_name || "Valued Passenger",
            customerPhone: found.customer_phone || "",
            tripType: found.trip_type || "airport",
            vehicleName: found.vehicle_type || "Toyota Innova Crysta",
            pickupLocation: found.pickup_address || "Kukatpally, Hyderabad",
            dropLocation: found.drop_address || "Shamshabad Airport",
            pickupDateTime: found.pickup_datetime || new Date().toISOString(),
            estimatedPrice: found.estimated_price || 0,
            status: found.status || "Pending",
            driverName: found.driver_name,
            driverPhone: found.driver_phone,
            vehicleNumber: found.vehicle_number,
          });

          // Fetch odometer status for this booking
          try {
            const odoRes = await fetch(`/api/odometer?bookingId=${found.id}`);
            const odoData = await odoRes.json();
            if (odoData.success && Array.isArray(odoData.records) && odoData.records.length > 0) {
              setOdometerRecord(odoData.records[0]);
            } else {
              setOdometerRecord(null);
            }
          } catch {}
        } else {
          setResult(null);
          setOdometerRecord(null);
        }
      }
    } catch (err) {
      console.error("Booking tracking error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchBooking(initialId);
    }
  }, [initialId]);

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerOtp.trim() || !result) {
      setOtpErrorMessage("Please enter the 6-digit verification OTP.");
      return;
    }

    setOtpVerifying(true);
    setOtpErrorMessage("");
    setOtpSuccessMessage("");

    try {
      const res = await fetch("/api/verify-ride-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: result.id, otp: customerOtp.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to verify OTP.");
      }

      setOtpSuccessMessage(data.message);
      setResult((prev) => (prev ? { ...prev, status: "Completed" } : null));
      setOdometerRecord((prev: any) => (prev ? { ...prev, status: "Customer_Confirmed", customer_otp_verified: true } : null));
    } catch (err: any) {
      setOtpErrorMessage(err.message || "Invalid OTP code.");
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(searchTerm);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block">
            <StarBorder as="div" color="#10b981" speed="4s">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <TruckIcon className="w-4 h-4 text-emerald-500" />
                <span>Live Journey & Chauffeur Status</span>
              </span>
            </StarBorder>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Track Your Booking
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Enter your mobile number or Booking ID to check your chauffeur assignment and live trip details.
          </p>
        </div>

        {/* Search Box */}
        <div className="space-y-3">
          <form
            onSubmit={handleSearch}
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center gap-2 relative overflow-hidden"
          >
            <BorderBeam size={220} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Booking ID (e.g. BK-1001) or Mobile Number..."
                className="w-full pl-11 pr-3 py-2 text-sm bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400 font-medium"
              />
            </div>
            <ShimmerButton
              type="submit"
              disabled={loading}
              background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 shrink-0"
            >
              {loading ? "Searching..." : "Track Trip"}
            </ShimmerButton>
          </form>

          {/* Quick Helper Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Quick sample:</span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("BK-1001");
                fetchBooking("BK-1001");
              }}
              className="px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 hover:text-primary-600 transition font-mono font-bold text-[11px]"
            >
              #BK-1001
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("BK-1002");
                fetchBooking("BK-1002");
              }}
              className="px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 hover:text-primary-600 transition font-mono font-bold text-[11px]"
            >
              #BK-1002
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("9848012345");
                fetchBooking("9848012345");
              }}
              className="px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 hover:text-primary-600 transition font-mono font-bold text-[11px] inline-flex items-center gap-1"
            >
              <PhoneIcon className="w-3 h-3 text-neutral-500" />
              <span>9848012345</span>
            </button>
          </div>
        </div>

        {/* Info & Support Strip (Shown before searching) */}
        {!searched && (
          <div className="space-y-6 pt-2 animate-fade-in">
            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.12)"
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    Chauffeur & Vehicle
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    Check assigned driver name, phone number, car model, and commercial registration plate.
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.12)"
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    Live Timing & Schedule
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    Confirmed pickup timestamp, doorstep arrival updates, and route milestone details.
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(217, 119, 6, 0.12)"
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <DocumentTextIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    Digital Duty Slip
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    View and download opening / closing odometer readings and digital trip invoices.
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(168, 85, 247, 0.12)"
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    Direct Coordination
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    Direct 1-tap phone calls to your chauffeur or our 24x7 Kukatpally dispatch desk.
                  </p>
                </div>
              </SpotlightCard>
            </div>

            {/* Need Help Assistance Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-amber-400">
              <div>
                <h4 className="font-black text-sm sm:text-base">
                  Need Help Finding Your Booking?
                </h4>
                <p className="text-xs text-blue-200 mt-1 max-w-sm font-medium">
                  Our Hyderabad dispatch team is on duty 24x7. We can locate your booking instantly via WhatsApp or phone call.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
                  className="px-4 py-2.5 rounded-xl bg-white text-blue-950 font-black text-xs hover:bg-neutral-100 transition shadow inline-flex items-center gap-1.5"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span>{SADHGURU_CONTACT.primaryPhoneFormatted}</span>
                </a>
                <a
                  href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20need%20help%20tracking%20my%20cab%20booking.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition shadow inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Results Card */}
        {searched && (
          <div>
            {result ? (
              <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden animate-fade-in">
                {/* Status Bar */}
                <div className="p-5 bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-transparent border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      #{result.id}
                    </span>
                    <h3 className="font-extrabold text-base text-neutral-900 dark:text-white mt-0.5">
                      {result.customerName}
                    </h3>
                  </div>
                  <StatusBadge status={result.status} />
                </div>

                {/* Details Body */}
                <div className="p-6 space-y-5 text-xs">
                  {/* Chauffeur Assigned Card */}
                  {result.driverName ? (
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Assigned Chauffeur
                        </p>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                          {result.driverName}
                          <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                        </h4>
                        <p className="text-neutral-500 mt-0.5 font-medium">
                          {result.vehicleName} • <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">{result.vehicleNumber}</span>
                        </p>
                      </div>

                      {result.driverPhone && (
                        <a
                          href={`tel:${result.driverPhone}`}
                          className="px-4 py-2 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all shrink-0"
                        >
                          <PhoneIcon className="w-3.5 h-3.5" />
                          Call Driver
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="font-bold text-amber-700 dark:text-amber-400">
                        Chauffeur Allocation In Progress
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-1 font-medium">
                        Our Kukatpally dispatch desk is assigning the nearest clean vehicle for your schedule.
                      </p>
                    </div>
                  )}

                  {/* Route & Timing */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-4 h-4 text-primary-6000 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                          Scheduled Pickup
                        </p>
                        <p className="text-neutral-500">
                          {formatPickupDateTime(result.pickupDateTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                          Pickup Location
                        </p>
                        <p className="text-neutral-500">{result.pickupLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                          Destination
                        </p>
                        <p className="text-neutral-500">{result.dropLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Ride Verification & OTP Confirmation Card */}
                  {odometerRecord && odometerRecord.status === "Admin_Approved" && !odometerRecord.customer_otp_verified && (
                    <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs">
                          OTP
                        </span>
                        <h4 className="font-black text-sm text-neutral-900 dark:text-white">
                          Verify Ride Completion & Kilometres
                        </h4>
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        Admin has reviewed and verified the odometer readings: Departure{" "}
                        <strong className="text-neutral-900 dark:text-white font-mono">{odometerRecord.start_km} km</strong>{" "}
                        <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-400 inline mx-1" /> Arrival{" "}
                        <strong className="text-neutral-900 dark:text-white font-mono">{odometerRecord.end_km} km</strong> (Total Distance:{" "}
                        <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{odometerRecord.total_km} KM</strong>).
                      </p>

                      {otpErrorMessage && (
                        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center gap-1.5">
                          <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                          <span>{otpErrorMessage}</span>
                        </div>
                      )}

                      <form onSubmit={handleVerifyOtpSubmit} className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                        <input
                          type="text"
                          maxLength={6}
                          value={customerOtp}
                          onChange={(e) => setCustomerOtp(e.target.value)}
                          placeholder={odometerRecord.customer_otp ? `Enter OTP (Code: ${odometerRecord.customer_otp})` : "Enter 6-digit OTP"}
                          className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-mono font-black text-neutral-900 dark:text-white outline-none focus:border-emerald-500"
                        />
                        <button
                          type="submit"
                          disabled={otpVerifying}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition active:scale-95"
                        >
                          {otpVerifying ? "Verifying..." : "Confirm Journey Completed"}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Verified badge if confirmed */}
                  {(odometerRecord?.customer_otp_verified || result.status === "Completed") && (
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircleIcon className="w-4 h-4" />
                        Ride Verified & Completed by Customer
                      </span>
                      <span className="font-mono">
                        {odometerRecord?.total_km ? `${odometerRecord.total_km} KM Verified` : "Verified"}
                      </span>
                    </div>
                  )}

                  {/* Fare & Duty Slip Actions */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase font-semibold">Estimated Total</p>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        ₹{result.estimatedPrice?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/trip-sheet?booking=${result.id}` as any}
                        className="px-3.5 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-xs transition"
                      >
                        Duty Sheet
                      </Link>
                      <Link
                        href={`/review?name=${encodeURIComponent(result.customerName)}&driver=${encodeURIComponent(result.driverName || "K. Shiva Kumar")}` as any}
                        className="px-3.5 py-2 rounded-full bg-primary-6000 text-white font-bold text-xs shadow-sm hover:bg-primary-700 transition"
                      >
                        Leave Review
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-8 shadow-sm">
                <TruckIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
                <h3 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                  No Active Booking Found
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  We couldn&apos;t find an active trip matching &quot;{searchTerm}&quot;. Please verify your booking reference or phone number.
                </p>
                <div className="mt-4">
                  <a
                    href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sadhguru%20Travels,%20I%20need%20help%20tracking%20my%20booking%20for%20${encodeURIComponent(searchTerm)}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-500 transition"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Contact Dispatch on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
