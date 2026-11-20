import AdminDashboardPage from "../page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet Operations Expenses Ledger | Sri Sadhguru Travels",
  description:
    "Track fuel bills, FASTag toll charges, garage maintenance, chauffeur batta, and state permits.",
};

export default function AdminExpensesPage() {
  return <AdminDashboardPage initialTab="expenses" />;
}
