import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore to Tirupati Cabs - Balaji Darshan Travels | Sky Cabs Bangalore",
  description:
    "Book Bangalore to Tirupati cabs with Sky Cabs Bangalore. Innova, Innova Crysta, Ertiga and Tempo Traveller for Tirumala Balaji darshan. Verified chauffeurs and clear rates. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-to-tirupati-cabs",
  },
};

export default function BangaloreToTirupatiPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore to Tirupati"
      destinationName="Tirumala Sri Venkateswara Swamy Temple"
      distance="310 KM (One-Way) · 630 KM (Round Trip)"
      duration="6 to 7 Hours via NH 48"
      badgeText="Lord Venkateswara Balaji Pilgrimage Special"
      h1Title="Bangalore to Tirupati Cabs & Tour Packages"
      tagline="Two and three-night Tirumala Balaji pilgrimage packages with comfortable MPVs, experienced chauffeurs and clear interstate billing. Vehicles subject to availability."
      overview="Sky Cabs Bangalore organises family travel from Bengaluru to the pilgrimage town of Tirupati, approximately 310 KM via NH 48 through Kolar, Mulbagal and Chittoor. Long highway drives with elders, children and luggage need well-maintained air-conditioned vehicles and mature chauffeurs who keep a steady pace. We arrange Maruti Suzuki Ertigas, Toyota Innova, Innova Crysta and 12+1 Tempo Travellers, with upfront clarity on Andhra Pradesh entry taxes, tolls and driver allowance. Please confirm vehicle availability before booking."
      highwayGuide={{
        recommendedRoute: "Bengaluru → NH 48 (Kolar, Mulbagal, Chittoor) → Tirupati → Alipiri Gate → Tirumala Ghat Road",
        bestDepartureTime: "5:00 AM – 6:00 AM for a daylight drive and an afternoon arrival at the foothills",
        gateOrTollInfo: "Commercial vehicles clear TTD security checks at Alipiri Gate before the Tirumala ghat ascent",
        drivingTips: [
          "Carry original photo ID for all passengers and your darshan booking confirmation.",
          "Our chauffeurs know clean family food stops around Kolar, Mulbagal and Chittoor.",
          "The Tirumala ghat roads have regulated timings and speed limits for commercial vehicles.",
          "We plan vehicle parking near your booked accommodation or a convenient hotel in Tirupati.",
        ],
      }}
      halts={[
        {
          name: "Tirumala Venkateswara Temple",
          desc: "The revered hilltop shrine of Lord Venkateswara, reached by the Tirumala ghat road.",
        },
        {
          name: "Padmavathi Ammavari Temple",
          desc: "The consort shrine at Tiruchanur, about 5 KM from Tirupati, commonly visited with Balaji.",
        },
        {
          name: "Sri Kalahasti Temple",
          desc: "Ancient Vayu Linga shrine about 38 KM from Tirupati, known for its hill setting.",
        },
        {
          name: "Kanipakam Varasiddhi Vinayaka",
          desc: "Self-manifested Ganesha temple roughly 70 KM from Tirupati.",
        },
        {
          name: "Kapila Theertham",
          desc: "Sacred waterfall and Shiva shrine at the base of the Tirumala foothills.",
        },
        {
          name: "Chandragiri Fort",
          desc: "Historic Vijayanagara-era palace and fort on the outskirts of Tirupati.",
        },
      ]}
      packages={[
        {
          title: "Tirupati Balaji 3-Day Pilgrimage",
          duration: "3 Days / 2 Nights",
          idealFor: "Families with booked Special Entry Darshan tickets",
          sedanPrice: "₹10,999 Base",
          suvPrice: "₹13,500 Base",
          innovaPrice: "₹16,500 Base",
          tempoPrice: "₹24,500 Base",
          highlights: [
            "Day 1: Early pickup in Bengaluru and daylight drive to Tirupati",
            "Day 2: Tirumala darshan and Tiruchanur visit",
            "Day 3: Breakfast and a relaxed drive back to Bengaluru",
            "Doorstep pickup and drop across Bengaluru included",
            "State permit and driver allowance outlined in the quote",
          ],
        },
        {
          title: "Tirupati + Kalahasti + Kanipakam",
          duration: "4 Days / 3 Nights",
          idealFor: "Joint families covering the wider Chittoor temple circuit",
          sedanPrice: "From ₹13/KM",
          suvPrice: "From ₹16/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹26/KM",
          highlights: [
            "Covers Tirumala Balaji, Padmavathi Temple, Sri Kalahasti and Kanipakam",
            "Flexible darshan schedules to suit all family members",
            "Vehicle at your disposal for local and hilltop movement, subject to availability",
            "Chauffeur familiar with temple parking and hill-road timings",
          ],
        },
        {
          title: "Tirupati One-Way Express Drop",
          duration: "Single Day Transit",
          idealFor: "One-way transfers to Tirupati hotels or Renigunta Airport",
          sedanPrice: "₹5,500 Flat",
          suvPrice: "₹7,000 Flat",
          innovaPrice: "₹8,500 Flat",
          tempoPrice: "₹13,500 Flat",
          highlights: [
            "Direct highway transfer from your Bengaluru doorstep",
            "Drop at a Tirupati hotel, railway station or Renigunta Airport",
            "Clear flat quotation with tolls explained upfront",
          ],
        },
      ]}
      faqs={[
        {
          q: "What route is followed from Bengaluru to Tirupati?",
          a: "We generally travel via NH 48 through Kolar, Mulbagal and Chittoor to Tirupati. This is a well-used four-lane corridor with regular food and fuel stops.",
        },
        {
          q: "Can your cab go up the Tirumala ghat road to our cottage?",
          a: "Yes, subject to TTD vehicle rules and timings. Our vehicles carry the required commercial permits and clear the Alipiri Gate security check before the hill ascent.",
        },
        {
          q: "Do you offer doorstep pickup in Koramangala, Whitefield and Electronic City?",
          a: "Yes. We arrange pickups across Bengaluru including Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka. Confirm your vehicle in advance as availability varies.",
        },
        {
          q: "Are Andhra Pradesh state entry taxes included?",
          a: "Our quotations clearly state interstate commercial taxes, toll passes and driver allowance so that you know the full cost before confirming the trip.",
        },
      ]}
      mapQuery="Tirumala Venkateswara Temple Tirupati"
      destinationCoords={{ lat: 13.6288, lng: 79.4192 }}
    />
  );
}
