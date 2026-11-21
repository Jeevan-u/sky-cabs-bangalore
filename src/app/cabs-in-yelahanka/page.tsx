import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Yelahanka Bangalore - Airport & Outstation Taxi | Sky Cabs Bangalore",
  description:
    "Book cabs in Yelahanka, Bengaluru for Kempegowda Airport transfers, Hebbal commutes and outstation trips. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-yelahanka",
  },
};

export default function YelahankaPage() {
  return (
    <LocationLandingTemplate
      locationName="Yelahanka, Bengaluru"
      tagline="North Bengaluru pickups around Yelahanka, Hebbal and the airport corridor, with direct transfers to Kempegowda International Airport (BLR)."
      landmarks={[
        "Yelahanka Satellite Town",
        "Yelahanka New Town",
        "Hebbal Flyover",
        "Airport Road via NH 44",
        "Manyata Tech Park",
        "Devanahalli",
      ]}
      description="Sky Cabs Bangalore serves Yelahanka, Hebbal and the north Bengaluru airport corridor. Because of the proximity to Devanahalli, many bookings here are airport transfers, alongside outstation trips to Tirupati, Mysuru and Ooty. Prime Sedans, Maruti Suzuki Ertigas, Toyota Innova, Innova Crysta, Tempo Travellers and passenger buses can be requested, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "22 KM", startingPrice: "Flat ₹1,199" },
        { destination: "Tirupati", distance: "300 KM", startingPrice: "From ₹13/KM" },
        { destination: "Mysuru", distance: "160 KM", startingPrice: "From ₹13/KM" },
        { destination: "Ooty", distance: "275 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "How far is Yelahanka from Kempegowda International Airport?",
          a: "Yelahanka is around 22 KM from the airport at Devanahalli, making it one of the most convenient pickup areas in Bengaluru. Travel time still depends on traffic and weather.",
        },
        {
          q: "Do you cover Hebbal and Manyata Tech Park?",
          a: "Yes. We arrange pickups across Yelahanka, Hebbal, Manyata Tech Park and the airport road corridor, subject to a confirmed booking.",
        },
        {
          q: "Can I book an outstation cab from Yelahanka?",
          a: "Yes. Popular routes include Tirupati, Mysuru, Ooty and Coorg. Fleet options are subject to availability, so please confirm your vehicle before travelling.",
        },
      ]}
      geoCoordinates={{ latitude: "13.1006", longitude: "77.5960" }}
      postalCode="560064"
    />
  );
}
