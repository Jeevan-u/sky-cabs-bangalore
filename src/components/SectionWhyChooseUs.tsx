"use client";

import React, { FC } from "react";
import Heading from "@/shared/Heading";
import {
  BuildingOffice2Icon,
  SparklesIcon,
  TruckIcon,
  ClockIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@/components/icons";
import { BentoGrid, BentoCard, ShinyText } from "@/components/reactbits";

export interface SectionWhyChooseUsProps {
  className?: string;
}

const features = [
  {
    icon: <BuildingOffice2Icon className="w-6 h-6 text-amber-500" />,
    title: "Government & Official Duties",
    desc: "Authorized commercial vehicles for government departments, official assignments, district tours, and administrative transit across Bengaluru & Karnataka.",
    badge: "Official Transit",
  },
  {
    icon: <CheckBadgeIcon className="w-6 h-6 text-indigo-500" />,
    title: "Corporate & Event Logistics",
    desc: "Comprehensive transportation solutions for corporate summits, Whitefield conventions, annual meetings, and private celebrations.",
    badge: "Corporate Fleet",
  },
  {
    icon: <SparklesIcon className="w-6 h-6 text-rose-500" />,
    title: "Rallies, VIPs & Wedding Convoys",
    desc: "Specialized fleet management for political rallies, public campaigns, dignitary protocol, and synchronized wedding guest convoys.",
    badge: "VIP Convoys",
  },
  {
    icon: <TruckIcon className="w-6 h-6 text-emerald-500" />,
    title: "4+1 to 52-Seater Fleet",
    desc: "Comprehensive fleet from Prime Sedan & Toyota Innova Crystas to Force Urbania (9+1, 12+1, 16+1) and Tempo Traveller (12+1) and 52-seater luxury coaches.",
    badge: "5 to 50 Seaters",
  },
  {
    icon: <ClockIcon className="w-6 h-6 text-sky-500" />,
    title: "24x7 Guaranteed On-Time Dispatch",
    desc: "Emergency airport transfers, 4 AM temple departures, and round-the-clock dispatches across Begur, Koramangala, Whitefield, and Jayanagar.",
    badge: "24x7 Available",
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-amber-500" />,
    title: "Transparent & Best Quotations",
    desc: "Zero hidden charges, upfront per-km and flat airport rates, digital duty slips, and guaranteed transparent billing.",
    badge: "Zero Hidden Fees",
  },
];

const SectionWhyChooseUs: FC<SectionWhyChooseUsProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionWhyChooseUs relative ${className}`}>
      <Heading
        desc="Sky Cabs Bangalore and our dedicated travel team ensure punctuality, safety, and guaranteed best rates."
        isCenter
      >
        <span>Why Choose </span>
        <ShinyText text="Sky Cabs Bangalore" speed={3} className="text-primary-600 font-extrabold" />
        <span>?</span>
      </Heading>

      <div className="mt-12">
        <BentoGrid>
          {features.map((item, idx) => (
            <BentoCard
              key={idx}
              icon={item.icon}
              title={item.title}
              description={item.desc}
              badge={item.badge}
              className="hover:shadow-2xl"
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default SectionWhyChooseUs;
