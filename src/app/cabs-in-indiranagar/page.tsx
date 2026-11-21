import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Indiranagar Bangalore - 24x7 Taxi Service | Sky Cabs Bangalore",
  description:
    "Book cabs in Indiranagar, Bengaluru for local rides, airport transfers and outstation trips. Clean AC vehicles. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-indiranagar",
  },
};

export default function IndiranagarPage() {
  return (
    <LocationLandingTemplate
      locationName="Indiranagar, Bengaluru"
      tagline="Pickups along 100 Feet Road, Old Airport Road and Domlur, with airport transfers and outstation cabs."
      landmarks={[
        "Indiranagar 100 Feet Road",
        "Indiranagar Metro Station",
        "Domlur Flyover",
        "Old Airport Road",
        "Ulsoor Lake",
        "MG Road",
      ]}
      description="Sky Cabs Bangalore arranges local and outstation cabs across Indiranagar, Domlur and Old Airport Road. Customers here frequently book Kempegowda International Airport (BLR) transfers and weekend trips to Mysuru, Mangaluru and Tirupati. Fleet options include Prime Sedans, Maruti Suzuki Ertigas, Toyota Innova and Innova Crysta, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "33 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Mysuru", distance: "150 KM", startingPrice: "From ₹13/KM" },
        { destination: "Mangaluru", distance: "335 KM", startingPrice: "From ₹13/KM" },
        { destination: "Tirupati", distance: "315 KM", startingPrice: "From ₹13/KM" },
      ]}
      faqs={[
        {
          q: "Do you pick up from 100 Feet Road and the metro area?",
          a: "Yes. We cover Indiranagar's 100 Feet Road, the metro station area, Domlur and Old Airport Road. Please give a clear landmark when confirming your booking.",
        },
        {
          q: "How far is Indiranagar from Kempegowda International Airport?",
          a: "The airport is about 33 KM from Indiranagar. Travel time varies with traffic, so share your flight timing when enquiring.",
        },
        {
          q: "Can I book a larger vehicle for a family outing?",
          a: "Yes. Ertigas, Toyota Innova, Innova Crysta and Tempo Travellers can be requested for family trips. Availability varies, so confirm your vehicle before booking.",
        },
      ]}
      geoCoordinates={{ latitude: "12.9719", longitude: "77.6412" }}
      postalCode="560038"
    />
  );
}
