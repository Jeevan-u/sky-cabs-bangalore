"use client";

import React, { FC } from "react";
import { AnimatedCounter, SpotlightCard, Particles, ShinyText, BorderBeam } from "@/components/reactbits";

export interface SectionStatsCounterProps {
  className?: string;
}

const stats = [
  { val: 50, suffix: "+", l: "Fleet of Vehicles", sub: "5-Seater to 50-Seater" },
  { val: 5000, suffix: "+", l: "Happy Passengers", sub: "Across Telangana & AP" },
  { val: 100, suffix: "+", l: "Outstation Routes", sub: "Interstate & Hill Stations" },
  { val: 10, suffix: "+", l: "Years of Trust", sub: "Prop: Rathan Kanna" },
];

const SectionStatsCounter: FC<SectionStatsCounterProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatsCounter relative ${className}`}>
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-primary-6000 via-primary-700 to-indigo-800 text-white shadow-2xl relative overflow-hidden">
        <BorderBeam size={320} duration={10} colorFrom="#f59e0b" colorTo="#38bdf8" borderWidth={1.5} />
        {/* Subtle Interactive Particle Atmosphere */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Particles quantity={28} color="#f59e0b" />
        </div>

        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10 text-center">
          {stats.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="p-5 sm:p-6 !bg-white/10 dark:!bg-black/20 !border-white/15 backdrop-blur-md !rounded-2xl"
              spotlightColor="rgba(245, 158, 11, 0.3)"
            >
              <div className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white mb-2 flex items-center justify-center font-mono">
                <AnimatedCounter
                  to={item.val}
                  duration={2.2}
                  formatter={(v) => v.toLocaleString("en-IN")}
                />
                <span className="text-amber-300 ml-0.5">{item.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                <ShinyText text={item.l} speed={3.5} />
              </div>
              <div className="text-[11px] sm:text-xs text-white/80 mt-1 font-medium">
                {item.sub}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionStatsCounter;
