import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore Airport Taxi | 24/7 Kempegowda Airport Cabs | Sky Cabs Bangalore",
  description:
    "Book Bangalore airport taxi transfers to and from Kempegowda International Airport (BLR), Devanahalli. On-time pickups, clean AC cabs and transparent flat fares. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-airport-taxi",
  },
};

export default function BangaloreAirportTaxiPage() {
  return (
    <LocationLandingTemplate
      locationName="Bangalore Airport Cabs (Kempegowda International Airport)"
      tagline="24x7 airport transfers to Kempegowda International Airport (BLR) in Devanahalli, with flight-time based scheduling and clear flat fares."
      landmarks={[
        "Kempegowda International Airport (BLR) Terminal 1",
        "Airport Arrivals & Pickup Zone",
        "Devanahalli Airport Access Road",
        "NH 44 Airport Approach",
        "Hebbal Flyover & Airport Corridor",
        "KIADB Aerospace Park, Devanahalli",
      ]}
      description="Sky Cabs Bangalore provides airport taxi transfers across Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka to Kempegowda International Airport (BLR) in Devanahalli. Our chauffeurs plan around your flight time, help with luggage and use clean, air-conditioned vehicles. Prime Sedans, Ertigas, Innovas, Tempo Travellers and passenger buses can be requested, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Begur & Electronic City", distance: "38 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Koramangala & HSR Layout", distance: "35 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Whitefield & Marathahalli", distance: "40 KM", startingPrice: "Flat ₹1,599" },
        { destination: "Indiranagar & Jayanagar", distance: "32 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Yelahanka & Hebbal", distance: "22 KM", startingPrice: "Flat ₹1,199" },
      ]}
      faqs={[
        {
          q: "How early should I book an airport taxi in Bengaluru?",
          a: "We recommend booking at least 2 hours in advance. For early morning flights between 3:00 AM and 7:00 AM, please enquire the previous evening so a chauffeur can be scheduled around your flight time, subject to availability.",
        },
        {
          q: "Are toll fees included in the airport fare?",
          a: "Airport fares are quoted clearly upfront. Devanahalli and airport-approach tolls are either billed at actual FASTag receipts or included in a flat package on request.",
        },
        {
          q: "Do you cover pickups from Whitefield and Electronic City?",
          a: "Yes. We arrange airport pickups and drops across Bengaluru, including Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka. Please confirm your vehicle in advance as fleet options are subject to availability.",
        },
      ]}
      geoCoordinates={{ latitude: "13.1986", longitude: "77.7066" }}
      postalCode="560300"
    />
  );
}
