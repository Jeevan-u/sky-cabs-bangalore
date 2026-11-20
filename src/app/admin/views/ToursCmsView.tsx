"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  SparklesIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalTourPackage from "../modals/ModalTourPackage";
import { TourPackageItem } from "../types";

export default function ToursCmsView() {
  const [packages, setPackages] = useState<TourPackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeState, setActiveState] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackageItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tours-cms");
      const data = await res.json();
      if (data.success && Array.isArray(data.packages)) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.error("Failed to load tour packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleTogglePublish = async (pkg: TourPackageItem) => {
    try {
      await fetch("/api/tours-cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pkg.id, is_published: !pkg.is_published }),
      });
      fetchPackages();
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDeletePackage = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete tour package "${name}"?`)) return;
    try {
      await fetch(`/api/tours-cms?id=${id}`, { method: "DELETE" });
      fetchPackages();
    } catch (err) {
      console.error("Delete tour package error:", err);
    }
  };

  const filteredPackages = useMemo(() => {
    return packages.filter((p) => {
      const matchesState = activeState === "all" || p.state === activeState;
      const matchesQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.state.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesQuery;
    });
  }, [packages, activeState, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPackages = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredPackages.slice(start, start + pageSize);
  }, [filteredPackages, safeCurrentPage, pageSize]);

  const stateTabs = [
    { id: "all", label: "All Packages" },
    { id: "Andhra Pradesh", label: "Andhra Pradesh" },
    { id: "Karnataka", label: "Karnataka" },
    { id: "Tamil Nadu", label: "Tamil Nadu" },
    { id: "Kerala", label: "Kerala" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <SparklesIcon className="w-4 h-4" />
            <span>Landing Page CMS</span>
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-1">
            Tour & Pilgrimage Packages
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Manage packages displayed in South India Pilgrimage & State tours sections.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchPackages}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Refresh packages"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              setEditingPackage(null);
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white text-xs font-black shadow-lg shadow-primary-500/25 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add New Package</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Horizontal scrollable tabs on mobile */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth">
          {stateTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveState(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeState === tab.id
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tours..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-medium focus:ring-2 focus:ring-primary-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Package Content List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading tour packages...</div>
      ) : filteredPackages.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80">
          <p className="text-sm font-bold text-neutral-500">No tour packages found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile Side-by-Side Cards (block md:hidden) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {paginatedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-4 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-neutral-900/80 text-[10px] font-bold text-white">
                      {pkg.state}
                    </div>
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          pkg.is_published
                            ? "bg-emerald-500 text-white"
                            : "bg-neutral-500 text-white"
                        }`}
                      >
                        {pkg.is_published ? "Live" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">
                    {pkg.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                    {pkg.tagline}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500 dark:text-neutral-400 mt-2">
                    <span>{pkg.dist}</span>
                    <span>{pkg.days}</span>
                    <span className="text-primary-600 dark:text-primary-400 font-extrabold">
                      {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "Custom Quote"}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleTogglePublish(pkg)}
                    className="text-[11px] font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1"
                  >
                    {pkg.is_published ? (
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
                        setEditingPackage(pkg);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop High-Density Table (hidden md:block) */}
          <div className="hidden md:block rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
            <div className="overflow-x-auto min-w-full">
              <table className="min-w-[900px] w-full text-left text-xs">
                <thead className="bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-neutral-200/80 dark:border-neutral-800/80">
                  <tr>
                    <th className="py-3.5 px-4">Tour Package</th>
                    <th className="py-3.5 px-4">State</th>
                    <th className="py-3.5 px-4">Distance & Days</th>
                    <th className="py-3.5 px-4">Base Fare</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {paginatedPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-12 h-10 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <div className="font-extrabold text-neutral-900 dark:text-white">
                              {pkg.name}
                            </div>
                            <div className="text-[11px] text-neutral-400 line-clamp-1">
                              {pkg.tagline}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-700 dark:text-neutral-300">
                        {pkg.state}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900 dark:text-white">{pkg.dist}</div>
                        <div className="text-[11px] text-neutral-400">{pkg.days}</div>
                      </td>
                      <td className="py-3.5 px-4 font-black text-primary-600 dark:text-primary-400">
                        {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "Custom Quote"}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(pkg)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            pkg.is_published
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                          }`}
                        >
                          {pkg.is_published ? (
                            <>
                              <CheckCircleIcon className="w-3.5 h-3.5" />
                              <span>Live on Web</span>
                            </>
                          ) : (
                            <>
                              <XCircleIcon className="w-3.5 h-3.5" />
                              <span>Draft Hidden</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingPackage(pkg);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                            title="Edit Package"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                            className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                            title="Delete Package"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <AdminTablePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredPackages.length}
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
      )}

      {/* Modal */}
      <ModalTourPackage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchPackages}
        editingPackage={editingPackage}
      />
    </div>
  );
}
