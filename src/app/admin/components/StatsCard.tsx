"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  color?: "blue" | "emerald" | "amber" | "purple";
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
  onClick,
}: StatsCardProps) {
  const colorStyles = {
    blue: {
      icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 shadow-blue-500/10",
      accent: "from-blue-600 to-indigo-600",
      glow: "hover:border-blue-500/30",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-emerald-500/10",
      accent: "from-emerald-500 to-teal-600",
      glow: "hover:border-emerald-500/30",
    },
    amber: {
      icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-amber-500/10",
      accent: "from-amber-500 to-orange-600",
      glow: "hover:border-amber-500/30",
    },
    purple: {
      icon: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 shadow-purple-500/10",
      accent: "from-purple-500 to-pink-600",
      glow: "hover:border-purple-500/30",
    },
  };

  const style = colorStyles[color];

  return (
    <div
      onClick={onClick}
      className={`group relative p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${style.glow} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Top micro-gradient indicator bar */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${style.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />

      <div className="flex items-center justify-between">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
          {title}
        </p>
        <div className={`p-3 rounded-2xl border ${style.icon} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      <div className="mt-3.5 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white font-mono">
          {value}
        </span>
        {trend && (
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              trend.isPositive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40"
                : "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 animate-pulse"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
