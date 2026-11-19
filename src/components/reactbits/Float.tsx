"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface FloatProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration?: number;
  offset?: number;
  delay?: number;
  direction?: "up-down" | "left-right";
  className?: string;
}

export const Float: React.FC<FloatProps> = ({
  children,
  duration = 4,
  offset = 8,
  delay = 0,
  direction = "up-down",
  className = "",
  ...props
}) => {
  const isUpDown = direction === "up-down";

  return (
    <motion.div
      animate={
        isUpDown
          ? { y: [0, -offset, 0] }
          : { x: [0, -offset, 0] }
      }
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Float;
