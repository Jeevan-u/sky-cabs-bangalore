import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  className?: string;
  imgClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "", imgClassName = "" }) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-flex items-center gap-2.5 sm:gap-3 focus:outline-none focus:ring-0 flex-shrink-0 group ${className}`}
    >
      {/* Official Sri Sadhguru Brand Emblem */}
      <div className="relative flex-shrink-0">
        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white shadow-md border border-neutral-200/90 dark:border-neutral-700/80 p-0.5 flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${imgClassName}`}>
          <Image
            src="/images/logo.png"
            alt="Sri Sadhguru Tours & Travels"
            width={48}
            height={48}
            className="w-full h-full object-contain rounded-full"
            priority
          />
        </div>
        {/* Active Dispatch Pulse */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2 sm:h-2.5 w-2 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500 border border-white dark:border-neutral-900"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-white uppercase leading-none group-hover:text-amber-500 transition-colors">
            Sri Sadhguru
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase px-1 sm:px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            24x7
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 leading-none">
          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] sm:tracking-[0.22em] uppercase text-neutral-500 dark:text-neutral-400">
            Tours & Travels
          </span>
          <span className="text-[8px] sm:text-[9px] text-neutral-300 dark:text-neutral-600">·</span>
          <span className="text-[8px] sm:text-[9px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Since 2019
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
