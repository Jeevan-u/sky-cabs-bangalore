"use client";

import React, { FC, useState, useMemo } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import Heading2 from "@/shared/Heading2";
import CarCard from "@/components/CarCard";
import SectionFleetFareCalculator from "@/components/SectionFleetFareCalculator";
import { CheckCircleIcon, WhatsAppIcon, PhoneIcon, TruckIcon } from "@/components/icons";
import { ShinyText, AnimatedCounter, MagneticButton, AnimatedTabs } from "@/components/reactbits";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: CarDataType[];
}

const ITEMS_PER_PAGE = 8;

type FleetCategoryFilter = "all" | "sedan" | "suv" | "tempo" | "bus";

const CATEGORY_TABS: { id: FleetCategoryFilter; label: string; count: number }[] = [
  { id: "all", label: "All Fleet", count: 12 },
  { id: "sedan", label: "Sedans (4+1)", count: 3 },
  { id: "suv", label: "SUVs & MPVs (6-7)", count: 4 },
  { id: "tempo", label: "Tempo Travellers (12-26)", count: 3 },
  { id: "bus", label: "Luxury Buses (32-50)", count: 2 },
];

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_CAR_LISTINGS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FleetCategoryFilter>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredVehicles = useMemo(() => {
    if (selectedCategory === "all") return data;
    return data.filter((item) => {
      const seats = Number(item.seats) || 5;
      const titleLower = item.title.toLowerCase();
      if (selectedCategory === "sedan") {
        return seats <= 5 || titleLower.includes("dzire") || titleLower.includes("etios");
      }
      if (selectedCategory === "suv") {
        return (seats >= 6 && seats <= 8) || titleLower.includes("ertiga") || titleLower.includes("innova");
      }
      if (selectedCategory === "tempo") {
        return (seats >= 12 && seats <= 26) || titleLower.includes("tempo") || titleLower.includes("urbania");
      }
      if (selectedCategory === "bus") {
        return seats >= 30 || titleLower.includes("bus") || titleLower.includes("coach");
      }
      return true;
    });
  }, [data, selectedCategory]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentVehicles = filteredVehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategorySelect = (cat: FleetCategoryFilter) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const target = document.getElementById("fleet-catalog-heading");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      {/* Interactive Fare Calculator */}
      <div id="fleet-calculator" className="pt-2 pb-6 scroll-mt-20">
        <SectionFleetFareCalculator />
      </div>

      <div id="fleet-catalog-heading" className="scroll-mt-24 pt-4">
        <Heading2
          heading="Sri Sadhguru Commercial Fleet (5 to 50 Seater)"
          subHeading={
            <span className="block text-neutral-500 dark:text-neutral-400 mt-2 text-sm sm:text-base font-medium">
              50+ Verified Commercial Vehicles across Telangana & AP · Showing{" "}
              <span className="font-bold text-neutral-900 dark:text-white">
                {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredVehicles.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-neutral-900 dark:text-white">
                <AnimatedCounter to={filteredVehicles.length} duration={0.4} />
              </span>{" "}
              options
            </span>
          }
        />
      </div>

      {/* Interactive Fleet Category Animated Spring Tabs */}
      <div className="my-6 sm:my-8 pb-4 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-start overflow-x-auto no-scrollbar">
        <AnimatedTabs
          tabs={CATEGORY_TABS.map((tab) => ({
            id: tab.id,
            label: tab.label,
            badge: String(tab.count),
          }))}
          activeTab={selectedCategory}
          onChange={(id) => handleCategorySelect(id as FleetCategoryFilter)}
          pillColor="bg-primary-6000 text-white font-bold shadow-md shadow-primary-6000/25"
        />
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentVehicles.map((car) => (
          <CarCard key={car.id} data={car} />
        ))}
      </div>

      {/* Interactive Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 font-medium">
            Page <span className="font-bold text-neutral-900 dark:text-white">{currentPage}</span> of{" "}
            <span className="font-bold text-neutral-900 dark:text-white">{totalPages}</span> (
            {filteredVehicles.length} total options)
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Enterprise Fleet Summary & 24x7 Callout */}
      <div className="mt-14 p-6 sm:p-10 rounded-3xl bg-neutral-100/90 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-center max-w-3xl mx-auto space-y-4 font-sans">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-emerald-200/50 dark:border-emerald-800/40">
          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
          <span>All 12 Fleet Models Available 24x7</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
          Planning a Group Pilgrimage, Corporate Outing, or Wedding Convoy?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          From Swift Dzire sedans to 50-seater air-suspension luxury coaches, Sri Sadhguru Travels guarantees transparent per-km rates, verified chauffeurs, and 100% on-time dispatch.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <MagneticButton pullFactor={0.25}>
            <a
              href="https://wa.me/918106117704?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20inquire%20about%20group%20booking%20and%20fleet%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Dispatch Desk</span>
            </a>
          </MagneticButton>
          <MagneticButton pullFactor={0.25}>
            <a
              href="tel:+918106117704"
              className="px-6 py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 text-neutral-800 dark:text-neutral-200 font-bold text-xs sm:text-sm transition inline-flex items-center gap-2"
            >
              <PhoneIcon className="w-4 h-4 text-primary-6000" />
              <span>Call +91 81061 17704</span>
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
