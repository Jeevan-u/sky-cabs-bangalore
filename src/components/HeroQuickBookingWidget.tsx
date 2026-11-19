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
import { SADHGURU_FLEET, SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import CustomRouteModal from "@/components/CustomRouteModal";
import SmartLocationInput from "@/components/SmartLocationInput";
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
  "Kukatpally (HQ / Y-Junction)",
  "KPHB Colony Phase 1-9",
  "Miyapur Metro Station",
  "Hitec City / Madhapur",
  "Gachibowli / Financial Dist",
  "Shamshabad RGIA Airport",
];

const POPULAR_DROPS = [
  "Shamshabad Airport (RGIA)",
  "Srisailam Mallikarjuna Temple",
  "Tirupati Balaji Darshan",
  "Vijayawada Kanaka Durga",
  "Local City (8h / 80km)",
  "Shirdi Sai Baba Yatra",
];

export default function HeroQuickBookingWidget() {
  const router = useRouter();

  const [tripType, setTripType] = useState<"airport" | "outstation" | "local">("airport");
  const [vehicleId, setVehicleId] = useState("innova-crysta");
  const [pickupLocation, setPickupLocation] = useState("Kukatpally, Hyderabad");
  const [dropLocation, setDropLocation] = useState("Shamshabad Airport (RGIA)");

  const todayStr = new Date().toISOString().split("T")[0];
  const [travelDate, setTravelDate] = useState(todayStr);
  const [travelTime, setTravelTime] = useState("06:00 AM");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const currentVehicle =
    SADHGURU_FLEET.find((v) => v.id === vehicleId) || SADHGURU_FLEET[2];

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
      )}&price=${encodeURIComponent(estimatedPrice)}` as any
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Sri Sadhguru Travels, I want to book a ${currentVehicle.name} for ${tripType} trip.\nPickup: ${pickupLocation}\nDrop: ${dropLocation}\nDate: ${travelDate} at ${travelTime}\nEst Fare: ₹${estimatedPrice}. Please confirm availability.`
  );

  return (
    <SpotlightCard
      spotlightColor="rgba(217, 119, 6, 0.12)"
      className="w-full max-w-5xl mx-auto !rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-5 sm:p-7 relative z-20 font-sans backdrop-blur-xl overflow-hidden"
    >
      {/* React Bits Animated Border Beam */}
      <BorderBeam size={280} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />

      {/* TABS HEADER WITH ANIMATED TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
        <AnimatedTabs
          tabs={[
            {
              id: "airport",
              label: "Airport Express",
              icon: <AirplaneIcon className="w-4 h-4 text-sky-500" />,
            },
            {
              id: "outstation",
              label: "Outstation & Pilgrimage",
              icon: <TempleIcon className="w-4 h-4 text-amber-500" />,
            },
            {
              id: "local",
              label: "Local 8h/80km",
              icon: <ClockIcon className="w-4 h-4 text-emerald-500" />,
            },
          ]}
          activeTab={tripType}
          onChange={(id) => {
            setTripType(id as any);
            if (id === "airport") setDropLocation("Shamshabad Airport (RGIA)");
            else if (id === "outstation") setDropLocation("Srisailam Mallikarjuna Temple");
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
        {/* Pickup Location with Live Suggestions & GPS Auto-Detect */}
        <SmartLocationInput
          label="Pickup Location"
          value={pickupLocation}
          onChange={(val) => setPickupLocation(val)}
          placeholder="e.g. Kukatpally, KPHB..."
          type="pickup"
          enableGps={true}
        />

        {/* Destination Drop with Smart Suggestions */}
        <SmartLocationInput
          label="Destination / Route"
          value={dropLocation}
          onChange={(val) => setDropLocation(val)}
          placeholder="e.g. RGIA Airport, Srisailam..."
          type="drop"
        />

        {/* Vehicle Selection */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1.5">
            Vehicle Class
          </label>
          <div className="relative">
            <TruckIcon className="w-4 h-4 text-primary-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-bold text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            >
              {SADHGURU_FLEET.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.capacity})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Travel Schedule */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1.5">
            Date & Time
          </label>
          <div className="relative">
            <CalendarDaysIcon className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-bold text-neutral-900 dark:text-white outline-none focus:border-primary-500"
            />
          </div>
        </div>
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
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Estimated Fare Display with AnimatedCounter */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              Guaranteed Best Rate
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-neutral-900 dark:text-white font-mono flex items-center">
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
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
            ₹0 Advance
          </span>
        </div>

        {/* Buttons with MagneticButton */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <MagneticButton pullFactor={0.2}>
            <a
              href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 shrink-0"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </MagneticButton>

          <ShimmerButton
            onClick={handleProceedBooking}
            background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
            className="flex-1 sm:flex-none px-6 py-3 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25"
          >
            <span>Proceed to Book</span>
            <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
          </ShimmerButton>
        </div>
      </div>

      <CustomRouteModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        defaultPickup={pickupLocation}
        defaultDrop={dropLocation}
      />
    </SpotlightCard>
  );
}
