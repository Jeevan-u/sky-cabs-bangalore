import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in HSR Layout Bangalore - 24x7 Taxi & Outstation Cabs | Sky Cabs Bangalore",
  description:
    "Book cabs in HSR Layout, Bengaluru for airport transfers, IT commutes and outstation trips. Transparent fares and clean vehicles. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-hsr-layout",
  },
};

export default function HsrLayoutPage() {
  return (
    <LocationLandingTemplate
      locationName="HSR Layout, Bengaluru"
      tagline="Pickups across HSR Layout Sectors 1 to 7, Sarjapur Road and the Outer Ring Road, with airport and intercity cabs."
      landmarks={[
        "HSR Layout Sector 1 to 7",
        "27th Main Road",
        "Sarjapur Road Junction",
        "Outer Ring Road & Silk Board",
        "BTM Layout",
        "Agara Lake Road",
      ]}
      description="Sky Cabs Bangalore serves HSR Layout and the Sarjapur Road corridor with local rides, airport transfers and outstation cabs. Many customers here book Chennai and Mysuru trips along with early morning flights from Kempegowda International Airport (BLR). Fleet options include Prime Sedans, Maruti Suzuki Ertigas, Toyota Innova, Innova Crysta and Tempo Travellers, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "37 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Chennai", distance: "350 KM", startingPrice: "From ₹13/KM" },
        { destination: "Mysuru", distance: "148 KM", startingPrice: "From ₹13/KM" },
        { destination: "Ooty", distance: "265 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "Do you cover all sectors of HSR Layout?",
          a: "Yes. We arrange pickups in Sectors 1 through 7, along 27th Main and near the Sarjapur Road and ORR junctions. Share your exact landmark when you enquire.",
        },
        {
          q: "Can I book a cab from HSR Layout to Chennai?",
          a: "Yes. We offer one-way and round-trip cabs from HSR Layout to Chennai via NH 48, as well as Mysuru, Coorg and Ooty. Please confirm the vehicle before booking as availability varies.",
        },
        {
          q: "What is the typical travel time to the airport from HSR Layout?",
          a: "Kempegowda International Airport (BLR) is around 37 KM away. Travel time varies with traffic, so we recommend leaving a comfortable buffer and sharing your flight details in advance.",
        },
      ]}
      geoCoordinates={{ latitude: "12.9116", longitude: "77.6412" }}
      postalCode="560102"
    />
  );
}
