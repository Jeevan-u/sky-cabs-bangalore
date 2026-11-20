"use client";

import React from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import Link from "next/link";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { WhatsAppIcon, PhoneIcon, LockClosedIcon } from "@/components/icons";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-4 pb-1 text-sm space-y-1">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              onClick={onClickClose}
              className="flex px-3 py-2 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <span className={`pr-3 ${!i.children ? "block w-full" : ""}`}>
                {i.name}
              </span>
              {i.children && (
                <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
                  <Disclosure.Button as="span" className="py-1 flex justify-end flex-1">
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType) => {
    return (
      <Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
        <Link
          className="flex w-full px-4 font-bold tracking-wide text-xs uppercase hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          href={{
            pathname: item.href || undefined,
          }}
          onClick={() => {
            if (!item.children && onClickClose) {
              onClickClose();
            }
          }}
        >
          <span className={`py-3 pr-3 ${!item.children ? "block w-full" : ""}`}>
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button as="span" className="py-3 flex items-center justify-end flex-1 ">
                <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full min-h-[100dvh] max-h-[100dvh] flex flex-col justify-between py-2 transition transform shadow-2xl ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
      <div>
        <div className="py-6 px-5 relative">
          <Logo />
          <div className="flex flex-col mt-4 text-neutral-600 dark:text-neutral-400 text-xs">
            <p className="leading-relaxed">
              Travel Safe... Travel Happy... 5-Seater to 50-Seater Vehicles Available 24x7 across Hyderabad & Kamareddy.
            </p>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                24x7 Dispatch Active
              </span>
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </div>
          </div>
          <span className="absolute right-4 top-4 p-1">
            <ButtonClose onClick={onClickClose} />
          </span>
        </div>

        <ul className="flex flex-col py-4 px-2 space-y-1">{data.map(_renderItem)}</ul>
      </div>

      {/* Mobile CTAs with safe area padding */}
      <div className="p-5 space-y-3 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]">
        <a
          href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
          className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-6000 text-white font-bold text-xs shadow-md active:scale-98 transition-all touch-manipulation"
        >
          <PhoneIcon className="w-4 h-4 text-white" />
          <span>Call 24x7: +91 {SADHGURU_CONTACT.primaryPhone}</span>
        </a>
        <a
          href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md active:scale-98 transition-all touch-manipulation"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span>WhatsApp Instant Booking</span>
        </a>
        <Link
          href="/login"
          onClick={onClickClose}
          className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 dark:bg-neutral-800 text-white font-bold text-xs shadow-sm border border-slate-700 active:scale-98 transition-all touch-manipulation"
        >
          <LockClosedIcon className="w-4 h-4 text-amber-400" />
          <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default NavMobile;
