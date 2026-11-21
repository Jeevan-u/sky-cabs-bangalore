import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky Cabs Bangalore - Founder & Fleet Director",
  description:
    "Profile of Sky Cabs Bangalore, Sky Cabs Bangalore — passenger logistics across Bengaluru.",
  alternates: {
    canonical: "https://skycabsbangalore.com/author",
  },
};

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
