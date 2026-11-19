import React, { Suspense } from "react";
import { Metadata } from "next";
import ListingCarDetailClient from "./ListingCarDetailClient";

export const metadata: Metadata = {
  title: "Commercial Fleet Vehicle Details & Booking",
  description:
    "Explore vehicle specifications, seating capacity, luggage room, AC features, and hourly/per-km rates for Swift Dzire, Innova Crysta, Tempo Traveller & Luxury Buses.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/listing-car-detail",
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-6000 mb-4"></div>
          <p className="text-sm text-neutral-500 font-medium">Loading commercial vehicle details...</p>
        </div>
      }
    >
      <ListingCarDetailClient />
    </Suspense>
  );
}
