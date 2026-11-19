"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import MagneticButton from "./MagneticButton";
import Link from "next/link";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { MapPinIcon, CarIcon, CheckCircleIcon } from "@/components/icons";

interface RouteNode {
  id: string;
  name: string;
  distance: string;
  duration: string;
  fare: string;
  tag: string;
  href: string;
}

const POPULAR_DESTINATIONS: RouteNode[] = [
  {
    id: "airport",
    name: "RGIA Shamshabad Airport",
    distance: "35 km",
    duration: "45 Mins",
    fare: "₹1,199",
    tag: "Fixed Non-Surge",
    href: "/shamshabad-airport-taxi",
  },
  {
    id: "srisailam",
    name: "Srisailam Mallikarjuna",
    distance: "215 km",
    duration: "4.5 Hrs",
    fare: "₹4,999",
    tag: "Ghat Road Spec",
    href: "/hyderabad-to-srisailam-cabs",
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji Darshan",
    distance: "555 km",
    duration: "9.5 Hrs",
    fare: "₹12,499",
    tag: "2-Day Package",
    href: "/hyderabad-to-tirupati-cabs",
  },
  {
    id: "shirdi",
    name: "Shirdi Sai Baba Temple",
    distance: "610 km",
    duration: "10.5 Hrs",
    fare: "₹14,999",
    tag: "Multi-Day Tour",
    href: "/hyderabad-to-shirdi-cabs",
  },
  {
    id: "bangalore",
    name: "Bangalore Express",
    distance: "570 km",
    duration: "8.5 Hrs",
    fare: "₹13,999",
    tag: "NH 44 Highway",
    href: "/hyderabad-outstation-cabs",
  },
  {
    id: "yadagirigutta",
    name: "Yadagirigutta Lakshmi Narasimha",
    distance: "65 km",
    duration: "1.5 Hrs",
    fare: "₹2,499",
    tag: "Same Day Return",
    href: "/hyderabad-to-yadagirigutta-cabs",
  },
];

export const AnimatedRouteBeam: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [activeRoute, setActiveRoute] = useState<RouteNode>(POPULAR_DESTINATIONS[1]);

  return (
    <div className={`w-full py-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Destination Selector Tabs */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Interactive Travel Radar
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
            Live Outstation Corridor Radar
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 pb-2">
            Select any destination corridor connected from Hyderabad. Real-time rates, estimated
            travel times, and verified chauffeurs.
          </p>

          <div className="space-y-2">
            {POPULAR_DESTINATIONS.map((dest) => {
              const isSelected = activeRoute.id === dest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => setActiveRoute(dest)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between border ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/40 shadow-sm"
                      : "bg-white/40 dark:bg-neutral-800/40 border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isSelected
                          ? "bg-amber-500 animate-ping"
                          : "bg-neutral-400 dark:bg-neutral-600"
                      }`}
                    />
                    <div>
                      <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {dest.name}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {dest.distance} · {dest.duration}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                      from {dest.fare}
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      {dest.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Visual Animated Interactive Radar Beam */}
        <div className="lg:col-span-7">
          <SpotlightCard
            className="p-6 sm:p-8 relative overflow-hidden !rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white"
            spotlightColor="rgba(245, 158, 11, 0.25)"
          >
            {/* Animated SVG Route Highway */}
            <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-between px-4 sm:px-10">
              {/* Central connecting glowing line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 60 130 C 180 50, 320 210, 480 130"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
                <motion.path
                  d="M 60 130 C 180 50, 320 210, 480 130"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, pathOffset: 0 } as any}
                  animate={{ pathOffset: [0, 1] } as any}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  strokeDasharray="40 160"
                />
              </svg>

              {/* Origin Node: Hyderabad */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 border-2 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                  <MapPinIcon className="w-7 h-7 text-amber-400" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                </div>
                <div className="mt-2 text-xs font-bold text-white">Hyderabad Hub</div>
                <div className="text-[10px] text-neutral-400">Kukatpally / KPHB</div>
              </motion.div>

              {/* Vehicle in Transit Pulse */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 flex items-center gap-1.5 shadow-lg"
                >
                  <CarIcon className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{activeRoute.duration}</span>
                </motion.div>
                <div className="text-[10px] text-neutral-400 mt-1">{activeRoute.distance} Tollway</div>
              </div>

              {/* Destination Node */}
              <motion.div
                key={activeRoute.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                  <CheckCircleIcon className="w-7 h-7 text-emerald-400" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="mt-2 text-xs font-bold text-white max-w-[120px] truncate">
                  {activeRoute.name}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">{activeRoute.fare}</div>
              </motion.div>
            </div>

            {/* Bottom Details & Instant Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-neutral-400">All-Inclusive Fixed Estimate</div>
                <div className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span>{activeRoute.fare}</span>
                  <span className="text-xs font-normal text-emerald-400">
                    (Includes Fuel & Driver Allowance)
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <MagneticButton pullFactor={0.25} className="w-full sm:w-auto">
                  <Link
                    href={activeRoute.href}
                    className="w-full sm:w-auto text-center px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition"
                  >
                    View Corridor Route
                  </Link>
                </MagneticButton>

                <MagneticButton pullFactor={0.25} className="w-full sm:w-auto">
                  <a
                    href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20please%20quote%20for%20Hyderabad%20to%20${encodeURIComponent(
                      activeRoute.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                  >
                    Instant WhatsApp
                  </a>
                </MagneticButton>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

export default AnimatedRouteBeam;
