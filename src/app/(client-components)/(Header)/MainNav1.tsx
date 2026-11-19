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
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-20 relative flex justify-between items-center gap-1.5 xl:gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center flex-shrink-0">
          <Logo />
        </div>

        {/* Center: Navigation Menu Links */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-1 xl:mx-2">
          <Navigation />
        </div>

        {/* Right: Actions Suite (Desktop) */}
        <div className="hidden md:flex flex-shrink-0 justify-end items-center space-x-2 xl:space-x-3 text-neutral-700 dark:text-neutral-100">
          {/* Direct Call Pill */}
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full bg-primary-6000 hover:bg-primary-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 transform active:scale-95"
            title={`Call Proprietor Rathan Kanna: +91 ${SADHGURU_CONTACT.primaryPhone}`}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91 {SADHGURU_CONTACT.primaryPhone}</span>
          </a>

          {/* WhatsApp Instant Booking Pill */}
          <a
            href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20book%20a%20cab.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 transform active:scale-95"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Sign In Button */}
          <Link
            href="/login"
            prefetch={true}
            className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap flex-shrink-0 transform active:scale-95 border border-neutral-800 dark:border-neutral-200"
            title="Sign In"
          >
            <svg
              className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <span>Sign in</span>
          </Link>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 mx-0.5" />

          {/* Dark Mode Switcher */}
          <SwitchDarkMode />
        </div>

        {/* Mobile Actions: Call, WhatsApp, Dark Mode & Hamburger Drawer */}
        <div className="flex md:hidden items-center space-x-1.5">
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-6000 text-white text-xs font-bold shadow-sm"
            title="Call 24x7"
          >
            <PhoneIcon className="w-4 h-4 text-white" />
          </a>
          <a
            href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm"
            title="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
          </a>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-bold shadow-sm"
            title="Sign In"
          >
            <LockClosedIcon className="w-4 h-4 text-amber-400" />
          </Link>
          <SwitchDarkMode />
          <MenuBar />
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
