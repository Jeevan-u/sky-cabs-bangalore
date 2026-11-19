import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & 24x7 Cab Booking Desk",
  description:
    "Contact Sri Sadhguru Tours & Travels Kukatpally headquarters or Gandhari branch. 24x7 dispatch phone: +91 81061 17704. Instant WhatsApp quotes.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
