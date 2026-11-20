"use client";

import React from "react";
import dynamic from "next/dynamic";

const GradientASCII = dynamic(
  () => import("@/components/reactbits/GradientASCII"),
  { ssr: false }
);

const Waves = dynamic(
  () => import("@/components/reactbits/Waves"),
  { ssr: false }
);

export const PageGradientASCII: React.FC = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-[640px] sm:h-[720px] lg:h-[820px] pointer-events-none -z-10 overflow-hidden opacity-25 dark:opacity-35">
      <GradientASCII
        shape="horizon"
        colors={["#f59e0b", "#d97706", "#0284c7", "#0f172a"]}
        characters=" =+xX0S8#@"
        cellSize={18}
        density={0.7}
        glyphOpacity={0.75}
        glow={0.3}
        speed={0.4}
        mouseInteraction={true}
      />
    </div>
  );
};

export const SectionTransitionWave: React.FC<{
  lineColor?: string;
  waveAmpX?: number;
  waveAmpY?: number;
  waveSpeedX?: number;
  className?: string;
}> = ({
  lineColor = "rgba(245, 158, 11, 0.4)",
  waveAmpX = 28,
  waveAmpY = 14,
  waveSpeedX = 0.012,
  className = "",
}) => {
  return (
    <div className={`w-full h-14 sm:h-20 overflow-hidden relative pointer-events-none -my-8 ${className}`}>
      <Waves lineColor={lineColor} waveAmpX={waveAmpX} waveAmpY={waveAmpY} waveSpeedX={waveSpeedX} />
    </div>
  );
};

export default PageGradientASCII;
