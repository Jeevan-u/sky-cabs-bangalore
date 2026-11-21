import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Bangalore Outstation Cabs - One Way & Round Trip Intercity Taxi | Sky Cabs Bangalore",
  description:
    "Book Bangalore outstation cabs with Sky Cabs Bangalore. Prime Sedan, Ertiga, Innova, Innova Crysta and Tempo Traveller for Mysuru, Tirupati, Coorg, Ooty, Chennai and Mangaluru. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/bangalore-outstation-cabs",
  },
};

export default function BangaloreOutstationPage() {
  return (
    <RouteLandingTemplate
      routeName="Bangalore Outstation Cabs"
      destinationName="Popular Outstation Destinations from Bengaluru"
      distance="Custom Distance · One Way & Round Trip Options"
      duration="Flexible Hourly & Multi-Day Hire"
      badgeText="Intercity Outstation Taxi Services Across Karnataka & Beyond"
      h1Title="Bangalore Outstation Cabs & Multi-Day Tour Packages"
      tagline="Travel beyond Bengaluru with experienced highway chauffeurs, clean air-conditioned vehicles and clear per-kilometre billing. Vehicles are subject to availability."
      overview="Sky Cabs Bangalore offers outstation cabs from Bengaluru to Mysuru, Tirupati, Coorg (Madikeri), Ooty, Chennai, Mangaluru, Hampi, Wayanad, Chikmagalur, Pondicherry, Shivamogga, Hassan and Tumakuru. Our fleet includes Prime Sedans (4+1), Maruti Suzuki Ertigas (6+1), Toyota Innova, Innova Crysta and Innova Hycross (7+1), Toyota Fortuner (6+1), Tempo Travellers, Force Urbania and passenger buses. Every vehicle is subject to availability, so please confirm availability before booking."
      highwayGuide={{
        recommendedRoute: "NH 275 (Mysuru Expressway) · NH 48 (Chennai corridor) · NH 44 (Tirupati corridor) · State highways to Coorg and Ooty",
        bestDepartureTime: "Early mornings (5:00 AM - 7:00 AM) for a smoother exit from Bengaluru",
        gateOrTollInfo: "Highway tolls are billed at actual FASTag receipts; interstate entry taxes and driver allowances are explained upfront",
        drivingTips: [
          "Verified chauffeurs with regular long-distance driving experience on Bengaluru outstation corridors.",
          "Clean, air-conditioned cabins with functioning ventilation and charging points where available.",
          "Planned breakfast and lunch halts on familiar highway routes and food courts.",
          "Doorstep pickup across Begur, Electronic City, Koramangala, HSR Layout, Whitefield, Indiranagar, Jayanagar and Yelahanka.",
        ],
      }}
      halts={[
        {
          name: "Mysuru (145 KM)",
          desc: "Palace city getaway via the NH 275 Mysuru Expressway, ideal for same-day and weekend trips.",
        },
        {
          name: "Tirupati (310 KM)",
          desc: "Hill shrine of Lord Venkateswara, reached via the NH 48 corridor through Kolar and Chittoor.",
        },
        {
          name: "Coorg / Madikeri (250 KM)",
          desc: "Coffee country and misty hills via Hassan and Kushalnagar, popular for family weekends.",
        },
        {
          name: "Ooty (265 KM)",
          desc: "Nilgiri hill station reached via Mysuru, Gundlupet and the scenic ghat roads.",
        },
        {
          name: "Chennai (350 KM)",
          desc: "Direct intercity business and family transfers along the NH 48 highway.",
        },
        {
          name: "Mangaluru (330 KM)",
          desc: "Coastal Karnataka destination via Hassan and the Western Ghats section of NH 66.",
        },
      ]}
      packages={[
        {
          title: "Same Day Round Trip Outstation",
          duration: "1 Day (Up to 300 KM)",
          idealFor: "Nearby business visits, Mysuru, Hassan and Tumakuru",
          sedanPrice: "₹3,999",
          suvPrice: "₹4,999",
          innovaPrice: "₹5,999",
          tempoPrice: "₹8,999",
          highlights: [
            "Doorstep pickup and return anywhere in Bengaluru",
            "Driver allowance and fuel included in the quoted package",
            "Tolls and state taxes at actuals unless bundled on request",
            "12 hours of vehicle duty for the day",
          ],
        },
        {
          title: "Multi-Day Karnataka & South India Tour",
          duration: "2 to 5 Days (300 KM/Day Average)",
          idealFor: "Family holidays and circuits covering Coorg, Ooty, Mangaluru and Tirupati",
          sedanPrice: "₹13/KM + Bata",
          suvPrice: "₹16/KM + Bata",
          innovaPrice: "₹19/KM + Bata",
          tempoPrice: "₹26/KM + Bata",
          highlights: [
            "Vehicle dedicated to your family for the duration of the tour, subject to availability",
            "Flexible sightseeing stops along the chosen route",
            "Clear daily trip sheets and WhatsApp updates",
            "Driver allowance and interstate taxes outlined in the quotation",
          ],
        },
      ]}
      faqs={[
        {
          q: "How are outstation fares calculated?",
          a: "Outstation fares are based on the planned round-trip or one-way kilometres, with a minimum daily threshold that varies by vehicle class, plus driver allowance. Tolls and interstate taxes are shown separately or bundled only if you request a flat package.",
        },
        {
          q: "Can I book a one-way outstation cab from Bengaluru?",
          a: "Yes. We arrange one-way drops to Mysuru, Tirupati, Coorg, Ooty, Chennai, Mangaluru and other destinations from the supplied list. Contact Sky Cabs Bangalore at +91 96323 45415 for a route-specific quote, subject to availability.",
        },
        {
          q: "What safety checks are in place on long highway trips?",
          a: "Vehicles are maintained for commercial use with valid permits, insurance and FASTag. Chauffeurs are briefed on the route before departure, and we recommend daylight driving on ghat sections wherever possible.",
        },
      ]}
      mapQuery="Bengaluru,Karnataka"
      destinationCoords={{ lat: 12.9716, lng: 77.5946 }}
    />
  );
}
