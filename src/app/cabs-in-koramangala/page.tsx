import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Koramangala Bangalore - 24x7 Taxi Service | Sky Cabs Bangalore",
  description:
    "Book cabs in Koramangala, Bengaluru for airport transfers, local rides and outstation trips. Clean AC cabs and clear fares. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-koramangala",
  },
};

export default function KoramangalaPage() {
  return (
    <LocationLandingTemplate
      locationName="Koramangala, Bengaluru"
      tagline="Neighbourhood pickups across Koramangala, BTM Layout and the Inner Ring Road, with airport and outstation cabs."
      landmarks={[
        "Koramangala 5th Block & 80 Feet Road",
        "Forum Mall Koramangala",
        "Sony World Signal",
        "Koramangala 4th Block",
        "BTM Layout",
        "Inner Ring Road Junction",
      ]}
      description="Sky Cabs Bangalore arranges doorstep pickups across Koramangala, BTM Layout and the Inner Ring Road. Residents here regularly book airport transfers to Kempegowda International Airport (BLR) and weekend outstation trips to Mysuru, Coorg and Tirupati. Choose from a Prime Sedan, Maruti Suzuki Ertiga, Toyota Innova or a larger vehicle for group travel, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "35 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Mysuru", distance: "150 KM", startingPrice: "From ₹13/KM" },
        { destination: "Tirupati", distance: "315 KM", startingPrice: "From ₹13/KM" },
        { destination: "Coorg (Madikeri)", distance: "260 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "Do you provide doorstep pickup in all Koramangala blocks?",
          a: "Yes. We arrange pickups across Koramangala including the 4th and 5th Blocks, 80 Feet Road and nearby BTM Layout. Please share a precise landmark when booking.",
        },
        {
          q: "How far is Koramangala from Kempegowda International Airport?",
          a: "The drive is approximately 35 KM and depends on traffic through the city and the airport approach road. We plan the pickup around your flight time.",
        },
        {
          q: "Can I book a cab for a weekend trip to Mysuru or Coorg?",
          a: "Yes. We quote same-day and multi-day outstation packages to Mysuru, Coorg, Ooty and other destinations. Vehicles are subject to availability, so please confirm in advance.",
        },
      ]}
      geoCoordinates={{ latitude: "12.9352", longitude: "77.6245" }}
      postalCode="560034"
    />
  );
}
