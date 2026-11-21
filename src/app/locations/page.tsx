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
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { SpotlightCard, StarBorder, ShinyText } from "@/components/reactbits";

export const metadata: Metadata = {
  title: "Service Locations & 24x7 Cab Hubs | Sky Cabs Bangalore",
  description:
    "Explore Sky Cabs Bangalore pickup hubs in Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka, plus Kempegowda International Airport (BLR) transfers.",
  alternates: {
    canonical: "https://skycabsbangalore.com/locations",
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
    id: "begur",
    name: "Begur (Base)",
    title: "Begur Base & Bengaluru–Hosur Corridor",
    href: "/cabs-in-begur",
    thumbnail: "/images/hubs/begur-hub.jpg",
    tag: "Base Hub & Rapid Dispatch",
    distanceToAirport: "38 KM (via Airport Road)",
    pickupTime: "10 - 15 Mins",
    description:
      "Sky Cabs Bangalore is based at #56, Begur. We arrange local rides, airport transfers and outstation trips across Begur, Electronic City and the Hosur corridor.",
    landmarks: ["Begur Circle", "Electronic City", "Hosa Road", "Anekal Road"],
    startingFareAirport: 1399,
    startingFareLocal: 2299,
  },
  {
    id: "electronic-city",
    name: "Electronic City",
    title: "Electronic City Phase 1 & 2 Tech Corridor",
    href: "/cabs-in-electronic-city",
    thumbnail: "/images/hubs/electronic-city.jpg",
    tag: "IT & Corporate Corridor",
    distanceToAirport: "42 KM (via ORR)",
    pickupTime: "12 - 18 Mins",
    description:
      "Office commutes, airport drops and weekend getaways for Electronic City, Hosa Road and Bommasandra, with vehicles arranged subject to availability.",
    landmarks: ["Electronic City Phase 1", "Hosa Road", "Bommasandra", "Sarjapur Road"],
    startingFareAirport: 1499,
    startingFareLocal: 2299,
  },
  {
    id: "koramangala",
    name: "Koramangala",
    title: "Koramangala Blocks & Inner Ring Road",
    href: "/cabs-in-koramangala",
    thumbnail: "/images/hubs/electronic-city.jpg",
    tag: "Neighbourhood & Family Travel",
    distanceToAirport: "35 KM (via Hennur Road)",
    pickupTime: "10 - 15 Mins",
    description:
      "Doorstep pickups across Koramangala's blocks, 80 Feet Road and BTM Layout for airport runs, local travel and outstation holidays.",
    landmarks: ["5th Block", "Forum Mall", "80 Feet Road", "BTM Layout"],
    startingFareAirport: 1399,
    startingFareLocal: 2299,
  },
  {
    id: "hsr-layout",
    name: "HSR Layout",
    title: "HSR Layout Sectors 1 to 7 & Sarjapur Road",
    href: "/cabs-in-hsr-layout",
    thumbnail: "/images/hubs/electronic-city.jpg",
    tag: "Residential & ORR Commuter Hub",
    distanceToAirport: "37 KM (via ORR)",
    pickupTime: "10 - 15 Mins",
    description:
      "Pickups across HSR Layout, Sarjapur Road and the Outer Ring Road for airport transfers and intercity trips to Chennai, Mysuru and Ooty.",
    landmarks: ["27th Main", "Sarjapur Road", "Silk Board", "Agara Lake"],
    startingFareAirport: 1399,
    startingFareLocal: 2299,
  },
  {
    id: "whitefield",
    name: "Whitefield",
    title: "Whitefield ITPL, Brookefield & Varthur Road",
    href: "/cabs-in-whitefield",
    thumbnail: "/images/hubs/electronic-city.jpg",
    tag: "Corporate & Residential Hub",
    distanceToAirport: "40 KM (via ORR)",
    pickupTime: "12 - 18 Mins",
    description:
      "Corporate commutes, airport transfers and outstation cabs for Whitefield, ITPL, Brookefield and the ORR tech corridor.",
    landmarks: ["ITPL", "Phoenix Marketcity", "Brookefield", "Varthur Road"],
    startingFareAirport: 1599,
    startingFareLocal: 2299,
  },
  {
    id: "indiranagar",
    name: "Indiranagar",
    title: "Indiranagar 100 Feet Road & Domlur",
    href: "/cabs-in-indiranagar",
    thumbnail: "/images/hubs/electronic-city.jpg",
    tag: "Central Bengaluru Pickups",
    distanceToAirport: "33 KM (via Old Airport Road)",
    pickupTime: "10 - 15 Mins",
    description:
      "Local rides and outstation cabs across Indiranagar, Domlur and Old Airport Road, with flights from Kempegowda International Airport (BLR).",
    landmarks: ["100 Feet Road", "Indiranagar Metro", "Domlur", "Old Airport Road"],
    startingFareAirport: 1399,
    startingFareLocal: 2299,
  },
  {
    id: "jayanagar",
    name: "Jayanagar",
    title: "Jayanagar, JP Nagar & Banashankari",
    href: "/cabs-in-jayanagar",
    thumbnail: "/images/hubs/begur-hub.jpg",
    tag: "South Bengaluru Hub",
    distanceToAirport: "36 KM (via ORR)",
    pickupTime: "10 - 15 Mins",
    description:
      "South Bengaluru pickups for airport transfers and hill getaways to Mysuru, Coorg and Ooty, with clear fares and clean vehicles.",
    landmarks: ["4th Block", "JP Nagar", "Banashankari", "Bannerghatta Road"],
    startingFareAirport: 1399,
    startingFareLocal: 2299,
  },
  {
    id: "yelahanka",
    name: "Yelahanka",
    title: "Yelahanka, Hebbal & Airport Road",
    href: "/cabs-in-yelahanka",
    thumbnail: "/images/hubs/hsr-layout-hub.jpg",
    tag: "North Bengaluru Airport Gateway",
    distanceToAirport: "22 KM (via NH 44)",
    pickupTime: "10 - 15 Mins",
    description:
      "Close to Devanahalli, Yelahanka is a convenient pickup point for Kempegowda Airport transfers and north Bengaluru outstation routes.",
    landmarks: ["Yelahanka New Town", "Hebbal", "Manyata Tech Park", "Devanahalli"],
    startingFareAirport: 1199,
    startingFareLocal: 2199,
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
                <ShinyText text="Bengaluru Service Network" speed={2.5} />
              </div>
            </StarBorder>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
            SKY CABS BANGALORE SERVICE LOCATIONS & 24X7 HUBS
          </h1>
          <p className="mt-3 text-xs sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Doorstep pickups across Bengaluru's neighbourhoods and IT corridors, plus transfers to Kempegowda International Airport (BLR). Transparent fares and vehicles arranged subject to availability.
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
                      href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20need%20a%20cab%20pickup%20at%20${encodeURIComponent(
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

        {/* Airport & Outstation Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {[
            {
              href: "/bangalore-airport-taxi",
              title: "Bangalore Airport Taxi",
              desc: "Transfers to and from Kempegowda International Airport (BLR), Devanahalli.",
            },
            {
              href: "/kempegowda-airport-taxi",
              title: "Kempegowda Airport Taxi",
              desc: "Flight-time based pickups and drops at BLR across Bengaluru.",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className="flex items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 transition"
            >
              <span>
                <span className="block text-sm font-black text-neutral-900 dark:text-white">{link.title}</span>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{link.desc}</span>
              </span>
              <ArrowRightIcon className="w-4 h-4 text-amber-500 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
