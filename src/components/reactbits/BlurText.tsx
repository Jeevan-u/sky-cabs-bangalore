"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  direction?: "top" | "bottom";
  animateBy?: "words" | "letters";
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = "",
  delay = 0.05,
  direction = "top",
  animateBy = "words",
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((el, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            filter: "blur(10px)",
            y: direction === "top" ? -15 : 15,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: index * delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block"
        >
          {el}
          {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
