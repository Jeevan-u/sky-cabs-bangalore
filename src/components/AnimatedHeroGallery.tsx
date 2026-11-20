"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  TiltedCard,
  BorderBeam,
  Float,
  ShinyText,
  StarBorder,
  Stack,
  StackCardItem,
} from "@/components/reactbits";
import { StarRating, BoltIcon } from "@/components/icons";

// Real High-Resolution Fleet & Destination Highlights
const STACK_CARDS: StackCardItem[] = [
  {
    id: "innova",
    image: "/images/fleet/innova-crysta.jpg",
    title: "Toyota Innova Crysta (7+1 VIP)",
    subtitle: "Dual Chilled AC · Hill Road Spec · Airport & Outstation",
    tag: "Most Popular",
  },
  {
    id: "srisailam",
    image: "/images/srisailam-dam.jpg",
    title: "Srisailam Mallikarjuna Jyotirlinga",
    subtitle: "213 KM · Nallamala Forest & Dam View · Hill-Trained Driver",
    tag: "Pilgrimage Special",
  },
  {
    id: "airport",
    image: "/images/Airport-hyderabad.jpg",
    title: "RGIA Shamshabad Airport Taxi",
    subtitle: "Guaranteed Zero Surge · 24x7 Doorstep Pickup across Hyderabad",
    tag: "Fixed Rates",
  },
  {
    id: "tempo",
    image: "/images/fleet/tempo-traveller-17.jpg",
    title: "Force Urbania & Tempo Traveller",
    subtitle: "12 to 26 Push-Back Seats · Wedding & Corporate Convoys",
    tag: "Group Travel",
  },
  {
    id: "tirupati",
    image: "/images/Tirupati.jpg",
    title: "Tirupati Balaji 2-Day Package",
    subtitle: "Lord Venkateswara Darshan · Verified Highway Chauffeurs",
    tag: "Devotional Tour",
  },
];

export const AnimatedHeroGallery: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [viewMode, setViewMode] = useState<"interactive" | "stack">("interactive");

  return (
    <div className={`relative w-full ${className}`}>
      {/* View Switcher Controls */}
      <div className="flex items-center justify-between pb-3 px-1">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("interactive")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              viewMode === "interactive"
                ? "bg-amber-500 text-neutral-950 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            3D Floating Gallery
          </button>
          <button
            type="button"
            onClick={() => setViewMode("stack")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              viewMode === "stack"
                ? "bg-amber-500 text-neutral-950 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Interactive Card Stack
          </button>
        </div>

        <div className="hidden sm:inline-block">
          <StarBorder as="div" color="#f59e0b" speed="4s">
            <span className="text-[10px] font-bold text-amber-500 px-2 py-0.5">
              <ShinyText text="✦ 3D Motion Active" speed={3} />
            </span>
          </StarBorder>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "stack" ? (
          <motion.div
            key="stack-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="w-full flex items-center justify-center py-4"
          >
            <Stack cards={STACK_CARDS} />
          </motion.div>
        ) : (
          <motion.div
            key="interactive-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] xl:h-[480px] flex items-center justify-center overflow-visible"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-sky-500/10 to-transparent blur-3xl -z-10 rounded-full" />

            {/* CARD 1: TOP-LEFT TRAVELER PHOTO (Couple on dock / Airport journey) */}
            <Float
              duration={4.8}
              offset={10}
              className="absolute top-2 left-1 sm:left-3 z-20 w-[54%] sm:w-[50%] aspect-[16/10]"
            >
              <TiltedCard
                captionText="Doorstep Pickups · Kukatpally & Hyderabad"
                containerHeight="100%"
                containerWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.06}
                showTooltip={false}
              >
                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 dark:border-neutral-700/80 bg-neutral-900 relative group">
                  <Image
                    src="/images/fleet/innova-crysta.jpg"
                    alt="Sri Sadhguru Innova Crysta Cab"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 300px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 text-white pointer-events-none">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 block w-fit mb-1 shadow">
                      VIP Fleet
                    </span>
                    <h5 className="text-xs sm:text-sm font-black drop-shadow">
                      Innova Crysta (7+1)
                    </h5>
                  </div>
                </div>
              </TiltedCard>
            </Float>

            {/* CARD 2: BOTTOM-LEFT RESORT / PILGRIMAGE PHOTO (Srisailam Dam Ghat Road) */}
            <Float
              duration={5.6}
              offset={-12}
              delay={0.8}
              className="absolute bottom-4 left-3 sm:left-6 z-10 w-[50%] sm:w-[46%] aspect-[16/11]"
            >
              <TiltedCard
                captionText="Hill-Road Spec Chauffeurs"
                containerHeight="100%"
                containerWidth="100%"
                rotateAmplitude={14}
                scaleOnHover={1.06}
                showTooltip={false}
              >
                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 dark:border-neutral-700/80 bg-neutral-900 relative group">
                  <Image
                    src="/images/srisailam-dam.jpg"
                    alt="Srisailam Tour Package"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 text-white pointer-events-none">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-neutral-950 block w-fit mb-1 shadow">
                      Pilgrimage Special
                    </span>
                    <h5 className="text-xs sm:text-sm font-black drop-shadow">
                      Srisailam Jyotirlinga
                    </h5>
                  </div>
                </div>
              </TiltedCard>
            </Float>

            {/* CARD 3: RIGHT VERTICAL PHOTO (Misty Mountains / Airport Express) */}
            <Float
              duration={6.2}
              offset={14}
              delay={1.4}
              className="absolute top-6 right-1 sm:right-2 z-30 w-[42%] sm:w-[44%] aspect-[9/13]"
            >
              <TiltedCard
                captionText="24x7 Airport Transfers"
                containerHeight="100%"
                containerWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showTooltip={false}
              >
                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 dark:border-neutral-700/90 bg-neutral-900 relative group">
                  <BorderBeam size={220} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
                  <Image
                    src="/images/Airport-hyderabad.jpg"
                    alt="Shamshabad Airport Taxi"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 45vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white pointer-events-none">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500 text-neutral-950 block w-fit mb-1 shadow">
                      RGIA Airport
                    </span>
                    <h5 className="text-xs sm:text-base font-black drop-shadow leading-tight">
                      Shamshabad Taxi
                    </h5>
                    <p className="text-[10px] sm:text-xs text-neutral-300 font-medium mt-0.5">
                      Fixed Non-Surge Rates
                    </p>
                  </div>
                </div>
              </TiltedCard>
            </Float>

            {/* Floating Live Trust Badges over the cluster */}
            <Float
              duration={3.8}
              offset={8}
              className="absolute -top-3 left-1/4 sm:left-1/3 z-40 pointer-events-none"
            >
              <div className="px-3 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-amber-500/40 text-[11px] font-extrabold text-neutral-900 dark:text-neutral-100 shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <StarRating rating={5} />
                <span>4.9/5 (2,400+ Verified Rides)</span>
              </div>
            </Float>

            <Float
              duration={4.4}
              offset={-8}
              delay={1}
              className="absolute -bottom-2 right-1/6 sm:right-1/4 z-40 pointer-events-none"
            >
              <div className="px-3 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-sky-500/40 text-[11px] font-extrabold text-neutral-900 dark:text-neutral-100 shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                <BoltIcon className="w-4 h-4 text-amber-500" />
                <span>15-Min Doorstep Pickup</span>
              </div>
            </Float>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeroGallery;
