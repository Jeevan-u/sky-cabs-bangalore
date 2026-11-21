"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Heading from "@/shared/Heading";
import Badge from "@/shared/Badge";
import { SKY_CABS_FLEET, SKY_CABS_CONTACT, FleetVehicle } from "@/data/skyCabsFleet";
import { getVehiclePhotos } from "@/data/fleetGallery";
import FleetImageSlider from "@/components/FleetImageSlider";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/icons";
import { SpotlightCard, ShinyText, MagneticButton, Float, BorderBeam } from "@/components/reactbits";

export interface SectionFleetOverviewProps {
  className?: string;
}

const SectionFleetOverview: FC<SectionFleetOverviewProps> = ({ className = "" }) => {
  const [liveFleet, setLiveFleet] = useState<FleetVehicle[]>(SKY_CABS_FLEET);

  useEffect(() => {
    fetch("/api/fleet?published=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.vehicles) && data.vehicles.length > 0) {
          setLiveFleet(data.vehicles);
        }
      })
      .catch((err) => {
        console.warn("Using offline fallback for fleet overview:", err);
      });
  }, []);

  return (
    <div className={`nc-SectionFleetOverview relative ${className}`}>
      <Heading
        desc="4+1 to 52-Seater AC and Non-AC passenger vehicles maintained to pristine condition for solo, family, and group travel."
        isCenter
      >
        Sky Cabs Bangalore Fleet & Capacity
      </Heading>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
        {liveFleet.map((vehicle) => {
          const isFeatured = vehicle.id === "innova-crysta" || vehicle.id === "urbania-17";
          const photos = getVehiclePhotos(vehicle.image, vehicle.id);
          return (
            <SpotlightCard
              key={vehicle.id}
              className="group flex flex-col !rounded-2xl sm:!rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 relative"
              spotlightColor="rgba(245, 158, 11, 0.2)"
            >
              {isFeatured && (
                <BorderBeam size={220} duration={8} colorFrom="#f59e0b" colorTo="#38bdf8" borderWidth={1.5} />
              )}
              {/* Image / Sliding gallery */}
              <div className="relative w-full h-32 sm:h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                {photos.length > 1 ? (
                  <FleetImageSlider
                    images={photos}
                    alt={`${vehicle.name} - Sky Cabs Bangalore`}
                    objectFit={vehicle.image.endsWith(".png") ? "contain" : "cover"}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    showArrows={false}
                  />
                ) : (
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className={`${
                      vehicle.image.endsWith(".png")
                        ? "object-contain p-2 sm:p-3"
                        : "object-cover"
                    } group-hover:scale-108 transition-transform duration-500`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 scale-90 sm:scale-100 origin-top-left">
                  <Float duration={4} offset={3}>
                    <Badge name={vehicle.capacity} color="blue" />
                  </Float>
                </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                <span className="bg-primary-6000 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow">
                  {vehicle.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6 flex flex-col flex-1 justify-between space-y-2 sm:space-y-4">
              <div>
                <h3 className="text-xs sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  {vehicle.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 sm:mt-1 font-medium line-clamp-1 sm:line-clamp-2">
                  {vehicle.description}
                </p>

                {/* Features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-4 text-[10px] sm:text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  {vehicle.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className={`items-center gap-1 sm:gap-1.5 ${i >= 2 ? "hidden sm:flex" : "flex"}`}>
                      <CheckCircleIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-2 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                <div>
                  <span className="text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Rate starts at
                  </span>
                  <span className="text-sm sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    <ShinyText text={`₹${vehicle.perKmRate}/km`} speed={3} />
                  </span>
                </div>

                <MagneticButton pullFactor={0.25} className="w-full sm:w-auto">
                  <a
                    href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.capacity}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-center inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold transition shadow-sm touch-manipulation active:scale-95"
                  >
                    <WhatsAppIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
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
