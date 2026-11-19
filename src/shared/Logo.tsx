import React from "react";
import Link from "next/link";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-flex items-center gap-3 focus:outline-none focus:ring-0 flex-shrink-0 group ${className}`}
    >
      {/* Luxury Chauffeur Emblem */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all duration-300">
          <div className="w-full h-full bg-slate-950 dark:bg-neutral-900 rounded-[14px] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 10.9 2 11.2V16c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
        </div>
        {/* Active Dispatch Pulse */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-neutral-900"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-900 dark:text-white uppercase leading-none group-hover:text-amber-500 transition-colors">
            Sri Sadhguru
          </span>
          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            24x7
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 leading-none">
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-neutral-500 dark:text-neutral-400">
            Tours & Travels
          </span>
          <span className="text-[9px] text-neutral-300 dark:text-neutral-600">·</span>
          <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Hyderabad
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
