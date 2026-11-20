"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

interface VelocityTextProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const VelocityText: React.FC<VelocityTextProps> = ({
  children,
  baseVelocity = 1.5,
  className = "",
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.2], {
    clamp: true,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    if (isHovered) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`flex whitespace-nowrap font-black uppercase tracking-wider ${className}`}
        style={{ x }}
      >
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
      </motion.div>
    </div>
  );
};

export interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  bandClassName?: string;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts,
  velocity = 1.5,
  className = "",
  bandClassName = "",
}) => {
  return (
    <div className={`relative w-full overflow-hidden py-4 ${className}`}>
      {texts.map((text, idx) => (
        <div key={idx} className="my-1.5">
          <VelocityText
            baseVelocity={idx % 2 === 0 ? velocity : -velocity}
            className={bandClassName}
          >
            {text}
          </VelocityText>
        </div>
      ))}
    </div>
  );
};

export default ScrollVelocity;
