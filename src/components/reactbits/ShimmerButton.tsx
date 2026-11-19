"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ShimmerButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
  shimmerDuration = "2.5s",
  borderRadius = "9999px",
  background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as any
      }
      className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/20 px-6 py-3 font-semibold text-white [background:var(--bg)] [border-radius:var(--radius)] shadow-lg hover:shadow-amber-500/25 transition-shadow ${className}`}
      {...props}
    >
      {/* Spark / Shimmer container */}
      <div className="absolute inset-0 -z-10 overflow-hidden [border-radius:var(--radius)]">
        <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] [background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_180deg,var(--shimmer-color)_200deg,transparent_220deg)] opacity-70" />
      </div>

      {/* Subtle backdrop overlay */}
      <div className="absolute inset-[1px] -z-10 [background:var(--bg)] [border-radius:calc(var(--radius)-1px)]" />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default ShimmerButton;
