import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Miyapur Hyderabad - 24x7 Taxi & Outstation Car Rental",
  description:
    "24x7 Cab service in Miyapur, Allwyn X Roads, Talkie Town & Metro Station. Airport drop and outstation car rental. Call 8106 117704.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/cabs-in-miyapur",
  },
};

export default function MiyapurPage() {
  return (
    <LocationLandingTemplate
      locationName="Miyapur, Hyderabad"
      tagline="Strategic Highway Hub - Connecting Ameenpur Lake, Miyapur Metro, Allwyn X Roads & Bachupally to Shamshabad Airport & Major Highway Routes."
      landmarks={[
        "Ameenpur Lake (Biodiversity Heritage Site)",
        "Miyapur Metro Terminal",
        "Allwyn X Roads",
        "Miyapur Bus Depot",
        "Talkie Town Junction",
        "Bachupally / Mallampet Road",
      ]}
      description="Strategically positioned near the Mumbai Highway (NH 65) and Outer Ring Road (ORR), Sri Sadhguru Travels in Miyapur offers the fastest airport connection via ORR Exit 4 directly to Shamshabad in under 35 minutes! We also provide commercial and pilgrimage group bookings with Force Tempo Travellers and luxury coaches."
      popularRoutes={[
        { destination: "Shamshabad Airport (via ORR)", distance: "45 KM", startingPrice: "Flat ₹1,399" },
        { destination: "Shirdi Sai Baba Temple", distance: "620 KM", startingPrice: "Special 3-Day Package" },
        { destination: "Basara Saraswathi Temple", distance: "210 KM", startingPrice: "From ₹12/KM" },
      ]}
      faqs={[
        {
          q: "How fast is the drive from Miyapur to Shamshabad Airport with Sri Sadhguru?",
          a: "Our drivers utilize the Outer Ring Road (ORR) express corridor, bypassing city traffic and reaching Shamshabad RGI Airport in just 35-40 minutes.",
        },
        {
          q: "Can I book a 17-seater or 26-seater Tempo Traveller from Miyapur?",
          a: "Yes! We operate Force Tempo Travellers with pushback seats and individual AC vents for group travel from Miyapur.",
        },
      ]}
    />
  );
}
