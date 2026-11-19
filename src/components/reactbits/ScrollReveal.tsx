"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";

export type ScrollAnimationType =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "blur-in";

export interface ScrollRevealProps extends Omit<MotionProps, "children"> {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.65,
  distance = 36,
  threshold = 0.15,
  once = true,
  className = "",
  as = "div",
  ...props
}) => {
  const getVariants = () => {
    switch (animation) {
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 },
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 },
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1 },
        };
      case "blur-in":
        return {
          hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 },
        };
      case "fade-up":
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const Component = motion(as as any);

  return (
    <Component
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
