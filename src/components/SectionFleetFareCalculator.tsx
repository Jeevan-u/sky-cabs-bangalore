"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { SADHGURU_FLEET, SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import {
  AirplaneIcon,
  ClockIcon,
  CarIcon,
  ArrowRightIcon,
  WhatsAppIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import {
  AnimatedCounter,
  SpotlightCard,
  ShinyText,
  MagneticButton,
  BorderBeam,
  AnimatedTabs,
  ShimmerButton,
} from "@/components/reactbits";

interface FareCalculationResult {
  vehicleName: string;
  tripType: string;
  estimatedTotal: number;
  breakdown: string;
  distanceKm: number;
  days: number;
}

export default function SectionFleetFareCalculator() {
  const router = useRouter();
  const [tripType, setTripType] = useState<"airport" | "local" | "outstation">("airport");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("dzire-etios");
  const [airportTrip, setAirportTrip] = useState<"drop" | "pickup" | "round">("drop");
  const [airportHub, setAirportHub] = useState<string>("Kukatpally / KPHB");
  const [outstationKm, setOutstationKm] = useState<number>(300);
  const [outstationDays, setOutstationDays] = useState<number>(1);
  const [localHours, setLocalHours] = useState<number>(8);

  const selectedVehicle = SADHGURU_FLEET.find((v) => v.id === selectedVehicleId) || SADHGURU_FLEET[0];

  const calculateFare = (): FareCalculationResult => {
    let total = 0;
    let breakdown = "";

    if (tripType === "airport") {
      let base = selectedVehicle.airportFlatRate;
      if (airportTrip === "round") {
        total = base * 1.85; // discount for roundtrip
        breakdown = `${selectedVehicle.name} · Roundtrip between ${airportHub} & Shamshabad Airport (Toll Fastag & Parking extra as actual)`;
      } else {
        total = base;
        breakdown = `${selectedVehicle.name} · 1-Way ${airportTrip === "drop" ? "Drop to" : "Pickup from"} Shamshabad Airport (${airportHub})`;
      }
    } else if (tripType === "local") {
      total = selectedVehicle.local8hr80km;
      if (localHours > 8) {
        const extraHours = localHours - 8;
        total += extraHours * (selectedVehicle.perKmRate * 12);
      }
      breakdown = `${selectedVehicle.name} · Local Hyderabad Rental (${localHours} Hours / up to 80 KMs base). Fuel included.`;
    } else {
      // Outstation
      const minKmPerDay = 300;
      const effectiveKm = Math.max(outstationKm, minKmPerDay * outstationDays);
      const kmCost = effectiveKm * selectedVehicle.perKmRate;
      const driverBata = outstationDays * 400; // ₹400 driver bata per day
      total = kmCost + driverBata;
      breakdown = `${selectedVehicle.name} · Outstation ${effectiveKm} km @ ₹${selectedVehicle.perKmRate}/km + Driver Bata ₹${driverBata} (${outstationDays} day${outstationDays > 1 ? "s" : ""})`;
    }

    return {
      vehicleName: selectedVehicle.name,
      tripType: tripType.toUpperCase(),
      estimatedTotal: Math.round(total),
      breakdown,
      distanceKm: tripType === "outstation" ? outstationKm : tripType === "airport" ? 45 : 80,
      days: outstationDays,
    };
  };

  const result = calculateFare();

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello Sri Sadhguru Travels,\nI would like to book a cab with the following details:\n\n` +
        `• Vehicle: ${result.vehicleName}\n` +
        `• Trip Type: ${result.tripType}\n` +
        `• Route/Hub: ${tripType === "airport" ? airportHub + " <-> Shamshabad Airport" : tripType === "local" ? "Hyderabad Local City" : `Outstation (${outstationKm} KM, ${outstationDays} Days)`}\n` +
        `• Estimated Fare: ₹${result.estimatedTotal.toLocaleString("en-IN")}\n` +
        `• Details: ${result.breakdown}\n\n` +
        `Please confirm driver availability and final quotation.`
    );
    window.open(`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=${text}`, "_blank");
  };

  const handleOnlineBooking = () => {
    const pickup = tripType === "airport" ? `${airportHub}, Hyderabad` : "Kukatpally (HQ), Hyderabad";
    const drop =
      tripType === "airport"
        ? "Shamshabad Airport (RGIA)"
        : tripType === "local"
        ? "Local City (8h / 80km)"
        : `Outstation Tour (${outstationKm} KM)`;
    router.push(
      `/checkout?vehicle=${encodeURIComponent(selectedVehicleId)}&trip=${encodeURIComponent(
        tripType
      )}&pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(
        drop
      )}&price=${encodeURIComponent(result.estimatedTotal)}` as any
    );
  };

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl p-6 lg:p-10 shadow-xl mb-14">
      <div className="max-w-3xl mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 px-3 py-1.5 rounded-full inline-block mb-3">
          Instant Fare Estimation
        </span>
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Transparent Cab Fare & Tour Calculator
        </h2>
        <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-300 mt-2">
          Calculate instant estimated pricing with zero hidden charges for Airport transfers, Hyderabad city local packages, and outstation pilgrimages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Trip Type Selector with AnimatedTabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Step 1: Choose Trip Service
            </label>
            <AnimatedTabs
              tabs={[
                {
                  id: "airport",
                  label: "Airport Taxi",
                  icon: <AirplaneIcon className="w-4 h-4 text-sky-400" />,
                },
                {
                  id: "local",
                  label: "Local (8h/80km)",
                  icon: <ClockIcon className="w-4 h-4 text-emerald-400" />,
                },
                {
                  id: "outstation",
                  label: "Outstation Round",
                  icon: <CarIcon className="w-4 h-4 text-amber-400" />,
                },
              ]}
              activeTab={tripType}
              onChange={(id) => setTripType(id as any)}
              className="w-full justify-between"
              pillColor="bg-primary-600 text-white font-bold shadow-md shadow-primary-600/25"
            />
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Step 2: Select Vehicle Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SADHGURU_FLEET.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`p-3 text-left rounded-2xl border transition-all ${
                    selectedVehicleId === v.id
                      ? "border-primary-600 bg-primary-50/50 dark:bg-primary-950/30 ring-2 ring-primary-500/20"
                      : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300"
                  }`}
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">{v.name}</p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{v.capacity}</p>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-1">
                    ₹{v.perKmRate}/km
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Options */}
          {tripType === "airport" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                  Airport Trip Mode
                </label>
                <select
                  value={airportTrip}
                  onChange={(e) => setAirportTrip(e.target.value as any)}
                  className="w-full text-xs sm:text-sm rounded-xl border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 py-2 px-3"
                >
                  <option value="drop">1-Way City to Airport Drop</option>
                  <option value="pickup">1-Way Airport to City Pickup</option>
                  <option value="round">Same Day Airport Roundtrip</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                  Pickup / Drop Location
                </label>
                <select
                  value={airportHub}
                  onChange={(e) => setAirportHub(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-xl border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 py-2 px-3"
                >
                  <option value="Kukatpally / KPHB">Kukatpally / KPHB Colony</option>
                  <option value="Miyapur / Chandanagar">Miyapur / Chandanagar</option>
                  <option value="Hitec City / Madhapur">Hitec City / Madhapur / Gachibowli</option>
                  <option value="Medchal / Kompally">Medchal / Kompally</option>
                  <option value="Secunderabad / Begumpet">Secunderabad / Begumpet</option>
                  <option value="Gandhari / Kamareddy">Gandhari / Kamareddy</option>
                </select>
              </div>
            </div>
          )}

          {tripType === "local" && (
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                Rental Duration: <span className="font-bold text-primary-600">{localHours} Hours</span> (includes 80 KM base)
              </label>
              <input
                type="range"
                min="8"
                max="14"
                step="1"
                value={localHours}
                onChange={(e) => setLocalHours(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>8 Hours (Base)</span>
                <span>10 Hours</span>
                <span>12 Hours</span>
                <span>14 Hours (Full Day)</span>
              </div>
            </div>
          )}

          {tripType === "outstation" && (
            <div className="space-y-4 bg-white dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                    Estimated Roundtrip Distance:
                  </label>
                  <span className="text-sm font-bold text-primary-600">{outstationKm} KM</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1600"
                  step="50"
                  value={outstationKm}
                  onChange={(e) => setOutstationKm(Number(e.target.value))}
                  className="w-full accent-primary-600 cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOutstationKm(440);
                      setOutstationDays(1);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                  >
                    Srisailam (440 km)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutstationKm(1120);
                      setOutstationDays(3);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                  >
                    Tirupati (1120 km)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutstationKm(1240);
                      setOutstationDays(3);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                  >
                    Shirdi (1240 km)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutstationKm(550);
                      setOutstationDays(1);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                  >
                    Vijayawada (550 km)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                  Trip Duration (Days)
                </label>
                <select
                  value={outstationDays}
                  onChange={(e) => setOutstationDays(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm rounded-xl border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 py-2 px-3"
                >
                  <option value={1}>1 Day (Same Day Return)</option>
                  <option value={2}>2 Days / 1 Night</option>
                  <option value={3}>3 Days / 2 Nights</option>
                  <option value={4}>4 Days / 3 Nights</option>
                  <option value={5}>5+ Days Custom Tour</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Fare Summary Column with SpotlightCard & BorderBeam */}
        <SpotlightCard
          className="lg:col-span-5 p-6 shadow-xl !rounded-2xl relative overflow-hidden"
          spotlightColor="rgba(245, 158, 11, 0.25)"
        >
          <BorderBeam size={260} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              <ShinyText text="Estimated Total Quote" speed={3} />
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white flex items-center font-mono">
                <span>₹</span>
                <AnimatedCounter
                  to={result.estimatedTotal}
                  duration={0.5}
                  formatter={(val) => val.toLocaleString("en-IN")}
                />
              </span>
              <span className="text-xs text-neutral-500 font-medium">approx.</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
              {result.breakdown}
            </p>
          </div>

          <div className="space-y-3 mb-6 text-xs text-neutral-600 dark:text-neutral-300">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Vehicle Selected:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">{result.vehicleName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Seating Capacity:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">{selectedVehicle.capacity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Luggage Allowance:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">{selectedVehicle.luggage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Driver Bata / Allowance:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {tripType === "outstation" ? `₹400 / day (Included)` : `Included`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Tolls & Parking:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">At actuals via Fastag</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <ShimmerButton
              onClick={handleOnlineBooking}
              background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
              className="w-full py-3.5 text-sm font-bold shadow-md shadow-amber-500/25"
            >
              <span>Proceed to Book Online</span>
              <ArrowRightIcon className="w-4 h-4 text-white" />
            </ShimmerButton>

            <MagneticButton pullFactor={0.2} className="w-full">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Confirm & Book on WhatsApp</span>
              </button>
            </MagneticButton>

            <a
              href={`tel:+91${SADHGURU_CONTACT.primaryPhone}`}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-all text-center"
            >
              <PhoneIcon className="w-4 h-4 text-neutral-500" />
              <span>Call Proprietor: +91 {SADHGURU_CONTACT.primaryPhone}</span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 inline-flex items-center gap-1.5 justify-center">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
              <span>100% Guaranteed On-Time Dispatch · 24x7 Customer Support</span>
            </span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}