import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Whitefield Bangalore - Corporate & Airport Taxi | Sky Cabs Bangalore",
  description:
    "Book cabs in Whitefield, Bengaluru for ITPL office commutes, airport transfers and outstation trips. Call +91 96323 45415.",
  alternates: {
    canonical: "https://skycabsbangalore.com/cabs-in-whitefield",
  },
};

export default function WhitefieldPage() {
  return (
    <LocationLandingTemplate
      locationName="Whitefield, Bengaluru"
      tagline="Corporate and residential pickups across Whitefield, Brookefield and Varthur Road, with airport and intercity cabs."
      landmarks={[
        "ITPL & Whitefield Tech Parks",
        "Phoenix Marketcity",
        "Brookefield",
        "GR Tech Park",
        "Whitefield Metro Station",
        "Varthur Road",
      ]}
      description="Sky Cabs Bangalore supports corporate and residential travel in Whitefield, Brookefield and the Outer Ring Road tech corridor. We arrange airport transfers to Kempegowda International Airport (BLR) and outstation trips to Tirupati, Chennai and Ooty. Vehicles including Prime Sedans, Toyota Innova Crysta, Tempo Travellers and Force Urbania can be requested, subject to availability. Confirm availability before booking."
      popularRoutes={[
        { destination: "Kempegowda Airport (BLR)", distance: "40 KM", startingPrice: "Flat ₹1,599" },
        { destination: "Tirupati", distance: "300 KM", startingPrice: "From ₹13/KM" },
        { destination: "Chennai", distance: "340 KM", startingPrice: "From ₹13/KM" },
        { destination: "Ooty", distance: "270 KM", startingPrice: "From ₹14/KM" },
      ]}
      faqs={[
        {
          q: "Do you provide corporate cab services in Whitefield?",
          a: "Yes. We quote local hourly and full-day packages for office commutes and client visits around ITPL, Whitefield and the ORR corridor. Please confirm vehicle availability in advance.",
        },
        {
          q: "Can I get an early morning airport pickup in Whitefield?",
          a: "Yes. Share your flight details the previous evening and we will plan a pickup from Whitefield, Brookefield or Varthur Road around your departure time.",
        },
        {
          q: "Which outstation trips are common from Whitefield?",
          a: "Tirupati, Chennai, Ooty and Mysuru are popular. All fleet options are subject to availability, so please confirm before finalising your itinerary.",
        },
      ]}
      geoCoordinates={{ latitude: "12.9698", longitude: "77.7499" }}
      postalCode="560066"
    />
  );
}
