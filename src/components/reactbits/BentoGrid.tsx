"use client";

import React from "react";
import SpotlightCard from "./SpotlightCard";
import Float from "./Float";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 ${className}`}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  badge?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  header,
  icon,
  className = "",
  badge,
  ctaText,
  onCtaClick,
}) => {
  return (
    <SpotlightCard
      className={`p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-400/40 dark:hover:border-amber-400/30 transition-all duration-300 ${className}`}
    >
      <div>
        {header && <div className="mb-6 overflow-hidden rounded-2xl">{header}</div>}

        <div className="flex items-center justify-between mb-4">
          {icon && (
            <Float duration={4.5} offset={5}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xl font-bold">
                {icon}
              </div>
            </Float>
          )}
          {badge && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug">
          {title}
        </h3>

        <p className="mt-2.5 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {ctaText && (
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform"
          >
            <span>{ctaText}</span>
            <span>→</span>
          </button>
        </div>
      )}
    </SpotlightCard>
  );
};

export default BentoGrid;
