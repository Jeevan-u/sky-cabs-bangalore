"use client";

import React from "react";

export interface GradientTextProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  colors = ["#f59e0b", "#ea580c", "#0284c7", "#f59e0b"],
  animationSpeed = 6,
  showBorder = false,
}) => {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      className={`relative inline-block ${
        showBorder ? "px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-sm" : ""
      }`}
    >
      <span
        style={gradientStyle}
        className={`bg-clip-text text-transparent animate-gradient-x font-bold ${className}`}
      >
        {children}
      </span>
    </span>
  );
};

export default GradientText;
