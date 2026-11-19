import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Hyderabad Airport Cabs - 24/7 RGIA Shamshabad Taxi Service",
  description:
    "Book 24/7 Hyderabad airport cabs to & from Shamshabad RGIA. On-time pickup, spotless AC cabs, transparent flat rates, zero surge pricing. Call +91 81061 17704.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/hyderabad-airport-cabs",
  },
};

export default function HyderabadAirportCabsPage() {
  return (
    <LocationLandingTemplate
      locationName="Hyderabad RGIA Airport Cabs"
      tagline="24x7 Guaranteed On-Time Airport Transfers to Rajiv Gandhi International Airport (HYD) with Zero Surge Pricing."
      landmarks={[
        "Rajiv Gandhi International Airport (HYD) Terminal 1",
        "Airport Arrivals Gate 1-5 & Pickup Arena",
        "Shamshabad ORR Interchange",
        "GMR Aerocity & Novotel Shamshabad",
        "Hyderabad Outer Ring Road (ORR) Express Tollway",
      ]}
      description="Sri Sadhguru Tours & Travels provides 24x7 premium airport taxi transfers across all zones of Hyderabad to Rajiv Gandhi International Airport (RGIA). Every vehicle is thoroughly cleaned and sanitized, driven by an experienced professional chauffeur who monitors your flight schedule in real time. We guarantee zero cancellation anxiety and transparent flat rates."
      popularRoutes={[
        { destination: "Kukatpally & KPHB Colony", distance: "42 KM", startingPrice: "Flat ₹1,299" },
        { destination: "Hitec City, Madhapur & Gachibowli", distance: "32 KM", startingPrice: "Flat ₹1,199" },
        { destination: "Miyapur Metro & Allwyn Colony", distance: "45 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Secunderabad Railway Station", distance: "38 KM", startingPrice: "Flat ₹1,249" },
        { destination: "Medchal & Kompally Junction", distance: "68 KM", startingPrice: "Flat ₹1,899" },
      ]}
      faqs={[
        {
          q: "How early should I book an airport taxi from Kukatpally or Hitec City?",
          a: "We recommend booking at least 2 hours in advance. For early morning flights (between 3:00 AM and 7:00 AM), we schedule your chauffeur the evening prior and send driver details with live WhatsApp tracking.",
        },
        {
          q: "Are toll gate fees included in the airport fare?",
          a: "All airport transfers include clear, transparent billing. The Outer Ring Road (ORR) toll is charged as per government receipts, or included in our flat-rate package deals upon request.",
        },
      ]}
    />
  );
}
