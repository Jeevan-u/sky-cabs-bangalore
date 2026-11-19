import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Shamshabad Airport Taxi Hyderabad - 24x7 RGI Airport Cabs",
  description:
    "Guaranteed on-time Shamshabad RGI Airport taxi service. 24x7 Airport pickup & drop to Kukatpally, KPHB, Miyapur, Hitec City, Medchal. Flat fares. Call 8106 117704.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/shamshabad-airport-taxi",
  },
};

export default function ShamshabadAirportPage() {
  return (
    <LocationLandingTemplate
      locationName="Shamshabad (RGI Airport Express)"
      tagline="24x7 Guaranteed On-Time Airport Transfers to Rajiv Gandhi International Airport (HYD) with Zero Surge Pricing."
      landmarks={[
        "Rajiv Gandhi International Airport (HYD) Main Entrance",
        "Airport Arrivals Gate 1-5",
        "Aero Plaza & Departures Ramp",
        "Shamshabad Bus Stand & Toll Plaza",
        "ORR Airport Interchange",
        "GMR Aerocity & Novotel Shamshabad",
      ]}
      description="Missing a flight is never an option! Sri Sadhguru Travels operates a dedicated airport taxi fleet running round the clock between Shamshabad RGI Airport and West/North Hyderabad. We monitor flight schedules, offer complimentary 30-minute waiting on delayed arrivals, and guarantee transparent flat rates with zero surge surprises."
      popularRoutes={[
        { destination: "Kukatpally & KPHB Hub", distance: "42 KM", startingPrice: "Flat ₹1,299" },
        { destination: "Hitec City & Madhapur", distance: "32 KM", startingPrice: "Flat ₹1,199" },
        { destination: "Miyapur & Nizampet", distance: "45 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Medchal Junction", distance: "68 KM", startingPrice: "Flat ₹1,899" },
        { destination: "Gandhari & Kamareddy", distance: "165 KM", startingPrice: "From ₹12/KM" },
      ]}
      faqs={[
        {
          q: "What happens if my flight arrives late at Shamshabad Airport?",
          a: "Our dispatch team monitors flight tracker data. If your flight is delayed, our driver adjusts their arrival time with zero penalty or waiting surcharges for the first 45 minutes.",
        },
        {
          q: "Are the airport rates fixed or do they surge during peak hours/rain?",
          a: "Unlike app-based aggregators, Sri Sadhguru Travels guarantees 100% fixed quotations with no surge pricing, rain multipliers, or unexpected cancellation fees.",
        },
      ]}
    />
  );
}
