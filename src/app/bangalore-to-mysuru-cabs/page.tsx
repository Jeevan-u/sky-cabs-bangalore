import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore to Mysuru Cabs - Palace & Chamundi Hills Tour | Sky Cabs Bangalore",
  description:
    "Book Bangalore to Mysuru cabs with Sky Cabs Bangalore. Same-day and weekend trips via NH 275 with Prime Sedan, Ertiga, Innova or Tempo Traveller. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-to-mysuru-cabs",
  },
};

export default function BangaloreToMysuruPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore to Mysuru"
      destinationName="Mysuru Palace & Chamundi Hills"
      distance="145 KM (One-Way) · 290 KM (Round Trip)"
      duration="2.5 to 3.5 Hours via NH 275"
      badgeText="Mysuru Palace & Chamundi Hills Getaway"
      h1Title="Bangalore to Mysuru Cabs & Tour Packages"
      tagline="Same-day and weekend Mysuru trips with comfortable air-conditioned vehicles, experienced chauffeurs and transparent fares. Vehicles subject to availability."
      overview="Sky Cabs Bangalore runs regular outstation cabs from Bengaluru to Mysuru, approximately 145 KM via the NH 275 Mysuru Expressway. The route suits quick palace visits, family weekends and temple halts at Srirangapatna. We arrange doorstep pickup across Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka. Prime Sedans, Maruti Suzuki Ertigas, Toyota Innova, Innova Crysta and Tempo Travellers can be requested, subject to availability. Confirm availability before booking."
      highwayGuide={{
        recommendedRoute: "Bengaluru → NH 275 Mysuru Expressway → Srirangapatna → Mysuru",
        bestDepartureTime: "6:00 AM – 8:00 AM to avoid city exit traffic and reach the palace before the crowds",
        gateOrTollInfo: "NH 275 FASTag tolls are billed at actual receipts; there is no separate entry permit for taxis entering Mysuru",
        drivingTips: [
          "The Mysuru Expressway is a smooth, wide corridor suitable for relaxed family drives.",
          "A short halt at Srirangapatna breaks the journey and adds a scenic stop.",
          "Palace parking gets busy on weekends; your chauffeur will drop you at the nearest practical entrance.",
          "Chamundi Hills roads are best handled in daylight with an experienced chauffeur.",
        ],
      }}
      halts={[
        {
          name: "Mysuru Palace",
          desc: "The grand Amber Vilas palace complex, illuminated beautifully in the evening.",
        },
        {
          name: "Chamundi Hills",
          desc: "Hilltop Chamundeshwari Temple with panoramic views over Mysuru city.",
        },
        {
          name: "Srirangapatna",
          desc: "River island fort town with Tipu Sultan's Summer Palace and Ranganathaswamy Temple.",
        },
        {
          name: "Krishna Raja Sagara (KRS) Dam",
          desc: "Scenic reservoir and Brindavan Gardens, a favourite evening stop near Mysuru.",
        },
        {
          name: "Devaraja Market",
          desc: "Colourful traditional market for flowers, spices and local Mysuru souvenirs.",
        },
        {
          name: "Karanji Lake Nature Park",
          desc: "Peaceful butterfly park and birdwatching spot close to the palace area.",
        },
      ]}
      packages={[
        {
          title: "Mysuru Same-Day Express Tour",
          duration: "1 Day (Same-Day Return)",
          idealFor: "Quick palace darshan and a short city getaway",
          sedanPrice: "₹3,499 Flat",
          suvPrice: "₹4,499 Flat",
          innovaPrice: "₹5,499 Flat",
          tempoPrice: "₹8,499 Flat",
          highlights: [
            "Early morning doorstep pickup in Bengaluru",
            "Mysuru Palace, Devaraja Market and Chamundi Hills",
            "Return to Bengaluru in the evening",
            "Doorstep drop included",
          ],
        },
        {
          title: "Mysuru 2-Day Leisure Tour",
          duration: "2 Days / 1 Night",
          idealFor: "Families and senior citizens who prefer a relaxed pace",
          sedanPrice: "₹5,499 Base",
          suvPrice: "₹6,999 Base",
          innovaPrice: "₹8,499 Base",
          tempoPrice: "₹12,500 Base",
          highlights: [
            "Day 1: Palace, market and Brindavan Gardens",
            "Day 2: Srirangapatna and Chamundi Hills before returning",
            "Overnight stay arranged by you, with flexible pickup timing",
            "Driver allowance included in the base fare",
          ],
        },
        {
          title: "Mysuru + Srirangapatna + Coorg Extension",
          duration: "3 Days / 2 Nights",
          idealFor: "Travellers combining palace culture with coffee country",
          sedanPrice: "From ₹13/KM",
          suvPrice: "From ₹16/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹26/KM",
          highlights: [
            "Covers Mysuru, Srirangapatna and Madikeri (Coorg)",
            "Vehicle dedicated for all three days, subject to availability",
            "Transparent per-kilometre billing with a daily minimum",
            "Chauffeur familiar with both highway and hill sections",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is the best departure time from Bengaluru for a Mysuru day trip?",
          a: "We recommend leaving between 6:00 AM and 8:00 AM from areas such as Koramangala, Whitefield or Electronic City. This gives you a comfortable drive on NH 275 and more time at the palace.",
        },
        {
          q: "Which vehicles are available for a family trip to Mysuru?",
          a: "You can enquire about a Prime Sedan (4+1), Maruti Suzuki Ertiga (6+1), Toyota Innova or Innova Crysta (7+1), and a 12+1 Tempo Traveller for larger groups. All vehicles are subject to availability, so please confirm before booking.",
        },
        {
          q: "Are toll charges and driver allowances included?",
          a: "Our quotations state exactly what is included. FASTag tolls and driver allowance are either itemised at actuals or bundled into a flat package if you request one.",
        },
        {
          q: "Do you pick up from HSR Layout, Jayanagar and Yelahanka?",
          a: "Yes. Doorstep pickup is available across Bengaluru, including Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka, subject to a confirmed booking.",
        },
      ]}
      mapQuery="Mysuru Palace Mysuru Karnataka"
      destinationCoords={{ lat: 12.3057, lng: 76.6521 }}
    />
  );
}
