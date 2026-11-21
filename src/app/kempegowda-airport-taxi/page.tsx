import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Kempegowda Airport Taxi Bangalore | BLR Airport Cab Service | Sky Cabs Bangalore",
  description:
    "Round-the-clock pickup and drop at Kempegowda International Airport (BLR), Devanahalli. Flight monitoring, clean AC cabs and transparent fares across Bengaluru. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/kempegowda-airport-taxi",
  },
};

export default function KempegowdaAirportTaxiPage() {
  return (
    <LocationLandingTemplate
      locationName="Kempegowda International Airport (BLR) – Devanahalli"
      tagline="Around-the-clock pickups and drops at Kempegowda International Airport (BLR), planned around your flight schedule with clear, fixed quotations."
      landmarks={[
        "Kempegowda International Airport (BLR) Terminal 1 Arrivals",
        "Terminal 2 Departures & Pickup Ramp",
        "Devanahalli Toll Plaza",
        "Airport Approach Road via NH 44",
        "Hebbal & Yelahanka Airport Route",
        "KIADB Aerospace Park, Devanahalli",
      ]}
      description="Sky Cabs Bangalore operates a dedicated airport taxi service between Kempegowda International Airport (BLR) at Devanahalli and every major Bengaluru neighbourhood. We track flight timings, allow reasonable waiting for delayed arrivals and quote fares clearly before the trip. Choose from a Prime Sedan, Maruti Suzuki Ertiga, Toyota Innova, Toyota Innova Crysta, Toyota Innova Hycross, Toyota Fortuner, Tempo Traveller, Force Urbania or passenger bus, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Koramangala & HSR Layout", distance: "35 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Whitefield & ITPL", distance: "40 KM", startingPrice: "Flat ₹1,599" },
        { destination: "Electronic City & Begur", distance: "42 KM", startingPrice: "Flat ₹1,499" },
        { destination: "Indiranagar & MG Road", distance: "33 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Jayanagar & Banashankari", distance: "38 KM", startingPrice: "Flat ₹1,499" },
      ]}
      faqs={[
        {
          q: "What happens if my flight arrives late at Kempegowda Airport?",
          a: "Share your flight number when you enquire. Our dispatch team plans the pickup around the updated arrival time and allows reasonable waiting for delayed flights. Any additional waiting is explained before the trip.",
        },
        {
          q: "Are airport rates fixed or do they surge during peak hours?",
          a: "Sky Cabs Bangalore quotes transparent flat fares and per-kilometre rates with no surprise surge multipliers. Toll charges and any waiting time are explained upfront.",
        },
        {
          q: "Which vehicles can I request for an airport transfer?",
          a: "You can enquire about Prime Sedans (4+1), Maruti Suzuki Ertigas (6+1), Toyota Innova and Innova Crysta (7+1), Tempo Travellers (12+1), Force Urbania and passenger buses. All vehicles are subject to availability, so please confirm before booking.",
        },
      ]}
      geoCoordinates={{ latitude: "13.1986", longitude: "77.7066" }}
      postalCode="560300"
    />
  );
}
