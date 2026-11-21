"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SKY_CABS_FLEET,
  SKY_CABS_CONTACT,
  BENGALURU_HUBS,
  OUTSTATION_POPULAR_DESTINATIONS,
} from "@/data/skyCabsFleet";
import {
  AirplaneIcon,
  TempleIcon,
  ClockIcon,
  CheckCircleIcon,
  WhatsAppIcon,
  BoltIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from "@/components/icons";

export default function SkyCabsBookingForm() {
  const [tripType, setTripType] = useState<"airport" | "outstation" | "local">("airport");

  // Airport Tab State
  const [airportDirection, setAirportDirection] = useState<"to_airport" | "from_airport">("to_airport");
  const [airportCityLocation, setAirportCityLocation] = useState("Begur, Bengaluru");
  const [airportDate, setAirportDate] = useState("");
  const [airportTime, setAirportTime] = useState("");
  const [airportVehicleId, setAirportVehicleId] = useState("innova-crysta");
  const [flightNumber, setFlightNumber] = useState("");

  // Outstation Tab State
  const [outstationTripMode, setOutstationTripMode] = useState<"round_trip" | "one_way">("round_trip");
  const [outstationFrom, setOutstationFrom] = useState("Begur, Bengaluru");
  const [outstationTo, setOutstationTo] = useState("Tirupati");
  const [outstationDepartDate, setOutstationDepartDate] = useState("");
  const [outstationReturnDate, setOutstationReturnDate] = useState("");
  const [outstationVehicleId, setOutstationVehicleId] = useState("innova-crysta");

  // Local Tab State
  const [localCityLocation, setLocalCityLocation] = useState("Electronic City / Whitefield");
  const [localPackage, setLocalPackage] = useState<"4hr40km" | "8hr80km" | "12hr120km">("8hr80km");
  const [localDate, setLocalDate] = useState("");
  const [localVehicleId, setLocalVehicleId] = useState("prime-sedan");

  // Customer contact modal / fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected vehicle helpers
  const currentVehicle = SKY_CABS_FLEET.find((v) => {
    if (tripType === "airport") return v.id === airportVehicleId;
    if (tripType === "outstation") return v.id === outstationVehicleId;
    return v.id === localVehicleId;
  }) || SKY_CABS_FLEET[2];

  // Estimated fare
  let estimatedFare = 0;
  if (tripType === "airport") {
    estimatedFare = currentVehicle.airportFlatRate;
  } else if (tripType === "local") {
    if (localPackage === "4hr40km") estimatedFare = Math.round(currentVehicle.local8hr80km * 0.65);
    else if (localPackage === "8hr80km") estimatedFare = currentVehicle.local8hr80km;
    else estimatedFare = Math.round(currentVehicle.local8hr80km * 1.4);
  } else {
    // Outstation rough estimate (e.g. 500km round trip min)
    const baseKm = outstationTripMode === "round_trip" ? 600 : 350;
    estimatedFare = baseKm * currentVehicle.perKmRate;
  }

  // Generate WhatsApp Message
  const buildWhatsAppText = () => {
    let msg = `*New Booking Inquiry - Sky Cabs Bangalore*%0A`;
    msg += `--------------------------------%0A`;
    if (customerName) msg += `*Name:* ${customerName}%0A`;
    if (customerPhone) msg += `*Phone:* ${customerPhone}%0A`;

    if (tripType === "airport") {
      msg += `*Trip:* Airport Transfer (${airportDirection === "to_airport" ? "City to Kempegowda International Airport (BLR)" : "Kempegowda International Airport (BLR) to City"})%0A`;
      msg += `*Location:* ${airportCityLocation}%0A`;
      msg += `*Date/Time:* ${airportDate || "Today"} ${airportTime}%0A`;
      if (flightNumber) msg += `*Flight No:* ${flightNumber}%0A`;
    } else if (tripType === "outstation") {
      msg += `*Trip:* Outstation (${outstationTripMode === "round_trip" ? "Round Trip" : "One Way"})%0A`;
      msg += `*Route:* ${outstationFrom} to ${outstationTo}%0A`;
      msg += `*Depart:* ${outstationDepartDate || "Immediate"}%0A`;
      if (outstationTripMode === "round_trip") msg += `*Return:* ${outstationReturnDate}%0A`;
    } else {
      msg += `*Trip:* Local Hourly Rental (${localPackage})%0A`;
      msg += `*Pickup:* ${localCityLocation}%0A`;
      msg += `*Date:* ${localDate || "Today"}%0A`;
    }

    msg += `*Vehicle:* ${currentVehicle.name} (${currentVehicle.capacity})%0A`;
    msg += `*Estimated Fare:* ₹${estimatedFare}%0A`;
    msg += `--------------------------------%0A`;
    msg += `Please confirm vehicle availability and best quotation.`;
    return msg;
  };

  const handleOnlineBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please enter your Name and Mobile Number to confirm booking.");
      return;
    }

    setIsSubmitting(true);
    try {
      const pickup =
        tripType === "airport"
          ? airportDirection === "to_airport"
            ? airportCityLocation
            : "Kempegowda International Airport (BLR)"
          : tripType === "outstation"
          ? outstationFrom
          : localCityLocation;

      const drop =
        tripType === "airport"
          ? airportDirection === "to_airport"
            ? "Kempegowda International Airport (BLR)"
            : airportCityLocation
          : tripType === "outstation"
          ? outstationTo
          : `Local Package (${localPackage})`;

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          tripType,
          vehicleId: currentVehicle.id,
          vehicleName: currentVehicle.name,
          pickupLocation: pickup,
          dropLocation: drop,
          pickupDateTime:
            tripType === "airport"
              ? airportDate && airportTime
                ? `${airportDate} at ${airportTime}`
                : airportDate || airportTime || new Date().toISOString()
              : tripType === "outstation"
              ? outstationDepartDate || new Date().toISOString()
              : localDate || new Date().toISOString(),
          flightNumber,
          returnDate: tripType === "outstation" ? outstationReturnDate : "",
          estimatedPrice: estimatedFare,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(data.booking);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-[32px] shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
        <button
          type="button"
          onClick={() => setTripType("airport")}
          className={`flex-1 min-w-[120px] py-3.5 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-center transition flex items-center justify-center gap-2 border-b-2 whitespace-nowrap touch-manipulation active:scale-98 ${
            tripType === "airport"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-neutral-900"
              : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <AirplaneIcon className="w-4 h-4 text-sky-500" />
          <span>Airport Taxi</span>
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            Kempegowda
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTripType("outstation")}
          className={`flex-1 min-w-[120px] py-3.5 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-center transition flex items-center justify-center gap-2 border-b-2 whitespace-nowrap touch-manipulation active:scale-98 ${
            tripType === "outstation"
              ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-neutral-900"
              : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <TempleIcon className="w-4 h-4 text-amber-500" />
          <span>Outstation Tours</span>
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
            Per-KM
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTripType("local")}
          className={`flex-1 min-w-[120px] py-3.5 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-center transition flex items-center justify-center gap-2 border-b-2 whitespace-nowrap touch-manipulation active:scale-98 ${
            tripType === "local"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-neutral-900"
              : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <span>⏱️</span>
          <span>Hourly Rental</span>
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
            8hr/80km
          </span>
        </button>
      </div>

      {/* Form Content */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* AIRPORT FORM */}
        {tripType === "airport" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-neutral-700 dark:text-neutral-300">
                <input
                  type="radio"
                  name="airportDir"
                  checked={airportDirection === "to_airport"}
                  onChange={() => setAirportDirection("to_airport")}
                  className="text-blue-600"
                />
                Pickup from City to Airport (Kempegowda)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-neutral-700 dark:text-neutral-300">
                <input
                  type="radio"
                  name="airportDir"
                  checked={airportDirection === "from_airport"}
                  onChange={() => setAirportDirection("from_airport")}
                  className="text-blue-600"
                />
                Pickup from Airport (BLR) to City
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  {airportDirection === "to_airport" ? "Pickup Location in Bengaluru" : "Drop Destination in Bengaluru"}
                </label>
                <select
                  value={airportCityLocation}
                  onChange={(e) => setAirportCityLocation(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  {BENGALURU_HUBS.map((hub) => (
                    <option key={hub} value={hub}>
                      {hub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Select Vehicle (5 to 50 Seater)
                </label>
                <select
                  value={airportVehicleId}
                  onChange={(e) => setAirportVehicleId(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  {SKY_CABS_FLEET.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.capacity}) - Flat ₹{f.airportFlatRate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Date & Pickup Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={airportDate}
                    onChange={(e) => setAirportDate(e.target.value)}
                    className="w-full min-h-[44px] text-base sm:text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                  />
                  <input
                    type="time"
                    value={airportTime}
                    onChange={(e) => setAirportTime(e.target.value)}
                    className="w-full min-h-[44px] text-base sm:text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OUTSTATION FORM */}
        {tripType === "outstation" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-neutral-700 dark:text-neutral-300">
                <input
                  type="radio"
                  name="outstationMode"
                  checked={outstationTripMode === "round_trip"}
                  onChange={() => setOutstationTripMode("round_trip")}
                  className="text-amber-500"
                />
                Round Trip (Temple Tour / Family Vacation)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-neutral-700 dark:text-neutral-300">
                <input
                  type="radio"
                  name="outstationMode"
                  checked={outstationTripMode === "one_way"}
                  onChange={() => setOutstationTripMode("one_way")}
                  className="text-amber-500"
                />
                One Way Drop
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Starting City
                </label>
                <select
                  value={outstationFrom}
                  onChange={(e) => setOutstationFrom(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  {BENGALURU_HUBS.map((hub) => (
                    <option key={hub} value={hub}>
                      {hub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  list="destinations"
                  value={outstationTo}
                  onChange={(e) => setOutstationTo(e.target.value)}
                  placeholder="e.g. Tirupati / Coorg / Mysuru"
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                />
                <datalist id="destinations">
                  {OUTSTATION_POPULAR_DESTINATIONS.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Select Vehicle
                </label>
                <select
                  value={outstationVehicleId}
                  onChange={(e) => setOutstationVehicleId(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  {SKY_CABS_FLEET.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} - ₹{f.perKmRate}/km
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Dates
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={outstationDepartDate}
                    onChange={(e) => setOutstationDepartDate(e.target.value)}
                    className="w-full min-h-[44px] text-base sm:text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                  />
                  {outstationTripMode === "round_trip" && (
                    <input
                      type="date"
                      value={outstationReturnDate}
                      onChange={(e) => setOutstationReturnDate(e.target.value)}
                      className="w-full min-h-[44px] text-base sm:text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOCAL FORM */}
        {tripType === "local" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Select Rental Package
                </label>
                <select
                  value={localPackage}
                  onChange={(e: any) => setLocalPackage(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  <option value="4hr40km">4 Hours / 40 Kms (Half Day)</option>
                  <option value="8hr80km">8 Hours / 80 Kms (Full Day - Recommended)</option>
                  <option value="12hr120km">12 Hours / 120 Kms (Extended Day)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Pickup Hub
                </label>
                <select
                  value={localCityLocation}
                  onChange={(e) => setLocalCityLocation(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  {BENGALURU_HUBS.map((hub) => (
                    <option key={hub} value={hub}>
                      {hub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Vehicle Choice
                </label>
                <select
                  value={localVehicleId}
                  onChange={(e) => setLocalVehicleId(e.target.value)}
                  className="w-full min-h-[44px] text-base sm:text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
                >
                  {SKY_CABS_FLEET.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.capacity})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Customer Details Strip */}
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Ranganathan"
              className="w-full min-h-[44px] text-base sm:text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Mobile Number (WhatsApp) *
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 9849012345"
              className="w-full min-h-[44px] text-base sm:text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-neutral-900 dark:text-white"
            />
          </div>
        </div>

        {/* Price & Action Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Estimated Quotation
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                ₹{estimatedFare}
              </span>
              <span className="text-xs text-neutral-500">
                {tripType === "outstation" ? "(approx round trip base)" : "all-inclusive cab fare"}
              </span>
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 mt-0.5">
              <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Guaranteed On-Time · Clean AC Cab · Experienced Driver</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* WhatsApp Direct Book */}
            <a
              href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${buildWhatsAppText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none min-h-[48px] py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/20 transition flex items-center justify-center gap-2 active:scale-98 touch-manipulation"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Book on WhatsApp</span>
            </a>

            {/* Instant Online Book */}
            <button
              type="button"
              onClick={handleOnlineBooking}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none min-h-[48px] py-3.5 px-6 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2 active:scale-98 touch-manipulation"
            >
              <BoltIcon className="w-4 h-4 text-white" />
              <span>{isSubmitting ? "Confirming..." : "Book Online"}</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {bookingSuccess && (
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-xs space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
              <CheckBadgeIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Booking Request Received! Reference: {bookingSuccess.id}</span>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Thank you <span className="font-bold">{bookingSuccess.customerName || bookingSuccess.customer_name || customerName}</span>. Our dispatch coordinator from Sky Cabs Bangalore is allocating your driver. Driver and vehicle details will be dispatched to your WhatsApp (<span className="font-bold">{bookingSuccess.customerPhone || bookingSuccess.customer_phone || customerPhone}</span>) shortly.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/track-booking?id=${bookingSuccess.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
              >
                <span>Track Trip Live</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              <div className="font-semibold text-neutral-700 dark:text-neutral-300">
                Need immediate confirmation? Call directly:{" "}
                <a href={`tel:${SKY_CABS_CONTACT.primaryPhone}`} className="text-blue-600 dark:text-blue-400 underline font-bold">
                  {SKY_CABS_CONTACT.primaryPhoneFormatted}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}