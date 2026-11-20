import AdminDashboardPage from "../page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "End-to-End P&L & Revenue Analytics | Sri Sadhguru Travels",
  description:
    "Reconcile gross trip revenue, operating expenses, vehicle asset returns, and net profit margins.",
};

export default function AdminAnalyticsPage() {
  return <AdminDashboardPage initialTab="analytics" />;
}
