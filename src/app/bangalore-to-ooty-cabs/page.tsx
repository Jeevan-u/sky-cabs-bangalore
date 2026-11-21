import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore to Ooty Cabs - Nilgiri Hills Tour Packages | Sky Cabs Bangalore",
  description:
    "Book Bangalore to Ooty cabs with Sky Cabs Bangalore. Hill-station trips via Mysuru and Gundlupet in Ertiga, Innova or Tempo Traveller. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-to-ooty-cabs",
  },
};

export default function BangaloreToOotyPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore to Ooty"
      destinationName="Ooty (Udhagamandalam) – Nilgiri Hills"
      distance="265 KM (One-Way) · 530 KM (Round Trip)"
      duration="6 to 7 Hours via Mysuru & Gundlupet"
      badgeText="Nilgiri Hills & Ooty Hill Station Special"
      h1Title="Bangalore to Ooty Cabs & Tour Packages"
      tagline="Comfortable hill-station transfers with chauffeurs familiar with the Nilgiri ghat roads, clean vehicles and clear round-trip fares. Vehicles subject to availability."
      overview="Sky Cabs Bangalore operates Ooty trips from Bengaluru via NH 275 through Mysuru and Gundlupet, followed by the Nilgiri ghat roads. These winding sections need patient, experienced driving and a well-maintained vehicle. We can arrange a Prime Sedan, Maruti Suzuki Ertiga, Toyota Innova, Innova Crysta or Tempo Traveller for your family, subject to availability. Confirm availability before booking."
      highwayGuide={{
        recommendedRoute: "Bengaluru → NH 275 → Mysuru → Gundlupet → NH 181 Nilgiri Ghats → Ooty",
        bestDepartureTime: "5:00 AM – 6:30 AM for a daylight crossing of the ghat section",
        gateOrTollInfo: "Mysuru highway tolls are charged via FASTag at actuals; ghat sections may have regulated timings for commercial vehicles",
        drivingTips: [
          "Our chauffeurs are briefed on the Nilgiri ghat stretches and drive them at a steady pace.",
          "Mysuru and Gundlupet are useful stops for meals, fuel and a break before the climb.",
          "Ooty town gets congested in season, so we plan hotel drop-offs with limited access in mind.",
          "In monsoon conditions we add extra time to the itinerary rather than rushing the ghats.",
        ],
      }}
      halts={[
        {
          name: "Ooty Botanical Gardens",
          desc: "Long-established hill gardens with exotic trees, a glasshouse and shaded walking paths.",
        },
        {
          name: "Ooty Lake",
          desc: "Pleasure lake at the centre of town, popular for boating and evening walks.",
        },
        {
          name: "Doddabetta Peak",
          desc: "The highest point in the Nilgiris, offering wide views over the hills.",
        },
        {
          name: "Government Rose Garden",
          desc: "Terraced rose garden on the outskirts of Ooty, best in the cooler months.",
        },
        {
          name: "Tea Gardens & Tea Museum",
          desc: "Working tea estates where you can see processing and sample local Nilgiri tea.",
        },
        {
          name: "Coonoor & Ketti Valley View",
          desc: "Scenic halt on the ghat descent with sweeping views across the Nilgiri valleys.",
        },
      ]}
      packages={[
        {
          title: "Ooty 3-Day Hill Getaway",
          duration: "3 Days / 2 Nights",
          idealFor: "Families wanting the classic Ooty sightseeing circuit",
          sedanPrice: "₹8,499 Base",
          suvPrice: "₹10,500 Base",
          innovaPrice: "₹12,999 Base",
          tempoPrice: "₹18,500 Base",
          highlights: [
            "Day 1: Bengaluru pickup and drive to Ooty",
            "Day 2: Botanical Gardens, Ooty Lake, Doddabetta and tea gardens",
            "Day 3: Breakfast and return via the ghat route",
            "Driver allowance outlined clearly in the quote",
          ],
        },
        {
          title: "Ooty + Coonoor 4-Day Tour",
          duration: "4 Days / 3 Nights",
          idealFor: "Travellers who want a slower hill holiday with Coonoor",
          sedanPrice: "From ₹13/KM",
          suvPrice: "From ₹16/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹26/KM",
          highlights: [
            "Covers Ooty, Coonoor, Ketti Valley and the tea estates",
            "Vehicle dedicated for four days, subject to availability",
            "Transparent per-kilometre billing with a daily minimum",
            "Flexible sightseeing timings in the hill station",
          ],
        },
        {
          title: "Ooty One-Way Drop",
          duration: "Single Day Transit",
          idealFor: "Direct transfer to Ooty without a return journey",
          sedanPrice: "₹5,999 Flat",
          suvPrice: "₹7,499 Flat",
          innovaPrice: "₹8,999 Flat",
          tempoPrice: "₹14,500 Flat",
          highlights: [
            "Doorstep pickup anywhere in Bengaluru",
            "Direct drop at your Ooty hotel, subject to local access rules",
            "Clear flat fare with tolls and driver allowance explained",
          ],
        },
      ]}
      faqs={[
        {
          q: "How long does the Bengaluru to Ooty drive take?",
          a: "The trip is about 265 KM and usually takes 6 to 7 hours via NH 275, Mysuru and Gundlupet, followed by the Nilgiri ghat roads. Weather and ghat traffic can add time.",
        },
        {
          q: "Are your chauffeurs experienced with hill driving?",
          a: "Yes. Drivers assigned to Ooty are briefed on the ghat sections, speed limits and safe overtaking. We still recommend daylight travel on the hill stretches.",
        },
        {
          q: "What vehicles can we book for Ooty?",
          a: "Options include a Prime Sedan (4+1), Maruti Suzuki Ertiga (6+1), Toyota Innova and Innova Crysta (7+1), and a 12+1 Tempo Traveller. Availability varies, so please confirm before booking.",
        },
        {
          q: "Do you offer pickup from Electronic City, Indiranagar and Jayanagar?",
          a: "Yes. We arrange Ooty pickups across Bengaluru including Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka.",
        },
      ]}
      mapQuery="Ooty Udhagamandalam Tamil Nadu"
      destinationCoords={{ lat: 11.4102, lng: 76.6950 }}
    />
  );
}
