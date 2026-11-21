import React, { FC, ReactNode } from "react";
import imagePng from "@/images/hero-right2.png";
import HeroSearchForm, {
  SearchTab,
} from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image, { StaticImageData } from "next/image";
import { SparklesIcon, BoltIcon, ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Stays" | "Experiences" | "Cars" | "Flights";
  currentTab: SearchTab;
  rightImage?: StaticImageData;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div
          className={`flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-8 ${
            currentPage === "Cars" ? "pb-8 lg:pb-12" : "pb-14 lg:pb-48 xl:pb-60"
          } xl:pr-14 lg:mr-10 xl:mr-0`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 text-amber-700 dark:text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>24x7 Cab & Bus Booking · Bengaluru</span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl leading-[110%] text-neutral-900 dark:text-neutral-100">
            Our Commercial Fleet & Tours
          </h1>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-map-marked"></i>
            <span className="ml-2.5">Bengaluru, Bengaluru & Karnataka</span>
            <span className="mx-3">·</span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-car"></i>
                <span className="ml-2.5">Vehicles for Every Group Size</span>
              </>
            )}
          </div>
          {currentPage === "Cars" && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#fleet-calculator"
                className="px-6 py-3 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-6000/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <BoltIcon className="w-4 h-4 text-white" />
                <span>Calculate Instant Fare</span>
                <ArrowRightIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://wa.me/919632345415?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20would%20like%20to%20inquire%20about%20fleet%20availability%20and%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Dispatch</span>
              </a>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <Image
            className="w-full"
            src={rightImage}
            alt="hero"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
      </div>

      {currentPage !== "Cars" && (
        <div className="hidden lg:flow-root w-full">
          <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
            <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionHeroArchivePage;
