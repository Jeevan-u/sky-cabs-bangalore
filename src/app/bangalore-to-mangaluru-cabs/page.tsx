import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore to Mangaluru Cabs - Coastal & Temple Tours | Sky Cabs Bangalore",
  description:
    "Book Bangalore to Mangaluru cabs with Sky Cabs Bangalore. Coastal Karnataka trips via NH 275 and NH 66 with Ertiga, Innova, Urbania or Tempo Traveller. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-to-mangaluru-cabs",
  },
};

export default function BangaloreToMangaluruPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore to Mangaluru"
      destinationName="Mangaluru – Coastal Gateway & Kadri Manjunath Temple"
      distance="330 KM (One-Way) · 660 KM (Round Trip)"
      duration="7 to 8 Hours via NH 275 & NH 66"
      badgeText="Mangaluru Coast & Temple Circuit Special"
      h1Title="Bangalore to Mangaluru Cabs & Tour Packages"
      tagline="Coastal road trips from Bengaluru to Mangaluru with experienced highway chauffeurs, clean vehicles and clear per-kilometre billing. Vehicles subject to availability."
      overview="Sky Cabs Bangalore operates Mangaluru outstation cabs via NH 275, Hassan and the Western Ghats section of NH 66. The route includes long ghat stretches and coastal plains, so steady driving and planned breaks matter. We can arrange a Prime Sedan, Maruti Suzuki Ertiga, Toyota Innova, Innova Crysta, Tempo Traveller or Force Urbania, subject to availability. Confirm availability before booking."
      highwayGuide={{
        recommendedRoute: "Bengaluru → NH 275 → Hassan → NH 66 Western Ghats → Mangaluru",
        bestDepartureTime: "5:00 AM – 6:30 AM for a daylight drive over the ghat sections",
        gateOrTollInfo: "Tolls are charged at actual FASTag receipts; Karnataka state tax and driver allowance are stated in the quote",
        drivingTips: [
          "The NH 66 ghat stretch needs patient driving; our chauffeurs plan daylight crossings.",
          "Hassan and Belthangady are sensible stops for meals, fuel and rest.",
          "Monsoon showers can slow the descent, so we add buffer time to the itinerary.",
          "Coastal city traffic can be slow in the evening; hotel drop timings are planned accordingly.",
        ],
      }}
      halts={[
        {
          name: "Hassan Highway Halts",
          desc: "Reliable breakfast and fuel stop on the NH 275 stretch out of Bengaluru.",
        },
        {
          name: "Dharmasthala Temple",
          desc: "Prominent Jain-Hindu temple complex near Belthangady, often combined with a coastal trip.",
        },
        {
          name: "Kadri Manjunath Temple",
          desc: "Ancient temple set among hills on the outskirts of Mangaluru.",
        },
        {
          name: "Mangaladevi Temple",
          desc: "Historic temple after which the city is named, in the old port area.",
        },
        {
          name: "St. Aloysius Chapel",
          desc: "Noted for its interior frescoes and peaceful central location.",
        },
        {
          name: "Panambur Beach",
          desc: "Popular coastline stretch for an evening walk after arriving in Mangaluru.",
        },
      ]}
      packages={[
        {
          title: "Mangaluru One-Way Drop",
          duration: "Single Day Transit",
          idealFor: "Direct transfers to the coast, airport or a family address",
          sedanPrice: "₹6,499 Flat",
          suvPrice: "₹7,999 Flat",
          innovaPrice: "₹9,999 Flat",
          tempoPrice: "₹15,500 Flat",
          highlights: [
            "Doorstep pickup anywhere in Bengaluru",
            "Direct drop at your Mangaluru hotel or residence",
            "Clear flat fare with tolls explained upfront",
          ],
        },
        {
          title: "Mangaluru 3-Day Coastal Tour",
          duration: "3 Days / 2 Nights",
          idealFor: "Families visiting temples and the coastline",
          sedanPrice: "₹9,499 Base",
          suvPrice: "₹11,999 Base",
          innovaPrice: "₹14,999 Base",
          tempoPrice: "₹21,500 Base",
          highlights: [
            "Day 1: Bengaluru pickup and drive to Mangaluru",
            "Day 2: Kadri Manjunath, Mangaladevi and Panambur Beach",
            "Day 3: Breakfast and return via the ghat route",
            "Driver allowance shown clearly in the quotation",
          ],
        },
        {
          title: "Mangaluru + Dharmasthala + Udupi 4-Day Circuit",
          duration: "4 Days / 3 Nights",
          idealFor: "Pilgrimage and coastal sightseeing in one trip",
          sedanPrice: "From ₹13/KM",
          suvPrice: "From ₹16/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹26/KM",
          highlights: [
            "Covers Mangaluru, Dharmasthala and Udupi",
            "Vehicle dedicated for four days, subject to availability",
            "Transparent per-kilometre billing with a daily minimum",
            "Chauffeur familiar with ghat and coastal roads",
          ],
        },
      ]}
      faqs={[
        {
          q: "How long is the drive from Bengaluru to Mangaluru?",
          a: "The route is roughly 330 KM and usually takes 7 to 8 hours via NH 275, Hassan and NH 66. Ghat weather and coastal traffic can affect the total time.",
        },
        {
          q: "Can we book a Force Urbania or passenger bus for a group trip?",
          a: "Yes, groups can enquire about Force Urbania in 9+1, 12+1 and 16+1 configurations or passenger buses in 25 to 52-seater options. All vehicles are subject to availability, so confirm before booking.",
        },
        {
          q: "Do you arrange pickups in Begur, Jayanagar and Whitefield?",
          a: "Yes. We cover Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar, Yelahanka and other Bengaluru areas for Mangaluru trips.",
        },
        {
          q: "Are tolls and driver allowance included?",
          a: "Quotations clearly itemise FASTag tolls, state tax and driver allowance. You may choose actuals or a bundled flat package where applicable.",
        },
      ]}
      mapQuery="Mangaluru Karnataka"
      destinationCoords={{ lat: 12.9141, lng: 74.8560 }}
    />
  );
}
