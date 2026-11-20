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
        <div className={`w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${imgClassName}`}>
          {/* Light Theme Logo (Black Car & Text, Red Arch, Gold Stars on Transparent BG) */}
          <Image
            src="/images/logo-light.png"
            alt="Sri Sadhguru Tours & Travels"
            width={56}
            height={56}
            className="w-full h-full object-contain block dark:hidden"
            priority
          />
          {/* Dark Theme Logo (White Car & Text, Red Arch, Gold Stars on Transparent BG) */}
          <Image
            src="/images/logo-dark.png"
            alt="Sri Sadhguru Tours & Travels"
            width={56}
            height={56}
            className="w-full h-full object-contain hidden dark:block"
            priority
          />
        </div>

        {/* Active Dispatch Pulse */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 sm:h-3 w-2.5 sm:w-3 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 sm:h-3 w-2.5 sm:w-3 bg-emerald-500 border border-white dark:border-neutral-900"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="font-black text-[15px] sm:text-lg tracking-tight text-neutral-900 dark:text-white uppercase leading-none group-hover:text-amber-500 transition-colors">
            SRI SADHGURU
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            24x7
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-1 leading-none">
          <span className="text-[9px] sm:text-[10.5px] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase text-neutral-500 dark:text-neutral-400">
            TOURS & TRAVELS
          </span>
          <span className="text-[9px] sm:text-[10.5px] text-neutral-300 dark:text-neutral-600">·</span>
          <span className="text-[9px] sm:text-[10.5px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Since 2019
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
