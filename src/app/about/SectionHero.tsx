"use client";

import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { TiltedCard, StarBorder, ShinyText } from "@/components/reactbits";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export interface SectionHeroProps {
  className?: string;
  rightImg: StaticImageData | string;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  return (
    <div className={`nc-SectionHero relative ${className}`}>
      <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-12 items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-xl space-y-5 lg:space-y-7">
          <div className="inline-block">
            <StarBorder as="div" color="#d97706" speed="5s">
              <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-amber-500" />
                <span>10+ Years Commercial Travel Leadership</span>
              </span>
            </StarBorder>
          </div>

          <h1 className="text-3xl !leading-tight font-extrabold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h1>
          <span className="block text-base xl:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
            {subHeading}
          </span>
          {!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
        </div>

        <div className="flex-grow w-full max-w-md h-72 sm:h-96 relative">
          <TiltedCard
            captionText="Sky Cabs Bangalore Commercial Passenger Fleet"
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={8}
            scaleOnHover={1.03}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent w-full rounded-b-3xl">
                <p className="text-white font-extrabold text-sm drop-shadow">
                  Vehicles for Every Group Size · Bengaluru & Karnataka
                </p>
                <p className="text-neutral-300 text-xs font-semibold">
                  Begur, Bengaluru & Jayanagar Hubs
                </p>
              </div>
            }
          >
            <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30">
              <Image
                fill
                className="object-cover"
                src={rightImg}
                alt="Sky Cabs Bangalore"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </TiltedCard>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
