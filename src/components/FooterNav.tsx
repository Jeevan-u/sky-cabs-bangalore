"use client";

import {
  HomeIcon,
  TruckIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import React, { useEffect, useRef } from "react";
import { PathName } from "@/routers/types";
import MenuBar from "@/shared/MenuBar";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: PathName;
  href?: string;
  icon: any;
  isExternal?: boolean;
  highlight?: boolean;
  isWhatsApp?: boolean;
}

const NAV: NavItem[] = [
  {
    name: "Home",
    link: "/" as any,
    icon: HomeIcon,
  },
  {
    name: "Fleet",
    link: "/listing-car" as any,
    icon: TruckIcon,
  },
  {
    name: "Call 24x7",
    href: `tel:${SADHGURU_CONTACT.primaryPhone}`,
    icon: PhoneIcon,
    isExternal: true,
    highlight: true,
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20book%20a%20cab/bus`,
    icon: WhatsAppIcon,
    isExternal: true,
    isWhatsApp: true,
  },
  {
    name: "Track",
    link: "/track-booking" as any,
    icon: ShieldCheckIcon,
  },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    // if (typeof window === "undefined" || window?.innerWidth >= 768) {
    //   return null;
    // }

    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link;

    if (item.isExternal && item.href) {
      return (
        <a
          key={index}
          href={item.href}
          target={item.isWhatsApp ? "_blank" : undefined}
          rel={item.isWhatsApp ? "noopener noreferrer" : undefined}
          className={`flex flex-col items-center justify-between transition-colors ${
            item.highlight
              ? "text-primary-6000 dark:text-primary-400 font-bold"
              : item.isWhatsApp
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          {item.isWhatsApp ? (
            <item.icon className="w-5 h-5 fill-emerald-500" />
          ) : (
            <item.icon className="w-5 h-5 text-primary-500" />
          )}
          <span className="text-[10px] font-extrabold leading-none mt-1">{item.name}</span>
        </a>
      );
    }

    return (
      <Link
        key={index}
        href={item.link || "/"}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-400 ${
          isActive ? "text-primary-6000 dark:text-primary-400 font-bold" : ""
        }`}
      >
        <item.icon className={`w-5 h-5 ${isActive ? "text-primary-6000" : ""}`} />
        <span
          className={`text-[10px] font-bold leading-none mt-1 ${
            isActive ? "text-primary-6000" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden py-2 px-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl fixed top-auto bottom-0 inset-x-0 z-40 border-t border-neutral-200/80 dark:border-neutral-800 shadow-2xl transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        {NAV.map(renderItem)}
      </div>
    </div>
  );
};

export default FooterNav;
