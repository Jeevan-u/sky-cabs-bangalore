import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Hitec City Hyderabad - Corporate Car Rental & Airport Taxi",
  description:
    "Premium corporate car rental and airport taxi in Hitec City, Madhapur, Gachibowli. Innova Crysta, Dzire, Fortuner, Tempo Traveller. Call 8106 117704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/cabs-in-hitec-city",
  },
};

export default function HitecCityPage() {
  return (
    <LocationLandingTemplate
      locationName="Hitec City & Madhapur"
      tagline="Executive Travel Solutions for Hyderabad's IT Hub - Cyber Towers, Knowledge City, Mindspace & Financial District."
      landmarks={[
        "Cyber Towers & Cyber Gateway",
        "Mindspace IT Park",
        "Knowledge City (IKEA Corridor)",
        "Durgam Cheruvu Cable Bridge",
        "Inorbit Mall Madhapur",
        "Financial District / Gachibowli",
      ]}
      description="For corporate executives, IT consultants, and business delegations in Hitec City, Sri Sadhguru Tours & Travels provides premium executive transit. We offer GST invoicing, impeccably uniformed and polite drivers, and plush vehicles ranging from Toyota Innova Crysta to Fortuners and Force Urbanias."
      popularRoutes={[
        { destination: "Shamshabad Airport (via PVNR)", distance: "32 KM", startingPrice: "Flat ₹1,199" },
        { destination: "Bangalore Corporate Trip", distance: "570 KM", startingPrice: "From ₹14/KM" },
        { destination: "Vijayawada Business Travel", distance: "285 KM", startingPrice: "From ₹12/KM" },
      ]}
      faqs={[
        {
          q: "Do you provide GST invoices for corporate reimbursements in Hitec City?",
          a: "Yes, all our business and corporate bookings come with official GST invoices for smooth reimbursement and tax compliance.",
        },
        {
          q: "Can I book hourly rental packages for client site visits in Hyderabad?",
          a: "Yes, our 4hr/40km, 8hr/80km, and 12hr/120km packages are tailored specifically for corporate delegate movements across IT parks.",
        },
      ]}
    />
  );
}
