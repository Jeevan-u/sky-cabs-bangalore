"use client";

import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheckIcon,
  PhoneIcon,
  LockClosedIcon,
  ArrowRightIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon, ExclamationTriangleIcon } from "@/components/icons";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFillDemo = (type: "owner" | "driver") => {
    setErrorMsg("");
    if (type === "owner") {
      setIdentifier("8106117704");
      setPassword("Sadhguru@2026");
    } else {
      setIdentifier("9398522128");
      setPassword("Driver@2026");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: identifier.trim(),
        password,
      });

      if (res?.error) {
        setErrorMsg(res.error || "Invalid login credentials. Please try again.");
        setLoading(false);
        return;
      }

      // Check role and route immediately
      const session = await getSession();
      const role = (session?.user as any)?.role;

      if (role === "driver") {
        router.push("/driver");
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during login.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/95 font-sans transition-colors">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-neutral-200/80 dark:border-neutral-800">
        {/* Brand Header */}
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
            Sri Sadhguru Travels
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            Operations Command Center & Chauffeur Duty Portal
          </p>
        </div>

        {/* 1-Click Demo Buttons */}
        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
          <span className="font-extrabold text-neutral-400 uppercase tracking-wider block mb-2 text-[10px] flex items-center gap-1.5">
            <BoltIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>1-Click Instant Sign-In:</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo("owner")}
              className="flex-1 py-2 px-2 bg-white dark:bg-neutral-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-neutral-200 dark:border-neutral-700 rounded-xl font-bold text-[11px] text-amber-600 dark:text-amber-400 transition text-center shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShieldCheckIcon className="w-3.5 h-3.5" />
              Owner / Admin
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("driver")}
              className="flex-1 py-2 px-2 bg-white dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-neutral-200 dark:border-neutral-700 rounded-xl font-bold text-[11px] text-emerald-600 dark:text-emerald-400 transition text-center shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
            >
              <TruckIcon className="w-3.5 h-3.5" />
              Chauffeur
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
            <ExclamationTriangleIcon className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Mobile Number or Email
            </label>
            <div className="relative">
              <PhoneIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 8106117704"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 py-3 pl-10 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-primary-6000 hover:underline font-bold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <LockClosedIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 py-3 pl-10 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white font-black text-sm shadow-lg shadow-primary-6000/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? "Authenticating..." : "Sign In to Operations Hub"}
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Support Notice */}
        <div className="pt-3 text-center text-[11px] text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 font-medium">
          Chauffeur access or password reset? Call Proprietor{" "}
          <a
            href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
            className="font-bold text-primary-6000 hover:underline"
          >
            {SADHGURU_CONTACT.primaryPhoneFormatted}
          </a>
        </div>
      </div>
    </div>
  );
}
