"use client";

import React from "react";
import { Dock } from "@/components/reactbits/Dock";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import {
  PhoneIcon,
  WhatsAppIcon,
  CarIcon,
  BoltIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@/components/icons";

export default function FloatingTravelDock() {
  const dockItems = [
    {
      icon: <PhoneIcon className="w-5 h-5 text-emerald-500" />,
      label: "Call 24x7 (+91 81061 17704)",
      href: `tel:${SADHGURU_CONTACT.primaryPhone}`,
      external: true,
    },
    {
      icon: <WhatsAppIcon className="w-5 h-5 fill-emerald-500" />,
      label: "WhatsApp Booking",
      href: `https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20inquire%20about%20a%20cab/bus%20booking`,
      external: true,
      highlight: true,
    },
    {
      icon: <BoltIcon className="w-5 h-5 text-amber-500" />,
      label: "Instant Booking",
      href: "/checkout",
    },
    {
      icon: <CarIcon className="w-5 h-5 text-sky-500" />,
      label: "5-50 Seater Fleet",
      href: "/listing-car",
    },
    {
      icon: <MapPinIcon className="w-5 h-5 text-rose-500" />,
      label: "Track My Ride",
      href: "/track-booking",
    },
  ];

  return (
    <div className="hidden sm:block">
      <Dock items={dockItems} />
    </div>
  );
}
