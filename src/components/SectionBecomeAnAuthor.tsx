"use client";

import React, { FC } from "react";
import rightImgDemo from "@/images/BecomeAnAuthorImg.png";
import Logo from "@/shared/Logo";
import Image from "next/image";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";
import { MagneticButton, ShinyText, StarBorder, TiltedCard } from "@/components/reactbits";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: any;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14 ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="lg:col-span-6 w-full">
        <Logo />
        <h2 className="font-bold text-3xl sm:text-4xl mt-6 sm:mt-8 text-neutral-900 dark:text-neutral-100 leading-tight">
          Planning a <ShinyText text="Pilgrimage, Wedding, or Airport Trip?" speed={3} />
        </h2>
        <p className="block mt-4 text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
          Get dedicated 5-Seater to 50-Seater vehicles at guaranteed best rates.
          We provide clean, air-conditioned sedans, Ertigas, Innova Crystas,
          Tempo Travellers, and luxury tourist buses with courteous, professional
          chauffeurs.
        </p>

        <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
          <MagneticButton pullFactor={0.25}>
            <a
              href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20upcoming%20trip.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Instant WhatsApp Quote</span>
            </a>
          </MagneticButton>

          <MagneticButton pullFactor={0.25}>
            <a
              href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md transition"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Call: 81061 17704</span>
            </a>
          </MagneticButton>
        </div>
      </div>
      <div className="lg:col-span-6 w-full flex justify-center">
        <TiltedCard
          captionText="Sri Sadhguru Group & Wedding Convoys"
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={8}
          scaleOnHover={1.03}
          showMobileWarning={false}
          showTooltip={false}
        >
          <div className="w-full relative">
            <Image alt="Sri Sadhguru Travel Transport" src={rightImg} className="drop-shadow-2xl" />
          </div>
        </TiltedCard>
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
