import React from "react";
import Link from "next/link";
import SkyCabsBookingForm from "@/components/SkyCabsBookingForm";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import {
  MapPinIcon,
  ClockIcon,
  CarIcon,
  ShieldCheckIcon,
  PhoneIcon,
  WhatsAppIcon,
  BoltIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TempleIcon,
} from "@/components/icons";
import { BlurText, ShinyText, SpotlightCard, MagneticButton } from "@/components/reactbits";

export interface RoutePackage {
  title: string;
  duration: string;
  idealFor: string;
  sedanPrice: string;
  suvPrice: string;
  innovaPrice: string;
  tempoPrice?: string;
  highlights: string[];
}

export interface RouteHalt {
  name: string;
  desc: string;
  icon?: string;
}

export interface RouteLandingTemplateProps {
  routeName: string; // e.g., "Bangalore to Mysuru"
  destinationName: string; // e.g., "Mysuru Palace & Chamundi Hills"
  distance: string; // e.g., "145 KM (One Way) / 290 KM (Round Trip)"
  duration: string; // e.g., "~2.5 to 3.5 Hours via NH 275"
  badgeText: string; // e.g., "Mysuru Palace & Chamundi Hills Getaway"
  h1Title: string; // e.g., "Bangalore to Mysuru Cabs & Tour Packages"
  tagline: string;
  overview: string;
  highwayGuide: {
    recommendedRoute: string;
    bestDepartureTime: string;
    gateOrTollInfo: string;
    drivingTips: string[];
  };
  halts: RouteHalt[];
  packages: RoutePackage[];
  faqs: { q: string; a: string }[];
  mapQuery: string;
  destinationCoords: { lat: number; lng: number };
}

export default function RouteLandingTemplate({
  routeName,
  destinationName,
  distance,
  duration,
  badgeText,
  h1Title,
  tagline,
  overview,
  highwayGuide,
  halts,
  packages,
  faqs,
  mapQuery,
  destinationCoords,
}: RouteLandingTemplateProps) {
  // Schema.org TouristTrip & TaxiService JSON-LD
  const tripSchemaJson = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "TaxiService"],
    name: `${routeName} Cabs & Tour Package - Sky Cabs Bangalore`,
    description: tagline,
    provider: {
      "@type": "TravelAgency",
      name: SKY_CABS_CONTACT.brandName,
      telephone: `+91-${SKY_CABS_CONTACT.primaryPhone}`,
      url: SKY_CABS_CONTACT.website,
      image: `${SKY_CABS_CONTACT.website}images/Airport-cabs.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Begur",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "562157",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.857,
        longitude: 77.668,
      },
    },
    itinerary: halts.map((h, idx) => ({
      "@type": "TouristAttraction",
      position: idx + 1,
      name: h.name,
      description: h.desc,
    })),
    offers: packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.title,
      price: pkg.sedanPrice.replace(/[^0-9]/g, "") || "4500",
      priceCurrency: "INR",
      description: `${pkg.duration} - ${pkg.idealFor}. Toyota Innova Crysta: ${pkg.innovaPrice}. Subject to availability.`,
    })),
    areaServed: ["Bengaluru", "Karnataka", destinationName],
    knowsLanguage: ["en", "kn", "hi", "ta", "te"],
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

  const encodedMap = encodeURIComponent(mapQuery);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 py-10 px-4">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJson) }}
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Semantic Breadcrumbs */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/#packages" className="hover:underline">
            Tour Packages
          </Link>
          <span>/</span>
          <span className="text-primary-600 dark:text-primary-400 font-semibold">{routeName}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 text-white p-8 sm:p-12 rounded-[36px] shadow-2xl border-b-4 border-amber-400">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs uppercase tracking-widest mb-3">
            {badgeText.toLowerCase().includes("temple") ||
            badgeText.toLowerCase().includes("darshan") ||
            badgeText.toLowerCase().includes("jyotirlinga") ||
            badgeText.toLowerCase().includes("yatra") ||
            badgeText.toLowerCase().includes("balaji") ? (
              <TempleIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <CarIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            )}
            <span>
              {badgeText.replace(
                /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}★➔✓💬\s]+/u,
                ""
              ).trim()}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            <BlurText text={h1Title} delay={0.03} animateBy="words" />
          </h1>
          <p className="text-blue-200 text-sm sm:text-base mt-2 max-w-2xl font-medium">
            {tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-rose-400" />
              <span>Distance: {distance}</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Driving Time: {duration}</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <CarIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Fleet: Prime Sedan, Ertiga, Innova & Tempo Traveller (On Request)</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-1.5">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Experienced Highway Chauffeurs</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <MagneticButton pullFactor={0.25}>
              <a
                href={`tel:${SKY_CABS_CONTACT.primaryPhone}`}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <PhoneIcon className="w-4 h-4 text-slate-950" />
                <span>Instant Call: {SKY_CABS_CONTACT.primaryPhoneFormatted}</span>
              </a>
            </MagneticButton>

            <MagneticButton pullFactor={0.25}>
              <a
                href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20am%20interested%20in%20the%20${encodeURIComponent(routeName)}%20package.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Reservation</span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Quick Booking Form */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <BoltIcon className="w-6 h-6 text-amber-500" />
            <span>Quick Reservation for {routeName}</span>
          </h2>
          <SkyCabsBookingForm />
        </div>

        {/* Highway Guide & Route Advice */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
            Route Guide & Highway Travel Information: {routeName}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-700/40 rounded-2xl border border-neutral-200/60 dark:border-neutral-600">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                RECOMMENDED CORRIDOR
              </span>
              <span className="text-sm font-bold text-neutral-900 dark:text-white mt-1 block">
                {highwayGuide.recommendedRoute}
              </span>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-700/40 rounded-2xl border border-neutral-200/60 dark:border-neutral-600">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                OPTIMAL START TIME
              </span>
              <span className="text-sm font-bold text-neutral-900 dark:text-white mt-1 block">
                {highwayGuide.bestDepartureTime}
              </span>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-700/40 rounded-2xl border border-neutral-200/60 dark:border-neutral-600">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                CHECKPOST / TOLL INFO
              </span>
              <span className="text-sm font-bold text-neutral-900 dark:text-white mt-1 block">
                {highwayGuide.gateOrTollInfo}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
              Chauffeur Safety & Highway Driving Notes:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {highwayGuide.drivingTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Package & Fare Cards with SpotlightCard */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
            Available Tour Packages & Fixed Fare Options
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            All vehicles are subject to availability. Please confirm availability before booking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <SpotlightCard
                key={i}
                className="p-6 !rounded-3xl flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300"
                spotlightColor="rgba(245, 158, 11, 0.2)"
              >
                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">
                    {pkg.duration}
                  </div>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Ideal For: {pkg.idealFor}
                  </p>

                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-700/40 rounded-2xl space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Prime Sedan (4+1):</span>
                      <span className="font-bold text-neutral-900 dark:text-white">{pkg.sedanPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Maruti Suzuki Ertiga (6+1):</span>
                      <span className="font-bold text-neutral-900 dark:text-white">{pkg.suvPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Toyota Innova Crysta (7+1):</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        <ShinyText text={pkg.innovaPrice} speed={3} />
                      </span>
                    </div>
                    {pkg.tempoPrice && (
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Tempo Traveller (12+1):</span>
                        <span className="font-bold text-neutral-900 dark:text-white">{pkg.tempoPrice}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 pt-2">
                    {pkg.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-1.5">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                  <MagneticButton pullFactor={0.2} className="w-full">
                    <a
                      href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20(${encodeURIComponent(routeName)}).`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <span>Reserve Package</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </a>
                  </MagneticButton>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Key Sightseeing Halts */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
            Key Halts & Sightseeing Stops along the Route
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Our chauffeurs plan comfortable stops, look after luggage during halts, and suggest clean restaurants along the way.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {halts.map((halt, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-2xl border border-neutral-200/60 dark:border-neutral-600/60"
              >
                <div className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{halt.name}</span>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  {halt.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Interactive Route Destination Map */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
            Destination & Route Map: {destinationName}
          </h2>
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <iframe
              title={`Map of ${destinationName}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodedMap}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>

        {/* Route FAQs */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Frequently Asked Questions ({routeName})
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-2xl">
                <div className="font-bold text-sm text-neutral-900 dark:text-white">{f.q}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
