"use client";

import React from "react";

interface AuroraProps {
  className?: string;
  colorStops?: string[];
  amplitude?: number;
}

export const Aurora: React.FC<AuroraProps> = ({
  className = "",
  colorStops = ["#3b82f6", "#f59e0b", "#6366f1"],
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-20 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute -inset-[10px] blur-[80px]"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${colorStops[0]} 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 30%, ${colorStops[1]} 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 80%, ${colorStops[2]} 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};

export default Aurora;
