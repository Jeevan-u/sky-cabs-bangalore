"use client";

import React, { useRef } from "react";
import { motion, useSpring, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  pullFactor?: number;
  distance?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  pullFactor,
  distance,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const factor = distance !== undefined ? distance : pullFactor !== undefined ? pullFactor : 0.35;

  const springConfig = { stiffness: 220, damping: 16, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * factor);
    y.set(middleY * factor);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
