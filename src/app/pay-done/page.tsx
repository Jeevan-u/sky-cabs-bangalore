import React, { Suspense } from "react";
import { Metadata } from "next";
import PayDoneClient from "./PayDoneClient";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-6000 mb-4"></div>
          <p className="text-sm text-neutral-500 font-medium">Loading booking confirmation...</p>
        </div>
      }
    >
      <PayDoneClient />
    </Suspense>
  );
}
