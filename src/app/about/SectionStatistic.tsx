"use client";

import React, { FC } from "react";
import Heading from "@/shared/Heading";
import { SpotlightCard, AnimatedCounter, ShinyText } from "@/components/reactbits";

export interface Statistic {
  id: string;
  val: number;
  suffix: string;
  subHeading: string;
}

const STATS_DATA: Statistic[] = [
  {
    id: "1",
    val: 5000,
    suffix: "+",
    subHeading: "Happy passengers and families served across Bengaluru and Karnataka",
  },
  {
    id: "2",
    val: 50,
    suffix: "+",
    subHeading: "Maintained fleet: Prime Sedan (4+1), Maruti Suzuki Ertigas, Innovas, Tempo Travellers & 52-seater buses",
  },
  {
    id: "3",
    val: 10,
    suffix: "+ Years",
    subHeading: "Of passenger trust, transparent per-km billing, and zero surge pricing",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc="Numbers that reflect our dedication to passenger safety, punctuality, and service quality"
      >
        <ShinyText text="Sky Cabs Bangalore at a Glance" speed={3.5} />
      </Heading>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {STATS_DATA.map((item) => (
          <SpotlightCard
            key={item.id}
            className="p-8 !rounded-3xl hover:border-amber-400/40 text-center transition-all duration-300"
            spotlightColor="rgba(245, 158, 11, 0.2)"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-6000 dark:text-primary-400 font-mono flex items-center justify-center">
              <AnimatedCounter to={item.val} duration={1.8} />
              <span className="text-amber-500 ml-1">{item.suffix}</span>
            </h3>
            <span className="block mt-3 text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              {item.subHeading}
            </span>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
