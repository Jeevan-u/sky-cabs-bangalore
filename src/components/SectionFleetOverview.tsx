"use client";

import React, { FC } from "react";
import Image from "next/image";
import Heading from "@/shared/Heading";
import Badge from "@/shared/Badge";
import { SADHGURU_FLEET, SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/icons";
import { SpotlightCard, ShinyText, MagneticButton, Float, BorderBeam } from "@/components/reactbits";

export interface SectionFleetOverviewProps {
  className?: string;
}

const SectionFleetOverview: FC<SectionFleetOverviewProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionFleetOverview relative ${className}`}>
      <Heading
        desc="5-Seater to 50-Seater AC and Non-AC passenger vehicles maintained to pristine condition for solo, family, and group travel."
        isCenter
      >
        Sri Sadhguru Fleet & Capacity
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {SADHGURU_FLEET.map((vehicle) => {
          const isFeatured = vehicle.id === "innova-crysta" || vehicle.id === "urbania-17";
          return (
            <SpotlightCard
              key={vehicle.id}
              className="group flex flex-col !rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 relative"
              spotlightColor="rgba(245, 158, 11, 0.2)"
            >
              {isFeatured && (
                <BorderBeam size={220} duration={8} colorFrom="#f59e0b" colorTo="#38bdf8" borderWidth={1.5} />
              )}
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className={`${
                    vehicle.image.endsWith(".png")
                      ? "object-contain p-3"
                      : "object-cover"
                  } group-hover:scale-108 transition-transform duration-500`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <Float duration={4} offset={3}>
                    <Badge name={vehicle.capacity} color="blue" />
                  </Float>
                </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-primary-6000 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  {vehicle.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {vehicle.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                  {vehicle.description}
                </p>

                {/* Features checklist */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  {vehicle.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Rate starts at
                  </span>
                  <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    <ShinyText text={`₹${vehicle.perKmRate}/km`} speed={3} />
                  </span>
                </div>

                <MagneticButton pullFactor={0.25}>
                  <a
                    href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.capacity}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>Get Quote</span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </SpotlightCard>
        );
      })}
      </div>
    </div>
  );
};

export default SectionFleetOverview;
