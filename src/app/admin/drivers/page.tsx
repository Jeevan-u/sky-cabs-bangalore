import AdminDashboardPage from "../page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chauffeur & Driver Management | Sri Sadhguru Travels",
  description:
    "Manage verified highway pilots, active duty statuses, vehicle allocations, and contact records.",
};

export default function AdminDriversPage() {
  return <AdminDashboardPage initialTab="drivers" />;
}
