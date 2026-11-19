"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  MapPinIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";

interface DynamicRoute {
  id: string;
  title: string;
  from_location: string;
  to_location: string;
  category: "popular_hub" | "outstation_route" | "tour_package";
  distance_km: number;
  sedan_price: number;
  suv_price: number;
  tt_price: number;
  is_published: boolean;
  description?: string;
  created_at?: string;
}

const RoutesCmsView: FC = () => {
  const [routes, setRoutes] = useState<DynamicRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"all" | "popular_hub" | "outstation_route" | "tour_package">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  // Form State
  const [title, setTitle] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [category, setCategory] = useState<"popular_hub" | "outstation_route" | "tour_package">("outstation_route");
  const [distanceKm, setDistanceKm] = useState("150");
  const [sedanPrice, setSedanPrice] = useState("3500");
  const [suvPrice, setSuvPrice] = useState("4800");
  const [ttPrice, setTtPrice] = useState("7500");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/routes-cms");
      const data = await res.json();
      if (data.success && Array.isArray(data.routes)) {
        setRoutes(data.routes);
      }
    } catch (err) {
      console.error("Failed to load routes CMS:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleCreateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fromLocation.trim() || !toLocation.trim()) {
      alert("Please fill Title, Starting point, and Destination.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/routes-cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          from_location: fromLocation.trim(),
          to_location: toLocation.trim(),
          category,
          distance_km: parseInt(distanceKm, 10) || 100,
          sedan_price: parseInt(sedanPrice, 10) || 2000,
          suv_price: parseInt(suvPrice, 10) || 3000,
          tt_price: parseInt(ttPrice, 10) || 5000,
          description: description.trim(),
          is_published: true,
        }),
      });

      if (res.ok) {
        setIsAddModalOpen(false);
        setTitle("");
        setFromLocation("");
        setToLocation("");
        setDescription("");
        fetchRoutes();
      }
    } catch (err) {
      console.error("Create route error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (route: DynamicRoute) => {
    try {
      await fetch("/api/routes-cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: route.id, is_published: !route.is_published }),
      });
      fetchRoutes();
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDeleteRoute = async (id: string) => {
    if (!confirm("Are you sure you want to delete this route?")) return;
    try {
      await fetch(`/api/routes-cms?id=${id}`, { method: "DELETE" });
      fetchRoutes();
    } catch (err) {
      console.error("Delete route error:", err);
    }
  };

  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => activeCategory === "all" || r.category === activeCategory);
  }, [routes, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredRoutes.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRoutes = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredRoutes.slice(start, start + pageSize);
  }, [filteredRoutes, safeCurrentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary-6000">
            <MapPinIcon className="w-4 h-4" />
            <span>Dynamic Content & Rate Management</span>
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-1 tracking-tight">
            Dynamic Routes & Hubs CMS
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
            Add, update, or remove operational hubs, pilgrimage tours, and fixed rate packages instantly without code modifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary-6000/25 transition-all active:scale-95"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            Add New Route
          </button>
          <button
            onClick={fetchRoutes}
            disabled={loading}
            className="p-2.5 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition shadow-sm"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { id: "all", label: "All Routes" },
          { id: "popular_hub", label: "Operational Hubs" },
          { id: "outstation_route", label: "Outstation Circuits" },
          { id: "tour_package", label: "Pilgrimage Packages" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id as any);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === tab.id
                ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/25 scale-102"
                : "bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/80 hover:bg-neutral-100/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Routes Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading routes...</div>
      ) : filteredRoutes.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl text-neutral-400 text-xs">
          No routes found in this category.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedRoutes.map((route) => (
              <div
                key={route.id}
                className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex flex-col justify-between space-y-4 hover:border-primary-500/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100/80 dark:bg-neutral-800 text-[10px] font-bold uppercase text-neutral-500 border border-neutral-200 dark:border-neutral-700">
                      {route.category.replace("_", " ")}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleTogglePublish(route)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          route.is_published
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                        }`}
                      >
                        {route.is_published ? "Published" : "Draft"}
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="p-1 text-neutral-400 hover:text-rose-500 transition"
                        title="Delete"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-black text-sm text-neutral-900 dark:text-white mt-2.5">
                    {route.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                    <span>{route.from_location}</span>
                    <ArrowRightIcon className="w-3 h-3 text-neutral-400 inline shrink-0" />
                    <span>{route.to_location}</span>
                    <span className="font-mono text-neutral-400">({route.distance_km} KM)</span>
                  </div>

                  {route.description && (
                    <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2">
                      {route.description}
                    </p>
                  )}
                </div>

                {/* Pricing Grid */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50">
                    <span className="text-[9px] font-bold text-neutral-400 block uppercase">Sedan</span>
                    <span className="font-black font-mono text-neutral-900 dark:text-white">
                      ₹{route.sedan_price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50">
                    <span className="text-[9px] font-bold text-neutral-400 block uppercase">SUV</span>
                    <span className="font-black font-mono text-neutral-900 dark:text-white">
                      ₹{route.suv_price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50">
                    <span className="text-[9px] font-bold text-neutral-400 block uppercase">Tempo</span>
                    <span className="font-black font-mono text-neutral-900 dark:text-white">
                      ₹{route.tt_price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
            <AdminTablePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredRoutes.length}
              pageSize={pageSize}
              pageSizeOptions={[3, 6, 12, 24]}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      )}

      {/* Add Route Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-white font-sans space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-black text-lg">Add New Route / Hub</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Route / Package Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hyderabad to Vijayawada Kanaka Durga"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Starting Origin *</label>
                  <input
                    type="text"
                    required
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="e.g. Kukatpally, Hyderabad"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder="e.g. Vijayawada"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border"
                  >
                    <option value="popular_hub">Operational Hub</option>
                    <option value="outstation_route">Outstation Route</option>
                    <option value="tour_package">Tour Package</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Distance (KM)</label>
                  <input
                    type="number"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block mb-1">Sedan Price (₹)</label>
                  <input
                    type="number"
                    value={sedanPrice}
                    onChange={(e) => setSedanPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">SUV Price (₹)</label>
                  <input
                    type="number"
                    value={suvPrice}
                    onChange={(e) => setSuvPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">TT Price (₹)</label>
                  <input
                    type="number"
                    value={ttPrice}
                    onChange={(e) => setTtPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Description / Ghat Road Notes</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Highlights, toll details, recommended stopovers..."
                  className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-primary-6000 text-white font-bold text-xs"
                >
                  {isSubmitting ? "Saving..." : "Publish Route"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesCmsView;
