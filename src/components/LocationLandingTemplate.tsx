import React from "react";
import Link from "next/link";
import Image from "next/image";
import SkyCabsBookingForm from "@/components/SkyCabsBookingForm";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import {
  MapPinIcon,
  BoltIcon,
  TruckIcon,
  AirplaneIcon,
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { BlurText, ShinyText, SpotlightCard, MagneticButton } from "@/components/reactbits";

interface LocationPageProps {
  locationName: string;
  tagline: string;
  landmarks: string[];
  description: string;
  popularRoutes: { destination: string; distance: string; startingPrice: string }[];
  faqs: { q: string; a: string }[];
  geoCoordinates?: { latitude: string; longitude: string };
  postalCode?: string;
  customHeading?: string;
  customBadge?: string;
}

const HUB_LANDMARKS: Record<string, { image: string; title: string; subtitle: string }> = {
  begur: {
    image: "/images/hubs/begur-hub.jpg",
    title: "Begur Base – Sky Cabs Bangalore",
    subtitle: "Doorstep dispatch across Begur, Electronic City and the Bengaluru–Hosur corridor, subject to availability.",
  },
  airport: {
    image: "/images/hubs/kempegowda-airport.jpg",
    title: "Kempegowda International Airport (BLR) – Terminal Entrance",
    subtitle: "Flight-time based pickups and drops at Devanahalli and across Bengaluru.",
  },
  kempegowda: {
    image: "/images/hubs/kempegowda-airport.jpg",
    title: "Kempegowda International Airport (BLR) – Terminal Entrance",
    subtitle: "Flight-time based pickups and drops at Devanahalli and across Bengaluru.",
  },
  devanahalli: {
    image: "/images/hubs/kempegowda-airport.jpg",
    title: "Kempegowda International Airport (BLR) – Terminal Entrance",
    subtitle: "Flight-time based pickups and drops at Devanahalli and across Bengaluru.",
  },
  "electronic city": {
    image: "/images/hubs/electronic-city.jpg",
    title: "Electronic City Tech Corridor – Phase 1 & 2",
    subtitle: "Pickups across Electronic City, Hosa Road, Bommasandra and the Sarjapur Road junction.",
  },
  koramangala: {
    image: "/images/hubs/electronic-city.jpg",
    title: "Koramangala 5th Block & Forum Mall",
    subtitle: "Neighbourhood pickups around Koramangala, BTM Layout and the Inner Ring Road.",
  },
  hsr: {
    image: "/images/hubs/electronic-city.jpg",
    title: "HSR Layout Sectors 1 to 7",
    subtitle: "Commuter and family pickups around HSR Layout, Sarjapur Road and the Outer Ring Road.",
  },
  whitefield: {
    image: "/images/hubs/electronic-city.jpg",
    title: "Whitefield ITPL & Phoenix Marketcity",
    subtitle: "Corporate and residential pickups across Whitefield, Brookefield and Varthur Road.",
  },
  marathahalli: {
    image: "/images/hubs/electronic-city.jpg",
    title: "Marathahalli Bridge & Outer Ring Road",
    subtitle: "Pickups along the ORR tech corridor, Kundalahalli and Varthur Road.",
  },
  indiranagar: {
    image: "/images/hubs/electronic-city.jpg",
    title: "Indiranagar 100 Feet Road & Metro",
    subtitle: "Neighbourhood pickups around Indiranagar, Domlur and Old Airport Road.",
  },
  jayanagar: {
    image: "/images/hubs/begur-hub.jpg",
    title: "Jayanagar 4th Block & Shopping Complex",
    subtitle: "South Bengaluru pickups across Jayanagar, JP Nagar and Banashankari.",
  },
  banashankari: {
    image: "/images/hubs/begur-hub.jpg",
    title: "Jayanagar 4th Block & Shopping Complex",
    subtitle: "South Bengaluru pickups across Jayanagar, JP Nagar and Banashankari.",
  },
  yelahanka: {
    image: "/images/hubs/hsr-layout-hub.jpg",
    title: "Yelahanka Satellite Town & Airport Road",
    subtitle: "North Bengaluru and airport-corridor pickups around Yelahanka, Hebbal and Devanahalli.",
  },
  hebbal: {
    image: "/images/hubs/hsr-layout-hub.jpg",
    title: "Yelahanka Satellite Town & Airport Road",
    subtitle: "North Bengaluru and airport-corridor pickups around Yelahanka, Hebbal and Devanahalli.",
  },
};

function resolveHubLandmark(locationName: string) {
  const lower = locationName.toLowerCase();
  for (const [key, val] of Object.entries(HUB_LANDMARKS)) {
    if (lower.includes(key)) {
      return val;
    }
  }
  return null;
}

const DEFAULT_COORDS: Record<string, { lat: string; lng: string; postalCode: string; locality: string }> = {
  begur: { lat: "12.8570", lng: "77.6680", postalCode: "562157", locality: "Begur, Bengaluru" },
  "electronic city": { lat: "12.8452", lng: "77.6602", postalCode: "560100", locality: "Electronic City, Bengaluru" },
  koramangala: { lat: "12.9352", lng: "77.6245", postalCode: "560034", locality: "Koramangala, Bengaluru" },
  "hsr layout": { lat: "12.9116", lng: "77.6412", postalCode: "560102", locality: "HSR Layout, Bengaluru" },
  "btm layout": { lat: "12.9165", lng: "77.6101", postalCode: "560076", locality: "BTM Layout, Bengaluru" },
  "jp nagar": { lat: "12.9086", lng: "77.5882", postalCode: "560078", locality: "JP Nagar, Bengaluru" },
  jayanagar: { lat: "12.9250", lng: "77.5938", postalCode: "560011", locality: "Jayanagar, Bengaluru" },
  whitefield: { lat: "12.9698", lng: "77.7499", postalCode: "560066", locality: "Whitefield, Bengaluru" },
  marathahalli: { lat: "12.9569", lng: "77.7011", postalCode: "560037", locality: "Marathahalli, Bengaluru" },
  indiranagar: { lat: "12.9719", lng: "77.6412", postalCode: "560038", locality: "Indiranagar, Bengaluru" },
  yelahanka: { lat: "13.1006", lng: "77.5960", postalCode: "560064", locality: "Yelahanka, Bengaluru" },
  hebbal: { lat: "13.0358", lng: "77.5970", postalCode: "560024", locality: "Hebbal, Bengaluru" },
  banashankari: { lat: "12.9250", lng: "77.5460", postalCode: "560070", locality: "Banashankari, Bengaluru" },
  airport: { lat: "13.1986", lng: "77.7066", postalCode: "560300", locality: "Devanahalli, Bengaluru" },
  kempegowda: { lat: "13.1986", lng: "77.7066", postalCode: "560300", locality: "Devanahalli, Bengaluru" },
  devanahalli: { lat: "13.1986", lng: "77.7066", postalCode: "560300", locality: "Devanahalli, Bengaluru" },
  mysuru: { lat: "12.2958", lng: "76.6394", postalCode: "570001", locality: "Mysuru, Karnataka" },
  tirupati: { lat: "13.6288", lng: "79.4192", postalCode: "517501", locality: "Tirupati, Andhra Pradesh" },
  coorg: { lat: "12.4244", lng: "75.7382", postalCode: "571201", locality: "Madikeri (Coorg), Karnataka" },
  madikeri: { lat: "12.4244", lng: "75.7382", postalCode: "571201", locality: "Madikeri (Coorg), Karnataka" },
  ooty: { lat: "11.4102", lng: "76.6950", postalCode: "643001", locality: "Ooty, Tamil Nadu" },
  chennai: { lat: "13.0827", lng: "80.2707", postalCode: "600001", locality: "Chennai, Tamil Nadu" },
  mangaluru: { lat: "12.9141", lng: "74.8560", postalCode: "575001", locality: "Mangaluru, Karnataka" },
  hampi: { lat: "15.3350", lng: "76.4600", postalCode: "583221", locality: "Hampi, Karnataka" },
  wayanad: { lat: "11.6054", lng: "76.1310", postalCode: "673121", locality: "Wayanad, Kerala" },
  chikmagalur: { lat: "13.3153", lng: "75.7775", postalCode: "577101", locality: "Chikmagalur, Karnataka" },
  pondicherry: { lat: "11.9416", lng: "79.8083", postalCode: "605001", locality: "Puducherry" },
  shivamogga: { lat: "13.8476", lng: "75.5690", postalCode: "577201", locality: "Shivamogga, Karnataka" },
  hassan: { lat: "13.0072", lng: "76.1028", postalCode: "573201", locality: "Hassan, Karnataka" },
  tumakuru: { lat: "13.2000", lng: "77.0000", postalCode: "572100", locality: "Tumakuru, Karnataka" },
};

function resolveCoords(locationName: string, passed?: { latitude: string; longitude: string }, passedPostal?: string) {
  if (passed) {
    return { lat: passed.latitude, lng: passed.longitude, postalCode: passedPostal || "562157", locality: "Bengaluru, Karnataka" };
  }
  const lower = locationName.toLowerCase();
  for (const [key, val] of Object.entries(DEFAULT_COORDS)) {
    if (lower.includes(key)) {
      return val;
    }
  }
  return { lat: "12.9716", lng: "77.5946", postalCode: "560001", locality: "Bengaluru, Karnataka" };
}

export default function LocationLandingTemplate({
  locationName,
  tagline,
  landmarks,
  description,
  popularRoutes,
  faqs,
  geoCoordinates,
  postalCode,
  customHeading,
  customBadge,
}: LocationPageProps) {
  const resolved = resolveCoords(locationName, geoCoordinates, postalCode);
  const hubLandmark = resolveHubLandmark(locationName);

  // Schema.org LocalBusiness JSON-LD
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${SKY_CABS_CONTACT.brandName} - ${locationName}`,
    image: hubLandmark
      ? `${SKY_CABS_CONTACT.website}${hubLandmark.image.replace(/^\//, "")}`
      : `${SKY_CABS_CONTACT.website}images/Airport-cabs.jpg`,
    telephone: `+91-${SKY_CABS_CONTACT.primaryPhone}`,
    priceRange: "₹₹",
    knowsLanguage: ["en", "kn", "hi", "ta", "te"],
    address: {
      "@type": "PostalAddress",
      streetAddress: locationName,
      addressLocality: resolved.locality,
      addressRegion: "Karnataka",
      postalCode: resolved.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: resolved.lat,
      longitude: resolved.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [locationName, "Bengaluru", "Karnataka", "South India"],
  };

  const faqSchemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const mapQuery = encodeURIComponent(`${locationName}, Bengaluru, Karnataka`);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 py-10 px-4">
      {/* Structured SEO & AEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJson) }}
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>Locations</span>
          <span>/</span>
          <span className="text-primary-600 dark:text-primary-400 font-semibold">{locationName}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 text-white p-5 sm:p-12 rounded-3xl sm:rounded-[36px] shadow-2xl border-b-4 border-amber-400">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-[11px] sm:text-xs uppercase tracking-widest mb-3">
            <MapPinIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>{customBadge ? customBadge.replace(/^[^\w\s]+/, "").trim() : `Local Taxi & Cab Hub · ${locationName}`}</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-black tracking-tight leading-tight">
            <BlurText text={customHeading || `Best Cab Services & Car Rentals in ${locationName}`} delay={0.03} animateBy="words" />
          </h1>
          <p className="text-blue-200 text-xs sm:text-base mt-2 max-w-2xl font-medium">
            {tagline}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-6 text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5 text-[11px] sm:text-xs">
              <BoltIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt Doorstep Pickup</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5 text-[11px] sm:text-xs">
              <TruckIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prime Sedan to 52-Seater Buses (On Request)</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5 text-[11px] sm:text-xs">
              <AirplaneIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Kempegowda Airport (BLR) Transfers</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 sm:mt-8">
            <MagneticButton pullFactor={0.25} className="w-full sm:w-auto">
              <a
                href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 active:scale-98 touch-manipulation"
              >
                <PhoneIcon className="w-4 h-4 text-slate-950" />
                <span>Instant Call: {SKY_CABS_CONTACT.primaryPhoneFormatted}</span>
              </a>
            </MagneticButton>

            <MagneticButton pullFactor={0.25} className="w-full sm:w-auto">
              <a
                href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20need%20a%20cab%20in%20${encodeURIComponent(locationName)}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center justify-center gap-2 active:scale-98 touch-manipulation"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Booking</span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Featured Visual Landmark Card */}
        {hubLandmark && (
          <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-[32px] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700 group">
            <Image
              src={hubLandmark.image}
              alt={hubLandmark.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider w-fit mb-2 shadow">
                <MapPinIcon className="w-3.5 h-3.5 text-slate-950" />
                <span>Prominent Landmark & Pickup Area</span>
              </div>
              <h2 className="text-white text-xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                {hubLandmark.title}
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl font-medium drop-shadow">
                {hubLandmark.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Booking Form Widget */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <BoltIcon className="w-6 h-6 text-amber-500" />
            <span>Book Your Cab in {locationName}</span>
          </h2>
          <SkyCabsBookingForm />
        </div>

        {/* Local Area Context & Landmarks */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Why Choose Sky Cabs Bangalore in {locationName}?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {description}
          </p>
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
              Key Pickup Landmarks in {locationName}:
            </span>
            <div className="flex flex-wrap gap-2">
              {landmarks.map((l) => (
                <span
                  key={l}
                  className="text-xs bg-neutral-100 dark:bg-neutral-700/60 text-neutral-800 dark:text-neutral-200 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-600 font-semibold inline-flex items-center gap-1.5"
                >
                  <MapPinIcon className="w-3.5 h-3.5 text-rose-500" />
                  <span>{l}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
            Service Coverage & Hub Map: {locationName}
          </h2>
          <div className="w-full h-72 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <iframe
              title={`Map of ${locationName}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>

        {/* Popular Outstation Routes from this Location */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
            Popular Outstation & Airport Trips from {locationName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {popularRoutes.map((r) => (
              <SpotlightCard
                key={r.destination}
                className="p-3 sm:p-5 !rounded-2xl flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300"
                spotlightColor="rgba(245, 158, 11, 0.2)"
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400">One-Way / Round Trip</span>
                  <h3 className="text-xs sm:text-base font-black text-neutral-900 dark:text-white mt-1 flex items-center gap-1 sm:gap-1.5 flex-wrap">
                    <span>{locationName}</span>
                    <ArrowRightIcon className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{r.destination}</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">Distance: ~{r.distance}</p>
                </div>
                <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-neutral-100 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400">
                    <ShinyText text={r.startingPrice} speed={2.5} />
                  </span>
                  <MagneticButton pullFactor={0.2}>
                    <a
                      href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20inquiry%20for%20${encodeURIComponent(locationName)}%20to%20${encodeURIComponent(r.destination)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] sm:text-xs font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </a>
                  </MagneticButton>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Local FAQs */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Frequently Asked Questions ({locationName})
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-2xl">
                <div className="font-bold text-sm text-neutral-900 dark:text-white">{f.q}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
