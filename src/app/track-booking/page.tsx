import React, { Suspense } from "react";
import { Metadata } from "next";
import TrackBookingClient from "./TrackBookingClient";

export const metadata: Metadata = {
  title: "Track Your Trip & Cab Booking Status",
  description:
    "Real-time trip tracking for Sky Cabs Bangalore passengers. Check assigned chauffeur details, vehicle number, pickup timing, and route updates.",
  alternates: {
    canonical: "https://skycabsbangalore.com/track-booking",
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-6000 mb-4"></div>
          <p className="text-sm text-neutral-500 font-medium">Loading booking status tracker...</p>
        </div>
      }
    >
      <TrackBookingClient />
    </Suspense>
  );
}
