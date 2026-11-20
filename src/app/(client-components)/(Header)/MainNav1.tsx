import React, { FC } from "react";
import Link from "next/link";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { WhatsAppIcon, PhoneIcon, LockClosedIcon } from "@/components/icons";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  return (
    <div className={`nc-MainNav1 relative z-30 transition-all ${className}`}>
      <div className="page-container h-20 relative flex justify-between items-center gap-2 xl:gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center flex-shrink-0">
          <Logo />
        </div>

        {/* Center: Navigation Menu Links */}
        <div className="hidden xl:flex items-center justify-center flex-1 mx-1 2xl:mx-2">
          <Navigation />
        </div>

        {/* Right: Actions Suite (Desktop - 1280px+) */}
        <div className="hidden xl:flex flex-shrink-0 justify-end items-center space-x-1.5 2xl:space-x-2.5 text-neutral-700 dark:text-neutral-100">
          {/* Direct Call Pill */}
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-2 rounded-full bg-primary-6000 hover:bg-primary-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 transform active:scale-95"
            title={`Call Proprietor Rathan Kanna: +91 ${SADHGURU_CONTACT.primaryPhone}`}
          >
            <PhoneIcon className="w-3.5 h-3.5 text-white" />
            <span className="hidden 2xl:inline">+91 </span>
            <span>{SADHGURU_CONTACT.primaryPhone}</span>
          </a>

          {/* WhatsApp Instant Booking Pill */}
          <a
            href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20book%20a%20cab.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 transform active:scale-95"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Sign In Button */}
          <Link
            href="/login"
            prefetch={true}
            className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap flex-shrink-0 transform active:scale-95 border border-neutral-800 dark:border-neutral-200"
            title="Sign In"
          >
            <LockClosedIcon className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Sign in</span>
          </Link>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 mx-0.5" />

          {/* Dark Mode Switcher */}
          <SwitchDarkMode />
        </div>

        {/* Mobile & Tablet Actions: Call, WhatsApp, Dark Mode & Hamburger Drawer (< 1280px) */}
        <div className="flex xl:hidden items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="hidden min-[420px]:inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-6000 text-white text-xs font-bold shadow-sm"
            title="Call 24x7"
          >
            <PhoneIcon className="w-4 h-4 text-white" />
          </a>
          <a
            href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm"
            title="WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
          </a>
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-bold shadow-sm"
            title="Sign In"
          >
            <LockClosedIcon className="w-4 h-4 text-amber-400" />
          </Link>
          <SwitchDarkMode className="!w-8 !h-8 sm:!w-9 sm:!h-9" />
          <MenuBar className="p-1 sm:p-2 rounded-lg text-neutral-700 dark:text-neutral-300" iconClassName="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
