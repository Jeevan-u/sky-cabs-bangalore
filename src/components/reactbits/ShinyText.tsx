"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = "",
  speed = 3,
}) => {
  return (
    <span
      className={`inline-block bg-[linear-gradient(110deg,#939393,45%,#ffffff,55%,#939393)] dark:bg-[linear-gradient(110deg,#64748b,45%,#f8fafc,55%,#64748b)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shine ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
