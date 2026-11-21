import AdminDashboardPage from "../page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet Management & Asset Catalog | Sky Cabs Bangalore",
  description:
    "Manage passenger vehicle assets, seat capacities, luggage specs, tariffs, and 3D display cards.",
};

export default function AdminFleetPage() {
  return <AdminDashboardPage initialTab="fleet" />;
}
