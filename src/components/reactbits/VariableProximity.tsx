"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VariableProximityProps {
  text: string;
  className?: string;
  radius?: number;
  maxScale?: number;
}

export const VariableProximity: React.FC<VariableProximityProps> = ({
  text,
  className = "",
  radius = 90,
  maxScale = 1.25,
}) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => setMousePos(null);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={`inline-flex flex-wrap cursor-default select-none ${className}`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex mr-2">
          {word.split("").map((char, cIdx) => {
            const index = wIdx * 100 + cIdx;
            let scale = 1;
            let weight = 400;

            if (mousePos && letterRefs.current[index]) {
              const el = letterRefs.current[index];
              if (el) {
                const elRect = el.getBoundingClientRect();
                const containerRect = containerRef.current?.getBoundingClientRect();
                if (containerRect) {
                  const letterCenterX = elRect.left - containerRect.left + elRect.width / 2;
                  const letterCenterY = elRect.top - containerRect.top + elRect.height / 2;
                  const dist = Math.hypot(mousePos.x - letterCenterX, mousePos.y - letterCenterY);

                  if (dist < radius) {
                    const factor = 1 - dist / radius;
                    scale = 1 + factor * (maxScale - 1);
                    weight = Math.round(400 + factor * 400);
                  }
                }
              }
            }

            return (
              <motion.span
                key={cIdx}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                animate={{ scale, fontWeight: weight }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="inline-block transform-gpu origin-bottom text-inherit"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </p>
  );
};

export default VariableProximity;
