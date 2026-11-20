import React from "react";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "AutoRental", "TravelAgency"],
    "@id": "https://www.srisadhgurutoursandtravels.com/#organization",
    name: "Sri Sadhguru Tours & Travels",
    legalName: "Sri Sadhguru Tours and Travels",
    alternateName: [
      "Sri Sadhguru Travels",
      "Sadhguru Cabs Kukatpally",
      "Sri Sadhguru Travels Hyderabad",
      "Rathan Kanna Travels",
    ],
    url: "https://www.srisadhgurutoursandtravels.com",
    logo: "https://www.srisadhgurutoursandtravels.com/images/logo.png",
    image: [
      "https://www.srisadhgurutoursandtravels.com/images/sri-sadhguru-travels-banner.jpg",
      "https://www.srisadhgurutoursandtravels.com/images/fleet/innova-crysta.jpg",
      "https://www.srisadhgurutoursandtravels.com/images/fleet/swift-dzire.jpg",
      "https://www.srisadhgurutoursandtravels.com/images/fleet/tempo-traveller-17.jpg",
      "https://www.srisadhgurutoursandtravels.com/images/fleet/force-urbania.png",
      "https://www.srisadhgurutoursandtravels.com/images/fleet/luxury-coach-bus.jpg",
    ],
    telephone: `+91-${SADHGURU_CONTACT.primaryPhone}`,
    priceRange: "₹₹ (₹12/km - ₹48/km, Flat Airport ₹1,299)",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Credit Card, Net Banking",
    knowsLanguage: ["en", "te", "hi"],
    founder: {
      "@type": "Person",
      name: "Sri Rathan Kanna",
      jobTitle: "Proprietor & Managing Director",
      telephone: "+91-8106117704",
      url: "https://www.srisadhgurutoursandtravels.com/author",
      knowsLanguage: ["en", "te", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kukatpally Main Road, Near Y-Junction & KPHB Metro",
      addressLocality: "Kukatpally, Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500072",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4849,
      longitude: 78.4138,
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
      { "@type": "City", name: "Hyderabad", geo: { "@type": "GeoCoordinates", latitude: 17.385, longitude: 78.4867 } },
      { "@type": "AdministrativeArea", name: "Kukatpally", geo: { "@type": "GeoCoordinates", latitude: 17.4849, longitude: 78.4138 } },
      { "@type": "AdministrativeArea", name: "KPHB Colony", geo: { "@type": "GeoCoordinates", latitude: 17.4938, longitude: 78.3995 } },
      { "@type": "AdministrativeArea", name: "Miyapur", geo: { "@type": "GeoCoordinates", latitude: 17.4968, longitude: 78.3562 } },
      { "@type": "AdministrativeArea", name: "Hitec City", geo: { "@type": "GeoCoordinates", latitude: 17.4474, longitude: 78.3762 } },
      { "@type": "AdministrativeArea", name: "Shamshabad Airport (RGIA)", geo: { "@type": "GeoCoordinates", latitude: 17.2403, longitude: 78.4294 } },
      { "@type": "AdministrativeArea", name: "Medchal", geo: { "@type": "GeoCoordinates", latitude: 17.6297, longitude: 78.4814 } },
      { "@type": "AdministrativeArea", name: "Gandhari, Kamareddy", geo: { "@type": "GeoCoordinates", latitude: 18.3228, longitude: 78.3414 } },
      { "@type": "State", name: "Telangana" },
      { "@type": "State", name: "Andhra Pradesh" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "428",
      reviewCount: "428",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Vehicle Rental & Tour Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Shamshabad RGIA Airport Taxi Transfer",
            description: "Fixed flat-rate airport pickup and drop cabs across Hyderabad with zero surge pricing.",
          },
          price: "1299",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Toyota Innova Crysta Outstation Rental",
            description: "7+1 Luxury AC MPV with experienced highway chauffeur for Srisailam, Tirupati & Shirdi.",
          },
          price: "19",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Force Tempo Traveller Rental (12 to 26 Seaters)",
            description: "Spacious pushback AC tempo traveller for family pilgrimages, weddings and corporate events.",
          },
          price: "25",
          priceCurrency: "INR",
        },
      ],
    },
  };

  const fleetProductsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sri Sadhguru Tours & Travels Commercial Fleet Models",
    itemListElement: [
      {
        "@type": ["Product", "Vehicle"],
        position: 1,
        name: "Maruti Swift Dzire / Toyota Etios AC Sedan",
        image: "https://www.srisadhgurutoursandtravels.com/images/images1.jpg",
        description: "5-Seater AC Sedan for Shamshabad airport drop cabs, city commutes, and outstation trips.",
        vehicleConfiguration: "5-Seater Commercial AC Sedan",
        seatingCapacity: 5,
        bodyType: "Sedan",
        fuelType: "Diesel / CNG / Petrol",
        brand: { "@type": "Brand", name: "Maruti Suzuki" },
        offers: {
          "@type": "Offer",
          price: "1299",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://www.srisadhgurutoursandtravels.com/#organization" },
        },
      },
      {
        "@type": ["Product", "Vehicle"],
        position: 2,
        name: "Maruti Ertiga / Toyota Rumion AC 7-Seater",
        image: "https://www.srisadhgurutoursandtravels.com/images/images2.jpg",
        description: "6+1 family MPV with roof AC vents and large boot for airport group trips and temple darshan.",
        vehicleConfiguration: "7-Seater Family MPV with Roof AC",
        seatingCapacity: 7,
        bodyType: "MPV",
        fuelType: "Diesel / CNG / Petrol",
        brand: { "@type": "Brand", name: "Maruti Suzuki" },
        offers: {
          "@type": "Offer",
          price: "1699",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://www.srisadhgurutoursandtravels.com/#organization" },
        },
      },
      {
        "@type": ["Product", "Vehicle"],
        position: 3,
        name: "Toyota Innova Crysta Luxury 7-Seater",
        image: "https://www.srisadhgurutoursandtravels.com/images/images3.jpg",
        description: "VIP captain seat AC vehicle for Srisailam, Tirupati, Shirdi highway trips and corporate escorts.",
        vehicleConfiguration: "7+1 Luxury Captain Seat MPV",
        seatingCapacity: 8,
        bodyType: "SUV / MPV",
        fuelType: "Diesel",
        brand: { "@type": "Brand", name: "Toyota" },
        offers: {
          "@type": "Offer",
          price: "2199",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://www.srisadhgurutoursandtravels.com/#organization" },
        },
      },
      {
        "@type": ["Product", "Vehicle"],
        position: 4,
        name: "Force Tempo Traveller 12 to 17 Seater",
        image: "https://www.srisadhgurutoursandtravels.com/images/images4.jpg",
        description: "Pushback AC luxury mini bus for family temple yatras, weddings, and group excursions.",
        vehicleConfiguration: "12 to 17 Seater Pushback AC Mini Bus",
        seatingCapacity: 17,
        bodyType: "Minibus",
        fuelType: "Diesel",
        brand: { "@type": "Brand", name: "Force Motors" },
        offers: {
          "@type": "Offer",
          price: "4999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://www.srisadhgurutoursandtravels.com/#organization" },
        },
      },
      {
        "@type": ["Product", "Vehicle"],
        position: 5,
        name: "Force Urbania 26-Seater Luxury Coach",
        image: "https://www.srisadhgurutoursandtravels.com/images/Airport-cabs.jpg",
        description: "European styling, air suspension, ultra-silent luxury passenger van for weddings and corporate delegates.",
        vehicleConfiguration: "26-Seater Luxury Passenger Van",
        seatingCapacity: 26,
        bodyType: "Passenger Van",
        fuelType: "Diesel",
        brand: { "@type": "Brand", name: "Force Motors" },
        offers: {
          "@type": "Offer",
          price: "6999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://www.srisadhgurutoursandtravels.com/#organization" },
        },
      },
      {
        "@type": ["Product", "Vehicle"],
        position: 6,
        name: "32 to 50 Seater AC Luxury Tourist Coach Bus",
        image: "https://www.srisadhgurutoursandtravels.com/images/sri-sadhguru-travels-banner.jpg",
        description: "Full-scale air suspension AC coach bus for grand marriages, school/college excursions, and mega pilgrimages.",
        vehicleConfiguration: "32 to 50 Seater Air Suspension AC Tourist Coach Bus",
        seatingCapacity: 50,
        bodyType: "Bus",
        fuelType: "Diesel",
        brand: { "@type": "Brand", name: "BharatBenz / Ashok Leyland" },
        offers: {
          "@type": "Offer",
          price: "10999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://www.srisadhgurutoursandtravels.com/#organization" },
        },
      },
    ],
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.srisadhgurutoursandtravels.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Commercial Fleet",
        item: "https://www.srisadhgurutoursandtravels.com/listing-car",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Airport Taxi",
        item: "https://www.srisadhgurutoursandtravels.com/shamshabad-airport-taxi",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Track Trip",
        item: "https://www.srisadhgurutoursandtravels.com/track-booking",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact & Dispatch",
        item: "https://www.srisadhgurutoursandtravels.com/contact",
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
