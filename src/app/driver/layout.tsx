import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
