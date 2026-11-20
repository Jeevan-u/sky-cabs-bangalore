"use client";

import React, { FC } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard, ShinyText, StarBorder } from "@/components/reactbits";

export interface CarCardProps {
  className?: string;
  data?: CarDataType;
  size?: "default" | "small";
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CarCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    featuredImage,
    title,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    seats,
    gearshift,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image
          fill
          src={featuredImage}
          alt={title || "commercial vehicle"}
          sizes="(max-width: 640px) 100vw, 350px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-5 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {isAds && (
              <StarBorder as="div" color="#10b981" speed="4s">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 px-2 py-0.5">
                  Verified
                </span>
              </StarBorder>
            )}
            <h2
              className={`capitalize ${
                size === "default"
                  ? "text-xl font-bold"
                  : "text-base font-semibold"
              }`}
            >
              <span className="line-clamp-1 group-hover:text-primary-6000 transition-colors">
                {title}
              </span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm space-x-2 font-medium">
            <span>{seats} seats</span>
            <span>·</span>
            <span>{gearshift}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-neutral-900 dark:text-white">
            <ShinyText text={price} speed={3} />
            {size === "default" && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal ml-1">
                onwards
              </span>
            )}
          </span>
          <StartRating reviewCount={reviewCount} point={reviewStart} />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CarCard ${className}`} data-nc-id="CarCard">
      <SpotlightCard
        className="group !rounded-3xl hover:border-amber-400/40 transition-all duration-300"
        spotlightColor="rgba(245, 158, 11, 0.2)"
      >
        <Link href={href} className="flex flex-col">
          {renderSliderGallery()}
          {renderContent()}
        </Link>
      </SpotlightCard>
    </div>
  );
};

export default CarCard;
