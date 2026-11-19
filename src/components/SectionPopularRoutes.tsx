"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/shared/Badge";
import Heading from "@/shared/Heading";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { ClockIcon, ArrowRightIcon } from "@/components/icons";
import { SpotlightCard, ShinyText, MagneticButton, StarBorder, Float } from "@/components/reactbits";

export interface SectionPopularRoutesProps {
  className?: string;
}

const routes = [
  {
    route: "Hyderabad to Srisailam",
    href: "/hyderabad-to-srisailam-cabs",
    dist: "213 km",
    duration: "4.5 Hrs",
    price: "₹4,500",
    image: "/images/srisailam-dam.jpg",
    highlight: "Mallikarjuna Jyotirlinga",
  },
  {
    route: "Hyderabad to Tirupati",
    href: "/hyderabad-to-tirupati-cabs",
    dist: "570 km",
    duration: "9.5 Hrs",
    price: "₹8,200",
    image: "/images/Tirupati.jpg",
    highlight: "Lord Venkateswara Temple",
  },
  {
    route: "Hyderabad to Vijayawada",
    href: "/blog/vijayawada-trip",
    dist: "275 km",
    duration: "5.0 Hrs",
    price: "₹3,800",
    image: "/images/Vijayawada.avif",
    highlight: "Kanaka Durga Temple",
  },
  {
    route: "Hyderabad to Yadagirigutta",
    href: "/hyderabad-to-yadagirigutta-cabs",
    dist: "65 km",
    duration: "1.5 Hrs",
    price: "₹2,499",
    image: "/images/warangal.jpg",
    highlight: "Yadadri Temple Same-Day",
  },
  {
    route: "Hyderabad to Shirdi",
    href: "/hyderabad-to-shirdi-cabs",
    dist: "590 km",
    duration: "10.5 Hrs",
    price: "₹8,900",
    image: "/images/shirdi.jpeg",
    highlight: "Sai Baba Samadhi Mandir",
  },
  {
    route: "Hyderabad to Vizag",
    href: "/blog/south-india-circuits",
    dist: "620 km",
    duration: "11 Hrs",
    price: "₹9,500",
    image: "/images/vizag.jpg",
    highlight: "Simhachalam & RK Beach",
  },
];

const SectionPopularRoutes: FC<SectionPopularRoutesProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionPopularRoutes relative ${className}`}>
      <Heading
        desc="Safe, comfortable travel with transparent per-km and fixed package rates across South India."
        isCenter
      >
        Popular Outstation Routes
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {routes.map((item, idx) => (
          <SpotlightCard
            key={idx}
            className="group flex flex-col !rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-300"
            spotlightColor="rgba(245, 158, 11, 0.2)"
          >
            {/* Image banner */}
            <div className="relative w-full h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={item.image}
                alt={item.route}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3 z-10">
                <Badge name={item.dist} color="blue" />
              </div>
              <div className="absolute top-2.5 right-2.5 z-10">
                <Float duration={3.5} offset={4}>
                  <StarBorder as="div" color="#f59e0b" speed="3.5s">
                    <span className="bg-amber-500/90 text-neutral-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                      <ShinyText text="Best Rate" speed={2.5} />
                    </span>
                  </StarBorder>
                </Float>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div>
                <span className="text-xs font-semibold text-primary-6000 dark:text-primary-400 uppercase tracking-wider">
                  {item.highlight}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  <Link href={item.href} className="hover:text-primary-6000 transition">
                    {item.route}
                  </Link>
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>~{item.duration}</span>
                  </span>
                  <span>•</span>
                  <span>24x7 Pickup from Hyderabad</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Starting from
                  </span>
                  <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={item.href}
                    className="text-xs font-bold text-primary-6000 hover:underline hidden sm:inline-flex items-center gap-1"
                  >
                    <span>View Fares</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>

                  <MagneticButton pullFactor={0.25}>
                    <a
                      href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20book%20a%20cab%20for%20${encodeURIComponent(item.route)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white text-xs font-bold transition shadow-sm"
                    >
                      <span>Book</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
