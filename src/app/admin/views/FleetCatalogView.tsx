"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  TruckIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  CurrencyRupeeIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalVehicle from "../modals/ModalVehicle";
import { FleetVehicleItem } from "../types";
import { TiltedCard, SpotlightCard } from "@/components/reactbits";

export default function FleetCatalogView() {
  const [vehicles, setVehicles] = useState<FleetVehicleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSubTab, setActiveSubTab] = useState<"cards" | "rate_matrix">("cards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<FleetVehicleItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fleet");
      const data = await res.json();
      if (data.success && Array.isArray(data.vehicles)) {
        setVehicles(data.vehicles);
      }
    } catch (err) {
      console.error("Failed to load fleet vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleTogglePublish = async (vehicle: FleetVehicleItem) => {
    try {
      await fetch("/api/fleet", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: vehicle.id, is_published: !vehicle.is_published }),
      });
      fetchVehicles();
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDeleteVehicle = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete vehicle "${name}"?`)) return;
    try {
      await fetch(`/api/fleet?id=${id}`, { method: "DELETE" });
      fetchVehicles();
    } catch (err) {
      console.error("Delete vehicle error:", err);
    }
  };

  const categories = ["all", "Sedan", "SUV", "Premium SUV", "Tempo Traveller", "Luxury Coach"];

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesCat = selectedCategory === "all" || v.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.capacity.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [vehicles, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedVehicles = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredVehicles.slice(start, start + pageSize);
  }, [filteredVehicles, safeCurrentPage, pageSize]);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <TruckIcon className="w-4 h-4" />
            <span>Unified Fleet & Rate Card Engine</span>
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-1">
            Fleet Management & Rate Card Engine
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Configure 5 to 50-seater passenger fleet specs, per-KM tariffs, airport flat rates, and driver batta rules.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Segmented View Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80">
            <button
              onClick={() => setActiveSubTab("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === "cards"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <TruckIcon className="w-3.5 h-3.5" />
              <span>Fleet Cards</span>
            </button>
            <button
              onClick={() => setActiveSubTab("rate_matrix")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === "rate_matrix"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <CurrencyRupeeIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Rate Card Matrix</span>
            </button>
          </div>

          <button
            onClick={fetchVehicles}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Refresh fleet"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              setEditingVehicle(null);
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white text-xs font-black shadow-lg shadow-primary-500/25 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Fleet Vehicle</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Horizontal scrollable category tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {cat === "all" ? "All Fleet" : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vehicles or rates..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-medium focus:ring-2 focus:ring-primary-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main Content Area: Cards View OR Rate Card Engine Matrix */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading fleet and rate engine...</div>
      ) : filteredVehicles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80">
          <p className="text-sm font-bold text-neutral-500">No vehicles match the filter criteria.</p>
        </div>
      ) : activeSubTab === "cards" ? (
        /* 1. Fleet Cards with Embedded Rate Engine Badges */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVehicles.map((v) => (
              <TiltedCard key={v.id} maxAngle={8} scale={1.02} className="h-full">
                <div className="h-full p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-full h-40 bg-gradient-to-b from-neutral-100 to-neutral-200/60 dark:from-neutral-800 dark:to-neutral-800/40 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center shadow-inner relative mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-neutral-900/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                        {v.category}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-primary-6000/90 backdrop-blur-md text-[10px] font-bold text-white">
                        {v.capacity}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase shadow ${
                            v.is_published
                              ? "bg-emerald-500 text-white"
                              : "bg-neutral-500 text-white"
                          }`}
                        >
                          {v.is_published ? "Live on Landing Page" : "Draft Hidden"}
                        </span>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h5 className="font-extrabold text-base text-neutral-900 dark:text-white">
                        {v.name}
                      </h5>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 font-medium">
                        {v.bestFor || v.description}
                      </p>
                    </div>

                    {/* Features list */}
                    {v.features && v.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {v.features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] font-semibold text-neutral-600 dark:text-neutral-400"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    {/* Embedded Rate Card Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-black mb-2">
                      <div className="p-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                        <span className="block text-[9px] font-bold text-neutral-400 uppercase">Per-KM</span>
                        <span className="text-emerald-600 dark:text-emerald-400">₹{v.perKmRate}/km</span>
                      </div>
                      <div className="p-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                        <span className="block text-[9px] font-bold text-neutral-400 uppercase">Airport</span>
                        <span className="text-primary-600 dark:text-primary-400">₹{v.airportFlatRate}</span>
                      </div>
                      <div className="p-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                        <span className="block text-[9px] font-bold text-neutral-400 uppercase">Local 8h</span>
                        <span className="text-amber-600 dark:text-amber-400">₹{v.local8hr80km}</span>
                      </div>
                    </div>

                    {/* Driver Allowance & Threshold Sub-bar */}
                    <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40 text-[10px] text-neutral-500 font-bold mb-3">
                      <span>Batta: ₹{v.driverBattaPerDay ?? 500}/day</span>
                      <span>Night: ₹{v.nightBatta ?? 300}</span>
                      <span>Min: {v.minKmPerDay ?? 300} KM</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                      <button
                        onClick={() => handleTogglePublish(v)}
                        className="text-[11px] font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1"
                      >
                        {v.is_published ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="w-4 h-4 text-neutral-400" />
                            <span>Unpublished</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingVehicle(v);
                            setIsModalOpen(true);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 text-xs font-bold"
                          title="Edit Vehicle & Rates"
                        >
                          <PencilSquareIcon className="w-3.5 h-3.5" />
                          <span>Edit Rates</span>
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(v.id, v.name)}
                          className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                          title="Delete Vehicle"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltedCard>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
            <AdminTablePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredVehicles.length}
              pageSize={pageSize}
              pageSizeOptions={[3, 6, 9, 15]}
              onPageChange={(p) => setCurrentPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      ) : (
        /* 2. Full High-Density Rate Card Engine Matrix */
        <div className="space-y-4">
          <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                  <CurrencyRupeeIcon className="w-4 h-4 text-amber-500" />
                  <span>Rate Card Engine Pricing Matrix</span>
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Direct tariff comparison across all vehicle tiers for Bengaluru, Karnataka & Interstate routes.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                Live Pricing Active
              </span>
            </div>

            <div className="overflow-x-auto min-w-full">
              <table className="min-w-[950px] w-full text-left text-xs">
                <thead className="bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-neutral-200/80 dark:border-neutral-800/80">
                  <tr>
                    <th className="py-3.5 px-4">Vehicle Tier</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Capacity</th>
                    <th className="py-3.5 px-4 font-black text-emerald-600 dark:text-emerald-400">Outstation / KM</th>
                    <th className="py-3.5 px-4 font-black text-primary-600 dark:text-primary-400">Airport Transfer</th>
                    <th className="py-3.5 px-4 font-black text-amber-600 dark:text-amber-400">Local 8h/80km</th>
                    <th className="py-3.5 px-4">Driver Batta</th>
                    <th className="py-3.5 px-4">Night Batta</th>
                    <th className="py-3.5 px-4">Min KM/Day</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-neutral-900 dark:text-white text-sm">
                          {v.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">ID: {v.id}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-300">
                          {v.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-600 dark:text-neutral-400">
                        {v.capacity}
                      </td>
                      <td className="py-3.5 px-4 font-black text-sm text-emerald-600 dark:text-emerald-400 font-mono">
                        ₹{v.perKmRate} / km
                      </td>
                      <td className="py-3.5 px-4 font-black text-sm text-primary-600 dark:text-primary-400 font-mono">
                        ₹{v.airportFlatRate.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 font-black text-sm text-amber-600 dark:text-amber-400 font-mono">
                        ₹{v.local8hr80km.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-700 dark:text-neutral-300">
                        ₹{v.driverBattaPerDay ?? 500}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-700 dark:text-neutral-300">
                        ₹{v.nightBatta ?? 300}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-700 dark:text-neutral-300">
                        {v.minKmPerDay ?? 300} KM
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setEditingVehicle(v);
                            setIsModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/50 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 text-xs font-bold transition-all ml-auto"
                        >
                          <PencilSquareIcon className="w-3.5 h-3.5" />
                          <span>Edit Slab</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <ModalVehicle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchVehicles}
        editingVehicle={editingVehicle}
      />
    </div>
  );
}
