import React from "react";
import { Metadata } from "next";
import ReviewPage from "../page";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingReviewDynamicPage() {
  return <ReviewPage />;
}
