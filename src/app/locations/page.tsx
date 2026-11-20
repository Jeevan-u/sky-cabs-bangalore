import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MapPinIcon,
  SparklesIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PhoneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/icons";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { SpotlightCard, StarBorder, ShinyText } from "@/components/reactbits";

export const metadata: Metadata = {
  title: "Service Locations & 24x7 Cab Hubs | SRI SADHGURU TOURS & TRAVELS",
  description:
    "Explore 24x7 doorstep cab dispatch hubs in Kukatpally, Shamshabad Airport, KPHB Colony, Hitec City, Miyapur, Medchal, and Gandhari/Kamareddy. 15-minute pickup guarantee.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/locations",
  },
};

interface LocationHub {
  id: string;
  name: string;
  title: string;
  href: string;
  thumbnail: string;
  tag: string;
  distanceToAirport: string;
  pickupTime: string;
  description: string;
  landmarks: string[];
  startingFareAirport: number;
  startingFareLocal: number;
}

const LOCATION_HUBS: LocationHub[] = [
  {
    id: "kukatpally",
    name: "Kukatpally (Headquarters)",
    title: "Kukatpally 24x7 Central Hub & Y-Junction",
    href: "/cabs-in-kukatpally",
    thumbnail: "/images/hubs/kukatpally-hq.jpg",
    tag: "Headquarters & Rapid Dispatch",
    distanceToAirport: "42 KM (via PVNR Expressway)",
    pickupTime: "10 - 15 Mins",
    description:
      "Central command hub of Sri Sadhguru Tours & Travels. 20+ commercial cabs & buses stationed 24x7 around Y-Junction, IDL Lake, and JNTU Road.",
    landmarks: ["Y-Junction", "IDL Lake Road", "JNTU Hyderabad", "Kukatpally Metro"],
    startingFareAirport: 1299,
    startingFareLocal: 2199,
  },
  {
    id: "shamshabad",
    name: "Shamshabad Airport Express",
    title: "Rajiv Gandhi International Airport (RGIA) Taxi",
    href: "/shamshabad-airport-taxi",
    thumbnail: "/images/hubs/shamshabad-airport.jpg",
    tag: "Fixed Non-Surge Airport Fleet",
    distanceToAirport: "0 KM (Dedicated Airport Standby)",
    pickupTime: "5 - 10 Mins",
    description:
      "Direct airport pickup and drop transfers with zero surge pricing. Flight tracking included with 45 minutes complimentary wait time for delayed flights.",
    landmarks: ["Terminal 1 Arrivals", "Aeromall Drop Portico", "Novotel Airport Hub"],
    startingFareAirport: 1299,
    startingFareLocal: 2199,
  },
  {
    id: "kphb",
    name: "KPHB Colony",
    title: "KPHB Colony Phase 1 to 9 & Nexus Mall",
    href: "/cabs-in-kphb",
    thumbnail: "/images/hubs/kphb-colony.jpg",
    tag: "Residential & Family Corridor",
    distanceToAirport: "44 KM (via ORR / PVNR)",
    pickupTime: "10 - 15 Mins",
    description:
      "Rapid doorstep cab dispatch across all 9 phases of KPHB Colony, Temple Road, Remedy Hospital, and Nexus Hyderabad Mall.",
    landmarks: ["Nexus Mall", "Remedy Hospital", "Phase 3 Temple Road", "JNTU Road"],
    startingFareAirport: 1299,
    startingFareLocal: 2199,
  },
  {
    id: "hitec-city",
    name: "Hitec City & Madhapur",
    title: "Cyber Towers, Mindspace & Financial District",
    href: "/cabs-in-hitec-city",
    thumbnail: "/images/hubs/hitec-city.jpg",
    tag: "IT & Corporate Corridors",
    distanceToAirport: "35 KM (via Nehru ORR)",
    pickupTime: "12 - 18 Mins",
    description:
      "Corporate shuttles, executive car rentals, and 24/7 IT employee commute for Cyber Towers, Inorbit Mall, Knowledge City, and Gachibowli.",
    landmarks: ["Cyber Towers", "Mindspace IT Park", "Waverock DLF", "Inorbit Mall"],
    startingFareAirport: 1399,
    startingFareLocal: 2299,
  },
  {
    id: "miyapur",
    name: "Miyapur Highway Hub",
    title: "Miyapur Metro Terminal & Allwyn Colony",
    href: "/cabs-in-miyapur",
    thumbnail: "/images/hubs/miyapur-hub.jpg",
    tag: "Metro & Highway Gateway",
    distanceToAirport: "48 KM (via ORR Exit 3)",
    pickupTime: "15 Mins",
    description:
      "Strategic transit hub connecting Miyapur Metro, Allwyn Colony, Bollaram Industrial area, and Mumbai Highway corridor.",
    landmarks: ["Miyapur Metro Terminal", "Allwyn Junction", "Ameenpur Lake", "Bollaram Road"],
    startingFareAirport: 1399,
    startingFareLocal: 2199,
  },
  {
    id: "medchal",
    name: "Medchal ORR Gateway",
    title: "Medchal, Kompally & NH 44 Outer Hub",
    href: "/cabs-in-medchal",
    thumbnail: "/images/hubs/medchal-kompally.jpg",
    tag: "North Hyderabad Gateway",
    distanceToAirport: "58 KM (via Outer Ring Road)",
    pickupTime: "15 - 20 Mins",
    description:
      "Serving North Hyderabad, Kompally, Medchal Industrial corridor, and Nagpur Highway outstation routes.",
    landmarks: ["Oxygen Park", "Medchal Checkpost", "Kompally Junction", "Gundlapochampally"],
    startingFareAirport: 1699,
    startingFareLocal: 2499,
  },
  {
    id: "kamareddy-gandhari",
    name: "Kamareddy & Gandhari Hub",
    title: "Gandhari Branch & Nizamabad Regional Fleet",
    href: "/cabs-in-kamareddy-gandhari",
    thumbnail: "/images/hubs/kamareddy-gandhari.jpg",
    tag: "Regional District Branch",
    distanceToAirport: "175 KM",
    pickupTime: "Scheduled Dispatch",
    description:
      "Sri Sadhguru Travels' native regional branch connecting Gandhari, Kamareddy, Banswada, and Nizamabad to Hyderabad.",
    landmarks: ["Gandhari Bus Stand", "Kamareddy Clock Tower", "NH 44 Toll Gate"],
    startingFareAirport: 3200,
    startingFareLocal: 3500,
  },
];

export default function ServiceLocationsPage() {
  return (
    <div className="nc-ServiceLocationsPage py-10 sm:py-16">
      <div className="container space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <StarBorder as="div" color="#f59e0b" speed="3.5s" className="shadow-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-500">
                <MapPinIcon className="w-3.5 h-3.5" />
                <ShinyText text="Hyderabad & Regional Network" speed={2.5} />
              </div>
            </StarBorder>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
            SRI SADHGURU SERVICE LOCATIONS & 24X7 HUBS
          </h1>
          <p className="mt-3 text-xs sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Direct doorstep dispatch across Hyderabad IT corridors, commercial transit junctions, and outstation gateways. Transparent flat rates with guaranteed on-time pickup.
          </p>
        </div>

        {/* Side-by-Side Responsive Grid: 2 columns on mobile, 3 or 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {LOCATION_HUBS.map((hub) => (
            <SpotlightCard
              key={hub.id}
              className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md flex flex-col justify-between overflow-hidden hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 group"
              spotlightColor="rgba(245, 158, 11, 0.16)"
            >
              {/* Image banner */}
              <div className="relative w-full h-32 sm:h-44 overflow-hidden bg-neutral-900">
                <Image
                  src={hub.thumbnail}
                  alt={hub.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                <span className="absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 truncate max-w-[85%]">
                  {hub.tag}
                </span>

                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    <span>Avg {hub.pickupTime}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xs sm:text-base font-black uppercase text-neutral-900 dark:text-white leading-tight">
                    {hub.name}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-snug">
                    {hub.description}
                  </p>

                  {/* Landmarks */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {hub.landmarks.slice(0, 3).map((lm, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 truncate"
                      >
                        {lm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rates & Links */}
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-[11px] mb-2.5">
                    <span className="text-neutral-400 font-bold">Airport Flat</span>
                    <span className="font-black text-amber-600 dark:text-amber-400">
                      ₹{hub.startingFareAirport}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <Link
                      href={hub.href as any}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-[11px] font-bold transition text-center"
                    >
                      <span>Hub Details</span>
                    </Link>

                    <a
                      href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20need%20a%20cab%20pickup%20at%20${encodeURIComponent(
                        hub.name
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition text-center"
                    >
                      <WhatsAppIcon className="w-3 h-3 fill-white" />
                      <span>Book</span>
                    </a>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
