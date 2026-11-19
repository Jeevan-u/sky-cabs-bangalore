"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  sentence: string;
  className?: string;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  className = "",
  blurAmount = 4,
  borderColor = "#f59e0b",
  glowColor = "rgba(245, 158, 11, 0.4)",
}) => {
  const words = sentence.split(" ");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`relative flex flex-wrap gap-2 items-center ${className}`}>
      {words.map((word, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative cursor-pointer transition-all duration-300 py-1 px-2 rounded-lg"
            style={{
              filter: isAnyHovered && !isHovered ? `blur(${blurAmount}px)` : "none",
              opacity: isAnyHovered && !isHovered ? 0.45 : 1,
            }}
          >
            {isHovered && (
              <motion.span
                layoutId="focus-box"
                className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                style={{
                  borderColor,
                  boxShadow: `0 0 16px ${glowColor}`,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <span className="relative z-10 font-bold">{word}</span>
          </span>
        );
      })}
    </div>
  );
};

export default TrueFocus;
