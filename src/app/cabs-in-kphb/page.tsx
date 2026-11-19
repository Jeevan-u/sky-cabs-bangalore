import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in KPHB Colony Hyderabad - 24x7 Taxi & Car Rental",
  description:
    "Reliable taxi service in KPHB Colony Phase 1 to Phase 9. Shamshabad Airport cabs, outstation Innova rentals, Tempo Travellers. Call 8106 117704.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/cabs-in-kphb",
  },
};

export default function KphbPage() {
  return (
    <LocationLandingTemplate
      locationName="KPHB Colony (Phases 1-9)"
      tagline="West Hyderabad's #1 Trusted Travel Partner for Residents in KPHB Phase 1 through Phase 9, Nexus Mall & JNTU Corridor."
      landmarks={[
        "Nexus Hyderabad Mall (Outside Entrance)",
        "KPHB Phase 1 & 2 Road No. 1",
        "KPHB Phase 3 Temple",
        "Phase 4 & 5 Colony Roads",
        "JNTU Metro Station",
        "KPHB Metro Station",
      ]}
      description="Residents in KPHB Colony trust Sri Sadhguru Tours & Travels for spotless vehicles and guaranteed on-time pickups. Whether you have an early morning 4:00 AM international flight at Shamshabad Airport or a weekend temple trip with family elders to Yadagirigutta or Vemulawada, our drivers arrive before time with clean, chilled AC vehicles."
      popularRoutes={[
        { destination: "Shamshabad RGI Airport", distance: "39 KM", startingPrice: "Flat ₹1,299" },
        { destination: "Yadagirigutta Darshan", distance: "85 KM", startingPrice: "Round Trip Package" },
        { destination: "Vemulawada & Kondagattu", distance: "160 KM", startingPrice: "From ₹12/KM" },
      ]}
      faqs={[
        {
          q: "Can I book a midnight or early dawn airport pickup in KPHB?",
          a: "Yes, our dispatch runs 24x7. We assign the driver 2 hours ahead so your journey to Shamshabad Airport is completely stress-free.",
        },
        {
          q: "Do you have Innova Crysta with captain seats for senior citizens?",
          a: "Yes, our Innova Crystas feature comfortable recliner captain seating with smooth suspension, ideal for joint families and senior citizens.",
        },
      ]}
    />
  );
}
