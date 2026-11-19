"use client";

import React, { FC } from "react";
import HIW1img from "@/images/HIW1.png";
import HIW2img from "@/images/HIW2.png";
import HIW3img from "@/images/HIW3.png";
import VectorImg from "@/images/VectorHIW.svg";
import Image, { StaticImageData } from "next/image";
import Heading from "@/shared/Heading";
import { SpotlightCard, StarBorder, ShinyText, TiltedCard } from "@/components/reactbits";

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: StaticImageData;
    imgDark?: StaticImageData;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: HIW1img,
    title: "1. Choose Your Vehicle",
    desc: "Pick from 5-seater sedans, 7-seater Ertiga/Innova, Tempo Travellers, or 50-seater luxury buses based on your group size.",
  },
  {
    id: 2,
    img: HIW2img,
    title: "2. Instant Quote & Dispatch",
    desc: "Receive guaranteed transparent per-km or package rates. Driver details and vehicle dispatch are confirmed instantly on WhatsApp.",
  },
  {
    id: 3,
    img: HIW3img,
    title: "3. Travel Safe & Happy",
    desc: "Enjoy punctual doorstep pickup with verified chauffeurs, digital touchscreen duty slip, and seamless GPS-monitored journeys.",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading isCenter desc="Book in 3 simple steps — Your Journey, Our Responsibility">
        How It Works
      </Heading>
      <div className="mt-16 relative grid md:grid-cols-3 gap-8 lg:gap-10">
        <Image
          className="hidden md:block absolute inset-x-0 top-1/3 -translate-y-1/2 opacity-30 pointer-events-none"
          src={VectorImg}
          alt=""
        />
        {data.map((item) => (
          <SpotlightCard
            key={item.id}
            className="p-8 !rounded-3xl flex flex-col items-center text-center hover:border-amber-400/40 transition-all duration-300"
            spotlightColor="rgba(245, 158, 11, 0.22)"
          >
            <div className="mb-6 relative">
              <StarBorder as="div" color="#f59e0b" speed="5s" className="p-[2px]">
                <div className="w-10 h-10 rounded-full bg-neutral-900 text-amber-400 font-extrabold flex items-center justify-center text-lg">
                  {item.id}
                </div>
              </StarBorder>
            </div>

            <div className="relative mb-6 max-w-[160px] mx-auto">
              <TiltedCard
                captionText={item.title}
                containerHeight="160px"
                containerWidth="160px"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.08}
                showMobileWarning={false}
                showTooltip={false}
              >
                <Image
                  alt={item.title}
                  className="max-w-[160px] mx-auto object-contain"
                  src={item.img}
                />
              </TiltedCard>
            </div>

            <div className="mt-auto">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                <ShinyText text={item.title} speed={3.5} />
              </h3>
              <p className="block mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
