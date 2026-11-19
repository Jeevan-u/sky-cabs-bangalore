"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  TruckIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  CameraIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  LockClosedIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@/components/icons";
import StatusBadge from "@/app/admin/components/StatusBadge";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { formatPickupDateTime } from "@/utils/formatPickupDateTime";
import CameraOdometerModal from "@/components/CameraOdometerModal";

interface DriverTrip {
  id: string;
  customerName: string;
  customerPhone: string;
  tripType: string;
  vehicleName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  status: "Pending" | "Confirmed" | "Driver Assigned" | "Arrived" | "In Progress" | "Completed" | "Cancelled";
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  notes?: string;
  odometerRecord?: any;
}

export default function DriverPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginPhone, setLoginPhone] = useState<string>("9398522128");
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sadhguru_driver_session");
      if (saved) {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  // Driver Profile
  const driverName = "K. Shiva Kumar";
  const driverPhone = "9398522128";
  const assignedVehicle = "TS 08 UB 4512 (Innova Crysta)";
  const driverId = "usr-driver-1";

  // Dashboard Data
  const [trips, setTrips] = useState<DriverTrip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [dutyStatus, setDutyStatus] = useState<"Available" | "On Duty" | "Off Duty">("Available");
  const [updatingDuty, setUpdatingDuty] = useState<boolean>(false);

  // Odometer & Camera State
  const [odometerModal, setOdometerModal] = useState<{
    isOpen: boolean;
    action: "start" | "end";
    bookingId: string;
    startKm?: number;
  }>({
    isOpen: false,
    action: "start",
    bookingId: "",
  });
  const [isSubmittingOdo, setIsSubmittingOdo] = useState<boolean>(false);

  // Live GPS Tracking State
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);
  const [lastGpsCoords, setLastGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const gpsWatchIdRef = useRef<number | null>(null);

  // PWA Install Prompt State
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!installPrompt) {
      alert("To install, tap the 3 dots in Chrome and select 'Install app' or 'Add to Home Screen'.");
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  };

  // Fetch Trips & Odometer details
  const fetchDriverTrips = useCallback(async () => {
    setLoading(true);
    try {
      const [bookingsRes, odoRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/odometer"),
      ]);

      const bookingsData = await bookingsRes.json();
      const odoData = await odoRes.json();
      const odoRecords = odoData.success && Array.isArray(odoData.records) ? odoData.records : [];

      if (bookingsData.success && Array.isArray(bookingsData.bookings)) {
        const cleanDriverPhone = driverPhone.replace(/[^0-9]/g, "");

        const normalized: DriverTrip[] = bookingsData.bookings
          .map((b: any) => {
            const matchedOdo = odoRecords.find((r: any) => r.booking_id === b.id);
            return {
              id: b.id,
              customerName: b.customer_name || b.customerName || "Valued Passenger",
              customerPhone: b.customer_phone || b.customerPhone || "",
              tripType: b.trip_type || b.tripType || "airport",
              vehicleName: b.vehicle_type || b.vehicleName || "Commercial Vehicle",
              pickupLocation: b.pickup_address || b.pickupLocation || "",
              dropLocation: b.drop_address || b.dropLocation || "",
              pickupDateTime: b.pickup_datetime || b.pickupDateTime || new Date().toISOString(),
              status: (b.status === "Confirmed" && matchedOdo?.status === "Start_Submitted") ? "In Progress" : b.status || "Pending",
              driverName: b.driver_name || b.driverName || "",
              driverPhone: b.driver_phone || b.driverPhone || "",
              vehicleNumber: b.vehicle_number || b.vehicleNumber || "",
              notes: b.notes || "",
              odometerRecord: matchedOdo,
            };
          })
          .filter((b: DriverTrip) => {
            const bPhone = (b.driverPhone || "").replace(/[^0-9]/g, "");
            return (
              (cleanDriverPhone && bPhone.includes(cleanDriverPhone)) ||
              (b.driverName && b.driverName.toLowerCase().includes(driverName.toLowerCase().split(" ")[0])) ||
              b.status === "Driver Assigned" ||
              b.status === "In Progress" ||
              b.status === "Arrived"
            );
          });

        setTrips(normalized);

        // Check if any trip is In Progress to manage GPS tracking
        const activeTripInProgress = normalized.find((t) => t.status === "In Progress");
        if (activeTripInProgress && !gpsWatchIdRef.current) {
          startGpsTracking(activeTripInProgress.id);
        }
      }
    } catch (err) {
      console.error("Driver trips load error:", err);
    } finally {
      setLoading(false);
    }
  }, [driverName, driverPhone]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDriverTrips();
    }
  }, [isAuthenticated, fetchDriverTrips]);

  // GPS Tracking Lifecycle
  const startGpsTracking = (bookingId: string) => {
    if (!navigator.geolocation) return;
    setIsGpsActive(true);

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude, speed, heading } = pos.coords;
        setLastGpsCoords({ lat: latitude, lng: longitude });

        try {
          await fetch("/api/gps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              booking_id: bookingId,
              driver_id: driverId,
              driver_name: driverName,
              vehicle_number: assignedVehicle,
              latitude,
              longitude,
              speed: speed ? Math.round(speed * 3.6) : 35, // km/h
              heading: heading || 0,
            }),
          });
        } catch (err) {
          console.warn("GPS ping failed:", err);
        }
      },
      (err) => console.warn("GPS error:", err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );

    gpsWatchIdRef.current = watchId;
  };

  const stopGpsTracking = () => {
    if (gpsWatchIdRef.current !== null) {
      navigator.geolocation.clearWatch(gpsWatchIdRef.current);
      gpsWatchIdRef.current = null;
    }
    setIsGpsActive(false);
  };

  // Status Handlers
  const handleMarkArrived = async (trip: DriverTrip) => {
    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: trip.id, status: "Arrived" }),
      });
      fetchDriverTrips();

      // Trigger prefilled WhatsApp alert to the customer
      const cleanPhone = trip.customerPhone.replace(/[^0-9]/g, "");
      const msg = encodeURIComponent(
        `Namaste ${trip.customerName}! Your Sri Sadhguru Travels cab (${assignedVehicle}) has ARRIVED at your pickup location: ${trip.pickupLocation}. Chauffeur ${driverName} (+91 ${driverPhone}) is waiting at your doorstep.`
      );
      window.open(`https://wa.me/91${cleanPhone}?text=${msg}`, "_blank");
    } catch (err) {
      console.error("Failed to mark arrived:", err);
    }
  };

  const handleOdometerSubmit = async (data: { km: number; photoUrl: string }) => {
    setIsSubmittingOdo(true);
    try {
      const res = await fetch("/api/odometer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: odometerModal.action,
          booking_id: odometerModal.bookingId,
          driver_id: driverId,
          driver_name: driverName,
          vehicle_number: assignedVehicle,
          start_km: odometerModal.action === "start" ? data.km : undefined,
          end_km: odometerModal.action === "end" ? data.km : undefined,
          start_photo_url: odometerModal.action === "start" ? data.photoUrl : undefined,
          end_photo_url: odometerModal.action === "end" ? data.photoUrl : undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Submission failed");
      }

      if (odometerModal.action === "start") {
        startGpsTracking(odometerModal.bookingId);
      } else {
        stopGpsTracking();
      }

      fetchDriverTrips();
    } finally {
      setIsSubmittingOdo(false);
    }
  };

  const handleToggleDutyStatus = async (newStatus: "Available" | "On Duty" | "Off Duty") => {
    setUpdatingDuty(true);
    setDutyStatus(newStatus);
    try {
      await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: driverId, duty_status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update driver status:", err);
    } finally {
      setUpdatingDuty(false);
    }
  };

  // OTP Login Submission
  const handleSendOtp = () => {
    if (!loginPhone || loginPhone.length < 10) {
      setAuthError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setAuthError("");
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otpCode.trim() === "123456" || otpCode.trim().length === 6) {
      setIsAuthenticated(true);
      setAuthError("");
      try {
        localStorage.setItem(
          "sadhguru_driver_session",
          JSON.stringify({ phone: loginPhone, driverName, loggedAt: new Date().toISOString() })
        );
      } catch {}
    } else {
      setAuthError("Invalid OTP. For demo access, please use '123456'.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("sadhguru_driver_session");
    } catch {}
    setIsAuthenticated(false);
    setOtpSent(false);
    setOtpCode("");
  };

  const activeTrips = trips.filter((t) => t.status !== "Completed" && t.status !== "Cancelled");
  const completedTrips = trips.filter((t) => t.status === "Completed");

  // If driver not logged in, render OTP authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[22px] flex items-center justify-center font-black text-emerald-400">
                <TruckIcon className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white">Sadhguru Driver Portal</h1>
            <p className="text-xs text-neutral-400">
              24x7 Commercial Fleet & Dispatch Network • Kukatpally Hub
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-1.5">
              <ExclamationTriangleIcon className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {!otpSent ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1.5">
                  Registered Driver Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="93985 22128"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-neutral-800 border border-neutral-700 text-sm font-bold text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition active:scale-95"
              >
                Send 6-Digit Login OTP
              </button>

              <div className="pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setLoginPhone("9398522128");
                    setOtpSent(true);
                    setOtpCode("123456");
                    setIsAuthenticated(true);
                    try {
                      localStorage.setItem(
                        "sadhguru_driver_session",
                        JSON.stringify({ phone: "9398522128", driverName, loggedAt: new Date().toISOString() })
                      );
                    } catch {}
                  }}
                  className="w-full py-2.5 rounded-2xl bg-neutral-800 hover:bg-neutral-750 text-emerald-400 font-bold text-xs border border-neutral-700 hover:border-emerald-500/50 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <BoltIcon className="w-4 h-4" />
                  <span>1-Tap Demo Login (Chauffeur K. Shiva Kumar)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-neutral-400">
                    Enter Verification OTP
                  </label>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    Demo Code: 123456
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-800 border border-neutral-700 text-center tracking-widest text-lg font-mono font-black text-white outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition active:scale-95"
              >
                Verify OTP & Launch Dashboard
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-neutral-400 hover:text-white"
              >
                Change Mobile Number
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-neutral-800 text-center text-[11px] text-neutral-500">
            Sri Sadhguru Tours & Travels • Proprietor Rathan Kanna
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900/95 text-neutral-800 dark:text-neutral-100 font-sans pb-16 transition-colors">
      {/* Top Chauffeur App Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Driver identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center font-black text-emerald-400 text-xs">
                  {driverName.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-neutral-900"></span>
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                  {driverName}
                </h1>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheckIcon className="w-3 h-3" /> VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate font-medium">
                {assignedVehicle}
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Install PWA Button */}
            {!isInstalled && (
              <button
                onClick={handleInstallPwa}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold hover:bg-emerald-500/20 transition flex items-center gap-1"
                title="Install App on Phone"
              >
                <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}

            <button
              onClick={fetchDriverTrips}
              disabled={loading}
              className="p-2 rounded-2xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-colors"
              title="Refresh Assigned Trips"
            >
              <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin text-primary-6000" : ""}`} />
            </button>

            <SwitchDarkMode className="p-2" />

            <Link
              href={"/admin" as any}
              className="hidden md:flex p-2 rounded-2xl text-neutral-400 hover:text-primary-6000 hover:bg-primary-50 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-colors"
              title="Command Center"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-2xl text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 border border-neutral-200/80 dark:border-neutral-800 transition-colors"
              title="Log Out"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Live GPS Active Status Banner */}
        {isGpsActive && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between text-xs font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>LIVE GPS RADAR ACTIVE • Broadcasting location to Kukatpally Dispatch Hub</span>
            </div>
            {lastGpsCoords && (
              <span className="text-[11px] font-mono opacity-80 hidden sm:inline">
                {lastGpsCoords.lat.toFixed(4)}°N, {lastGpsCoords.lng.toFixed(4)}°E
              </span>
            )}
          </div>
        )}

        {/* Chauffeur Duty Control Tile */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Chauffeur Duty Desk • Kukatpally Hub
            </div>
            <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mt-1">
              Live Fleet Duty Status
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Set availability so Proprietor Rathan Kanna knows your current dispatch readiness.
            </p>
          </div>

          {/* Duty status toggle buttons */}
          <div className="flex items-center p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 w-full sm:w-auto">
            {(["Available", "On Duty", "Off Duty"] as const).map((st) => (
              <button
                key={st}
                disabled={updatingDuty}
                onClick={() => handleToggleDutyStatus(st)}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  dutyStatus === st
                    ? st === "Available"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : st === "On Duty"
                      ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/20"
                      : "bg-neutral-700 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "active"
                  ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/20"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Active Dispatches ({activeTrips.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "completed"
                  ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/20"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Completed Manifests ({completedTrips.length})
            </button>
          </div>

          <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline-flex items-center gap-1">
            <LockClosedIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>Financial Payouts Protected</span>
          </span>
        </div>

        {/* Trips List */}
        {activeTab === "active" ? (
          activeTrips.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
              <TruckIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
              <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                No active trips assigned right now
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                Keep your status set to <strong className="text-emerald-500">Available</strong>. When Proprietor Rathan Kanna assigns a ride, it will appear here immediately.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTrips.map((trip) => {
                const mapUrl = trip.pickupLocation.startsWith("http")
                  ? trip.pickupLocation
                  : `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${encodeURIComponent(
                      trip.pickupLocation
                    )}`;
                const odo = trip.odometerRecord;

                return (
                  <div
                    key={trip.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {trip.tripType.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs font-bold text-neutral-400">
                            #{trip.id}
                          </span>
                        </div>
                        <h3 className="font-black text-lg text-neutral-900 dark:text-white mt-1">
                          {trip.customerName}
                        </h3>
                      </div>
                      <StatusBadge status={trip.status} />
                    </div>

                    {/* Rejection Alert Banner if Admin Rejected Odometer */}
                    {odo?.status === "Admin_Rejected" && (
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-bold space-y-1">
                        <div className="flex items-center gap-1.5">
                          <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                          <span>Admin Rejected Odometer Reading</span>
                        </div>
                        <p className="text-[11px] text-rose-400 font-normal">
                          Reason: {odo.rejection_reason || "Blurry photo. Please retake clear photograph."}
                        </p>
                      </div>
                    )}

                    {/* Waiting Admin Verification Notice */}
                    {odo?.status === "Awaiting_Admin_Verification" && (
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Odometer Submitted: {odo.start_km} km</span>
                          <ArrowRightIcon className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{odo.end_km} km ({odo.total_km} km)</span>
                        </span>
                        <span className="text-[11px] font-normal underline">Awaiting Admin Verification</span>
                      </div>
                    )}

                    {/* Route Details (Strictly No Price) */}
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 space-y-3 text-xs">
                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-neutral-400 text-[10px] uppercase block">
                            Pickup Point
                          </span>
                          <span className="text-neutral-800 dark:text-neutral-200 font-bold">
                            {trip.pickupLocation}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-neutral-400 text-[10px] uppercase block">
                            Destination
                          </span>
                          <span className="text-neutral-800 dark:text-neutral-200 font-bold">
                            {trip.dropLocation}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-medium">
                        <ClockIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Pickup Scheduled:</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">
                          {formatPickupDateTime(trip.pickupDateTime)}
                        </span>
                      </div>
                    </div>

                    {/* Communication Hotlinks */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${trip.customerPhone}`}
                        className="py-2.5 px-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneIcon className="w-4 h-4 text-primary-6000" />
                        Call Passenger
                      </a>

                      <a
                        href={`https://wa.me/91${trip.customerPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 flex items-center justify-center gap-2 transition-colors"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>

                    {/* Google Maps Route Launch */}
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Open Google Maps Navigation
                    </a>

                    {/* Ride Lifecycle Step Buttons */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                      {trip.status !== "Arrived" && trip.status !== "In Progress" && (
                        <button
                          onClick={() => handleMarkArrived(trip)}
                          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                        >
                          <MapPinIcon className="w-4 h-4" />
                          I Have Arrived at Location (Send WhatsApp Alert)
                        </button>
                      )}

                      {trip.status !== "In Progress" ? (
                        <button
                          onClick={() =>
                            setOdometerModal({
                              isOpen: true,
                              action: "start",
                              bookingId: trip.id,
                            })
                          }
                          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                        >
                          <CameraIcon className="w-4 h-4" />
                          Start Ride (Capture Starting Odometer)
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setOdometerModal({
                              isOpen: true,
                              action: "end",
                              bookingId: trip.id,
                              startKm: odo?.start_km,
                            })
                          }
                          className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all active:scale-95"
                        >
                          <CameraIcon className="w-4 h-4" />
                          End Ride (Capture Ending Odometer)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Completed Trips History (Payouts Hidden) */
          <div className="space-y-3">
            {completedTrips.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-400 text-xs font-medium">
                No completed trip history logged yet.
              </div>
            ) : (
              completedTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        {trip.customerName}
                      </span>
                      <span className="text-neutral-400 font-mono">#{trip.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3" />
                        <span>Verified & Completed</span>
                      </span>
                    </div>
                    <p className="text-neutral-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <span>{trip.pickupLocation}</span>
                      <ArrowRightIcon className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{trip.dropLocation}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-neutral-500 text-[11px]">
                      {trip.odometerRecord?.total_km ? `${trip.odometerRecord.total_km} KM` : "Standard Route"}
                    </span>
                    <Link
                      href={"/trip-sheet" as any}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-[11px] hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Trip Sheet
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 24x7 Helpline Footer */}
        <div className="text-center text-xs text-neutral-400 pt-4">
          Sri Sadhguru Travels Chauffeur Desk • Helpline:{" "}
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="text-primary-6000 dark:text-primary-400 font-black hover:underline"
          >
            {SADHGURU_CONTACT.primaryPhoneFormatted}
          </a>
        </div>
      </main>

      {/* Camera Odometer Modal */}
      <CameraOdometerModal
        isOpen={odometerModal.isOpen}
        onClose={() => setOdometerModal((prev) => ({ ...prev, isOpen: false }))}
        action={odometerModal.action}
        bookingId={odometerModal.bookingId}
        startKm={odometerModal.startKm}
        onSubmit={handleOdometerSubmit}
        isSubmitting={isSubmittingOdo}
      />
    </div>
  );
}
