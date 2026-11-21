import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore to Chennai Cabs - One Way & Round Trip | Sky Cabs Bangalore",
  description:
    "Book Bangalore to Chennai cabs with Sky Cabs Bangalore. Direct NH 48 intercity transfers in Prime Sedan, Ertiga, Innova or Tempo Traveller. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-to-chennai-cabs",
  },
};

export default function BangaloreToChennaiPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore to Chennai"
      destinationName="Chennai – Marina Beach, Mylapore & Business Districts"
      distance="350 KM (One-Way) · 700 KM (Round Trip)"
      duration="6 to 7.5 Hours via NH 48"
      badgeText="Chennai Business & Family Transfer Special"
      h1Title="Bangalore to Chennai Cabs & Tour Packages"
      tagline="Direct intercity transfers between Bengaluru and Chennai with professional chauffeurs, clean air-conditioned vehicles and transparent per-kilometre billing. Vehicles subject to availability."
      overview="Sky Cabs Bangalore runs regular one-way and round-trip cabs from Bengaluru to Chennai, roughly 350 KM via NH 48 through Kolar, Mulbagal, Vellore and Sriperumbudur. The corridor is a dependable choice for business travel, airport connections and family visits. We can arrange a Prime Sedan, Maruti Suzuki Ertiga, Toyota Innova, Innova Crysta, Toyota Fortuner or Tempo Traveller, subject to availability. Confirm availability before booking."
      highwayGuide={{
        recommendedRoute: "Bengaluru → NH 48 (Kolar, Mulbagal, Vellore) → Sriperumbudur → Chennai",
        bestDepartureTime: "5:30 AM – 7:00 AM to skirt Bengaluru traffic and reach Chennai before evening rush",
        gateOrTollInfo: "NH 48 FASTag tolls and Tamil Nadu entry tax are itemised in the quotation before confirmation",
        drivingTips: [
          "The NH 48 corridor is mostly four-lane with frequent fuel and food stops.",
          "Vellore and Sriperumbudur are reliable mid-journey break points.",
          "Chennai traffic is heaviest in the evening; we plan hotel drops with that in mind.",
          "Chauffeurs receive the full itinerary in advance so there are no route surprises.",
        ],
      }}
      halts={[
        {
          name: "Kolar & Mulbagal Highway Stops",
          desc: "Early breakfast and fuel halts on the Bengaluru stretch of NH 48.",
        },
        {
          name: "Vellore Fort",
          desc: "Historic fort and temple complex, a comfortable mid-route sightseeing break.",
        },
        {
          name: "Sriperumbudur",
          desc: "Industrial and highway junction marking the final approach into Chennai.",
        },
        {
          name: "Marina Beach",
          desc: "The long seafront promenade that defines Chennai's coastline.",
        },
        {
          name: "Kapaleeshwarar Temple, Mylapore",
          desc: "Prominent Dravidian-style temple in the heart of old Chennai.",
        },
      ]}
      packages={[
        {
          title: "Chennai One-Way Express Drop",
          duration: "Single Day Transit",
          idealFor: "Business travel, relocation and direct hotel or airport drops",
          sedanPrice: "₹5,999 Flat",
          suvPrice: "₹7,499 Flat",
          innovaPrice: "₹8,999 Flat",
          tempoPrice: "₹14,500 Flat",
          highlights: [
            "Direct doorstep pickup across Bengaluru",
            "Drop at your Chennai address, hotel or airport terminal",
            "Clear flat quote with tolls and interstate tax explained",
          ],
        },
        {
          title: "Chennai 2-Day Business Round Trip",
          duration: "2 Days / 1 Night",
          idealFor: "Meetings, site visits and short corporate travel",
          sedanPrice: "₹8,499 Base",
          suvPrice: "₹10,500 Base",
          innovaPrice: "₹12,999 Base",
          tempoPrice: "₹18,500 Base",
          highlights: [
            "Vehicle and chauffeur for a full two-day itinerary, subject to availability",
            "Pickup and drop at your Bengaluru office or residence",
            "Flexible local travel within Chennai during the stay",
            "Driver allowance and taxes shown in the quotation",
          ],
        },
        {
          title: "Chennai + Pondicherry 4-Day Extension",
          duration: "4 Days / 3 Nights",
          idealFor: "Travellers combining a city visit with a coastal getaway",
          sedanPrice: "From ₹13/KM",
          suvPrice: "From ₹16/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹26/KM",
          highlights: [
            "Covers Bengaluru, Chennai and Pondicherry",
            "Vehicle dedicated for the full circuit, subject to availability",
            "Transparent per-kilometre billing with a daily minimum",
            "Chauffeur familiar with interstate highway routes",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is the driving time from Bengaluru to Chennai?",
          a: "The 350 KM trip typically takes 6 to 7.5 hours via NH 48, depending on city exit traffic and stops along the way.",
        },
        {
          q: "Do you offer one-way cabs to Chennai?",
          a: "Yes. One-way drops are available to Chennai and other destinations such as Mysuru, Tirupati, Coorg and Mangaluru. Please confirm the vehicle and final quote before booking as availability varies.",
        },
        {
          q: "Can you pick up from Whitefield, Indiranagar or HSR Layout?",
          a: "Yes. We arrange pickups across Bengaluru including Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka.",
        },
        {
          q: "Are tolls and Tamil Nadu entry tax included?",
          a: "Every quote itemises NH 48 tolls, Tamil Nadu entry tax and driver allowance. You can choose to have them billed at actuals or bundled into a flat package.",
        },
      ]}
      mapQuery="Chennai Tamil Nadu"
      destinationCoords={{ lat: 13.0827, lng: 80.2707 }}
    />
  );
}
