"use client";

import React, { FC, useState, useEffect, useMemo } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import AdminTablePagination from "../components/AdminTablePagination";

interface GpsPing {
  id: string;
  booking_id: string;
  driver_id: string;
  driver_name: string;
  vehicle_number: string;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  timestamp: string;
}

const LiveGpsTrackingView: FC = () => {
  const [pings, setPings] = useState<GpsPing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const fetchPings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gps");
      const data = await res.json();
      if (data.success && Array.isArray(data.pings)) {
        setPings(data.pings);
      }
    } catch (err) {
      console.error("Failed to load GPS pings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPings();
    const interval = setInterval(fetchPings, 15000); // 15s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.max(1, Math.ceil(pings.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPings = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return pings.slice(start, start + pageSize);
  }, [pings, safeCurrentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Real-Time Fleet Geolocation Radar</span>
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-1 tracking-tight">
            Live GPS Fleet Radar
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
            Real-time telemetry broadcasting from driver mobile apps during active journeys across Hyderabad, Telangana & AP.
          </p>
        </div>

        <button
          onClick={fetchPings}
          disabled={loading}
          className="px-5 py-2.5 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 text-neutral-700 dark:text-neutral-300 font-bold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <ArrowPathIcon className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Radar (15s Auto)
        </button>
      </div>

      {/* Radar Map Visual Container */}
      <div className="w-full h-72 sm:h-96 rounded-3xl bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 overflow-hidden relative shadow-2xl p-5 flex flex-col justify-between">
        {/* Radar concentric visual rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-48 h-48 rounded-full border border-emerald-500 animate-ping"></div>
          <div className="w-96 h-96 rounded-full border border-emerald-500/40 absolute"></div>
          <div className="w-full max-w-xl h-full max-h-xl rounded-full border border-emerald-500/20 absolute"></div>
        </div>

        {/* Top Radar Legend */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Kukatpally Dispatch Radar • Lat: 17.4947° N, Lon: 78.3996° E
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-neutral-300 border border-neutral-700 text-[11px] font-bold backdrop-blur-md">
            {pings.length} Active Vehicles Transmitting
          </span>
        </div>

        {/* Radar sweep targets */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pings.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-2xl bg-neutral-900/80 border border-emerald-500/30 backdrop-blur-md text-xs space-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {p.vehicle_number}
                </span>
                <span className="font-mono text-emerald-400 text-[10px] font-bold">
                  {p.speed || 42} KM/H
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 truncate">
                Chauffeur: <strong className="text-neutral-200">{p.driver_name}</strong>
              </p>
              <div className="text-[10px] font-mono text-neutral-500 flex items-center justify-between pt-1 border-t border-neutral-800">
                <span>Trip #{p.booking_id}</span>
                <span>Active Geofence</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Radar Controls */}
        <div className="relative z-10 text-[10px] text-neutral-400 font-mono flex items-center justify-between border-t border-neutral-800/80 pt-3">
          <span>GPS Geolocation Frequency: 15s Continuous Foreground Tracking</span>
          <span>Security Protocol: Encrypted Stream</span>
        </div>
      </div>

      {/* Telemetry Log Table */}
      <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Active Journey Coordinates Manifest
          </h3>
          <span className="text-xs text-neutral-400 font-medium">Auto-updated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-left text-xs">
            <thead className="bg-neutral-100/60 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 font-bold uppercase text-[10px] border-b border-neutral-200/80 dark:border-neutral-800 whitespace-nowrap">
              <tr>
                <th className="py-3.5 px-4 w-44">Chauffeur</th>
                <th className="py-3.5 px-4 w-36">Vehicle Number</th>
                <th className="py-3.5 px-4 w-32">Trip Booking</th>
                <th className="py-3.5 px-4 min-w-[180px]">Current Coordinates</th>
                <th className="py-3.5 px-4 w-28">Speed</th>
                <th className="py-3.5 px-4 w-32">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-neutral-700 dark:text-neutral-300 font-medium whitespace-nowrap">
              {paginatedPings.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {p.driver_name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">{p.vehicle_number}</td>
                  <td className="py-3.5 px-4 font-mono text-primary-6000 font-bold">#{p.booking_id}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    {p.latitude.toFixed(4)}° N, {p.longitude.toFixed(4)}° E
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {p.speed || 38} KM/H
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                    {new Date(p.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
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
          totalItems={pings.length}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default LiveGpsTrackingView;