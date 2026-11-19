"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import {
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  SparklesIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";

interface CustomQuotation {
  id: string;
  customer_name: string;
  customer_phone: string;
  pickup_address: string;
  drop_address: string;
  distance_km?: number;
  vehicle_type: string;
  pickup_datetime: string;
  notes?: string;
  quoted_price?: number;
  status: "Pending" | "Quoted" | "Accepted" | "Rejected";
  created_at: string;
}

interface QuotationsViewProps {
  searchFilter?: string;
}

const QuotationsView: FC<QuotationsViewProps> = ({ searchFilter = "" }) => {
  const [quotations, setQuotations] = useState<CustomQuotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [quotePriceInput, setQuotePriceInput] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      if (!searchFilter.trim()) return true;
      const filter = searchFilter.toLowerCase();
      return (
        q.id?.toLowerCase().includes(filter) ||
        q.customer_name?.toLowerCase().includes(filter) ||
        q.customer_phone?.includes(filter) ||
        q.pickup_address?.toLowerCase().includes(filter) ||
        q.drop_address?.toLowerCase().includes(filter) ||
        q.vehicle_type?.toLowerCase().includes(filter) ||
        q.status?.toLowerCase().includes(filter)
      );
    });
  }, [quotations, searchFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredQuotations.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedQuotations = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredQuotations.slice(start, start + pageSize);
  }, [filteredQuotations, safeCurrentPage, pageSize]);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quotations");
      const data = await res.json();
      if (data.success && Array.isArray(data.quotations)) {
        setQuotations(data.quotations);
      }
    } catch (err) {
      console.error("Failed to load quotations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleSendQuote = async (quote: CustomQuotation) => {
    const price = parseInt(quotePriceInput, 10);
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid quotation amount (e.g. 3500).");
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch("/api/quotations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: quote.id, quoted_price: price, status: "Quoted" }),
      });

      if (res.ok) {
        setActiveQuoteId(null);
        setQuotePriceInput("");
        fetchQuotations();

        // Dispatch WhatsApp quotation message to customer
        const cleanPhone = quote.customer_phone.replace(/[^0-9]/g, "");
        const msg = encodeURIComponent(
          `Namaste ${quote.customer_name}! Sri Sadhguru Tours & Travels has reviewed your custom route request (ID: ${quote.id}).\n\n` +
          `• Route: ${quote.pickup_address} -> ${quote.drop_address}\n` +
          `• Vehicle: ${quote.vehicle_type}\n` +
          `• Special Quotation: ₹${price.toLocaleString("en-IN")} (All-inclusive)\n\n` +
          `Please reply YES to confirm and allocate driver, or call Proprietor Rathan Kanna: +91 8106117704.`
        );
        window.open(`https://wa.me/91${cleanPhone}?text=${msg}`, "_blank");
      }
    } catch (err) {
      console.error("Send quote error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this custom route quotation request?")) return;
    try {
      await fetch(`/api/quotations?id=${id}`, { method: "DELETE" });
      fetchQuotations();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-amber-500">
            <SparklesIcon className="w-4 h-4" />
            <span>Custom Route & Dynamic GPS Inquiries</span>
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-1 tracking-tight">
            Custom Quotations Manager
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
            Leads generated from the website when passengers choose &quot;Other Non-Hub Route&quot; with custom GPS pickup and drop pins.
          </p>
        </div>

        <button
          onClick={fetchQuotations}
          disabled={loading}
          className="p-2.5 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition shadow-sm active:scale-95"
          title="Refresh Queue"
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Quotations List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-neutral-400">Loading custom quotation requests...</div>
      ) : filteredQuotations.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl text-neutral-400 text-xs">
          {searchFilter.trim()
            ? `No custom route quotations match "${searchFilter}".`
            : "No custom route quotation requests in the queue right now."}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paginatedQuotations.map((q) => {
              const isQuoted = q.status === "Quoted";
              const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                q.pickup_address
              )}&destination=${encodeURIComponent(q.drop_address)}`;

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-500">{q.id}</span>
                          <span className="text-[10px] text-neutral-400">
                            {new Date(q.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-black text-base text-neutral-900 dark:text-white mt-1">
                          {q.customer_name}
                        </h3>
                        <span className="font-mono text-xs text-neutral-500 font-medium">
                          {q.customer_phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            q.status === "Pending"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {q.status}
                        </span>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition"
                          title="Delete Quote Request"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Route & Vehicle Info */}
                    <div className="p-3.5 mt-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-neutral-400 text-[10px] uppercase block">
                            Pickup Point
                          </span>
                          <span className="font-bold text-neutral-800 dark:text-neutral-200">
                            {q.pickup_address}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPinIcon className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-neutral-400 text-[10px] uppercase block">
                            Drop Location
                          </span>
                          <span className="font-bold text-neutral-800 dark:text-neutral-200">
                            {q.drop_address}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-neutral-500 text-[11px]">
                        <span>Vehicle: <strong className="text-neutral-900 dark:text-white">{q.vehicle_type}</strong></span>
                        <a
                          href={gmapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary-6000 dark:text-primary-400 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Check on Google Maps</span>
                          <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {q.notes && (
                      <p className="text-[11px] text-neutral-500 italic mt-2">
                        &quot;{q.notes}&quot;
                      </p>
                    )}
                  </div>

                  {/* Quotation Action Box */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                    {isQuoted ? (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                            Quoted Rate Sent
                          </span>
                          <span className="text-base font-black font-mono text-emerald-600">
                            ₹{q.quoted_price?.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveQuoteId(q.id);
                            setQuotePriceInput(String(q.quoted_price || ""));
                          }}
                          className="px-3 py-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-300 transition"
                        >
                          Re-quote
                        </button>
                      </div>
                    ) : activeQuoteId === q.id ? (
                      <div className="space-y-2 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase block">
                          Enter Fare Quote in INR (₹):
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="e.g. 3500"
                            value={quotePriceInput}
                            onChange={(e) => setQuotePriceInput(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-mono font-bold outline-none focus:border-amber-500"
                          />
                          <button
                            onClick={() => handleSendQuote(q)}
                            disabled={actionLoading}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95"
                          >
                            <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                            Send
                          </button>
                        </div>
                        <button
                          onClick={() => setActiveQuoteId(null)}
                          className="text-[10px] text-neutral-400 hover:underline block pt-1"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveQuoteId(q.id);
                          setQuotePriceInput(q.quoted_price ? String(q.quoted_price) : "");
                        }}
                        className="w-full py-2.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm shadow-primary-6000/20 transition-all active:scale-95"
                      >
                        <SparklesIcon className="w-4 h-4" />
                        Enter Quote & Send to Passenger
                      </button>
                    )}
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
              totalItems={filteredQuotations.length}
              pageSize={pageSize}
              pageSizeOptions={[4, 6, 12, 24]}
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
  );
};

export default QuotationsView;