import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore to Coorg Cabs - Madikeri Coffee Country Tours | Sky Cabs Bangalore",
  description:
    "Book Bangalore to Coorg cabs with Sky Cabs Bangalore. Weekend trips to Madikeri, Abbey Falls and Kushalnagar in Ertiga, Innova or Tempo Traveller. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-to-coorg-cabs",
  },
};

export default function BangaloreToCoorgPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore to Coorg"
      destinationName="Coorg (Madikeri) – Coffee Plantations & Hill Town"
      distance="250 KM (One-Way) · 500 KM (Round Trip)"
      duration="5.5 to 6.5 Hours via NH 275 & Hassan"
      badgeText="Coorg Coffee Country & Madikeri Weekend Special"
      h1Title="Bangalore to Coorg Cabs & Tour Packages"
      tagline="Relaxed two and three-night Coorg getaways with comfortable air-conditioned vehicles and chauffeurs used to hill roads. Vehicles subject to availability."
      overview="Sky Cabs Bangalore plans Coorg trips from Bengaluru to Madikeri, around 250 KM via NH 275, Srirangapatna, Hassan and Kushalnagar. The last stretch climbs into the Western Ghats, where steady driving and familiar hill roads matter. We arrange Prime Sedans, Maruti Suzuki Ertigas, Toyota Innova and Innova Crysta, plus Tempo Travellers for larger families, subject to availability. Confirm availability before booking."
      highwayGuide={{
        recommendedRoute: "Bengaluru → NH 275 → Srirangapatna → Hassan → Kushalnagar → Madikeri",
        bestDepartureTime: "5:30 AM – 7:00 AM to cross Hassan before lunch and reach Madikeri in daylight",
        gateOrTollInfo: "NH 275 FASTag tolls are billed at actual receipts; there is no separate taxi permit to enter Madikeri",
        drivingTips: [
          "Hill roads near Madikeri are best driven in daylight by an experienced chauffeur.",
          "Kushalnagar and Hassan are reliable stops for breakfast, fuel and rest rooms.",
          "Estate roads can be narrow, so we suggest central Madikeri accommodation with easy access.",
          "During the monsoon, travel times may extend; we plan a buffer into the itinerary.",
        ],
      }}
      halts={[
        {
          name: "Madikeri Fort & Town Centre",
          desc: "Historic fort and clock tower in the heart of the Coorg hill town.",
        },
        {
          name: "Abbey Falls",
          desc: "Popular waterfall surrounded by coffee and spice plantations near Madikeri.",
        },
        {
          name: "Raja's Seat",
          desc: "Sunset viewpoint and gardens overlooking the valleys around Madikeri.",
        },
        {
          name: "Omkareshwara Temple",
          desc: "Distinctive Indo-Saracenic temple with a peaceful tank in Madikeri town.",
        },
        {
          name: "Dubare Elephant Camp",
          desc: "Riverside elephant camp at Kushalnagar, a favoured family halt on the way in.",
        },
        {
          name: "Talakaveri",
          desc: "Source of the Kaveri river in the Brahmagiri hills, suited to an early start.",
        },
      ]}
      packages={[
        {
          title: "Coorg 3-Day Coffee Country Tour",
          duration: "3 Days / 2 Nights",
          idealFor: "Couples and families wanting a relaxed Madikeri weekend",
          sedanPrice: "₹6,999 Base",
          suvPrice: "₹8,499 Base",
          innovaPrice: "₹10,500 Base",
          tempoPrice: "₹15,500 Base",
          highlights: [
            "Day 1: Bengaluru pickup and drive to Madikeri, evening at Raja's Seat",
            "Day 2: Abbey Falls, Omkareshwara Temple and local markets",
            "Day 3: Breakfast and return via Kushalnagar",
            "Driver allowance included; hotel and meals arranged by you",
          ],
        },
        {
          title: "Coorg + Mysuru 4-Day Circuit",
          duration: "4 Days / 3 Nights",
          idealFor: "Travellers combining palace city with the hills",
          sedanPrice: "From ₹13/KM",
          suvPrice: "From ₹16/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹26/KM",
          highlights: [
            "Covers Mysuru, Srirangapatna, Kushalnagar and Madikeri",
            "Vehicle dedicated for four days, subject to availability",
            "Transparent per-kilometre billing with a daily minimum",
            "Chauffeur familiar with both expressway and ghat driving",
          ],
        },
        {
          title: "Madikeri One-Way Drop",
          duration: "Single Day Transit",
          idealFor: "Guests who need a direct transfer to Coorg without a return trip",
          sedanPrice: "₹4,499 Flat",
          suvPrice: "₹5,499 Flat",
          innovaPrice: "₹6,999 Flat",
          tempoPrice: "₹10,500 Flat",
          highlights: [
            "Direct doorstep pickup across Bengaluru",
            "Drop anywhere in Madikeri town or nearby estates where vehicle access allows",
            "Clear flat fare with tolls explained upfront",
          ],
        },
      ]}
      faqs={[
        {
          q: "How long is the drive from Bengaluru to Coorg?",
          a: "Madikeri is roughly 250 KM from Bengaluru and usually takes about 5.5 to 6.5 hours via NH 275 and Hassan, depending on traffic and weather.",
        },
        {
          q: "Can you arrange a larger vehicle for a joint family trip?",
          a: "Yes. Along with sedans and SUVs, we can quote a 12+1 Tempo Traveller, Force Urbania or a passenger bus for larger groups. All vehicles are subject to availability, so please confirm before booking.",
        },
        {
          q: "Do you pick up from Whitefield, HSR Layout and Yelahanka?",
          a: "Yes. We arrange Coorg pickups across Bengaluru including Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka.",
        },
        {
          q: "Are tolls and driver allowance included in the Coorg package?",
          a: "Each quote states the inclusions clearly. FASTag tolls and driver allowance are either itemised at actuals or included in a flat package on request.",
        },
      ]}
      mapQuery="Madikeri Coorg Karnataka"
      destinationCoords={{ lat: 12.4244, lng: 75.7382 }}
    />
  );
}
