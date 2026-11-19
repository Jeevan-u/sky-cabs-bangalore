"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export interface ScrollProgressProps {
  className?: string;
  gradient?: string;
  height?: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = "",
  gradient = "from-amber-500 via-orange-500 to-sky-500",
  height = 3,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, height: `${height}px` }}
      className={`fixed top-0 left-0 right-0 origin-left z-[999999] pointer-events-none bg-gradient-to-r ${gradient} shadow-[0_0_12px_rgba(245,158,11,0.5)] ${className}`}
    />
  );
};

export default ScrollProgress;
