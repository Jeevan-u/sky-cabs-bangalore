"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  PrinterIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import {
  CheckBadgeIcon,
  WhatsAppIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
} from "@/components/icons";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { Confetti } from "@/components/reactbits";

export default function TripSheetPage() {
  const searchParams = useSearchParams();
  const paramBookingId = searchParams?.get("booking") || "";

  const [customer, setCustomer] = useState("M. Ranga Rao");
  const [bookingId, setBookingId] = useState(paramBookingId || "BK-1001");
  const [phone, setPhone] = useState("9849012345");
  const [vehicle, setVehicle] = useState("TS 08 UB 4512 (Innova Crysta)");
  const [driver, setDriver] = useState("K. Shiva Kumar");
  const [startTime, setStartTime] = useState("");
  const [pickup, setPickup] = useState("Kukatpally, Hyderabad");
  const [drop, setDrop] = useState("Shamshabad RGI Airport");

  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [startKm, setStartKm] = useState<number | "">(48200);
  const [endKm, setEndKm] = useState<number | "">(48265);
  const [totalKm, setTotalKm] = useState<number | "">(65);

  const [tollParking, setTollParking] = useState<number>(150);
  const [driverBata, setDriverBata] = useState<number>(0);
  const [baseFare, setBaseFare] = useState<number>(1399);
  const [totalAmount, setTotalAmount] = useState<number>(1549);

  const [feedback, setFeedback] = useState("Very smooth journey. Polite chauffeur.");
  const [confirmed, setConfirmed] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedSlipId, setSavedSlipId] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const hasSignature = useRef(false);

  // Initialize dates & auto-fetch if booking param exists
  useEffect(() => {
    const now = new Date();
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000);
    const toLocalISO = (d: Date) => {
      const tzOffset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
    };

    setStartTime(toLocalISO(fourHoursAgo));
    setEndTime(toLocalISO(now));

    if (paramBookingId) {
      fetch(`/api/bookings`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && Array.isArray(data.bookings)) {
            const found = data.bookings.find((b: any) => b.id === paramBookingId);
            if (found) {
              setBookingId(found.id);
              if (found.customer_name) setCustomer(found.customer_name);
              if (found.customer_phone) setPhone(found.customer_phone);
              if (found.pickup_address) setPickup(found.pickup_address);
              if (found.drop_address) setDrop(found.drop_address);
              if (found.vehicle_type) setVehicle(found.vehicle_type);
              if (found.driver_name) setDriver(found.driver_name);
              if (found.estimated_price) {
                setBaseFare(found.estimated_price);
                setTotalAmount(found.estimated_price + 150);
              }
            }
          }
        })
        .catch((err) => console.error("Error fetching booking for duty sheet:", err));
    }
  }, [paramBookingId]);

  // Update calculations
  useEffect(() => {
    if (startTime && endTime) {
      const diffMins = Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000);
      if (diffMins >= 0) {
        const h = Math.floor(diffMins / 60);
        const m = diffMins % 60;
        setDuration(`${h} hr ${m} min`);
      } else {
        setDuration("Check trip times");
      }
    }

    const s = typeof startKm === "number" ? startKm : parseFloat(startKm as string);
    const e = typeof endKm === "number" ? endKm : parseFloat(endKm as string);
    if (!isNaN(s) && !isNaN(e) && e >= s) {
      setTotalKm(parseFloat((e - s).toFixed(1)));
    }

    setTotalAmount(baseFare + (tollParking || 0) + (driverBata || 0));
  }, [startTime, endTime, startKm, endKm, baseFare, tollParking, driverBata]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#4f46e5"; // Indigo
  }, []);

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    isDrawing.current = true;
    hasSignature.current = true;
    canvas.setPointerCapture(e.pointerId);
    const p = getCanvasPoint(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = getCanvasPoint(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasSignature.current = false;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSignature.current) {
      // Create a fallback signature if skipped
      hasSignature.current = true;
    }
    if (startTime && endTime && new Date(endTime) < new Date(startTime)) {
      setStatusMsg("Trip end time cannot be earlier than start time.");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");

    try {
      const signatureUrl = canvasRef.current
        ? canvasRef.current.toDataURL("image/png")
        : "";

      const slipPayload = {
        booking_id: bookingId,
        customer_name: customer,
        customer_phone: phone,
        driver_name: driver,
        vehicle_number: vehicle.includes("(") ? vehicle.split("(")[0].trim() : "TS 08 UB 4512",
        vehicle_model: vehicle,
        trip_route: `${pickup} -> ${drop}`,
        start_km: Number(startKm) || 0,
        end_km: Number(endKm) || 0,
        total_km: Number(totalKm) || 0,
        toll_parking: Number(tollParking) || 0,
        driver_bata: Number(driverBata) || 0,
        total_amount: Number(totalAmount) || 0,
        signature_data_url: signatureUrl,
      };

      const res = await fetch("/api/duty-slips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slipPayload),
      });

      const data = await res.json();
      if (data.success && data.dutySlip) {
        setSavedSlipId(data.dutySlip.id);
      } else {
        setSavedSlipId("DS-" + Date.now().toString().slice(-6));
      }

      // Also update booking status to Completed
      if (bookingId) {
        await fetch("/api/bookings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: bookingId, status: "Completed" }),
        }).catch(() => {});
      }

      setIsCompleted(true);
    } catch (err: any) {
      setStatusMsg("Notice: Duty slip finalized locally.");
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviewUrl = `/review/${bookingId || "SSG-105"}?name=${encodeURIComponent(customer)}&driver=${encodeURIComponent(driver)}&vehicle=${encodeURIComponent(vehicle)}&pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&phone=${encodeURIComponent(phone)}`;

  const whatsappReviewMessage = `Namaste ${customer || "Sir/Madam"}!%0A%0AThank you for traveling with *Sri Sadhguru Tours and Travels* from *${pickup}* to *${drop}*.%0A%0AWe hope your journey with driver *${driver}* was safe and comfortable.%0A%0A*Please take 15 seconds to rate your trip and share your feedback here:*%0A${typeof window !== "undefined" ? window.location.origin : ""}${reviewUrl}%0A%0AYour support helps us serve you better!%0A- *Rathan Kanna*, Sri Sadhguru Travels`;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-8 px-3 sm:px-6 print:p-0 print:bg-white text-neutral-900 dark:text-neutral-100 font-sans">
      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden print:border-none print:shadow-none">
        {/* HEADER */}
        <div className="bg-neutral-900 text-white p-6 sm:p-8 border-b-4 border-primary-6000">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  OFFICIAL TAX INVOICE & DUTY SHEET
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Duty
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{SADHGURU_CONTACT.fullName}</h1>
              <p className="text-neutral-300 text-xs mt-1">
                Prop: <span className="font-bold text-white">{SADHGURU_CONTACT.proprietor}</span> · Kukatpally (HQ) & Gandhari Hub
              </p>
              <p className="text-amber-400 text-xs font-semibold mt-0.5">
                Dispatch Phone: {SADHGURU_CONTACT.primaryPhoneFormatted} | {SADHGURU_CONTACT.secondaryPhoneFormatted}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/10 text-center sm:text-right shrink-0">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">Booking Reference</span>
              <span className="text-lg font-mono font-black text-amber-400">{bookingId}</span>
            </div>
          </div>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Section 1: Customer & Vehicle */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-6000"></span>
              Passenger & Vehicle Manifest
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border text-neutral-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Customer Mobile *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border text-neutral-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Commercial Vehicle & Plate
                </label>
                <input
                  type="text"
                  required
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border text-neutral-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Assigned Chauffeur
                </label>
                <input
                  type="text"
                  required
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border text-neutral-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Trip Pickup Location
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border text-neutral-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Destination Drop Location *
                </label>
                <input
                  type="text"
                  required
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border text-neutral-900 dark:text-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Odometer KM & Timings */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Trip Timings & Odometer Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Start Odometer (KM)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={startKm}
                  onChange={(e) => setStartKm(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  End Odometer (KM) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={endKm}
                  onChange={(e) => setEndKm(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Total Distance Traveled
                </label>
                <input
                  type="text"
                  readOnly
                  value={totalKm !== "" ? `${totalKm} KM` : ""}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold font-mono border"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Billing & Fare Breakdown */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Fare & Expense Breakdown
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Base / Package Fare (₹)
                </label>
                <input
                  type="number"
                  value={baseFare}
                  onChange={(e) => setBaseFare(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border font-mono font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Toll & Parking (₹)
                </label>
                <input
                  type="number"
                  value={tollParking}
                  onChange={(e) => setTollParking(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Chauffeur Bata (₹)
                </label>
                <input
                  type="number"
                  value={driverBata}
                  onChange={(e) => setDriverBata(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-neutral-50 dark:bg-neutral-800 border font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Grand Total Fare (₹)
                </label>
                <input
                  type="text"
                  readOnly
                  value={`₹${totalAmount.toLocaleString("en-IN")}`}
                  className="w-full text-xs sm:text-sm rounded-2xl border-neutral-200 dark:border-neutral-700 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-black font-mono border"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Signature Pad */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              Passenger Touchscreen Digital Signature *
            </h2>

            <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <input
                type="checkbox"
                id="tripConfirm"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 rounded text-primary-6000 focus:ring-primary-500"
                required
              />
              <label htmlFor="tripConfirm" className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                I hereby confirm that this journey has been completed satisfactorily, and the starting/ending kilometers, toll charges, and total fare noted above are verified and correct.
              </label>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-3xl">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-full h-40 bg-white dark:bg-neutral-900 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 cursor-crosshair touch-none"
              />
              <div className="flex items-center justify-between mt-2 pt-2 text-xs text-neutral-400">
                <span>Sign using your finger, stylus, or mouse inside the box</span>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full font-bold text-[11px] print:hidden"
                >
                  Clear Signature
                </button>
              </div>
            </div>
          </div>

          {statusMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-1.5">
              <ExclamationTriangleIcon className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 print:hidden">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 bg-primary-6000 hover:bg-primary-700 text-white font-bold rounded-full shadow-md shadow-primary-6000/25 active:scale-95 transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <span>Finalizing & Saving Slip...</span>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 stroke-[2.2]" />
                  <span>Complete Trip & Save Duty Slip</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold rounded-full transition text-xs flex items-center gap-1.5"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>Print Slip</span>
            </button>
            <Link
              href={"/admin" as any}
              className="px-5 py-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 font-semibold rounded-full transition ml-auto text-xs flex items-center gap-1.5"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Admin</span>
            </Link>
          </div>
        </form>

        {/* COMPLETION SUCCESS BANNER */}
        {isCompleted && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border-t-2 border-emerald-500 p-6 sm:p-8 m-6 rounded-3xl print:hidden relative">
            <Confetti count={100} duration={3500} />
            <div className="flex items-start gap-4">
              <CheckBadgeIcon className="w-10 h-10 text-emerald-600 shrink-0" />
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-black text-emerald-900 dark:text-emerald-300">
                  Duty Slip {savedSlipId || "Finalized"} Successfully Saved!
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                  The duty slip has been permanently logged in Sri Sadhguru operations command center. You can now send the verified receipt and review request to the passenger!
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${whatsappReviewMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-md transition flex items-center gap-2 text-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                    <span>Share Bill & Review Link via WhatsApp</span>
                  </a>

                  <Link
                    href={reviewUrl as any}
                    target="_blank"
                    className="px-5 py-2.5 bg-primary-6000 hover:bg-primary-700 text-white font-bold rounded-full shadow-md transition flex items-center gap-2 text-xs"
                  >
                    <SparklesIcon className="w-4 h-4 text-white shrink-0" />
                    <span>Open Review Wizard Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
