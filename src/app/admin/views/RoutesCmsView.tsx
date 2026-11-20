"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  MapPinIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalRoute from "../modals/ModalRoute";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<DynamicRoute | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

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
    if (!window.confirm("Are you sure you want to delete this route?")) return;
    try {
      await fetch(`/api/routes-cms?id=${id}`, { method: "DELETE" });
      fetchRoutes();
    } catch (err) {
      console.error("Delete route error:", err);
    }
  };

  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      const matchesCategory = activeCategory === "all" || r.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.from_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.to_location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [routes, activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredRoutes.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRoutes = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredRoutes.slice(start, start + pageSize);
  }, [filteredRoutes, safeCurrentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary-6000">
            <GlobeAltIcon className="w-4 h-4" />
            <span>Landing Page CMS</span>
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-1">
            Outstation Routes & Highways
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Configure one-way, round trip, and per-km pricing for highway travel corridors.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchRoutes}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Refresh routes"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              setEditingRoute(null);
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white text-xs font-black shadow-lg shadow-primary-500/25 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Route Corridor</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: "all", label: "All Routes" },
            { id: "outstation_route", label: "Outstation Routes" },
            { id: "popular_hub", label: "Operational Hubs" },
            { id: "tour_package", label: "Tour Packages" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? "bg-primary-6000 text-white shadow-md shadow-primary-6000/25 scale-102"
                  : "bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/80 hover:bg-neutral-100/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search routes..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-medium focus:ring-2 focus:ring-primary-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
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
                        onClick={() => {
                          setEditingRoute(route);
                          setIsModalOpen(true);
                        }}
                        className="p-1 text-neutral-400 hover:text-primary-600 transition"
                        title="Edit Route"
                      >
                        <PencilSquareIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="p-1 text-neutral-400 hover:text-rose-500 transition"
                        title="Delete Route"
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

      {/* Reusable Modal for Add & Edit */}
      <ModalRoute
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRoute(null);
        }}
        onSaved={fetchRoutes}
        editingRoute={editingRoute}
      />
    </div>
  );
};

export default RoutesCmsView;
