"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  let colorClass = "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-300/80 dark:border-neutral-700";
  let dotColor = "bg-neutral-400";
  let shouldPulse = false;

  const s = status?.toLowerCase() || "";

  if (s.includes("pending")) {
    colorClass = "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
    dotColor = "bg-amber-500";
    shouldPulse = true;
  } else if (s.includes("assigned") || s.includes("confirmed")) {
    colorClass = "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";
    dotColor = "bg-blue-500";
  } else if (s.includes("progress")) {
    colorClass = "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30";
    dotColor = "bg-indigo-500";
    shouldPulse = true;
  } else if (s.includes("completed") || s.includes("available")) {
    colorClass = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    dotColor = "bg-emerald-500";
  } else if (s.includes("cancel") || s.includes("off duty")) {
    colorClass = "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
    dotColor = "bg-rose-500";
  } else if (s.includes("on duty")) {
    colorClass = "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30";
    dotColor = "bg-sky-500";
    shouldPulse = true;
  }

  const sizeClass = size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider shadow-2xs transition-all ${colorClass} ${sizeClass}`}
    >
      <span className="relative flex h-2 w-2">
        {shouldPulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span>{status}</span>
    </span>
  );
}
