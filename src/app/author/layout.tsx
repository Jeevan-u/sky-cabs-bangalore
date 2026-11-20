import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sri Rathan Kanna - Founder & Fleet Director",
  description:
    "Profile of Sri Rathan Kanna, Proprietor and Managing Director of Sri Sadhguru Tours & Travels Hyderabad and Kamareddy. 15+ years experience in passenger logistics.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/author",
  },
};

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
