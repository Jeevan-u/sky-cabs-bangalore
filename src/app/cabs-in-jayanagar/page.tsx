import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Jayanagar Bangalore - 24x7 Taxi & Car Rental | Sky Cabs Bangalore",
  description:
    "Book cabs in Jayanagar, Bengaluru for local rides, airport transfers and outstation trips to Mysuru, Coorg and Ooty. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-jayanagar",
  },
};

export default function JayanagarPage() {
  return (
    <LocationLandingTemplate
      locationName="Jayanagar, Bengaluru"
      tagline="South Bengaluru pickups across Jayanagar, JP Nagar and Banashankari, with airport and hill-station cabs."
      landmarks={[
        "Jayanagar 4th Block Shopping Complex",
        "Jayanagar 9th Block",
        "JP Nagar",
        "Banashankari",
        "Lalbagh Botanical Garden",
        "Bannerghatta Road",
      ]}
      description="Sky Cabs Bangalore covers Jayanagar, JP Nagar and Banashankari with local rides, airport transfers and outstation cabs. Families in south Bengaluru often book Mysuru, Coorg and Ooty trips along with Kempegowda International Airport (BLR) drops. Prime Sedans, Ertigas, Toyota Innova, Innova Crysta and Tempo Travellers can be requested, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "36 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Mysuru", distance: "145 KM", startingPrice: "From ₹13/KM" },
        { destination: "Coorg (Madikeri)", distance: "250 KM", startingPrice: "From ₹14/KM" },
        { destination: "Ooty", distance: "265 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "Do you serve JP Nagar and Banashankari as well as Jayanagar?",
          a: "Yes. We arrange pickups across Jayanagar, JP Nagar, Banashankari and nearby Bannerghatta Road. Share your exact landmark when enquiring.",
        },
        {
          q: "Can I book a cab from Jayanagar to Coorg or Ooty?",
          a: "Yes. We quote one-way and round-trip packages to Coorg, Ooty, Mysuru and other destinations. All vehicles are subject to availability, so please confirm in advance.",
        },
        {
          q: "What vehicles are suitable for a family trip from Jayanagar?",
          a: "A Maruti Suzuki Ertiga (6+1) or Toyota Innova (7+1) works well for most families, and a 12+1 Tempo Traveller suits larger groups. Please confirm availability before booking.",
        },
      ]}
      geoCoordinates={{ latitude: "12.9250", longitude: "77.5938" }}
      postalCode="560011"
    />
  );
}
