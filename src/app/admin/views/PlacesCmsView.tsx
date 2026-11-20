"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  MapPinIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalPlaceHub from "../modals/ModalPlaceHub";
import { PlaceHubItem } from "../types";

export default function PlacesCmsView() {
  const [hubs, setHubs] = useState<PlaceHubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<PlaceHubItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchHubs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/places-cms");
      const data = await res.json();
      if (data.success && Array.isArray(data.hubs)) {
        setHubs(data.hubs);
      }
    } catch (err) {
      console.error("Failed to load places/hubs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  const handleTogglePublish = async (hub: PlaceHubItem) => {
    try {
      await fetch("/api/places-cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: hub.id, is_published: !hub.is_published }),
      });
      fetchHubs();
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDeleteHub = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete hub "${name}"?`)) return;
    try {
      await fetch(`/api/places-cms?id=${id}`, { method: "DELETE" });
      fetchHubs();
    } catch (err) {
      console.error("Delete hub error:", err);
    }
  };

  const filteredHubs = useMemo(() => {
    return hubs.filter((h) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return h.name.toLowerCase().includes(q) || h.href.toLowerCase().includes(q);
    });
  }, [hubs, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredHubs.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedHubs = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredHubs.slice(start, start + pageSize);
  }, [filteredHubs, safeCurrentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <MapPinIcon className="w-4 h-4" />
            <span>Landing Page CMS</span>
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-1">
            Operational Hubs & Places
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Manage 24x7 doorstep pickup stations shown in the &ldquo;Popular Hubs & RGIA Airport Routes&rdquo; carousel.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchHubs}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Refresh hubs"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              setEditingHub(null);
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white text-xs font-black shadow-lg shadow-primary-500/25 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Operational Hub</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search operational hubs..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-medium focus:ring-2 focus:ring-primary-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Hubs Content */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading operational hubs...</div>
      ) : filteredHubs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80">
          <p className="text-sm font-bold text-neutral-500">No operational hubs found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile Side-by-Side Cards (block md:hidden) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {paginatedHubs.map((hub) => (
              <div
                key={hub.id}
                className="p-4 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hub.thumbnail}
                      alt={hub.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          hub.is_published
                            ? "bg-emerald-500 text-white"
                            : "bg-neutral-500 text-white"
                        }`}
                      >
                        {hub.is_published ? "Live" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">
                    {hub.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <span className="font-bold text-primary-600 dark:text-primary-400">
                      {hub.count}+ Monthly Rides
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {hub.href}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleTogglePublish(hub)}
                    className="text-[11px] font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1"
                  >
                    {hub.is_published ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-4 h-4 text-neutral-400" />
                        <span>Draft</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingHub(hub);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHub(hub.id, hub.name)}
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
              <table className="min-w-[800px] w-full text-left text-xs">
                <thead className="bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-neutral-200/80 dark:border-neutral-800/80">
                  <tr>
                    <th className="py-3.5 px-4">Operational Hub</th>
                    <th className="py-3.5 px-4">Target URL Route</th>
                    <th className="py-3.5 px-4">Monthly Rides</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {paginatedHubs.map((hub) => (
                    <tr key={hub.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={hub.thumbnail}
                            alt={hub.name}
                            className="w-12 h-10 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <div className="font-extrabold text-neutral-900 dark:text-white">
                              {hub.name}
                            </div>
                            <div className="text-[11px] text-neutral-400">
                              Sri Sadhguru 24x7 Doorstep Pickup Station
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                        {hub.href}
                      </td>
                      <td className="py-3.5 px-4 font-black text-primary-600 dark:text-primary-400">
                        {hub.count}+ Verified Rides
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(hub)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            hub.is_published
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                          }`}
                        >
                          {hub.is_published ? (
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
                              setEditingHub(hub);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                            title="Edit Hub"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteHub(hub.id, hub.name)}
                            className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                            title="Delete Hub"
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
              totalItems={filteredHubs.length}
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
      <ModalPlaceHub
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchHubs}
        editingHub={editingHub}
      />
    </div>
  );
}
