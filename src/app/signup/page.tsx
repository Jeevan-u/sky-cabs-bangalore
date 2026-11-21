"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PhoneIcon,
  LockClosedIcon,
  UserIcon,
  TruckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"driver" | "customer">("driver");
  const [vehicle, setVehicle] = useState("KA 08 UB 4512 (Innova Crysta)");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          password,
          role,
          assigned_vehicle: role === "driver" ? vehicle : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        setMsg(data.message || "Failed to register account.");
      }
    } catch (err: any) {
      setMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/95 font-sans transition-colors">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-neutral-200/80 dark:border-neutral-800">
        <div className="text-center space-y-2">
          {/* Emblem */}
          <div className="relative inline-block mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-amber-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 10.9 2 11.2V16c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-neutral-900"></span>
            </span>
          </div>

          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
            Register Chauffeur
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            Join the Sky Cabs Bangalore verified chauffeur roster
          </p>
        </div>

        {msg && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-semibold ${
              msg.includes("successfully")
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. K. Shiva Kumar"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 py-3 pl-10 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Mobile Number (WhatsApp) *
            </label>
            <div className="relative">
              <PhoneIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9948011223"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 py-3 pl-10 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Assigned Vehicle Model / Plate
            </label>
            <div className="relative">
              <TruckIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="e.g. KA 08 UB 4512 (Innova Crysta)"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 py-3 pl-10 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Account Password *
            </label>
            <div className="relative">
              <LockClosedIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a secure password"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 py-3 pl-10 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white font-black text-sm shadow-lg shadow-primary-6000/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{loading ? "Registering..." : "Submit Registration"}</span>
            {!loading && <ArrowRightIcon className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-3 text-center text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">
          Already registered?{" "}
          <Link href="/login" prefetch={true} className="font-bold text-primary-6000 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
