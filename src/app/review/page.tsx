import React, { Suspense } from "react";
import { Metadata } from "next";
import ReviewPageClient from "./ReviewPageClient";

export const metadata: Metadata = {
  title: "Share Your Travel Review & Feedback",
  description:
    "Leave your verified passenger review for Sky Cabs Bangalore. Share your feedback on chauffeur punctuality, cab cleanliness, and AC comfort.",
  alternates: {
    canonical: "https://skycabsbangalore.com/review",
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-6000 mb-4"></div>
          <p className="text-sm text-neutral-500 font-medium">Loading review generator...</p>
        </div>
      }
    >
      <ReviewPageClient />
    </Suspense>
  );
}
