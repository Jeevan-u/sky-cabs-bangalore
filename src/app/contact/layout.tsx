import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & 24x7 Cab Booking Desk",
  description:
    "Contact Sky Cabs Bangalore Begur headquarters or Jayanagar branch. 24x7 dispatch phone: +91 96323 45415. Instant WhatsApp quotes.",
  alternates: {
    canonical: "https://skycabsbangalore.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
