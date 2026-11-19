"use client";

import React, { useEffect, useState } from "react";

export interface MeteorsProps {
  number?: number;
  className?: string;
  color?: string;
}

export const Meteors: React.FC<MeteorsProps> = ({
  number = 20,
  className = "",
  color = "#f59e0b",
}) => {
  const [meteors, setMeteors] = useState<
    Array<{
      top: string;
      left: string;
      delay: string;
      duration: string;
    }>
  >([]);

  useEffect(() => {
    const list = Array.from({ length: number }).map(() => ({
      top: `${Math.floor(Math.random() * 100) - 20}%`,
      left: `${Math.floor(Math.random() * 120) - 10}%`,
      delay: `${(Math.random() * 2 + 0.2).toFixed(2)}s`,
      duration: `${(Math.random() * 5 + 3).toFixed(2)}s`,
    }));
    setMeteors(list);
  }, [number]);

  if (meteors.length === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {meteors.map((m, idx) => (
        <span
          key={idx}
          className="pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] shadow-[0_0_0_1px_#ffffff15]"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
            backgroundColor: color,
          }}
        >
          {/* Meteor Tail */}
          <div
            className="pointer-events-none absolute top-1/2 -z-10 h-[1.5px] w-[55px] -translate-y-1/2 opacity-70"
            style={{
              background: `linear-gradient(to right, ${color}, transparent)`,
            }}
          />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
