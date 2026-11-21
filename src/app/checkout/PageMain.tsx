"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@/components/icons";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { SKY_CABS_FLEET, SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import {
  SpotlightCard,
  AnimatedCounter,
  MagneticButton,
  ShinyText,
  StarBorder,
  BorderBeam,
  ShimmerButton,
} from "@/components/reactbits";
import CustomVehicleSelect from "@/components/CustomVehicleSelect";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import SmartLocationInput from "@/components/SmartLocationInput";

const POPULAR_PICKUPS = [
  "Begur, Bengaluru",
  "Electronic City, Bengaluru",
  "Koramangala, Bengaluru",
  "HSR Layout, Bengaluru",
  "Whitefield, Bengaluru",
  "Indiranagar Metro Station",
  "Kempegowda International Airport (BLR)",
];

const POPULAR_DROPS = [
  "Kempegowda International Airport (BLR)",
  "Mysuru Palace, Mysuru",
  "Tirupati Balaji Darshan",
  "Coorg (Madikeri)",
  "Ooty Nilgiris",
  "Chennai City",
  "Local Bengaluru Travel (8h/80km)",
];

const CheckOutPagePageMain: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search params parsing
  const initialVehicleId = searchParams?.get("vehicle") || "innova-crysta";
  const initialTripType = searchParams?.get("trip") || "airport";
  const initialPrice = Number(searchParams?.get("price")) || 0;

  // Form State
  const [vehicleId, setVehicleId] = useState(initialVehicleId);
  const [tripType, setTripType] = useState<string>(initialTripType);
  const [pickupAddress, setPickupAddress] = useState(searchParams?.get("pickup") || "Begur, Bengaluru");
  const [dropAddress, setDropAddress] = useState(searchParams?.get("drop") || "Kempegowda International Airport (BLR)");
  
  // Date & Time defaults
  const todayStr = new Date().toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState(searchParams?.get("date") || todayStr);
  const [pickupTime, setPickupTime] = useState(searchParams?.get("time") || "06:00 AM");

  // Passenger state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentOption, setPaymentOption] = useState<"cash_on_trip" | "advance_token">("cash_on_trip");

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentVehicle =
    SKY_CABS_FLEET.find((v) => v.id === vehicleId) || SKY_CABS_FLEET[2];

  // Dynamic price calculation
  let calculatedPrice = currentVehicle.airportFlatRate;
  if (tripType === "local") {
    calculatedPrice = currentVehicle.local8hr80km;
  } else if (tripType === "outstation" || tripType === "pilgrimage") {
    calculatedPrice = currentVehicle.perKmRate * 350; // standard 350 KM base
  }
  const finalPrice = initialPrice > 0 ? initialPrice : calculatedPrice;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for chauffeur dispatch.");
      return;
    }
    if (!pickupAddress.trim() || !dropAddress.trim()) {
      setErrorMessage("Please provide both pickup and drop-off destinations.");
      return;
    }

    setIsSubmitting(true);

    let pickupDateTimeVal = `${pickupDate} at ${pickupTime}`;
    try {
      const match = pickupTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const mins = match[2];
        const ampm = (match[3] || "").toUpperCase();
        if (ampm === "PM" && hours < 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;
        pickupDateTimeVal = `${pickupDate}T${hours.toString().padStart(2, "0")}:${mins}:00`;
      }
    } catch {}

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          trip_type: tripType,
          vehicle_type: `${currentVehicle.name} (${currentVehicle.capacity})`,
          pickup_address: pickupAddress.trim(),
          drop_address: dropAddress.trim(),
          pickup_datetime: pickupDateTimeVal,
          estimated_price: finalPrice,
          notes: `${notes ? notes + " | " : ""}${flightNumber ? "Flight: " + flightNumber + " | " : ""}Payment: ${paymentOption === "cash_on_trip" ? "Pay Chauffeur at End" : "Advance Token"}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to register booking. Please call dispatch directly.");
      }

      const bookingId = data.booking?.id || "BK-" + Math.floor(1000 + Math.random() * 9000);

      // Route to confirmation launchpad
      router.push(
        `/pay-done?bookingId=${encodeURIComponent(bookingId)}&customerName=${encodeURIComponent(
          customerName
        )}&customerPhone=${encodeURIComponent(customerPhone)}&vehicle=${encodeURIComponent(
          currentVehicle.name
        )}&pickup=${encodeURIComponent(pickupAddress)}&drop=${encodeURIComponent(
          dropAddress
        )}&date=${encodeURIComponent(pickupDate + " " + pickupTime)}&price=${encodeURIComponent(
          finalPrice
        )}&payment=${encodeURIComponent(paymentOption)}` as any
      );
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or call our 24x7 desk.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nc-CheckOutPage min-h-screen bg-neutral-50/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-10 font-sans">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-block mb-2">
            <StarBorder as="div" color="#d97706" speed="4s">
              <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>Zero-Surge Commercial Transport</span>
              </span>
            </StarBorder>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Confirm Your Reservation
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
            Sky Cabs Bangalore · Chauffeur allocation starts immediately upon confirmation
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5">
              <ExclamationTriangleIcon className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </span>
            <a href={`tel:${SKY_CABS_CONTACT.primaryPhone}`} className="underline font-bold">
              Call Dispatch
            </a>
          </div>
        )}

        <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: TRIP & PASSENGER INFORMATION */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Trip & Route Details */}
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.08)"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary-6000 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                      Trip & Vehicle Selection
                    </h2>
                    <p className="text-xs text-neutral-500">Pick trip nature and preferred vehicle</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
                  Instant Confirmation
                </span>
              </div>

              {/* Trip Nature Tabs */}
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                  Trip Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "airport", label: "Airport Transfer" },
                    { id: "outstation", label: "Outstation Yatra" },
                    { id: "local", label: "Local 8h/80km" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTripType(t.id)}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all border ${
                        tripType === t.id
                          ? "bg-primary-6000 text-white border-primary-6000 shadow-sm"
                          : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Select */}
              <CustomVehicleSelect
                label="Choose Commercial Vehicle Model"
                labelClassName="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2"
                value={vehicleId}
                onChange={(id) => setVehicleId(id)}
              />

              {/* Pickup Address */}
              <div>
                <SmartLocationInput
                  label="Doorstep Pickup Location in Bengaluru / Karnataka"
                  labelClassName="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2"
                  value={pickupAddress}
                  onChange={(val) => setPickupAddress(val)}
                  placeholder="e.g. Flat 302, Whitefield Phase 3, Begur / Hotel Reception..."
                  type="pickup"
                  enableGps={true}
                />
                {/* Quick Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {POPULAR_PICKUPS.slice(0, 4).map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setPickupAddress(chip)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 transition"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop-off Address */}
              <div>
                <SmartLocationInput
                  label="Destination / Drop-off Location"
                  labelClassName="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2"
                  value={dropAddress}
                  onChange={(val) => setDropAddress(val)}
                  placeholder="e.g. Kempegowda International Airport (BLR) Departures / Mysuru Temple..."
                  type="drop"
                />
                {/* Quick Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {POPULAR_DROPS.slice(0, 4).map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setDropAddress(chip)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 transition"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Picker */}
              <CustomDateTimePicker
                label="Pickup Date & Time *"
                labelClassName="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2"
                travelDate={pickupDate}
                travelTime={pickupTime}
                onDateChange={(d) => setPickupDate(d)}
                onTimeChange={(t) => setPickupTime(t)}
              />
            </SpotlightCard>

            {/* Step 2: Passenger Contact Details */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.08)"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-xl bg-primary-6000 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Passenger Contact Information
                  </h2>
                  <p className="text-xs text-neutral-500">Chauffeur details & WhatsApp tracking sent here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Anand Reddy / Venkat Rao"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-primary-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                    Mobile Phone (WhatsApp Enabled) *
                  </label>
                  <div className="relative">
                    <PhoneIcon className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98480 12345"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-primary-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                    Flight Number (Optional for Airport)
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. 6E 452 (IndiGo) / AI 840"
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-primary-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-primary-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                  Special Travel Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Traveling with elderly parents, please keep AC mild; need luggage space for 3 large suitcases..."
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-primary-500 font-medium"
                />
              </div>
            </SpotlightCard>

            {/* Step 3: Payment Choice */}
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.08)"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-xl bg-primary-6000 text-white font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Payment Preference
                  </h2>
                  <p className="text-xs text-neutral-500">Flexible payment options for Indian travelers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <label
                  onClick={() => setPaymentOption("cash_on_trip")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    paymentOption === "cash_on_trip"
                      ? "border-primary-6000 bg-primary-50/20 dark:bg-primary-950/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentOption === "cash_on_trip"}
                    onChange={() => setPaymentOption("cash_on_trip")}
                    className="mt-1 text-primary-6000 focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                      Pay to Chauffeur at End
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                      Pay Cash or UPI (GPay / PhonePe / Paytm) after reaching your destination. ₹0 advance needed.
                    </span>
                    <span className="inline-block mt-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Most Popular
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentOption("advance_token")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    paymentOption === "advance_token"
                      ? "border-primary-6000 bg-primary-50/20 dark:bg-primary-950/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentOption === "advance_token"}
                    onChange={() => setPaymentOption("advance_token")}
                    className="mt-1 text-primary-6000 focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                      Advance Token Booking
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                      Lock your vehicle for outstation and peak airport hours via instant UPI QR code.
                    </span>
                  </div>
                </label>
              </div>
            </SpotlightCard>
          </div>

          {/* RIGHT 1 COLUMN: LIVE SUMMARY CARD & SUBMISSION */}
          <div className="space-y-6">
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.16)"
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl space-y-6 sticky top-24 relative overflow-hidden"
            >
              <BorderBeam size={280} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                    Booking Summary
                  </span>
                  <ShinyText text="Zero Advance Needed" speed={3.5} className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-extrabold text-neutral-950 dark:text-white mt-1">
                  {currentVehicle.name}
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {currentVehicle.capacity} · Dual Chilled AC Chauffeur Driven
                </p>
              </div>

              {/* Route Summary */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">PICKUP</span>
                  <p className="font-semibold text-neutral-900 dark:text-white truncate">
                    {pickupAddress || "Select pickup location"}
                  </p>
                </div>
                <div className="border-t border-neutral-200/60 dark:border-neutral-700/60 pt-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">DESTINATION</span>
                  <p className="font-semibold text-neutral-900 dark:text-white truncate">
                    {dropAddress || "Select destination"}
                  </p>
                </div>
                <div className="border-t border-neutral-200/60 dark:border-neutral-700/60 pt-2 flex justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">SCHEDULE</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {pickupDate} at {pickupTime}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">TYPE</span>
                    <span className="font-semibold text-primary-6000 capitalize">{tripType}</span>
                  </div>
                </div>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Base Trip Fare:</span>
                  <span className="font-bold text-neutral-900 dark:text-white font-mono">
                    ₹{finalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Chauffeur Service & Fuel:</span>
                  <span className="font-bold text-emerald-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Toll & Parking:</span>
                  <span className="font-medium text-neutral-500">At actuals on expressway</span>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-neutral-950 dark:text-white">
                    Estimated Total:
                  </span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono flex items-center">
                    ₹
                    <AnimatedCounter
                      from={0}
                      to={finalPrice}
                      duration={0.6}
                      formatter={(v) => v.toLocaleString("en-IN")}
                    />
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting}
                  background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
                  className="w-full py-4 text-sm font-black shadow-lg shadow-amber-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>Confirming Chauffeur Allocation...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5 stroke-[2.2]" />
                      <span>Confirm & Book Now</span>
                    </>
                  )}
                </ShimmerButton>
                <p className="text-[11px] text-center text-neutral-400 mt-3 font-medium flex items-center justify-center gap-1.5">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500 inline-block shrink-0" />
                  <span>Zero-advance required. Free cancellation up to 3 hours before pickup.</span>
                </p>
              </div>

              {/* Direct Call Fallback */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900 dark:text-white block">Prefer calling?</span>
                  <span className="text-[11px] text-neutral-500">24x7 Direct Dispatch Desk</span>
                </div>
                <a
                  href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                  className="px-3 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOutPagePageMain;
