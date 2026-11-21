import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Begur Bangalore - 24x7 Taxi & Car Rental | Sky Cabs Bangalore",
  description:
    "Book 24x7 cabs in Begur, Bengaluru. Airport transfers to Kempegowda International Airport (BLR), outstation trips to Mysuru and Coorg. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-begur",
  },
};

export default function BegurPage() {
  return (
    <LocationLandingTemplate
      locationName="Begur, Bengaluru"
      tagline="Sky Cabs Bangalore is based in Begur, with doorstep pickups across Begur, Electronic City and the Bengaluru–Hosur corridor."
      landmarks={[
        "Begur Road & Begur Circle",
        "Electronic City Phase 1",
        "Hosa Road Junction",
        "Begur Lake",
        "Anekal Road Junction",
        "Sarjapur–Begur Road",
      ]}
      description="Sky Cabs Bangalore operates from #56, Begur, Bengaluru, Karnataka 562157. We arrange local rides, early morning transfers to Kempegowda International Airport (BLR) at Devanahalli, and outstation trips to Mysuru, Tirupati, Coorg and Ooty. Prime Sedans, Ertigas, Innovas, Tempo Travellers, Force Urbania and passenger buses can be requested, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "38 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Mysuru Palace", distance: "150 KM", startingPrice: "From ₹13/KM" },
        { destination: "Tirupati Balaji", distance: "310 KM", startingPrice: "From ₹13/KM" },
        { destination: "Coorg (Madikeri)", distance: "255 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "How quickly can a cab reach Begur?",
          a: "Our base is in Begur, so we can usually arrange a nearby pickup at short notice. Timings depend on traffic and vehicle availability, so please call or WhatsApp ahead with your exact location.",
        },
        {
          q: "Do you provide airport drops from Begur and Electronic City?",
          a: "Yes. We arrange transfers from Begur, Electronic City and nearby areas to Kempegowda International Airport (BLR) in Devanahalli. Share your flight time when enquiring so the pickup can be planned accordingly.",
        },
        {
          q: "Which vehicles can I request for an outstation trip?",
          a: "Options include a Prime Sedan (4+1), Maruti Suzuki Ertiga (6+1), Toyota Innova and Innova Crysta (7+1), Tempo Traveller (12+1), Force Urbania and passenger buses. All are subject to availability and should be confirmed before booking.",
        },
      ]}
      geoCoordinates={{ latitude: "12.8570", longitude: "77.6680" }}
      postalCode="562157"
    />
  );
}
