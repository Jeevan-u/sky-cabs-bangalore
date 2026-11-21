"use client";

import Heading from "@/shared/Heading";
import Image from "next/image";
import React from "react";
import Badge from "@/shared/Badge";
import { SpotlightCard, StarBorder, ShinyText } from "@/components/reactbits";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
  desc: string;
}

const FOUNDER_INFO: People[] = [
  {
    id: "1",
    name: "Sky Cabs Bangalore",
    job: "Sky Cabs Bangalore Team",
    avatar: "/images/sky-cabs-banner.jpg",
    desc: "Oversees fleet operations, driver verification, and customer satisfaction across Bengaluru and Yelahanka.",
  },
  {
    id: "2",
    name: "Begur Operations Desk",
    job: "24x7 Fleet & Booking Dispatch",
    avatar: "/images/Airport-cabs.jpg",
    desc: "Centralized rapid dispatch hub ensuring 15-minute doorstep cab arrival across Begur, Electronic City, and Koramangala.",
  },
  {
    id: "3",
    name: "Kempegowda International Airport (BLR) Division",
    job: "Airport Transfers & Express Cabs",
    avatar: "/images/Airport-cabs.jpg",
    desc: "Dedicated airport taxi wing guaranteeing on-time pickups for early morning flights and midnight arrivals.",
  },
  {
    id: "4",
    name: "South India Pilgrimage Wing",
    job: "Interstate & Hill Chauffeurs",
    avatar: "/images/images1.jpg",
    desc: "Specialized team for Mysuru, Tirupati, Coorg, and Dharmasthala pilgrimage tours with experienced ghat road drivers.",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="Dedicated management and verified chauffeurs delivering reliable, comfortable travel daily"
      >
        Management & Fleet Leadership
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_INFO.map((item, index) => {
          const isLead = item.id === "1";
          return (
            <SpotlightCard
              key={item.id}
              spotlightColor={isLead ? "rgba(217, 119, 6, 0.18)" : "rgba(16, 185, 129, 0.12)"}
              className={`p-5 rounded-3xl border ${
                isLead
                  ? "border-amber-400/50 dark:border-amber-600/40 bg-gradient-to-b from-amber-500/5 to-transparent"
                  : "border-neutral-200/80 dark:border-neutral-800"
              } bg-white dark:bg-neutral-900 shadow-sm flex flex-col justify-between`}
            >
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-800 shadow-inner">
                  <Image
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    src={item.avatar}
                    alt={item.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 25vw"
                  />
                  {isLead && (
                    <div className="absolute top-2.5 left-2.5">
                      <StarBorder as="div" color="#d97706" speed="4s">
                        <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          Founder & Prop
                        </span>
                      </StarBorder>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-1">
                  {isLead ? (
                    <ShinyText text={item.job} speed={3} className="text-xs font-bold text-amber-600 dark:text-amber-400" />
                  ) : (
                    <span className="inline-block text-xs font-semibold text-primary-6000 dark:text-primary-400">
                      {item.job}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2.5 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};

export default SectionFounder;
