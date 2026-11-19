import React from "react";
import Link from "next/link";
import Image from "next/image";
import SadhguruBookingForm from "@/components/SadhguruBookingForm";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
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
  kphb: {
    image: "/images/hubs/kphb-colony.jpg",
    title: "Nexus Hyderabad Mall (Outside View & Facade)",
    subtitle: "24x7 doorstep cab dispatch across KPHB Phases 1-9, Nexus Mall facade & JNTU corridor.",
  },
  airport: {
    image: "/images/hubs/shamshabad-airport.jpg",
    title: "Rajiv Gandhi International Airport (RGIA Main Entrance)",
    subtitle: "Dedicated airport taxi fleet with real-time flight tracking & zero surge fares.",
  },
  shamshabad: {
    image: "/images/hubs/shamshabad-airport.jpg",
    title: "Rajiv Gandhi International Airport (RGIA Main Entrance)",
    subtitle: "Dedicated airport taxi fleet with real-time flight tracking & zero surge fares.",
  },
  kukatpally: {
    image: "/images/hubs/kukatpally-hq.jpg",
    title: "IDL Lake (Rangadhamuni Cheruvu) - Kukatpally",
    subtitle: "Headquartered in Kukatpally with rapid 10-15 minute arrivals across Y-Junction and metro stations.",
  },
  miyapur: {
    image: "/images/hubs/miyapur-hub.jpg",
    title: "Ameenpur Lake (Biodiversity Heritage Site) - Miyapur",
    subtitle: "Express highway access via ORR Exit 4 and Mumbai Highway NH 65 corridor.",
  },
  medchal: {
    image: "/images/hubs/medchal-kompally.jpg",
    title: "Kandlakoya Oxygen Park - Medchal & Kompally",
    subtitle: "Serving North Hyderabad, ORR Exit 6, and outstation highway travel toward Kamareddy & Nizamabad.",
  },
  kompally: {
    image: "/images/hubs/medchal-kompally.jpg",
    title: "Kandlakoya Oxygen Park - Medchal & Kompally",
    subtitle: "Serving North Hyderabad, ORR Exit 6, and outstation highway travel toward Kamareddy & Nizamabad.",
  },
  hitec: {
    image: "/images/hubs/hitec-city.jpg",
    title: "Cyber Towers & Durgam Cheruvu - Hitec City",
    subtitle: "Corporate cabs, GST invoicing, and executive chauffeur service for IT corridors.",
  },
  madhapur: {
    image: "/images/hubs/hitec-city.jpg",
    title: "Cyber Towers & Durgam Cheruvu - Hitec City",
    subtitle: "Corporate cabs, GST invoicing, and executive chauffeur service for IT corridors.",
  },
  kamareddy: {
    image: "/images/hubs/kamareddy-gandhari.jpg",
    title: "Historic Domakonda Fort - Kamareddy & Gandhari",
    subtitle: "Regular direct round-trip and one-way car rentals between Hyderabad and Kamareddy/Gandhari.",
  },
  gandhari: {
    image: "/images/hubs/kamareddy-gandhari.jpg",
    title: "Historic Domakonda Fort - Kamareddy & Gandhari",
    subtitle: "Regular direct round-trip and one-way car rentals between Hyderabad and Kamareddy/Gandhari.",
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
  kukatpally: { lat: "17.4849", lng: "78.4138", postalCode: "500072", locality: "Kukatpally, Hyderabad" },
  shamshabad: { lat: "17.2403", lng: "78.4294", postalCode: "500409", locality: "Shamshabad, Hyderabad" },
  airport: { lat: "17.2403", lng: "78.4294", postalCode: "500409", locality: "Shamshabad, Hyderabad" },
  kphb: { lat: "17.4938", lng: "78.3995", postalCode: "500072", locality: "KPHB Colony, Hyderabad" },
  hitec: { lat: "17.4474", lng: "78.3762", postalCode: "500081", locality: "Hitec City, Hyderabad" },
  madhapur: { lat: "17.4474", lng: "78.3762", postalCode: "500081", locality: "Madhapur, Hyderabad" },
  miyapur: { lat: "17.4968", lng: "78.3562", postalCode: "500049", locality: "Miyapur, Hyderabad" },
  medchal: { lat: "17.6297", lng: "78.4814", postalCode: "501401", locality: "Medchal, Hyderabad" },
  kompally: { lat: "17.5353", lng: "78.4878", postalCode: "500014", locality: "Kompally, Hyderabad" },
  kamareddy: { lat: "18.3228", lng: "78.3414", postalCode: "503114", locality: "Kamareddy" },
  gandhari: { lat: "18.3228", lng: "78.3414", postalCode: "503114", locality: "Gandhari, Kamareddy" },
  srisailam: { lat: "16.0748", lng: "78.8682", postalCode: "518101", locality: "Srisailam" },
  tirupati: { lat: "13.6288", lng: "79.4192", postalCode: "517501", locality: "Tirupati" },
  shirdi: { lat: "19.7667", lng: "74.4764", postalCode: "423109", locality: "Shirdi" },
  yadagirigutta: { lat: "17.5878", lng: "78.9405", postalCode: "508115", locality: "Yadagirigutta" },
};

function resolveCoords(locationName: string, passed?: { latitude: string; longitude: string }, passedPostal?: string) {
  if (passed) {
    return { lat: passed.latitude, lng: passed.longitude, postalCode: passedPostal || "500072", locality: "Hyderabad" };
  }
  const lower = locationName.toLowerCase();
  for (const [key, val] of Object.entries(DEFAULT_COORDS)) {
    if (lower.includes(key)) {
      return val;
    }
  }
  return { lat: "17.4849", lng: "78.4138", postalCode: "500072", locality: "Hyderabad" };
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
    name: `Sri Sadhguru Tours & Travels - ${locationName}`,
    image: hubLandmark
      ? `https://srisadgurutoursandtravels.com${hubLandmark.image}`
      : "https://srisadgurutoursandtravels.com/images/sri-sadhguru-travels-banner.jpg",
    telephone: "+91-8106117704",
    priceRange: "₹₹",
    knowsLanguage: ["en", "te", "hi"],
    address: {
      "@type": "PostalAddress",
      streetAddress: locationName,
      addressLocality: resolved.locality,
      addressRegion: "Telangana",
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
    areaServed: [locationName, "Hyderabad", "Telangana", "Andhra Pradesh"],
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

  const mapQuery = encodeURIComponent(`${locationName}, Hyderabad, Telangana`);

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
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 text-white p-8 sm:p-12 rounded-[36px] shadow-2xl border-b-4 border-amber-400">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs uppercase tracking-widest mb-3">
            <MapPinIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>{customBadge ? customBadge.replace(/^[^\w\s]+/, "").trim() : `Local Taxi & Cab Hub · ${locationName}`}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            <BlurText text={customHeading || `Best Cab Services & Car Rentals in ${locationName}`} delay={0.03} animateBy="words" />
          </h1>
          <p className="text-blue-200 text-sm sm:text-base mt-2 max-w-2xl font-medium">
            {tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <BoltIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>15-Minute Rapid Pickup</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <TruckIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>5-Seater to 50-Seater Fleet</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <AirplaneIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Flat Rate Shamshabad Airport Cabs</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <MagneticButton pullFactor={0.25}>
              <a
                href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <PhoneIcon className="w-4 h-4 text-slate-950" />
                <span>Instant Call: {SADHGURU_CONTACT.primaryPhoneFormatted}</span>
              </a>
            </MagneticButton>

            <MagneticButton pullFactor={0.25}>
              <a
                href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20need%20a%20cab%20in%20${encodeURIComponent(locationName)}.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-2"
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
                <span>Prominent Landmark & Operational Hub</span>
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
          <SadhguruBookingForm />
        </div>

        {/* Local Area Context & Landmarks */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Why Choose Sri Sadhguru Travels in {locationName}?
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularRoutes.map((r) => (
              <SpotlightCard
                key={r.destination}
                className="p-5 !rounded-2xl flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300"
                spotlightColor="rgba(245, 158, 11, 0.2)"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">One-Way / Round Trip</span>
                  <h3 className="text-base font-black text-neutral-900 dark:text-white mt-1 flex items-center gap-1.5 flex-wrap">
                    <span>{locationName}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{r.destination}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Distance: ~{r.distance}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    <ShinyText text={r.startingPrice} speed={2.5} />
                  </span>
                  <MagneticButton pullFactor={0.2}>
                    <a
                      href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Inquiry%20for%20${encodeURIComponent(locationName)}%20to%20${encodeURIComponent(r.destination)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
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