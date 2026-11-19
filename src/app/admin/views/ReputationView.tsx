"use client";

import React from "react";
import {
  StarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { ReviewItem } from "../types";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";

interface ReputationViewProps {
  reviews: ReviewItem[];
}

export default function ReputationView({ reviews }: ReputationViewProps) {
  const avgRating =
    reviews.length > 0
      ? Number(
          (
            reviews.reduce((sum, r) => sum + (r.overall_rating || 5), 0) / reviews.length
          ).toFixed(1)
        )
      : 4.9;

  const fiveStarCount = reviews.filter((r) => r.overall_rating >= 4).length;
  const interceptedCount = reviews.filter((r) => r.overall_rating < 4).length;

  const handleResolveComplaint = (r: ReviewItem) => {
    const cleanPhone = r.customer_phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

    const text =
      `*Sri Sadhguru Tours & Travels - Management Follow-up*\n\n` +
      `Dear ${r.customer_name},\n` +
      `This is Rathan Kanna, Proprietor of Sri Sadhguru Travels. I noticed your recent trip feedback regarding: "${r.feedback_notes || "service issues"}".\n\n` +
      `I sincerely apologize for any inconvenience caused. We take pride in spotless service. I would like to speak with you directly and resolve this. Please let me know when you are available for a quick call.`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Reputation KPI Tiles with ReactBits SpotlightCard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.14)"
          className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex items-center justify-between"
        >
          <div>
            <p className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
              Aggregate Rating
            </p>
            <p className="text-3xl font-black text-amber-500 mt-2 flex items-center gap-1.5">
              {avgRating} <StarIcon className="w-6 h-6 inline" />
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Based on {reviews.length} customer audits</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-2xs">
            <StarIcon className="w-7 h-7" />
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.14)"
          className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex items-center justify-between"
        >
          <div>
            <p className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
              Google Maps Boosts
            </p>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
              <AnimatedCounter to={fiveStarCount} />
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">4 & 5-Star reviews routed to Google Maps</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-2xs">
            <CheckCircleIcon className="w-7 h-7" />
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.14)"
          className="p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl flex items-center justify-between"
        >
          <div>
            <p className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-wider">
              Privately Intercepted
            </p>
            <p className="text-3xl font-black text-primary-600 dark:text-primary-400 mt-2">
              <AnimatedCounter to={interceptedCount} />
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Negative reviews shielded from public</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-primary-500/10 text-primary-600 border border-primary-500/20 shadow-2xs">
            <ShieldCheckIcon className="w-7 h-7" />
          </div>
        </SpotlightCard>
      </div>

      {/* Review Feed */}
      <div className="rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <h3 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Customer Feedback & AI Reputation Logs
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
            Incoming ratings generated from post-trip WhatsApp links (`/review`)
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="py-20 text-center text-neutral-400">
            <StarIcon className="w-12 h-12 mx-auto mb-3 text-neutral-300 dark:text-neutral-700" />
            <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              No Feedback Entries Yet
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              When customers complete their reviews via `/review`, the results and AI drafts will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {reviews.map((r) => {
              const isPositive = r.overall_rating >= 4;

              return (
                <div key={r.id} className="p-5 sm:p-6 flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < r.overall_rating ? "text-amber-400" : "text-neutral-200 dark:text-neutral-700"
                            }`}
                          />
                        ))}
                      </div>

                      <span className="font-bold text-sm text-neutral-900 dark:text-white">
                        {r.customer_name}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">{r.customer_phone}</span>

                      {isPositive ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 text-[10px] font-extrabold uppercase inline-flex items-center gap-1">
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Routed to Google Maps</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 text-[10px] font-extrabold uppercase inline-flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          <span>Intercepted Privately</span>
                        </span>
                      )}
                    </div>

                    {r.feedback_notes && (
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/60 p-3.5 rounded-2xl border border-neutral-100 dark:border-neutral-800 italic">
                        &quot;{r.feedback_notes}&quot;
                      </p>
                    )}
                  </div>

                  {!isPositive && (
                    <button
                      onClick={() => handleResolveComplaint(r)}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-6000/25 shrink-0 self-end md:self-auto transition-all active:scale-95"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      Resolve on WhatsApp
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
