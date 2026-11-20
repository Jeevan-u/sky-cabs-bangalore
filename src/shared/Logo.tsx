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
      prefetch={true}
      className={`ttnc-logo inline-flex items-center gap-2 sm:gap-2.5 focus:outline-none focus:ring-0 flex-shrink-0 group ${className}`}
    >
      {/* Official Sri Sadhguru Brand Emblem with Dual Theme Support */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <div className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${imgClassName}`}>
          {/* Light Theme Logo (Black Car & Text, Red Arch, Gold Stars on Transparent BG) */}
          <Image
            src="/images/logo-light.png"
            alt="Sri Sadhguru Tours & Travels"
            width={48}
            height={48}
            className="w-full h-full object-contain block dark:hidden"
            priority
          />
          {/* Dark Theme Logo (White Car & Text, Red Arch, Gold Stars on Transparent BG) */}
          <Image
            src="/images/logo-dark.png"
            alt="Sri Sadhguru Tours & Travels"
            width={48}
            height={48}
            className="w-full h-full object-contain hidden dark:block"
            priority
          />
        </div>

        {/* Active Dispatch Pulse */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2 sm:h-2.5 w-2 sm:w-2.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500 border border-white dark:border-neutral-900"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-white uppercase leading-none group-hover:text-amber-500 transition-colors">
            SRI SADHGURU
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase px-1 sm:px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            24x7
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 leading-none">
          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] sm:tracking-[0.22em] uppercase text-neutral-500 dark:text-neutral-400">
            TOURS & TRAVELS
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
