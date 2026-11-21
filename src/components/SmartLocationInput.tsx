"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPinIcon,
  SparklesIcon,
  AirplaneIcon,
  TempleIcon,
  ClockIcon,
} from "@/components/icons";
import {
  searchLivePlaces,
  reverseGeocodeCoordinates,
  LocationResult,
} from "@/lib/locationProvider";

export interface LocationSuggestion {
  id: string;
  name: string;
  subtext: string;
  category: "hub" | "airport" | "pilgrimage" | "outstation" | "local";
  popular?: boolean;
  isLive?: boolean;
}

// Comprehensive database of Bengaluru Hubs, Colonies, IT corridors & Transit
const PICKUP_SUGGESTIONS: LocationSuggestion[] = [
  { id: "p1", name: "Begur, Bengaluru", subtext: "Business address · #56, Begur, Bengaluru 562157", category: "hub", popular: true },
  { id: "p2", name: "Electronic City Phase 1-9", subtext: "IT corridor · Phase 1 to Phase 9 · ORR connector", category: "hub", popular: true },
  { id: "p3", name: "Koramangala, Bengaluru", subtext: "Metro station · 80 Feet Road · Forum Mall", category: "hub", popular: true },
  { id: "p4", name: "HSR Layout, Bengaluru", subtext: "BDA Layout · 27th Main · Sector 1-7", category: "hub", popular: true },
  { id: "p5", name: "BTM Layout & JP Nagar", subtext: "Metro stations · Silk Board connector", category: "hub" },
  { id: "p6", name: "Jayanagar & Banashankari", subtext: "South Bengaluru residential & metro hubs", category: "hub" },
  { id: "p7", name: "Whitefield, Bengaluru", subtext: "ITPL · Manyata Tech Park · Metro station", category: "hub", popular: true },
  { id: "p8", name: "Marathahalli & Outer Ring Road", subtext: "Kundalahalli · ORR · Indiranagar junction", category: "hub" },
  { id: "p9", name: "Indiranagar, Bengaluru", subtext: "100 Feet Road · Metro station · 12th Main", category: "hub" },
  { id: "p10", name: "Yelahanka & Hebbal", subtext: "Airport road · Outer Ring Road junction", category: "hub" },
  { id: "p11", name: "Majestic Railway Station", subtext: "Platform portico · Central Bengaluru", category: "airport", popular: true },
  { id: "p12", name: "Kempegowda International Airport (BLR)", subtext: "Devanahalli · Arrivals & Departures · 24x7", category: "airport", popular: true },
];

const DESTINATION_SUGGESTIONS: LocationSuggestion[] = [
  { id: "d1", name: "Kempegowda International Airport (BLR)", subtext: "Devanahalli · Fixed airport fare · 24x7", category: "airport", popular: true },
  { id: "d2", name: "Mysuru Palace & Chamundi Hills", subtext: "150 KM · 3 Hrs · Same-day return", category: "outstation", popular: true },
  { id: "d3", name: "Tirupati Balaji Darshan", subtext: "325 KM · 6 Hrs · 2-day packages", category: "pilgrimage", popular: true },
  { id: "d4", name: "Coorg (Madikeri)", subtext: "260 KM · 5.5 Hrs · Coffee estates & falls", category: "outstation", popular: true },
  { id: "d5", name: "Ooty Nilgiris", subtext: "265 KM · 6 Hrs · Hill station getaway", category: "outstation", popular: true },
  { id: "d6", name: "Chennai City", subtext: "345 KM · 6 Hrs · Expressway transfer", category: "outstation" },
  { id: "d7", name: "Mangaluru", subtext: "350 KM · 7 Hrs · Coastal route", category: "outstation" },
  { id: "d8", name: "Hampi, Hospet", subtext: "380 KM · UNESCO heritage weekend", category: "outstation" },
  { id: "d9", name: "Local City Rental (8 Hours / 80 KMs)", subtext: "Full-day Bengaluru travel", category: "local", popular: true },
  { id: "d10", name: "Local City Rental (4 Hours / 40 KMs)", subtext: "Half-day city commute", category: "local" },
  { id: "d11", name: "Local City Rental (12 Hours / 120 KMs)", subtext: "Extended day & event travel", category: "local" },
  { id: "d12", name: "Wayanad", subtext: "300 KM · Forests, lakes & waterfalls", category: "outstation" },
  { id: "d13", name: "Chikmagalur", subtext: "250 KM · Coffee estates & Mullayanagiri", category: "outstation" },
  { id: "d14", name: "Pondicherry", subtext: "310 KM · French quarter retreat", category: "outstation" },
  { id: "d15", name: "Hassan & Belur", subtext: "190 KM · Hoysala temples", category: "outstation" },
];

// Offline GPS landmarks for fast nearest-neighbor fallback
const BENGALURU_GPS_LANDMARKS = [
  { name: "Begur, Bengaluru", lat: 12.8407, lng: 77.7238, subtext: "Business address · #56, Begur" },
  { name: "Electronic City, Bengaluru", lat: 12.8452, lng: 77.6602, subtext: "IT corridor · Phase 1 to Phase 9" },
  { name: "Koramangala, Bengaluru", lat: 12.9352, lng: 77.6245, subtext: "80 Feet Road · Forum Mall" },
  { name: "HSR Layout, Bengaluru", lat: 12.9116, lng: 77.6389, subtext: "27th Main · Sector 1-7" },
  { name: "Whitefield, Bengaluru", lat: 12.9698, lng: 77.7499, subtext: "ITPL · Manyata Tech Park" },
  { name: "Indiranagar, Bengaluru", lat: 12.9719, lng: 77.6412, subtext: "100 Feet Road · Metro" },
  { name: "Jayanagar, Bengaluru", lat: 12.9290, lng: 77.5816, subtext: "South Bengaluru hub" },
  { name: "Yelahanka, Bengaluru", lat: 13.1006, lng: 77.5960, subtext: "Airport road · Outer hub" },
  { name: "Majestic Railway Station, Bengaluru", lat: 12.9767, lng: 77.5713, subtext: "Central Bengaluru · Platform portico" },
  { name: "Kempegowda International Airport (BLR), Bengaluru", lat: 13.1986, lng: 77.7066, subtext: "Devanahalli · Arrivals / Departures" },
];

export interface SmartLocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: "pickup" | "drop";
  enableGps?: boolean;
  className?: string;
  labelClassName?: string;
}

export const SmartLocationInput: React.FC<SmartLocationInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Type locality, colony, or landmark...",
  type,
  enableGps = false,
  className = "",
  labelClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [liveSuggestions, setLiveSuggestions] = useState<LocationResult[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Close suggestions popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestionsPool = type === "pickup" ? PICKUP_SUGGESTIONS : DESTINATION_SUGGESTIONS;

  // Filter local static suggestions instantly
  const localFiltered = useMemo(() => {
    if (!value.trim()) {
      return suggestionsPool;
    }
    const q = value.toLowerCase().trim();
    return suggestionsPool.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.subtext.toLowerCase().includes(q)
    );
  }, [value, suggestionsPool]);

  // Live LocationIQ & Photon search with debouncing
  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setLiveSuggestions([]);
      setIsSearchingLive(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      setIsSearchingLive(true);
      try {
        const results = await searchLivePlaces(trimmed, { signal: controller.signal });
        // Filter out any results that already match local suggestions to avoid duplicates
        const localNames = new Set(localFiltered.map((l) => l.name.toLowerCase()));
        const uniqueLive = results.filter((r) => !localNames.has(r.name.toLowerCase()));
        setLiveSuggestions(uniqueLive);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.warn("[Live Places] Search issue:", err);
        }
      } finally {
        setIsSearchingLive(false);
      }
    }, 280);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, localFiltered]);

  // Combined suggestions
  const allSuggestions = useMemo(() => {
    if (!value.trim()) return localFiltered;
    return [...localFiltered, ...liveSuggestions];
  }, [localFiltered, liveSuggestions, value]);

  // GPS Auto-detect logic with LocationIQ / OpenStreetMap Reverse Geocode + Offline fallback
  const handleDetectGps = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Please type your location manually.");
      return;
    }

    setIsLocating(true);
    setGpsStatus("Acquiring GPS Satellite Signal...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`[GPS] Position acquired: ${latitude}, ${longitude} (±${Math.round(accuracy)}m)`);

        try {
          setGpsStatus("Reverse Geocoding Address...");
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);

          const preciseAddress = await reverseGeocodeCoordinates(latitude, longitude, {
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (preciseAddress) {
            onChange(preciseAddress);
            setGpsStatus("📍 Precise Doorstep GPS Detected!");
            setTimeout(() => {
              setIsLocating(false);
              setGpsStatus(null);
              setIsOpen(false);
            }, 900);
            return;
          }
        } catch (err) {
          console.warn("[GPS] Online reverse lookup bypassed, using nearest landmark:", err);
        }

        // Nearest-neighbor fallback among Bengaluru hubs
        let nearest = BENGALURU_GPS_LANDMARKS[0];
        let minDistance = Number.MAX_VALUE;

        BENGALURU_GPS_LANDMARKS.forEach((landmark) => {
          const dLat = landmark.lat - latitude;
          const dLng = landmark.lng - longitude;
          const dist = Math.sqrt(dLat * dLat + dLng * dLng);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = landmark;
          }
        });

        const detectedLocation = `${nearest.name} (${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E)`;
        onChange(detectedLocation);
        setGpsStatus(`📍 Nearest Hub: ${nearest.name}`);
        setTimeout(() => {
          setIsLocating(false);
          setGpsStatus(null);
          setIsOpen(false);
        }, 900);
      },
      (error) => {
        console.error("[GPS] Error retrieving coordinates:", error);
        setIsLocating(false);
        setGpsStatus(null);
        let msg = "Could not detect GPS location.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. Please allow location access in your browser or type manually.";
        } else if (error.code === error.TIMEOUT) {
          msg = "GPS location request timed out. Please type manually.";
        }
        alert(msg);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  const getCategoryIcon = (category: LocationSuggestion["category"]) => {
    switch (category) {
      case "airport":
        return <AirplaneIcon className="w-4 h-4 text-sky-500 flex-shrink-0" />;
      case "pilgrimage":
        return <TempleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />;
      case "local":
        return <ClockIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
      default:
        return <MapPinIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />;
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="flex items-center justify-between mb-1.5">
        <label
          className={
            labelClassName ||
            "text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block"
          }
        >
          {label}
        </label>
      </div>

      {/* Input Field Container */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {type === "pickup" ? (
            <MapPinIcon className="w-4 h-4 text-emerald-500" />
          ) : (
            <MapPinIcon className="w-4 h-4 text-rose-500" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          title={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-base sm:text-xs font-bold text-neutral-900 dark:text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:font-normal placeholder:text-neutral-400 min-h-[44px] truncate"
        />

        {/* Clear Button or Live Searching Indicator */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isSearchingLive && (
            <span className="w-3 h-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin inline-block mr-1" />
          )}
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setLiveSuggestions([]);
                inputRef.current?.focus();
              }}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs p-1"
              title="Clear text"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Status banner when GPS is reading */}
      {gpsStatus && (
        <div className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <SparklesIcon className="w-3 h-3 text-emerald-500 animate-spin" />
          <span>{gpsStatus}</span>
        </div>
      )}

      {/* Autocomplete Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-[70] left-0 w-[320px] sm:w-[380px] md:w-[420px] max-w-[calc(100vw-2.5rem)] mt-2 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200/80 dark:border-neutral-700/80 overflow-hidden max-h-80 flex flex-col backdrop-blur-md touch-manipulation"
          >
            {/* Header / GPS shortcut in popup */}
            <div className="p-2.5 bg-neutral-50/90 dark:bg-neutral-800/90 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] gap-2">
              <span className="font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 truncate">
                <span>{type === "pickup" ? "Select Bengaluru Pickup Hub" : "Select Destination"}</span>
                {isSearchingLive && (
                  <span className="text-[10px] text-amber-500 font-normal">searching...</span>
                )}
              </span>

              {enableGps && (
                <button
                  type="button"
                  onClick={handleDetectGps}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 flex-shrink-0"
                >
                  <span>🎯 Use My GPS</span>
                </button>
              )}
            </div>

            {/* Suggestions List */}
            <div className="overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1">
              {allSuggestions.length > 0 ? (
                allSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange(item.name);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-3 sm:p-2.5 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition-colors flex items-start gap-3 group min-h-[44px] active:bg-amber-500/20"
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-amber-500/20 transition-colors flex-shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                          {item.name}
                        </span>
                        {item.popular && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex-shrink-0">
                            Popular
                          </span>
                        )}
                        {item.isLive && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 flex-shrink-0 flex items-center gap-0.5">
                            <span>📍 Map</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mt-0.5">
                        {item.subtext}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-neutral-500">
                  <p>No preset match for &ldquo;{value}&rdquo;</p>
                  <p className="mt-1 font-semibold text-neutral-700 dark:text-neutral-300">
                    Press outside or keep typing: custom addresses are accepted!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartLocationInput;
