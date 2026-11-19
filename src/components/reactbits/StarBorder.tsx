"use client";

import React from "react";

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  children: React.ReactNode;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = "button",
  className = "",
  color = "#f59e0b",
  speed = "4s",
  children,
  ...props
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full p-[1.5px] transition-all focus:outline-none ${className}`}
      {...props}
    >
      {/* Animated Rotating Gradient Glow */}
      <span
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]"
        style={{
          animationDuration: speed,
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 60%, ${color} 85%, transparent 100%)`,
        }}
      />
      {/* Inner Content Container */}
      <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-900/90 dark:bg-neutral-950/90 px-5 py-2.5 backdrop-blur-3xl transition-colors text-inherit">
        {children}
      </span>
    </Component>
  );
};

export default StarBorder;
