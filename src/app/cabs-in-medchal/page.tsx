import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Medchal & Kompally Hyderabad - 24x7 Cab Service",
  description:
    "24x7 Cab service in Medchal, Kompally, Gundlapochampally & NH 44 corridor. Airport drops and outstation car rentals. Call 8106 117704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/cabs-in-medchal",
  },
};

export default function MedchalPage() {
  return (
    <LocationLandingTemplate
      locationName="Medchal & Kompally"
      tagline="North Hyderabad's Premier Travel Service - Serving Kandlakoya Oxygen Park, Medchal, Kompally & the Nagpur Highway (NH 44)."
      landmarks={[
        "Kandlakoya Oxygen Park & Forest Track",
        "Medchal Checkpost & Bus Depot",
        "Medchal Railway Station",
        "Kompally D-Mart Junction",
        "Gundlapochampally Industrial Park",
        "ORR Exit 6 Interchange",
      ]}
      description="Connecting North Hyderabad to Shamshabad Airport and major outstation corridors, Sri Sadhguru Travels provides dependable 24x7 cab services for residents and businesses in Medchal, Kompally, and Jeedimetla. We also specialize in northern Telangana highway travel toward Kamareddy, Gandhari, Nizamabad, and Basara."
      popularRoutes={[
        { destination: "Shamshabad Airport (via ORR Exit 6)", distance: "68 KM", startingPrice: "Flat ₹1,899" },
        { destination: "Gandhari & Kamareddy", distance: "95 KM", startingPrice: "From ₹12/KM" },
        { destination: "Basara Saraswathi Temple", distance: "190 KM", startingPrice: "From ₹12/KM" },
      ]}
      faqs={[
        {
          q: "Can I book a cab from Medchal directly to Kamareddy or Gandhari?",
          a: "Yes! Sri Sadhguru Travels has deep operational roots in both Hyderabad and Gandhari/Kamareddy, making us the top choice for this corridor.",
        },
        {
          q: "How early should I book for a morning airport drop from Medchal?",
          a: "Due to the 68 KM distance, we recommend pre-booking at least 3 to 4 hours in advance or the previous evening to guarantee zero delays.",
        },
      ]}
    />
  );
}
