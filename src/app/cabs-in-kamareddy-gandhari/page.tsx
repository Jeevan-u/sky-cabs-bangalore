import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Kamareddy & Gandhari - 24x7 Taxi & Hyderabad Airport Drops",
  description:
    "Book 24x7 cabs in Kamareddy, Gandhari & Northern Telangana with Sri Sadhguru Travels. Swift Dzire, Innova Crysta, Tempo Traveller for Hyderabad and Shamshabad Airport drops. Call 8106 117704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/cabs-in-kamareddy-gandhari",
  },
};

export default function KamareddyGandhariPage() {
  return (
    <LocationLandingTemplate
      locationName="Kamareddy & Gandhari"
      customBadge="Northern Telangana Hub · Kamareddy & Gandhari"
      customHeading="Cabs in Kamareddy & Gandhari - 24x7 Taxi & Car Rental Service"
      tagline="Proprietor Rathan Kanna's Native Operational Hub - Daily 24x7 Cabs, Airport Taxi & Outstation Travel Connecting Northern Telangana to Hyderabad."
      landmarks={[
        "Gandhari Main Road & Bus Stand",
        "Kamareddy Railway Station & Bus Depot",
        "National Highway 44 (NH 44 Corridor)",
        "Banswada & Yellareddy X Roads",
        "Domakonda Fort Historic Monument",
        "Pocharam Wildlife Sanctuary & Dam",
        "Medchal Highway Gateway",
      ]}
      description="Sri Sadhguru Tours & Travels has deep ancestral and operational roots in Gandhari and Kamareddy. Led personally by proprietor Rathan Kanna, we provide dedicated daily taxi movements between Kamareddy, Gandhari, Nizamabad, and Hyderabad. Whether you require an emergency airport drop to Shamshabad RGIA Airport, a hospital visit cab to Kukatpally/Hitec City, or wedding bus bookings in Kamareddy district, we offer prompt dispatch with zero middleman commissions."
      popularRoutes={[
        { destination: "Hyderabad (Kukatpally / KPHB)", distance: "135 KM", startingPrice: "Flat ₹2,800 Sedan" },
        { destination: "Shamshabad RGI Airport Drop", distance: "175 KM", startingPrice: "Flat ₹3,600 Sedan" },
        { destination: "Basara Saraswathi Temple Darshan", distance: "110 KM", startingPrice: "From ₹12/KM" },
        { destination: "Nizamabad Town & District", distance: "55 KM", startingPrice: "From ₹12/KM" },
      ]}
      faqs={[
        {
          q: "How fast can I get a cab in Gandhari or Kamareddy for an emergency Hyderabad trip?",
          a: "Since our secondary operations headquarters is situated right in Gandhari/Kamareddy, we maintain standby vehicles ready for dispatch within 20 to 30 minutes 24x7.",
        },
        {
          q: "Do you offer flat rate airport drops from Kamareddy directly to Shamshabad Airport?",
          a: "Yes! We operate direct express airport runs via NH 44 and the Outer Ring Road (ORR Exit 6 Kandlakoya) directly to RGIA Shamshabad with guaranteed zero surge pricing.",
        },
        {
          q: "Are Tempo Travellers and luxury buses available for marriages in Kamareddy?",
          a: "Yes! We operate 12 to 26-seater Force Tempo Travellers and 32 to 50-seater AC buses across Kamareddy, Gandhari, and Banswada for wedding events.",
        },
      ]}
    />
  );
}
