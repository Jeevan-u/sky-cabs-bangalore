"use client";

import React, { FC, useState, useMemo } from "react";
import {
  UsersIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  PhoneIcon,
  CheckBadgeIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import StatusBadge from "../components/StatusBadge";
import { DriverUserItem } from "../types";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalAddDriver from "../modals/ModalAddDriver";
import ModalEditDriver from "../modals/ModalEditDriver";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";

interface DriversViewProps {
  drivers: DriverUserItem[];
  onRefresh: () => void;
  searchFilter?: string;
}

export default function DriversView({
  drivers,
  onRefresh,
  searchFilter = "",
}: DriversViewProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [internalSearch, setInternalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<DriverUserItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const query = internalSearch || searchFilter;

  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      const status = d.duty_status || "Available";
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const q = query.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.name?.toLowerCase().includes(q) ||
        d.phone?.includes(q) ||
        d.assigned_vehicle?.toLowerCase().includes(q) ||
        d.duty_status?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [drivers, statusFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filteredDrivers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedDrivers = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredDrivers.slice(start, start + pageSize);
  }, [filteredDrivers, safeCurrentPage, pageSize]);

  // Counts
  const availableCount = drivers.filter((d) => (d.duty_status || "Available") === "Available").length;
  const onDutyCount = drivers.filter((d) => d.duty_status === "On Duty").length;
  const offDutyCount = drivers.filter((d) => d.duty_status === "Off Duty").length;

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
    if (!window.confirm(`Are you sure you want to permanently remove ${name} from active roster?`)) {
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
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <UsersIcon className="w-4 h-4" />
            <span>Chauffeur Roster & Pilots</span>
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-1">
            Chauffeur & Driver Management
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Manage highway-certified pilots, assigned vehicles, contact details, and instant dispatch duty statuses.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white font-black text-xs shadow-lg shadow-primary-6000/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Chauffeur</span>
        </button>
      </div>

      {/* KPI Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <SpotlightCard
          spotlightColor="rgba(59, 130, 246, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Total Chauffeurs
          </p>
          <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-1">
            <AnimatedCounter to={drivers.length} />
          </p>
          <p className="text-[10px] text-primary-600 dark:text-primary-400 font-bold mt-1">
            Verified Highway Pilots
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Available Ready
          </p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            <AnimatedCounter to={availableCount} />
          </p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">
            Ready for 10-Min Dispatch
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            On Duty In Transit
          </p>
          <p className="text-xl sm:text-2xl font-black text-primary-600 dark:text-primary-400 mt-1">
            <AnimatedCounter to={onDutyCount} />
          </p>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            Active Passenger Rides
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(168, 85, 247, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Off Duty Resting
          </p>
          <p className="text-xl sm:text-2xl font-black text-neutral-600 dark:text-neutral-400 mt-1">
            <AnimatedCounter to={offDutyCount} />
          </p>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            Post-Trip Recovery
          </p>
        </SpotlightCard>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: "all", label: "All Pilots" },
            { id: "Available", label: "Available" },
            { id: "On Duty", label: "On Duty" },
            { id: "Off Duty", label: "Off Duty" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            placeholder="Search by name, phone, car..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-medium focus:ring-2 focus:ring-primary-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Drivers Content */}
      {filteredDrivers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl text-neutral-400 text-xs">
          No chauffeurs found matching your criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile Side-by-Side Cards (block md:hidden) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {paginatedDrivers.map((d) => {
              const status = d.duty_status || "Available";

              return (
                <div
                  key={d.id}
                  className="p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col justify-between space-y-3"
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingDriver(d)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        {d.role !== "owner" && (
                          <button
                            onClick={() => handleDeleteDriver(d.id, d.name)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-neutral-400 text-[10px] uppercase">Assigned Car</span>
                        <span className="text-neutral-800 dark:text-neutral-200 uppercase font-mono">
                          {d.assigned_vehicle || "Floating Pilot"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-neutral-400 text-[10px] uppercase">Status</span>
                        <StatusBadge status={status} size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* 3-State Toggle Pill Buttons */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5">
                    <button
                      disabled={updatingId === d.id}
                      onClick={() => handleToggleDutyStatus(d.id, "Available")}
                      className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                        status === "Available"
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      Available
                    </button>
                    <button
                      disabled={updatingId === d.id}
                      onClick={() => handleToggleDutyStatus(d.id, "On Duty")}
                      className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                        status === "On Duty"
                          ? "bg-primary-6000 text-white shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      On Duty
                    </button>
                    <button
                      disabled={updatingId === d.id}
                      onClick={() => handleToggleDutyStatus(d.id, "Off Duty")}
                      className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                        status === "Off Duty"
                          ? "bg-neutral-700 text-white shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      Off Duty
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop High-Density Table (hidden md:block) */}
          <div className="hidden md:block rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
            <div className="overflow-x-auto min-w-full">
              <table className="min-w-[900px] w-full text-left text-xs">
                <thead className="bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-neutral-200/80 dark:border-neutral-800/80">
                  <tr>
                    <th className="py-3.5 px-4">Pilot Profile</th>
                    <th className="py-3.5 px-4">Mobile Contact</th>
                    <th className="py-3.5 px-4">Assigned Vehicle</th>
                    <th className="py-3.5 px-4">Duty Status</th>
                    <th className="py-3.5 px-4 text-center">Quick Status Change</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {paginatedDrivers.map((d) => {
                    const status = d.duty_status || "Available";

                    return (
                      <tr key={d.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow">
                              {d.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-extrabold text-neutral-900 dark:text-white flex items-center gap-1">
                                {d.name}
                                <CheckBadgeIcon className="w-3.5 h-3.5 text-emerald-500" />
                              </div>
                              <div className="text-[10px] text-neutral-400 uppercase">
                                {d.role === "owner" ? "Owner & Senior Pilot" : "Highway Certified Pilot"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`tel:${d.phone}`}
                            className="font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                          >
                            <PhoneIcon className="w-3.5 h-3.5" />
                            {d.phone}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase">
                          {d.assigned_vehicle || "Unassigned"}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={status} size="sm" />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                            <button
                              disabled={updatingId === d.id}
                              onClick={() => handleToggleDutyStatus(d.id, "Available")}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                status === "Available"
                                  ? "bg-emerald-500 text-white shadow-sm"
                                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                              }`}
                            >
                              Available
                            </button>
                            <button
                              disabled={updatingId === d.id}
                              onClick={() => handleToggleDutyStatus(d.id, "On Duty")}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                status === "On Duty"
                                  ? "bg-primary-6000 text-white shadow-sm"
                                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                              }`}
                            >
                              On Duty
                            </button>
                            <button
                              disabled={updatingId === d.id}
                              onClick={() => handleToggleDutyStatus(d.id, "Off Duty")}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                status === "Off Duty"
                                  ? "bg-neutral-700 text-white shadow-sm"
                                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                              }`}
                            >
                              Off Duty
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingDriver(d)}
                              className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                              title="Edit Chauffeur"
                            >
                              <PencilSquareIcon className="w-4 h-4" />
                            </button>
                            {d.role !== "owner" && (
                              <button
                                onClick={() => handleDeleteDriver(d.id, d.name)}
                                className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                                title="Remove Chauffeur"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <AdminTablePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredDrivers.length}
              pageSize={pageSize}
              pageSizeOptions={[3, 6, 12, 24]}
              onPageChange={(p) => setCurrentPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <ModalAddDriver
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDriverAdded={onRefresh}
      />

      <ModalEditDriver
        isOpen={!!editingDriver}
        onClose={() => setEditingDriver(null)}
        onSaved={onRefresh}
        driver={editingDriver}
      />
    </div>
  );
}
