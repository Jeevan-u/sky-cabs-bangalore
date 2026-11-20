"use client";

import React, { useState, useMemo } from "react";
import {
  PhoneIcon,
  PlusIcon,
  CheckBadgeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import StatusBadge from "../components/StatusBadge";
import { DriverUserItem } from "../types";
import { SADHGURU_FLEET } from "@/data/sadhguruFleet";
import { TiltedCard } from "@/components/reactbits";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalEditDriver from "../modals/ModalEditDriver";

interface FleetViewProps {
  drivers: DriverUserItem[];
  onOpenAddDriverModal: () => void;
  onRefresh: () => void;
  searchFilter?: string;
}

export default function FleetView({
  drivers,
  onOpenAddDriverModal,
  onRefresh,
  searchFilter = "",
}: FleetViewProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingDriver, setEditingDriver] = useState<DriverUserItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        d.name?.toLowerCase().includes(q) ||
        d.phone?.includes(q) ||
        d.assigned_vehicle?.toLowerCase().includes(q) ||
        d.duty_status?.toLowerCase().includes(q)
      );
    });
  }, [drivers, searchFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDrivers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedDrivers = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredDrivers.slice(start, start + pageSize);
  }, [filteredDrivers, safeCurrentPage, pageSize]);

  const handleToggleDutyStatus = async (
    driverId: string,
    newStatus: "Available" | "On Duty" | "Off Duty"
  ) => {
    setUpdatingId(driverId);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: driverId, duty_status: newStatus }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to update driver status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteDriver = async (driverId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from active fleet?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/users?id=${driverId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete driver:", err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header bar with Add Driver CTA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Chauffeur & Fleet Management
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-[11px] font-bold text-primary-600 dark:text-primary-400">
              Verified Highway Pilots
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
            {drivers.length} Verified Highway Chauffeurs • {SADHGURU_FLEET.length} Commercial Vehicle Categories
          </p>
        </div>
        <button
          onClick={onOpenAddDriverModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          Add Chauffeur
        </button>
      </div>

      {/* Driver Cards Grid */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 mb-4 flex items-center justify-between">
          <span>Active Chauffeur Roster ({filteredDrivers.length})</span>
          {searchFilter.trim() && (
            <span className="text-primary-600 dark:text-primary-400 font-bold lowercase text-[11px]">
              matching &quot;{searchFilter}&quot;
            </span>
          )}
        </h4>
        {filteredDrivers.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl text-neutral-400 text-xs">
            No chauffeurs match &quot;{searchFilter}&quot;.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedDrivers.map((d) => {
                const status = d.duty_status || "Available";

                return (
                  <div
                    key={d.id}
                    className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md shadow-primary-500/20">
                            {d.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5">
                              {d.name}
                              <CheckBadgeIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                            </h4>
                            <a
                              href={`tel:${d.phone}`}
                              className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <PhoneIcon className="w-3 h-3" />
                              {d.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <StatusBadge status={status} size="sm" />
                          <button
                            onClick={() => setEditingDriver(d)}
                            className="p-1.5 rounded-xl text-neutral-400 hover:text-primary-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title="Edit Chauffeur"
                          >
                            <PencilSquareIcon className="w-3.5 h-3.5" />
                          </button>
                          {d.role !== "owner" && (
                            <button
                              onClick={() => handleDeleteDriver(d.id, d.name)}
                              className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Remove Chauffeur"
                            >
                              <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
                          <span className="text-neutral-400 font-medium">Assigned Vehicle:</span>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">
                            {d.assigned_vehicle || "Floating Vehicle"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
                          <span className="text-neutral-400 font-medium">System Role:</span>
                          <span className="capitalize font-semibold">{d.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* Duty Status Buttons */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                      <button
                        disabled={updatingId === d.id}
                        onClick={() => handleToggleDutyStatus(d.id, "Available")}
                        className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                          status === "Available"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
                        }`}
                      >
                        Available
                      </button>
                      <button
                        disabled={updatingId === d.id}
                        onClick={() => handleToggleDutyStatus(d.id, "On Duty")}
                        className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                          status === "On Duty"
                            ? "bg-primary-6000 text-white shadow-sm"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
                        }`}
                      >
                        On Duty
                      </button>
                      <button
                        disabled={updatingId === d.id}
                        onClick={() => handleToggleDutyStatus(d.id, "Off Duty")}
                        className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                          status === "Off Duty"
                            ? "bg-neutral-700 text-white shadow-sm"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
                        }`}
                      >
                        Off Duty
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
              <AdminTablePagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalItems={filteredDrivers.length}
                pageSize={pageSize}
                pageSizeOptions={[3, 6, 9, 15]}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Fleet Vehicles Catalog Overview (Enhanced with ReactBits TiltedCard matching Landing Page) */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <span>Registered Fleet Specifications</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase border border-amber-500/20">
                Interactive 3D Cards
              </span>
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Hover over vehicles to interact with luxury 3D perspective
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SADHGURU_FLEET.map((v) => (
            <TiltedCard key={v.id} maxAngle={10} scale={1.03} className="h-full">
              <div className="h-full p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-full h-36 bg-gradient-to-b from-neutral-100 to-neutral-200/60 dark:from-neutral-800 dark:to-neutral-800/40 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center shadow-inner relative mb-4">
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
                  </div>

                  <div className="min-w-0">
                    <h5 className="font-extrabold text-sm text-neutral-900 dark:text-white truncate">
                      {v.name}
                    </h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 font-medium">
                      {v.bestFor || v.description || `${v.category} Luxury Chauffeur Travel`}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-black">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Highway</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ₹{v.perKmRate}/km
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Airport Flat</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ₹{v.airportFlatRate}
                    </span>
                  </div>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>

      <ModalEditDriver
        isOpen={!!editingDriver}
        onClose={() => setEditingDriver(null)}
        onSaved={onRefresh}
        driver={editingDriver}
      />
    </div>
  );
}
