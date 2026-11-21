"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TruckIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { SKY_CABS_FLEET, FleetVehicle } from "@/data/skyCabsFleet";

export interface CustomVehicleSelectProps {
  value: string;
  onChange: (vehicleId: string) => void;
  className?: string;
  label?: string;
  labelClassName?: string;
}

export const CustomVehicleSelect: React.FC<CustomVehicleSelectProps> = ({
  value,
  onChange,
  className = "",
  label = "Vehicle Class",
  labelClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedVehicle =
    SKY_CABS_FLEET.find((v) => v.id === value) || SKY_CABS_FLEET[0]; // Prime Sedan default

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label
        className={
          labelClassName ||
          "text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1.5"
        }
      >
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-left outline-none hover:border-amber-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[44px] flex items-center justify-between group"
      >
        <TruckIcon className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-base sm:text-xs font-bold text-neutral-900 dark:text-white truncate">
              {selectedVehicle.name}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex-shrink-0">
              {selectedVehicle.capacity.split(" ")[0]}
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 truncate">
              · ₹{selectedVehicle.airportFlatRate} Airport / ₹{selectedVehicle.perKmRate}/km
            </span>
          </div>
        </div>

        <ChevronDownIcon
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180 text-amber-500" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-[70] left-0 w-full min-w-[300px] sm:min-w-[380px] max-w-[calc(100vw-2.5rem)] mt-2 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200/80 dark:border-neutral-700/80 overflow-hidden flex flex-col backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-2.5 bg-neutral-50/90 dark:bg-neutral-800/90 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
              <span className="font-bold text-neutral-500 uppercase tracking-wider">
                Select Commercial Fleet
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                100% AC Verified
              </span>
            </div>

            {/* Vehicle Options List */}
            <div className="overflow-y-auto max-h-72 divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1">
              {SKY_CABS_FLEET.map((vehicle: FleetVehicle) => {
                const isSelected = vehicle.id === value;
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => {
                      onChange(vehicle.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 group min-h-[50px] ${
                      isSelected
                        ? "bg-amber-500/15 dark:bg-amber-500/20 text-neutral-900 dark:text-white"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {/* Vehicle Thumbnail */}
                    <div className="w-12 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden relative flex-shrink-0 flex items-center justify-center border border-neutral-200/60 dark:border-neutral-700/60">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {vehicle.name}
                        </span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 flex-shrink-0">
                          ₹{vehicle.perKmRate}/km
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                          {vehicle.capacity}
                        </span>
                        <span>•</span>
                        <span className="truncate">{vehicle.category}</span>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomVehicleSelect;
