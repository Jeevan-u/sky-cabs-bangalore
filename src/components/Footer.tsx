"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import FooterNav from "./FooterNav";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { Route } from "@/routers/types";
import {
  BoltIcon,
  UserIcon,
  SparklesIcon,
  DocumentTextIcon,
  WhatsAppIcon,
  WrenchScrewdriverIcon,
} from "@/components/icons";

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { href: "/shamshabad-airport-taxi", label: "Airport Taxi Transfers" },
      { href: "/hyderabad-to-srisailam-cabs", label: "Srisailam Tour Packages" },
      { href: "/hyderabad-to-tirupati-cabs", label: "Tirupati Balaji Darshan" },
      { href: "/listing-car", label: "Local Hourly Rentals (8h / 80km)" },
      { href: "/contact", label: "Wedding & Event Transport" },
      { href: "/cabs-in-hitec-city", label: "Corporate Employee Transport" },
    ],
  },
  {
    title: "Popular Routes",
    links: [
      { href: "/hyderabad-to-srisailam-cabs", label: "Hyderabad to Srisailam Jyotirlinga" },
      { href: "/hyderabad-to-tirupati-cabs", label: "Hyderabad to Tirupati Balaji" },
      { href: "/hyderabad-to-shirdi-cabs", label: "Hyderabad to Shirdi Sai Baba" },
      { href: "/hyderabad-to-yadagirigutta-cabs", label: "Hyderabad to Yadagirigutta (Yadadri)" },
      { href: "/blog/vijayawada-trip", label: "Hyderabad to Vijayawada Guide" },
      { href: "/blog/south-india-circuits", label: "South India Pilgrimage Circuits" },
    ],
  },
  {
    title: "Service Hubs",
    links: [
      { href: "/cabs-in-kukatpally", label: "Kukatpally (Headquarters)" },
      { href: "/shamshabad-airport-taxi", label: "Shamshabad Airport Express" },
      { href: "/cabs-in-kphb", label: "KPHB Colony" },
      { href: "/cabs-in-miyapur", label: "Miyapur Highway Hub" },
      { href: "/cabs-in-hitec-city", label: "Hitec City & Madhapur" },
      { href: "/cabs-in-medchal", label: "Medchal & ORR Gateway" },
      { href: "/cabs-in-kamareddy-gandhari", label: "Kamareddy & Gandhari Hub" },
    ],
  },
  {
    title: "Our Fleet",
    links: [
      { href: "/listing-car-detail?vehicle=dzire-etios", label: "Swift Dzire & Toyota Etios (Sedan)" },
      { href: "/listing-car-detail?vehicle=ertiga-rumion", label: "Maruti Ertiga (6+1 MPV)" },
      { href: "/listing-car-detail?vehicle=innova-crysta", label: "Toyota Innova Crysta (7+1 VIP)" },
      { href: "/listing-car-detail?vehicle=tempo-traveller-12-17", label: "Force Tempo Traveller (12 & 17 Seater)" },
      { href: "/listing-car-detail?vehicle=urbania-26", label: "Force Urbania Luxury Van (26 Seater)" },
      { href: "/listing-car-detail?vehicle=luxury-bus-32-50", label: "Luxury AC Coaches (32 & 50 Seater)" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <>
      <FooterNav />

      <footer className="relative bg-white dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-sans">
        {/* Top Feature Bar */}
        <div className="border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50/60 dark:bg-neutral-900/40 py-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <BoltIcon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">24x7 Rapid Dispatch</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Average pickup in 15-20 mins</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">Verified Chauffeurs</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Experienced & polite drivers</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">Sanitized Vehicles</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Spotless & fully air-conditioned</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                  <DocumentTextIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">Transparent Billing</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Digital slips, zero hidden charges</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Navigation */}
        <div className="container py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
            {/* Brand Column (Span 2) */}
            <div className="lg:col-span-2 space-y-5">
              <Logo />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
                Sri Sadhguru Tours & Travels is Hyderabad&apos;s trusted commercial car rental service. Operating a modern fleet of 4-seater sedans, luxury SUVs, and group tempo travellers for city, outstation, and pilgrimage travel.
              </p>

              {/* Direct Booking Call Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 max-w-sm">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  24x7 Booking Assistance
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <a
                    href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
                    className="font-mono text-xs font-bold text-neutral-900 dark:text-white hover:text-primary-6000 transition-colors"
                  >
                    +91 {SADHGURU_CONTACT.primaryPhone}
                  </a>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <a
                    href={`tel:${SADHGURU_CONTACT.secondaryPhone}`}
                    className="font-mono text-xs font-bold text-neutral-900 dark:text-white hover:text-primary-6000 transition-colors"
                  >
                    +91 {SADHGURU_CONTACT.secondaryPhone}
                  </a>
                </div>
                <div className="mt-2.5">
                  <a
                    href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hello%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20inquire%20about%20a%20cab%20booking.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400" />
                    <span>Chat on WhatsApp for Instant Quote</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div>
                <SocialsList1 className="flex items-center space-x-3" />
              </div>
            </div>

            {/* Menu Columns */}
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
                  {col.title}
                </h3>
                <ul className="space-y-2.5 text-xs">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href as any}
                        prefetch={true}
                        className="text-neutral-500 dark:text-neutral-400 hover:text-primary-6000 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Meta Bar */}
        <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 py-6 bg-neutral-50/40 dark:bg-neutral-900/40 text-xs">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 dark:text-neutral-400">
            <div>
              <p>
                © {new Date().getFullYear()} Sri Sadhguru Tours & Travels. All rights reserved.
              </p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                Headquarters: Kukatpally, Hyderabad, Telangana 500072. Proprietor: {SADHGURU_CONTACT.proprietor}.
              </p>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 font-medium flex items-center gap-1.5">
                <span>Developed by</span>
                <a
                  href="tel:+916301253789"
                  className="font-bold text-neutral-900 dark:text-white hover:text-primary-6000 dark:hover:text-primary-400 transition-colors"
                >
                  INDENTDEV +916301253789
                </a>
              </p>
            </div>

            {/* Subtle Operational Links */}
            <div className="flex items-center gap-4 text-[11px] font-medium flex-wrap">
              <Link href={"/contact" as Route} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Contact & Support
              </Link>
              <span>·</span>
              <Link href={"/review" as Route} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Customer Reviews
              </Link>
              <span>·</span>
              <Link href={"/driver" as Route} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Chauffeur Portal
              </Link>
              <span>·</span>
              <Link href={"/admin" as Route} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Operator Login
              </Link>
              <span>·</span>
              <a
                href="tel:+916301253789"
                className="px-2.5 py-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors inline-flex items-center gap-1.5"
                title="Developed by INDENTDEV +916301253789"
              >
                <WrenchScrewdriverIcon className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>Developed by INDENTDEV +916301253789</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
