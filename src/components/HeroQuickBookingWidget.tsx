"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  CalendarDaysIcon,
  TruckIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { AirplaneIcon, TempleIcon, WhatsAppIcon } from "@/components/icons";
import { SKY_CABS_FLEET, SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import CustomRouteModal from "@/components/CustomRouteModal";
import SmartLocationInput from "@/components/SmartLocationInput";
import CustomVehicleSelect from "@/components/CustomVehicleSelect";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import {
  AnimatedCounter,
  ShinyText,
  MagneticButton,
  SpotlightCard,
  BorderBeam,
  AnimatedTabs,
  ShimmerButton,
} from "@/components/reactbits";

const POPULAR_PICKUPS = [
  "Begur (HQ / Silk Board Junction)",
  "Electronic City Phase 1-9",
  "Koramangala Metro Station",
  "Whitefield / Marathahalli",
  "Outer Ring Road / Financial Dist",
  "Kempegowda International Airport (BLR)",
];

const POPULAR_DROPS = [
  "Kempegowda International Airport (BLR)",
  "Mysuru Palace & Chamundi Hills",
  "Tirupati Balaji Darshan",
  "Chennai City",
  "Local City (8h / 80km)",
  "Coorg Weekend Getaway",
];

export default function HeroQuickBookingWidget() {
  const router = useRouter();

  const [tripType, setTripType] = useState<"airport" | "outstation" | "local">("airport");
  const [vehicleId, setVehicleId] = useState("innova-crysta");
  const [pickupLocation, setPickupLocation] = useState("Begur, Bengaluru");
  const [dropLocation, setDropLocation] = useState("Kempegowda International Airport (BLR)");

  const todayStr = new Date().toISOString().split("T")[0];
  const [travelDate, setTravelDate] = useState(todayStr);
  const [travelTime, setTravelTime] = useState("06:00 AM");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const currentVehicle =
    SKY_CABS_FLEET.find((v) => v.id === vehicleId) || SKY_CABS_FLEET[2];

  // Dynamic price calculation
  let estimatedPrice = currentVehicle.airportFlatRate;
  if (tripType === "local") {
    estimatedPrice = currentVehicle.local8hr80km;
  } else if (tripType === "outstation") {
    estimatedPrice = currentVehicle.perKmRate * 350; // standard outstation base
  }

  const handleProceedBooking = () => {
    router.push(
      `/checkout?vehicle=${encodeURIComponent(vehicleId)}&trip=${encodeURIComponent(
        tripType
      )}&pickup=${encodeURIComponent(pickupLocation)}&drop=${encodeURIComponent(
        dropLocation
      )}&price=${encodeURIComponent(estimatedPrice)}&date=${encodeURIComponent(
        travelDate
      )}&time=${encodeURIComponent(travelTime)}` as any
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Sky Cabs Bangalore, I want to book a ${currentVehicle.name} for ${tripType} trip.\nPickup: ${pickupLocation}\nDrop: ${dropLocation}\nDate: ${travelDate} at ${travelTime}\nEst Fare: ₹${estimatedPrice}. Please confirm availability.`
  );

  return (
    <>
      <SpotlightCard
        spotlightColor="rgba(217, 119, 6, 0.12)"
      className="w-full max-w-5xl mx-auto !rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-4 sm:p-7 relative z-20 font-sans backdrop-blur-xl"
    >
      {/* React Bits Animated Border Beam inside dedicated overflow-hidden container */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none -z-10">
        <BorderBeam size={280} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
      </div>

      {/* TABS HEADER WITH ANIMATED TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-neutral-100 dark:border-neutral-800">
        <AnimatedTabs
          tabs={[
            {
              id: "airport",
              label: (
                <span>
                  <span className="sm:hidden">Airport</span>
                  <span className="hidden sm:inline">Airport Express</span>
                </span>
              ) as any,
              icon: <AirplaneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500" />,
            },
            {
              id: "outstation",
              label: (
                <span>
                  <span className="sm:hidden">Outstation</span>
                  <span className="hidden sm:inline">Outstation & Pilgrimage</span>
                </span>
              ) as any,
              icon: <TempleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />,
            },
            {
              id: "local",
              label: (
                <span>
                  <span className="sm:hidden">Hourly (8h)</span>
                  <span className="hidden sm:inline">Local 8h/80km</span>
                </span>
              ) as any,
              icon: <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />,
            },
          ]}
          activeTab={tripType}
          onChange={(id) => {
            setTripType(id as any);
            if (id === "airport") setDropLocation("Kempegowda International Airport (BLR)");
            else if (id === "outstation") setDropLocation("Mysuru Mallikarjuna Temple");
            else setDropLocation("Local City (8h / 80km)");
          }}
          pillColor="bg-amber-500 text-neutral-950 font-bold shadow-md"
        />

        {/* Live Zero Surge Pill with ShinyText */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">
          <SparklesIcon className="w-3.5 h-3.5 text-emerald-500" />
          <ShinyText text="Zero Surge · 100% Guaranteed On-Time" speed={3} />
        </div>
      </div>

      {/* INPUTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
        {/* Pickup Location with Live Suggestions */}
        <SmartLocationInput
          label="Pickup Location"
          value={pickupLocation}
          onChange={(val) => setPickupLocation(val)}
          placeholder="e.g. Begur, Electronic City..."
          type="pickup"
        />

        {/* Destination Drop with Smart Suggestions */}
        <SmartLocationInput
          label="Destination / Route"
          value={dropLocation}
          onChange={(val) => setDropLocation(val)}
          placeholder="e.g. Kempegowda International Airport (BLR), Mysuru..."
          type="drop"
        />

        {/* Vehicle Selection - Custom Luxury UI matching website aesthetics */}
        <CustomVehicleSelect
          value={vehicleId}
          onChange={(val) => setVehicleId(val)}
        />

        {/* Travel Schedule - Custom Calendar & Time Picker matching website aesthetics */}
        <CustomDateTimePicker
          travelDate={travelDate}
          travelTime={travelTime}
          onDateChange={(d) => setTravelDate(d)}
          onTimeChange={(t) => setTravelTime(t)}
        />
      </div>

      {/* QUICK LOCATION PILLS */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 pb-4">
        <span className="text-[10px] font-bold text-neutral-400 uppercase mr-1">Popular Hubs:</span>
        {POPULAR_PICKUPS.slice(0, 4).map((hub) => (
          <button
            key={hub}
            type="button"
            onClick={() => setPickupLocation(hub)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 transition"
          >
            {hub}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setIsCustomModalOpen(true)}
          className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 hover:bg-amber-500/20 transition flex items-center gap-1"
        >
          <MapPinIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>Other Location?</span>
          <span className="underline">Get Custom Quote</span>
        </button>
      </div>

      {/* FOOTER ACTION BAR */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Estimated Fare Display with AnimatedCounter */}
        <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              Guaranteed Best Rate
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white font-mono flex items-center">
                <span>₹</span>
                <AnimatedCounter
                  to={estimatedPrice}
                  duration={0.6}
                  formatter={(val) => val.toLocaleString("en-IN")}
                />
              </span>
              <span className="text-xs text-neutral-500 font-semibold">
                {tripType === "airport" ? "Flat Airport Rate" : tripType === "local" ? "8h / 80km" : "Estimated Base"}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md self-center">
            ₹0 Advance
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <a
            href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none justify-center px-4 py-3 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5 min-h-[48px] active:scale-98 shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          <ShimmerButton
            onClick={handleProceedBooking}
            background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
            className="flex-1 sm:flex-none justify-center px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 min-h-[48px] active:scale-98"
          >
            <span>Proceed to Book</span>
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </ShimmerButton>
        </div>
      </div>
    </SpotlightCard>

    <CustomRouteModal
      isOpen={isCustomModalOpen}
      onClose={() => setIsCustomModalOpen(false)}
      defaultPickup={pickupLocation}
      defaultDrop={dropLocation}
    />
  </>
  );
}
