"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import {
  InfiniteScroll,
  SpotlightCard,
  StarBorder,
  MagneticButton,
  ShinyText,
  BorderBeam,
  Float,
} from "@/components/reactbits";
import { StarRating, CheckCircleIcon, MapPinIcon, SparklesIcon } from "@/components/icons";

export interface SectionClientSayProps {
  className?: string;
}

const FEATURED_REVIEWS = [
  {
    id: 1,
    clientName: "Suresh Reddy",
    clientAddress: "Electronic City Phase 1, Bengaluru",
    vehicle: "Toyota Innova Crysta",
    tripType: "Pilgrimage: Bengaluru to Tirupati (Toyota Innova Crysta)",
    rating: 5,
    content:
      "Booked Toyota Innova Crysta for our family pilgrimage to Tirupati with Sky Cabs Bangalore. Driver Shiva arrived 15 mins early, the vehicle was spotless, and the AC was chilling throughout. Best quotation and polite coordination by Sky Cabs Bangalore!",
  },
  {
    id: 2,
    clientName: "Praveen Varma",
    clientAddress: "Koramangala Metro Station Hub",
    vehicle: "Prime Sedan (Sedan)",
    tripType: "Airport Transfer: Koramangala to Kempegowda International Airport (BLR)",
    rating: 5,
    content:
      "Frequent flyer to Kempegowda International Airport (BLR). Sky Cabs Bangalore's airport taxi is 100% on-time, guaranteed fixed pricing with no surge drama. Driver was courteous and drove safely.",
  },
  {
    id: 3,
    clientName: "K. Ananya Sharma",
    clientAddress: "Whitefield / Marathahalli",
    vehicle: "Tempo Traveller (12+1)",
    tripType: "Event: 2 Tempo Travellers for Wedding Convoy",
    rating: 5,
    content:
      "Arranged 2 Tempo Travellers for my brother's wedding guests in Bengaluru. Smooth coordination, clean pushback seats, and experienced highway drivers. Highly recommended!",
  },
  {
    id: 4,
    clientName: "B. Venkatesh",
    clientAddress: "Begur Silk Board Junction",
    tripType: "Outstation: Mysuru Weekend Tour (Maruti Suzuki Ertiga)",
    rating: 5,
    content:
      "Excellent ghat road driving through Western Ghats forest to Mysuru. Very comfortable journey with senior citizens on board. Honest per-km billing without hidden charges.",
  },
];

const TICKER_REVIEWS = [
  {
    name: "Dr. Venkat Rao",
    route: "Begur to Kempegowda International Airport (BLR)",
    rating: 5,
    comment: "Spotless cab and 10-minute rapid dispatch. Zero surge pricing!",
  },
  {
    name: "M. Harish",
    route: "Bengaluru to Mysuru 2-Day Yatra",
    rating: 5,
    comment: "Very polite driver who handled the ghat road safely. Family was very happy.",
  },
  {
    name: "B. Sridhar",
    route: "Jayanagar to Bengaluru Outstation",
    rating: 5,
    comment: "Reliable travel service. Digital duty slip received on WhatsApp instantly.",
  },
  {
    name: "K. Rajesh",
    route: "Electronic City to Tirupati Balaji Round Trip",
    rating: 5,
    comment: "Toyota Innova Crysta was immaculate. Chauffeur knew all temple route timings.",
  },
  {
    name: "N. Vijay",
    route: "Whitefield to Bangalore Outstation",
    rating: 5,
    comment: "Transparent per-km billing and no surprise driver batta charges.",
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function changeItemId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < FEATURED_REVIEWS.length - 1) {
        changeItemId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) changeItemId(index - 1);
    },
    trackMouse: true,
  });

  const currentItem = FEATURED_REVIEWS[index];

  return (
    <div className={`nc-SectionClientSay relative ${className}`}>
      <Heading
        desc="Real feedback from families, corporate travelers, and pilgrims who travel with Sky Cabs Bangalore"
        isCenter
      >
        Passenger Testimonials
      </Heading>

      <SpotlightCard
        spotlightColor="rgba(245, 158, 11, 0.15)"
        className="relative max-w-3xl mx-auto mt-12 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 !rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden"
      >
        <BorderBeam size={280} duration={9} colorFrom="#f59e0b" colorTo="#38bdf8" borderWidth={1.5} />
        {/* Rating stars & verified badge */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <StarRating rating={currentItem.rating} className="w-5 h-5 text-amber-400" />
          <Float duration={4} offset={5}>
            <StarBorder as="div" color="#10b981" speed="4s" className="inline-block">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Passenger</span>
              </span>
            </StarBorder>
          </Float>
        </div>

        <MotionConfig
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <div className="relative overflow-hidden py-6" {...handlers}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants(200, 1)}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-xs uppercase font-bold tracking-wider text-primary-6000">
                  {currentItem.tripType}
                </div>

                <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed italic">
                  &ldquo;{currentItem.content}&rdquo;
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {currentItem.clientName}
                    </h4>
                    <div className="flex items-center space-x-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{currentItem.clientAddress}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    Vehicle: {currentItem.vehicle}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </MotionConfig>

        {/* Carousel Dots & Controls */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {FEATURED_REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-primary-6000" : "w-2.5 bg-neutral-300 dark:bg-neutral-700"
                  }`}
                onClick={() => changeItemId(i)}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeItemId(Math.max(0, index - 1))}
              disabled={index === 0}
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 disabled:opacity-30 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              onClick={() => changeItemId(Math.min(FEATURED_REVIEWS.length - 1, index + 1))}
              disabled={index === FEATURED_REVIEWS.length - 1}
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 disabled:opacity-30 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition"
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>
      </SpotlightCard>

      {/* InfiniteScroll Marquee of Recent Verified Reviews */}
      <div className="mt-14">
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Live Verified Google Reviews
          </span>
        </div>
        <InfiniteScroll speed={32} pauseOnHover>
          {TICKER_REVIEWS.map((rev, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(245, 158, 11, 0.12)"
              className="w-72 p-4 !rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-700/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {rev.name}
                  </span>
                  <StarRating rating={5} className="w-3 h-3 text-amber-400" />
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-snug">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium mt-3 flex items-center gap-1 border-t border-neutral-100 dark:border-neutral-700/60 pt-2">
                <MapPinIcon className="w-3 h-3 text-rose-500 flex-shrink-0" />
                <span>{rev.route}</span>
              </span>
            </SpotlightCard>
          ))}
        </InfiniteScroll>
      </div>

      {/* Leave Review Prompt */}
      <div className="mt-8 text-center flex justify-center">
        <MagneticButton distance={0.2}>
          <Link
            href="/review"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition shadow-sm border border-neutral-200/60 dark:border-neutral-700"
          >
            <SparklesIcon className="w-4 h-4 text-amber-500" />
            <ShinyText text="Traveled with Sky Cabs Bangalore? Leave a 5-Star Review" speed={3.5} />
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
};

export default SectionClientSay;
