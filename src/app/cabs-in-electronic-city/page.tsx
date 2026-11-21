import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Electronic City Bangalore - IT Corridor Taxi | Sky Cabs Bangalore",
  description:
    "Book cabs in Electronic City, Bengaluru. Airport transfers to Kempegowda International Airport (BLR), corporate travel and outstation cabs. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-electronic-city",
  },
};

export default function ElectronicCityPage() {
  return (
    <LocationLandingTemplate
      locationName="Electronic City, Bengaluru"
      tagline="Pickups across Electronic City Phase 1 and 2, Hosa Road and Bommasandra, with airport and outstation cabs."
      landmarks={[
        "Electronic City Phase 1 Tech Parks",
        "Electronic City Phase 2",
        "Hosa Road Metro & Junction",
        "Bommasandra Industrial Area",
        "Sarjapur Road Junction",
        "Neon Square & Hosa Road Parade",
      ]}
      description="Sky Cabs Bangalore serves the Electronic City IT corridor with local rides, corporate commutes and airport transfers to Kempegowda International Airport (BLR). Families here also book outstation cabs to Mysuru, Chennai and Ooty. Fleet options range from Prime Sedans to Toyota Innova Crysta, Tempo Travellers and passenger buses, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "42 KM", startingPrice: "Flat ₹1,499" },
        { destination: "Mysuru", distance: "145 KM", startingPrice: "From ₹13/KM" },
        { destination: "Chennai", distance: "345 KM", startingPrice: "From ₹13/KM" },
        { destination: "Ooty", distance: "270 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "Do you offer early morning airport pickups in Electronic City?",
          a: "Yes. We can schedule early transfers to Kempegowda International Airport (BLR) from Electronic City, Hosa Road and Bommasandra. Please enquire the previous evening and share your flight details.",
        },
        {
          q: "Can you arrange corporate cab packages for IT parks?",
          a: "Yes. We quote local hourly packages and regular employee transport arrangements for offices in Electronic City and along the Outer Ring Road. Vehicle availability should be confirmed in advance.",
        },
        {
          q: "Which outstation destinations are popular from Electronic City?",
          a: "Mysuru, Tirupati, Coorg, Ooty, Chennai and Mangaluru are frequently requested. We also quote trips to Hampi, Wayanad and Chikmagalur, subject to availability.",
        },
      ]}
      geoCoordinates={{ latitude: "12.8452", longitude: "77.6602" }}
      postalCode="560100"
    />
  );
}
