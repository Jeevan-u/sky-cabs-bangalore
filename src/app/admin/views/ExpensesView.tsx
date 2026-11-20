"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  BanknotesIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";
import ModalExpense from "../modals/ModalExpense";
import { ExpenseItem } from "../types";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";

export default function ExpensesView() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      if (data.success && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
      }
    } catch (err) {
      console.error("Failed to load expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete expense record #${id}?`)) return;
    try {
      await fetch(`/api/expenses?id=${id}`, { method: "DELETE" });
      fetchExpenses();
    } catch (err) {
      console.error("Delete expense error:", err);
    }
  };

  const categories = [
    { id: "all", label: "All Expenses" },
    { id: "Fuel (Diesel/Petrol)", label: "Fuel" },
    { id: "FASTag & Tolls", label: "FASTag & Tolls" },
    { id: "Vehicle Maintenance & Repairs", label: "Maintenance" },
    { id: "Chauffeur Batta & Food", label: "Driver Batta" },
    { id: "Permits & Border Tax", label: "Border Permits" },
    { id: "Tyres, Oil & Spares", label: "Tyres & Spares" },
  ];

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchesCategory = selectedCategory === "all" || e.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        e.vehicle_number?.toLowerCase().includes(q) ||
        e.vehicle_name?.toLowerCase().includes(q) ||
        e.driver_name?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q) ||
        e.notes?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [expenses, selectedCategory, searchQuery]);

  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [filteredExpenses]);

  const fuelTotal = useMemo(() => {
    return expenses
      .filter((e) => e.category === "Fuel (Diesel/Petrol)")
      .reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [expenses]);

  const maintenanceTotal = useMemo(() => {
    return expenses
      .filter((e) => e.category === "Vehicle Maintenance & Repairs" || e.category === "Tyres, Oil & Spares")
      .reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [expenses]);

  const tollTotal = useMemo(() => {
    return expenses
      .filter((e) => e.category === "FASTag & Tolls" || e.category === "Permits & Border Tax")
      .reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [expenses]);

  const totalPages = Math.max(1, Math.ceil(filteredExpenses.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedExpenses = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredExpenses.slice(start, start + pageSize);
  }, [filteredExpenses, safeCurrentPage, pageSize]);

  const exportToCsv = () => {
    if (filteredExpenses.length === 0) {
      alert("No expenses to export.");
      return;
    }
    const headers = ["ID", "Date", "Vehicle", "Model", "Category", "Driver", "Amount", "Mode", "Status", "Notes"];
    const rows = filteredExpenses.map((e) => [
      e.id,
      e.date,
      e.vehicle_number,
      `"${e.vehicle_name || ""}"`,
      `"${e.category}"`,
      `"${e.driver_name || ""}"`,
      e.amount,
      e.payment_mode,
      e.status,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sstat_expenses_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <BanknotesIcon className="w-4 h-4" />
            <span>Operations & Fleet Accounting</span>
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-1">
            Fleet Operations & Expense Ledger
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Audit fuel bills, FASTag debits, maintenance invoices, and driver batta with end-to-end P&L calculation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={exportToCsv}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold transition-colors"
            title="Export Expense CSV"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={fetchExpenses}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="Refresh Ledger"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              setEditingExpense(null);
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-lg shadow-rose-600/25 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* KPI Financial Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <SpotlightCard
          spotlightColor="rgba(244, 63, 94, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Total Incurred
          </p>
          <p className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
            <AnimatedCounter
              to={totalAmount}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            {filteredExpenses.length} Audited Receipts
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(234, 88, 12, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Fuel (Diesel/Petrol)
          </p>
          <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            <AnimatedCounter
              to={fuelTotal}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            IOCL / HPCL Pump Slips
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(59, 130, 246, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Tolls & Border Tax
          </p>
          <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            <AnimatedCounter
              to={tollTotal}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            FASTag & State Permits
          </p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(168, 85, 247, 0.14)"
          className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl"
        >
          <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
            Service & Spares
          </p>
          <p className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
            <AnimatedCounter
              to={maintenanceTotal}
              formatter={(val) => `₹${Math.round(val).toLocaleString("en-IN")}`}
            />
          </p>
          <p className="text-[10px] text-neutral-500 font-medium mt-1">
            Scheduled Maintenance
          </p>
        </SpotlightCard>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vehicle, driver, category..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-medium focus:ring-2 focus:ring-rose-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Expenses Content */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading expense ledger...</div>
      ) : filteredExpenses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80">
          <p className="text-sm font-bold text-neutral-500">No expenses recorded in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile Side-by-Side Cards (block md:hidden) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {paginatedExpenses.map((e) => (
              <div
                key={e.id}
                className="p-4 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono font-bold text-neutral-500">
                      {e.id}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-400">{e.date}</span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase">
                        {e.vehicle_number}
                      </h4>
                      <p className="text-xs text-neutral-500">{e.vehicle_name || "Commercial Vehicle"}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black font-mono text-rose-600 dark:text-rose-400">
                        ₹{e.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-neutral-500">Category:</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{e.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-neutral-500">Driver/Staff:</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{e.driver_name || "Headquarters"}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-neutral-500">Payment:</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{e.payment_mode}</span>
                    </div>
                  </div>

                  {e.notes && (
                    <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2">
                      {e.notes}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    {e.status}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingExpense(e);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                    >
                      <PencilSquareIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(e.id)}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop High-Density Table (hidden md:block) */}
          <div className="hidden md:block rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
            <div className="overflow-x-auto min-w-full">
              <table className="min-w-[950px] w-full text-left text-xs">
                <thead className="bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-neutral-200/80 dark:border-neutral-800/80">
                  <tr>
                    <th className="py-3.5 px-4">Expense ID & Date</th>
                    <th className="py-3.5 px-4">Vehicle & Model</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Incurred By</th>
                    <th className="py-3.5 px-4">Payment Mode</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {paginatedExpenses.map((e) => (
                    <tr key={e.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-neutral-900 dark:text-white">
                          #{e.id}
                        </div>
                        <div className="text-[11px] text-neutral-400">{e.date}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-neutral-900 dark:text-white uppercase">
                          {e.vehicle_number}
                        </div>
                        <div className="text-[11px] text-neutral-400">{e.vehicle_name || "Commercial"}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-neutral-800 dark:text-neutral-200">
                        {e.category}
                        {e.notes && (
                          <div className="text-[10px] text-neutral-400 font-normal line-clamp-1">
                            {e.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 font-medium">
                        {e.driver_name || "Operations Team"}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-600 dark:text-neutral-400">
                        {e.payment_mode}
                      </td>
                      <td className="py-3.5 px-4 font-black font-mono text-rose-600 dark:text-rose-400 text-sm">
                        ₹{e.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {e.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingExpense(e);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                            title="Edit Expense"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(e.id)}
                            className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                            title="Delete Expense"
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
              totalItems={filteredExpenses.length}
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

      {/* Modal */}
      <ModalExpense
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchExpenses}
        editingExpense={editingExpense}
      />
    </div>
  );
}
