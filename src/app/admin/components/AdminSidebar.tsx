"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Squares2X2Icon,
  TruckIcon,
  DocumentTextIcon,
  UsersIcon,
  CurrencyRupeeIcon,
  StarIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  ShieldCheckIcon,
  CameraIcon,
  SignalIcon,
  SparklesIcon,
  MapPinIcon,
  PhoneIcon,
  HomeIcon,
  GlobeAltIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { AdminTabType } from "../types";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { ShinyText, MagneticButton, AnimatedCounter, Dock } from "@/components/reactbits";

interface AdminSidebarProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (o: boolean) => void;
  counts: {
    pendingBookings: number;
    dutySlips: number;
    activeDrivers: number;
    reviews: number;
  };
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  counts,
}: AdminSidebarProps) {
  const navSections = [
    {
      title: "OPERATIONS",
      items: [
        {
          id: "analytics" as AdminTabType,
          label: "Analytics Command Center",
          icon: ChartBarIcon,
        },
        {
          id: "dispatch" as AdminTabType,
          label: "Live Dispatch",
          icon: TruckIcon,
          badge: counts.pendingBookings > 0 ? counts.pendingBookings : undefined,
          badgeColor: "bg-amber-500 text-neutral-950 font-bold",
        },
        {
          id: "dutyslips" as AdminTabType,
          label: "Duty Slips & Invoices",
          icon: DocumentTextIcon,
          badge: counts.dutySlips > 0 ? counts.dutySlips : undefined,
          badgeColor: "bg-primary-6000 text-white font-bold",
        },
        {
          id: "odometer" as AdminTabType,
          label: "Odometer Audit",
          icon: CameraIcon,
        },
        {
          id: "quotations" as AdminTabType,
          label: "Custom Quotes",
          icon: SparklesIcon,
        },
      ],
    },
    {
      title: "FLEET & OPERATIONS",
      items: [
        {
          id: "drivers" as AdminTabType,
          label: "Chauffeur Roster",
          icon: UsersIcon,
          badge: counts.activeDrivers > 0 ? `${counts.activeDrivers} Ready` : undefined,
          badgeColor: "bg-emerald-500 text-white font-bold",
        },
        {
          id: "fleet" as AdminTabType,
          label: "Fleet & Rate Engine",
          icon: TruckIcon,
        },
        {
          id: "expenses" as AdminTabType,
          label: "Fleet Expenses Ledger",
          icon: BanknotesIcon,
        },
      ],
    },
    {
      title: "LANDING CMS & CONTENT",
      items: [
        {
          id: "festivals" as AdminTabType,
          label: "Festivals & Offers",
          icon: SparklesIcon,
          badge: "New",
          badgeColor: "bg-amber-500 text-neutral-950 font-bold",
        },
        {
          id: "tours_cms" as AdminTabType,
          label: "Tours & Packages",
          icon: SparklesIcon,
        },
        {
          id: "places_cms" as AdminTabType,
          label: "Operational Hubs",
          icon: MapPinIcon,
        },
        {
          id: "routes_cms" as AdminTabType,
          label: "Outstation Routes",
          icon: GlobeAltIcon,
        },
      ],
    },
    {
      title: "REPUTATION & AUDIT",
      items: [
        {
          id: "reviews" as AdminTabType,
          label: "Reputation Shield",
          icon: StarIcon,
          badge: "4.9",
          badgeColor: "bg-amber-400 text-neutral-950 font-bold",
        },
      ],
    },
  ];

  const dockItems = [
    {
      icon: <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />,
      label: "Driver Portal",
      href: "/driver",
      external: true,
    },
    {
      icon: <DocumentTextIcon className="w-4 h-4 text-sky-500" />,
      label: "Trip Sheet",
      href: "/trip-sheet",
      external: true,
    },
    {
      icon: <HomeIcon className="w-4 h-4 text-amber-500" />,
      label: "Customer Website",
      href: "/",
      external: true,
    },
    {
      icon: <PhoneIcon className="w-4 h-4 text-emerald-500" />,
      label: "WhatsApp Support",
      href: `https://wa.me/91${SADHGURU_CONTACT.primaryPhone}`,
      external: true,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl text-neutral-800 dark:text-neutral-200 border-r border-neutral-200/80 dark:border-neutral-800/80 select-none font-sans transition-colors">
      {/* Brand Header with Luxury Chauffeur Emblem */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80">
        <Link href={"/" as any} className="flex items-center gap-3 overflow-hidden group">
          {/* Emblem */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-400"
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
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-neutral-900"></span>
            </span>
          </div>

          {!isCollapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-neutral-900 dark:text-white text-sm tracking-tight truncate uppercase leading-none">
                  Sri Sadhguru
                </h1>
                <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  ADMIN
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5 mt-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <ShinyText text="Fleet Operations Hub" speed={3} className="text-amber-600 dark:text-amber-400 font-semibold" />
              </div>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <MagneticButton
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Close Sidebar"
        >
          <XMarkIcon className="w-5 h-5" />
        </MagneticButton>

        {/* Desktop collapse toggle with ReactBits MagneticButton */}
        <MagneticButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </MagneticButton>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 hiddenScrollbar no-scrollbar">
        {navSections.map((section, idx) => (
          <div key={idx}>
            {!isCollapsed ? (
              <p className="px-3 mb-2 text-[10px] font-extrabold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                {section.title}
              </p>
            ) : (
              <div className="w-6 h-0.5 bg-neutral-200 dark:bg-neutral-800 mx-auto my-2 rounded-full" />
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                      if (typeof window !== "undefined") {
                        const targetUrl = item.id === "overview" ? "/admin" : `/admin/${item.id}`;
                        window.history.pushState(null, "", targetUrl);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all relative group ${
                      isActive
                        ? "bg-primary-6000 text-white font-bold shadow-md shadow-primary-6000/25"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-white"
                    } ${isCollapsed ? "justify-center px-0" : ""}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive ? "text-white" : "text-neutral-400 dark:text-neutral-500 group-hover:text-primary-6000 dark:group-hover:text-white"
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full shrink-0 ${
                          isActive ? "bg-white text-primary-6000" : item.badgeColor
                        }`}
                      >
                        {item.id === "reviews" ? (
                          <span className="inline-flex items-center gap-0.5">
                            <span>{item.badge}</span>
                            <StarIcon className="w-2.5 h-2.5 inline fill-current" />
                          </span>
                        ) : typeof item.badge === "number" ? (
                          <AnimatedCounter to={item.badge} />
                        ) : (
                          item.badge
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Operational Portals Quick-Jump (ReactBits Dock) */}
        {!isCollapsed && (
          <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80">
            <p className="px-3 mb-2 text-[10px] font-extrabold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 flex items-center justify-between">
              <span>Operational Portals</span>
              <span className="text-[9px] font-mono text-primary-600 dark:text-primary-400 lowercase">dock</span>
            </p>
            <Dock items={dockItems} isInline={true} className="w-full" />
          </div>
        )}
      </div>

      {/* User Footer Profile & Sign Out with MagneticButton */}
      <div className="p-3.5 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/60 dark:bg-neutral-950/60 backdrop-blur-md">
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-amber-500/20">
            RK
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                Rathan Kanna
              </p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate font-mono">
                {SADHGURU_CONTACT.primaryPhoneFormatted}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <MagneticButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1.5 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </MagneticButton>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 transition-all duration-300 h-screen sticky top-0 z-30 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Mobile Drawer Sheet */}
      <div
        className={`fixed inset-y-0 left-0 w-72 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
