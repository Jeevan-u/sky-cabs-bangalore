"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/shared/Badge";
import Heading from "@/shared/Heading";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { ClockIcon, ArrowRightIcon } from "@/components/icons";
import { SpotlightCard, ShinyText, MagneticButton, StarBorder, Float } from "@/components/reactbits";

export interface SectionPopularRoutesProps {
  className?: string;
}

const routes = [
  {
    route: "Bengaluru to Mysuru",
    href: "/bangalore-to-mysuru-cabs",
    dist: "150 km",
    duration: "3 Hrs",
    price: "₹4,500",
    image: "/images/images1.jpg",
    highlight: "Mysuru Palace & Chamundi Hills",
  },
  {
    route: "Bengaluru to Tirupati",
    href: "/bangalore-to-tirupati-cabs",
    dist: "325 km",
    duration: "6 Hrs",
    price: "₹8,200",
    image: "/images/Tirupati.jpg",
    highlight: "Lord Venkateswara Temple",
  },
  {
    route: "Bengaluru to Coorg",
    href: "/bangalore-to-coorg-cabs",
    dist: "260 km",
    duration: "5.5 Hrs",
    price: "₹7,800",
    image: "/images/images2.jpg",
    highlight: "Coffee Plantations & Abbey Falls",
  },
  {
    route: "Bengaluru to Ooty",
    href: "/bangalore-to-ooty-cabs",
    dist: "265 km",
    duration: "6 Hrs",
    price: "₹9,499",
    image: "/images/images3.jpg",
    highlight: "Nilgiri Hills & Tea Gardens",
  },
  {
    route: "Bengaluru to Chennai",
    href: "/bangalore-to-chennai-cabs",
    dist: "345 km",
    duration: "6 Hrs",
    price: "₹10,999",
    image: "/images/images4.jpg",
    highlight: "Marina Beach & City Temples",
  },
  {
    route: "Bengaluru to Mangaluru",
    href: "/bangalore-to-mangaluru-cabs",
    dist: "350 km",
    duration: "7 Hrs",
    price: "₹11,500",
    image: "/images/Gokarna.webp",
    highlight: "Coastal temples & beaches",
  },
];

const SectionPopularRoutes: FC<SectionPopularRoutesProps> = ({ className = "" }) => {
  const [liveRoutes, setLiveRoutes] = useState(routes);

  useEffect(() => {
    fetch("/api/routes-cms?category=outstation_route")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.routes) && data.routes.length > 0) {
          const published = data.routes.filter((r: any) => r.is_published !== false);
          if (published.length > 0) {
            const mapped = published.map((r: any, idx: number) => {
              const fallback = routes[idx % routes.length];
              return {
                route: r.title,
                href: fallback.href,
                dist: `${r.distance_km} km`,
                duration: `${Math.round((r.distance_km / 50) * 10) / 10} Hrs`,
                price: `₹${r.sedan_price.toLocaleString("en-IN")}`,
                image: fallback.image,
                highlight: r.description || fallback.highlight,
              };
            });
            setLiveRoutes(mapped);
          }
        }
      })
      .catch((err) => {
        console.warn("Using offline fallback for outstation routes:", err);
      });
  }, []);

  return (
    <div className={`nc-SectionPopularRoutes relative ${className}`}>
      <Heading
        desc="Safe, comfortable travel with transparent per-km and fixed package rates across South India."
        isCenter
      >
        Popular Outstation Routes
      </Heading>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
        {liveRoutes.map((item, idx) => (
          <SpotlightCard
            key={idx}
            className="group flex flex-col !rounded-2xl sm:!rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-300"
            spotlightColor="rgba(245, 158, 11, 0.2)"
          >
            {/* Image banner */}
            <div className="relative w-full h-32 sm:h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={item.image}
                alt={item.route}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 scale-90 sm:scale-100 origin-top-left">
                <Badge name={item.dist} color="blue" />
              </div>
              <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10">
                <Float duration={3.5} offset={4}>
                  <StarBorder as="div" color="#f59e0b" speed="3.5s">
                    <span className="bg-amber-500/90 text-neutral-950 font-black text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 rounded-full shadow">
                      <ShinyText text="Best Rate" speed={2.5} />
                    </span>
                  </StarBorder>
                </Float>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-3 sm:p-6 flex flex-col flex-1 justify-between space-y-2 sm:space-y-4">
              <div>
                <span className="text-[10px] sm:text-xs font-semibold text-primary-6000 dark:text-primary-400 uppercase tracking-wider truncate block">
                  {item.highlight}
                </span>
                <h3 className="text-xs sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 sm:mt-1 line-clamp-2 leading-tight sm:leading-normal">
                  <Link href={item.href} className="hover:text-primary-6000 transition">
                    {item.route}
                  </Link>
                </h3>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 sm:mt-2 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400" />
                    <span>~{item.duration}</span>
                  </span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                <div>
                  <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Starting from
                  </span>
                  <span className="text-sm sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    href={item.href}
                    className="text-xs font-bold text-primary-6000 hover:underline hidden sm:inline-flex items-center gap-1"
                  >
                    <span>View Fares</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>

                  <MagneticButton pullFactor={0.25} className="w-full sm:w-auto">
                    <a
                      href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20would%20like%20to%20book%20a%20cab%20for%20${encodeURIComponent(item.route)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full justify-center inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white text-[11px] sm:text-xs font-bold transition shadow-sm touch-manipulation active:scale-95"
                    >
                      <span>Book</span>
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default SectionPopularRoutes;
