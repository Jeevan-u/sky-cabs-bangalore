import React from "react";
import {
  BENGALURU_HUBS,
  SKY_CABS_CONTACT,
  SKY_CABS_FLEET,
} from "@/data/skyCabsFleet";

const SITE_URL = "https://skycabsbangalore.com/";
const ORG_ID = `${SITE_URL}#organization`;

/** Passenger seats only (the "+1" in the fleet data is the chauffeur). */
function passengerSeats(capacity: string): number {
  if (capacity.startsWith("25, 33")) return 52; // largest passenger bus configuration
  const match = capacity.match(/^(\d+)\+/);
  return match ? Number(match[1]) : 0;
}

const assetUrl = (path: string) => `${SITE_URL}${path.replace(/^\//, "")}`;

const hubNames = Array.from(
  new Set([
    ...BENGALURU_HUBS,
    ...SKY_CABS_CONTACT.locations.map((location) => location.replace(/,.*$/, "")),
  ])
);

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "AutoRental", "TravelAgency"],
    "@id": ORG_ID,
    name: SKY_CABS_CONTACT.brandName,
    legalName: SKY_CABS_CONTACT.fullName,
    alternateName: ["Sky Cabs Bengaluru", "Sky Cabs Bangalore Airport Taxi"],
    url: SITE_URL,
    logo: assetUrl("/images/logo.png"),
    image: [
      assetUrl("/images/Airport-cabs.jpg"),
      ...Array.from(new Set(SKY_CABS_FLEET.map((vehicle) => assetUrl(vehicle.image)))),
    ],
    telephone: SKY_CABS_CONTACT.primaryPhoneFormatted,
    email: SKY_CABS_CONTACT.email,
    priceRange: "₹₹ (from ₹13/km, airport transfers from ₹1,399)",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Credit Card, Net Banking",
    knowsLanguage: ["en", "kn", "hi"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "#56, Begur",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "562157",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.84,
      longitude: 77.72,
    },
    openingHoursSpecification: [
      {
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
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Bengaluru",
        geo: { "@type": "GeoCoordinates", latitude: 12.9716, longitude: 77.5946 },
      },
      { "@type": "State", name: "Karnataka" },
      ...hubNames.map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cab, Airport & Outstation Services in Bengaluru",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Kempegowda International Airport (BLR) Taxi Transfer",
          description:
            "Airport pickup and drop cabs across Bengaluru. Indicative fares are subject to availability; confirm availability before booking.",
          price: String(SKY_CABS_FLEET[0].airportFlatRate),
          priceCurrency: "INR",
          url: `${SITE_URL}bangalore-airport-taxi`,
          itemOffered: { "@type": "Service", name: "Airport Taxi Transfer" },
        },
        {
          "@type": "Offer",
          name: "Bengaluru Outstation Cab",
          description:
            "One-way and round-trip outstation cabs from Bengaluru to Mysuru, Tirupati, Coorg, Ooty, Chennai and Mangaluru. Subject to availability.",
          price: String(SKY_CABS_FLEET[2].perKmRate),
          priceCurrency: "INR",
          url: `${SITE_URL}bangalore-outstation-cabs`,
          itemOffered: { "@type": "Service", name: "Outstation Cab Service" },
        },
        {
          "@type": "Offer",
          name: "Group & Event Transport",
          description:
            "Tempo Traveller, Force Urbania and passenger buses for weddings, corporate events and group travel in Bengaluru. Subject to availability.",
          price: String(SKY_CABS_FLEET[6].perKmRate),
          priceCurrency: "INR",
          url: `${SITE_URL}listing-car`,
          itemOffered: { "@type": "Service", name: "Group Travel" },
        },
      ],
    },
  };

  const fleetProductsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sky Cabs Bangalore Fleet",
    description:
      "All vehicles and fares are subject to availability. Confirm availability before booking.",
    numberOfItems: SKY_CABS_FLEET.length,
    itemListElement: SKY_CABS_FLEET.map((vehicle, index) => ({
      "@type": ["Product", "Vehicle"],
      position: index + 1,
      name: vehicle.name,
      image: assetUrl(vehicle.image),
      description: `${vehicle.description} Airport transfers from ₹${vehicle.airportFlatRate}; local 8h/80km from ₹${vehicle.local8hr80km}. Subject to availability; confirm availability before booking.`,
      vehicleConfiguration: vehicle.capacity,
      seatingCapacity: passengerSeats(vehicle.capacity),
      bodyType: vehicle.category,
      offers: {
        "@type": "Offer",
        price: String(vehicle.perKmRate),
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(vehicle.perKmRate),
          priceCurrency: "INR",
          unitText: "per km",
        },
        seller: { "@id": ORG_ID },
        url: `${SITE_URL}listing-car`,
      },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Fleet",
        item: `${SITE_URL}listing-car`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Airport Taxi",
        item: `${SITE_URL}bangalore-airport-taxi`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Outstation Cabs",
        item: `${SITE_URL}bangalore-outstation-cabs`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: `${SITE_URL}contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetProductsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
    </>
  );
}
