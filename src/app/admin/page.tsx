"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import OverviewView from "./views/OverviewView";
import DispatchView from "./views/DispatchView";
import DutySlipsView from "./views/DutySlipsView";
import DriversView from "./views/DriversView";
import ExpensesView from "./views/ExpensesView";
// Rate Card view integrated into Fleet view; import removed
import ReputationView from "./views/ReputationView";
import AnalyticsView from "./views/AnalyticsView";
import OdometerVerificationView from "./views/OdometerVerificationView";
import LiveGpsTrackingView from "./views/LiveGpsTrackingView";
import QuotationsView from "./views/QuotationsView";
import RoutesCmsView from "./views/RoutesCmsView";
import ToursCmsView from "./views/ToursCmsView";
import PlacesCmsView from "./views/PlacesCmsView";
import FleetCatalogView from "./views/FleetCatalogView";

import ModalNewBooking from "./modals/ModalNewBooking";
import ModalAssignDriver from "./modals/ModalAssignDriver";
import ModalPrintInvoice from "./modals/ModalPrintInvoice";
import ModalAddDriver from "./modals/ModalAddDriver";

import ModalBookingDetails from "./modals/ModalBookingDetails";
import { Aurora } from "@/components/reactbits";
import BgGlassmorphism from "@/components/BgGlassmorphism";

import {
  AdminTabType,
  BookingItem,
  DutySlipItem,
  DriverUserItem,
  ReviewItem,
  RateCardItem,
  ExpenseItem,
} from "./types";

export default function AdminDashboardPage({
  initialTab = "overview",
}: {
  initialTab?: AdminTabType;
} = {}) {
  // Navigation & Shell State
  const [activeTab, setActiveTab] = useState<AdminTabType>(initialTab);
  const [visitedTabs, setVisitedTabs] = useState<Set<AdminTabType>>(new Set<AdminTabType>([initialTab]));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Data Collections
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [dutySlips, setDutySlips] = useState<DutySlipItem[]>([]);
  const [drivers, setDrivers] = useState<DriverUserItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [rateCards, setRateCards] = useState<RateCardItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  // Modals Visibility
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState<boolean>(false);
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<BookingItem | null>(null);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<BookingItem | null>(null);
  const [selectedSlipForPrint, setSelectedSlipForPrint] = useState<DutySlipItem | null>(null);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState<boolean>(false);


  // Track visited tabs for 0ms instantaneous tab switching cache
  useEffect(() => {
    setVisitedTabs((prev) => {
      const next = new Set<AdminTabType>(prev);
      next.add(activeTab);
      return next;
    });
  }, [activeTab]);

  // Handle browser back/forward buttons and initial URL check
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === "undefined") return;
      const path = window.location.pathname.replace(/^\/admin\/?/, "");
      if (path) {
        setActiveTab(path as AdminTabType);
      } else {
        setActiveTab("overview");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Data Fetching
  const fetchAllData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 1. Bookings
      const bRes = await fetch("/api/bookings");
      const bData = await bRes.json();
      if (bData.success && Array.isArray(bData.bookings)) {
        const normalized: BookingItem[] = bData.bookings.map((b: any) => ({
          id: b.id,
          customerName: b.customer_name || b.customerName || "Valued Passenger",
          customerPhone: b.customer_phone || b.customerPhone || "",
          tripType: b.trip_type || b.tripType || "airport",
          vehicleId: b.vehicle_type || b.vehicleId || "innova-crysta",
          vehicleName: b.vehicle_type || b.vehicleName || "Commercial Vehicle",
          pickupLocation: b.pickup_address || b.pickupLocation || "",
          dropLocation: b.drop_address || b.dropLocation || "",
          pickupDateTime: b.pickup_datetime || b.pickupDateTime || new Date().toISOString(),
          estimatedPrice: b.estimated_price || b.estimatedPrice || 0,
          status: b.status || "Pending",
          driverName: b.driver_name || b.driverName || "",
          driverPhone: b.driver_phone || b.driverPhone || "",
          vehicleNumber: b.vehicle_number || b.vehicleNumber || "",
          notes: b.notes || "",
          createdAt: b.created_at || new Date().toISOString(),
        }));
        setBookings(normalized);
      }

      // 2. Duty Slips
      const dsRes = await fetch("/api/duty-slips");
      const dsData = await dsRes.json();
      if (dsData.success && Array.isArray(dsData.dutySlips)) {
        setDutySlips(dsData.dutySlips);
      }

      // 3. Drivers
      const uRes = await fetch("/api/users");
      const uData = await uRes.json();
      if (uData.success && Array.isArray(uData.users)) {
        setDrivers(uData.users);
      }

      // 4. Reviews
      const rRes = await fetch("/api/reviews");
      const rData = await rRes.json();
      if (rData.success && Array.isArray(rData.reviews)) {
        setReviews(rData.reviews);
      }

      // 5. Rate Cards
      const rcRes = await fetch("/api/rates");
      const rcData = await rcRes.json();
      if (rcData.success && Array.isArray(rcData.rateCards)) {
        setRateCards(rcData.rateCards);
      }

      // 6. Expenses
      const expRes = await fetch("/api/expenses");
      const expData = await expRes.json();
      if (expData.success && Array.isArray(expData.expenses)) {
        setExpenses(expData.expenses);
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Status Updater
  const handleUpdateStatus = async (id: string, newStatus: BookingItem["status"]) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Booking Deletion
  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete booking #${id}?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.error("Delete booking error:", err);
    }
  };

  // Badge counters
  const counts = {
    pendingBookings: bookings.filter((b) => b.status === "Pending").length,
    dutySlips: dutySlips.length,
    activeDrivers: drivers.filter(
      (d) => d.duty_status === "Available" || (!d.duty_status && d.role === "driver")
    ).length,
    reviews: reviews.filter((r) => r.overall_rating >= 4).length,
  };

  const quickMetrics = {
    activeTrips: bookings.filter(
      (b) => b.status === "Confirmed" || b.status === "Driver Assigned" || b.status === "In Progress"
    ).length,
    pendingBookings: counts.pendingBookings,
  };

  return (
    <div className="h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 flex flex-col md:flex-row antialiased font-sans overflow-hidden">
      {/* 1. Dedicated Standalone Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        counts={counts}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* ReactBits Aurora + BgGlassmorphism Background (Ambient Luxury Glow Matching Landing Page) */}
        <Aurora
          className="opacity-25 dark:opacity-20 pointer-events-none -z-10"
          colorStops={["#4f46e5", "#f59e0b", "#06b6d4"]}
        />
        <BgGlassmorphism className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 -z-10 overflow-hidden" />

        {/* Fixed Header Bar */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNewBookingModal={() => setIsNewBookingModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isRefreshing={isRefreshing}
          onRefresh={fetchAllData}
          quickMetrics={quickMetrics}
        />

        {/* View Routing - Instant 0ms Tab Switching Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10 hiddenScrollbar no-scrollbar">
          {visitedTabs.has("overview") && (
            <div className={activeTab === "overview" ? "block" : "hidden"}>
              <OverviewView
                bookings={bookings}
                dutySlips={dutySlips}
                drivers={drivers}
                onNavigateTab={setActiveTab}
                onOpenAssignModal={(b) => setSelectedBookingForAssign(b)}
                onOpenNewBookingModal={() => setIsNewBookingModalOpen(true)}
                onOpenPrintModal={(s) => setSelectedSlipForPrint(s)}
                onOpenBookingDetails={(b) => setSelectedBookingForDetails(b)}
                searchFilter={searchQuery}
              />
            </div>
          )}

          {visitedTabs.has("dispatch") && (
            <div className={activeTab === "dispatch" ? "block" : "hidden"}>
              <DispatchView
                bookings={bookings}
                drivers={drivers}
                loading={isRefreshing}
                onUpdateStatus={handleUpdateStatus}
                onDeleteBooking={handleDeleteBooking}
                onOpenAssignModal={(b) => setSelectedBookingForAssign(b)}
                onOpenNewBookingModal={() => setIsNewBookingModalOpen(true)}
                onOpenBookingDetails={(b) => setSelectedBookingForDetails(b)}
                searchFilter={searchQuery}
              />
            </div>
          )}

          {visitedTabs.has("odometer") && (
            <div className={activeTab === "odometer" ? "block" : "hidden"}>
              <OdometerVerificationView />
            </div>
          )}

          {visitedTabs.has("gps") && (
            <div className={activeTab === "gps" ? "block" : "hidden"}>
              <LiveGpsTrackingView />
            </div>
          )}

          {visitedTabs.has("quotations") && (
            <div className={activeTab === "quotations" ? "block" : "hidden"}>
              <QuotationsView searchFilter={searchQuery} />
            </div>
          )}

          {visitedTabs.has("tours_cms") && (
            <div className={activeTab === "tours_cms" ? "block" : "hidden"}>
              <ToursCmsView />
            </div>
          )}

          {visitedTabs.has("places_cms") && (
            <div className={activeTab === "places_cms" ? "block" : "hidden"}>
              <PlacesCmsView />
            </div>
          )}

          {visitedTabs.has("routes_cms") && (
            <div className={activeTab === "routes_cms" ? "block" : "hidden"}>
              <RoutesCmsView />
            </div>
          )}

          {(visitedTabs.has("fleet") || visitedTabs.has("fleet_catalog")) && (
            <div className={activeTab === "fleet" || activeTab === "fleet_catalog" ? "block" : "hidden"}>
              <FleetCatalogView />
            </div>
          )}

          {visitedTabs.has("drivers") && (
            <div className={activeTab === "drivers" ? "block" : "hidden"}>
              <DriversView
                drivers={drivers}
                onRefresh={fetchAllData}
                searchFilter={searchQuery}
              />
            </div>
          )}

          {visitedTabs.has("expenses") && (
            <div className={activeTab === "expenses" ? "block" : "hidden"}>
              <ExpensesView />
            </div>
          )}

          {visitedTabs.has("dutyslips") && (
            <div className={activeTab === "dutyslips" ? "block" : "hidden"}>
              <DutySlipsView
                dutySlips={dutySlips}
                onOpenPrintModal={(s) => setSelectedSlipForPrint(s)}
                searchFilter={searchQuery}
              />
            </div>
          )}

          // Rate Card tab removed; integrated into Fleet view

          {visitedTabs.has("reviews") && (
            <div className={activeTab === "reviews" ? "block" : "hidden"}>
              <ReputationView reviews={reviews} />
            </div>
          )}

          {visitedTabs.has("analytics") && (
            <div className={activeTab === "analytics" ? "block" : "hidden"}>
              <AnalyticsView
                dutySlips={dutySlips}
                rateCards={rateCards}
                expenses={expenses}
                bookings={bookings}
                drivers={drivers}
              />
            </div>
          )}
        </main>
      </div>

      {/* 3. Reusable Enterprise Modals */}
      <ModalNewBooking
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onBookingCreated={fetchAllData}
        rateCards={rateCards}
      />

      <ModalBookingDetails
        isOpen={Boolean(selectedBookingForDetails)}
        onClose={() => setSelectedBookingForDetails(null)}
        booking={selectedBookingForDetails}
        onOpenAssignModal={(b) => setSelectedBookingForAssign(b)}
        onUpdateStatus={handleUpdateStatus}
        onNavigateTab={setActiveTab}
      />

      <ModalAssignDriver
        isOpen={Boolean(selectedBookingForAssign)}
        onClose={() => setSelectedBookingForAssign(null)}
        booking={selectedBookingForAssign}
        drivers={drivers}
        onAssigned={fetchAllData}
      />

      <ModalPrintInvoice
        isOpen={Boolean(selectedSlipForPrint)}
        onClose={() => setSelectedSlipForPrint(null)}
        slip={selectedSlipForPrint}
      />

      <ModalAddDriver
        isOpen={isAddDriverModalOpen}
        onClose={() => setIsAddDriverModalOpen(false)}
        onDriverAdded={fetchAllData}
      />


    </div>
  );
}
