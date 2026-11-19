"use client";

import React, { FC, useState } from "react";
import ButtonCircle from "@/shared/ButtonCircle";
import Badge from "@/shared/Badge";
import Input from "@/shared/Input";
import Image from "next/image";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { CheckCircleIcon } from "@/components/icons";
import { ShinyText, MagneticButton, StarBorder, TiltedCard } from "@/components/reactbits";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const msg = `Hi Sri Sadhguru Travels, I would like to request an instant cab quotation for my phone: ${cleanPhone}`;
    window.open(`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-1/2">
        <h2 className="font-extrabold text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
          <ShinyText text="Need an Instant Quote or 24x7 Cab?" speed={3} />
        </h2>
        <span className="block mt-4 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
          Get upfront pricing for Shamshabad Airport drops, Srisailam, Tirupati, or outstation family trips across Telangana and Andhra Pradesh.
        </span>

        <ul className="space-y-3 mt-6">
          <li className="flex items-center space-x-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Zero surge pricing · Guaranteed on-time doorstep pickup</span>
          </li>
          <li className="flex items-center space-x-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Verified chauffeurs with digital duty slip and GST invoices</span>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="mt-8 relative max-w-sm flex items-center">
          <Input
            required
            aria-required
            placeholder="Enter your 10-digit mobile number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3 pr-14 text-sm w-full"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <MagneticButton pullFactor={0.25}>
              <ButtonCircle
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                size="w-9 h-9"
              >
                <i className="las la-arrow-right text-lg"></i>
              </ButtonCircle>
            </MagneticButton>
          </div>
        </form>
      </div>

      <div className="flex-grow flex justify-center max-w-lg lg:max-w-none w-full">
        <TiltedCard
          captionText="24x7 Airport & Outstation Cabs"
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={8}
          scaleOnHover={1.03}
          showMobileWarning={false}
          showTooltip={false}
        >
          <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
            <Image
              alt="Sri Sadhguru Travel Transport"
              src="/images/Airport-cabs.jpg"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </TiltedCard>
      </div>
    </div>
  );
};

export default SectionSubscribe2;
