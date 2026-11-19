"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPinIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  WhatsAppIcon,
  SparklesIcon,
  CarIcon,
  ClockIcon,
  UserIcon,
  CheckBadgeIcon,
  TruckIcon,
} from "@/components/icons";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { Confetti, BorderBeam } from "@/components/reactbits";

const HIGHLIGHT_TAGS = [
  { id: "clean_cab", label: "Spotless Clean Cab", iconKey: "car" },
  { id: "on_time", label: "Punctual & On-Time", iconKey: "clock" },
  { id: "polite_driver", label: "Polite & Courteous Driver", iconKey: "driver" },
  { id: "comfort_ac", label: "Chilled AC & Great Comfort", iconKey: "comfort" },
  { id: "safe_driving", label: "Safe & Smooth Highway Driving", iconKey: "safety" },
  { id: "reasonable_price", label: "Best Quotation & Fair Price", iconKey: "price" },
  { id: "spacious_luggage", label: "Ample Luggage Space", iconKey: "luggage" },
];

function renderTagIcon(key: string, active: boolean) {
  const cls = `w-4 h-4 shrink-0 ${active ? "text-slate-950" : "text-amber-400"}`;
  switch (key) {
    case "car":
      return <CarIcon className={cls} />;
    case "clock":
      return <ClockIcon className={cls} />;
    case "driver":
      return <UserIcon className={cls} />;
    case "comfort":
      return <SparklesIcon className={cls} />;
    case "safety":
      return <ShieldCheckIcon className={cls} />;
    case "price":
      return <CheckBadgeIcon className={cls} />;
    case "luggage":
      return <TruckIcon className={cls} />;
    default:
      return <SparklesIcon className={cls} />;
  }
}

export default function ReviewPage() {
  const searchParams = useSearchParams();

  const [customerName, setCustomerName] = useState(searchParams?.get("name") || "Valued Passenger");
  const [customerPhone, setCustomerPhone] = useState(searchParams?.get("phone") || "");
  const [driverName, setDriverName] = useState(searchParams?.get("driver") || "K. Shiva Kumar");
  const [vehicleName, setVehicleName] = useState(searchParams?.get("vehicle") || "Toyota Innova Crysta");
  const [pickupLocation, setPickupLocation] = useState(searchParams?.get("pickup") || "Kukatpally, Hyderabad");
  const [dropLocation, setDropLocation] = useState(searchParams?.get("drop") || "Shamshabad RGI Airport");

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "clean_cab",
    "on_time",
    "polite_driver",
    "comfort_ac",
  ]);
  const [additionalRemarks, setAdditionalRemarks] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [reviewOptions, setReviewOptions] = useState<string[]>([]);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
  const [customizedReview, setCustomizedReview] = useState("");
  const [copied, setCopied] = useState(false);
  const [privateFeedbackSent, setPrivateFeedbackSent] = useState(false);
  const [whatsappEscalationUrl, setWhatsappEscalationUrl] = useState<string | null>(null);

  // Toggle tag
  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  // Generate reviews on load or on button press
  const generateReviews = async () => {
    setIsGenerating(true);
    setCopied(false);
    try {
      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          driverName,
          vehicleName,
          pickupLocation,
          dropLocation,
          rating,
          tags: selectedTags,
          additionalNotes: additionalRemarks,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
        setReviewOptions(data.reviews);
        setSelectedReviewIndex(0);
        setCustomizedReview(data.reviews[0]);
      }
    } catch (err) {
      console.error("Failed to generate review:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  const selectReviewOption = (idx: number) => {
    setSelectedReviewIndex(idx);
    setCustomizedReview(reviewOptions[idx]);
  };

  // Google Review URL for Sri Sadhguru Tours and Travels Kukatpally
  const googleReviewSearchUrl =
    "https://www.google.com/maps/search/?api=1&query=Sri+Sadhguru+Tours+and+Travels+Kukatpally+Hyderabad";

  const handleCopyAndRedirect = async () => {
    const textToCopy = customizedReview || reviewOptions[selectedReviewIndex] || "";
    try {
      // Persist review to DB
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: customerPhone,
          overall_rating: rating,
          driver_rating: rating,
          cleanliness_rating: rating,
          comfort_rating: rating,
          generated_review_text: textToCopy,
          feedback_notes: additionalRemarks,
        }),
      });

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        window.open(googleReviewSearchUrl, "_blank");
      }, 1000);
    } catch (e) {
      window.open(googleReviewSearchUrl, "_blank");
    }
  };

  const handlePrivateFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: customerPhone,
          overall_rating: rating,
          feedback_notes: additionalRemarks,
        }),
      });
      const data = await res.json();
      if (data.escalationWhatsAppLink) {
        setWhatsappEscalationUrl(data.escalationWhatsAppLink);
      }
      setPrivateFeedbackSent(true);
    } catch (err) {
      setPrivateFeedbackSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {copied && <Confetti count={100} duration={3500} />}
      <div className="max-w-xl mx-auto w-full bg-slate-800 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden relative">
        <BorderBeam size={260} duration={8} colorFrom="#f59e0b" colorTo="#38bdf8" borderWidth={1.5} />
        {/* Top Branding Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 p-6 text-center relative">
          <span className="text-amber-200 text-xs font-bold tracking-widest uppercase block mb-1">
            Trip Experience & Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {SADHGURU_CONTACT.brandName}
          </h1>
          <p className="text-blue-100 text-xs mt-1">
            Travel Safe... Travel Happy... · Prop: {SADHGURU_CONTACT.proprietor}
          </p>

          <div className="mt-4 bg-black/25 backdrop-blur-md rounded-2xl py-2 px-4 inline-flex items-center gap-1.5 text-xs text-amber-200 border border-white/10">
            <MapPinIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{pickupLocation}</span>
            <ArrowRightIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{dropLocation}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Greeting */}
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">
              Namaste {customerName}!
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              How was your journey with driver <span className="text-amber-400 font-semibold">{driverName}</span> in our{" "}
              <span className="text-blue-300 font-semibold">{vehicleName}</span>?
            </p>
          </div>

          {/* Star Rating */}
          <div className="bg-slate-700/40 rounded-2xl p-4 text-center border border-slate-600/40">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              Select Your Rating
            </label>
            <div className="flex justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition transform active:scale-95"
                  aria-label={`Rate ${star} star`}
                >
                  <svg
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      star <= rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-600 fill-transparent stroke-current stroke-2"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-amber-300 mt-2">
              {rating === 5 && "Outstanding Service!"}
              {rating === 4 && "Very Good Service"}
              {rating === 3 && "Average Experience"}
              {rating <= 2 && "Needs Improvement"}
            </p>
          </div>

          {/* If Rating <= 3: Smart Private Shield (Prevent Negative Google Review) */}
          {rating <= 3 ? (
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <ShieldCheckIcon className="w-5 h-5 text-amber-400 shrink-0" />
                <h3>Direct Feedback to Sri Sadhguru Management</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We sincerely apologize that your experience was not 5 stars. Proprietor{" "}
                <span className="font-semibold text-amber-200">Rathan Kanna</span> personally reviews all feedback to
                take immediate corrective action.
              </p>

              {privateFeedbackSent ? (
                <div className="p-4 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-center space-y-3">
                  <p className="text-emerald-300 text-sm font-semibold flex items-center justify-center gap-1.5">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Thank you. Your grievance has been recorded directly for the proprietor.</span>
                  </p>
                  {whatsappEscalationUrl && (
                    <a
                      href={whatsappEscalationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>Chat Immediately with Rathan Kanna on WhatsApp</span>
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handlePrivateFeedbackSubmit} className="space-y-3">
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Your Phone Number (so owner can call you)"
                    className="w-full text-xs rounded-xl bg-slate-900 border border-slate-700 p-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    required
                    value={additionalRemarks}
                    onChange={(e) => setAdditionalRemarks(e.target.value)}
                    placeholder="Please tell us what went wrong (driver behavior, AC, vehicle condition, delay)..."
                    className="w-full text-xs rounded-xl bg-slate-900 border border-slate-700 p-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition shadow"
                  >
                    Submit Private Feedback to Owner
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* 4-5 Stars: AI Review Assistant Flow */
            <div className="space-y-5">
              {/* Highlight Badges */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5">
                  What did you like about the trip? (Tap all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {HIGHLIGHT_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`text-xs px-3 py-2 rounded-xl font-medium transition flex items-center gap-2 border ${
                          active
                            ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold"
                            : "bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700"
                        }`}
                      >
                        {renderTagIcon(tag.iconKey, active)}
                        <span>{tag.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Generated Review Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <SparklesIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>AI Generated Google Review</span>
                    <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded-full ml-1">
                      Ready to Paste
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={generateReviews}
                    disabled={isGenerating}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-semibold"
                  >
                    <ArrowPathIcon className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                    <span>{isGenerating ? "Crafting..." : "Regenerate"}</span>
                  </button>
                </div>

                {/* Option Tabs */}
                {reviewOptions.length > 1 && (
                  <div className="flex gap-2 mb-2.5">
                    {reviewOptions.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectReviewOption(i)}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-bold border transition ${
                          selectedReviewIndex === i
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-slate-700/40 text-slate-400 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        Option {i + 1}
                      </button>
                    ))}
                  </div>
                )}

                {/* Editable Review Textarea */}
                <div className="relative">
                  <textarea
                    rows={4}
                    value={customizedReview}
                    onChange={(e) => setCustomizedReview(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-900 border border-slate-700 p-4 text-slate-200 focus:border-amber-400 focus:outline-none leading-relaxed"
                  />
                  <div className="text-[11px] text-slate-500 text-right mt-1">
                    Feel free to tweak any words before copying
                  </div>
                </div>
              </div>

              {/* 1-Click Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyAndRedirect}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-amber-500/20 transition transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <DocumentDuplicateIcon className="w-5 h-5 shrink-0" />
                  <span>{copied ? "Copied! Opening Google Maps..." : "Copy Review & Paste on Google Maps"}</span>
                </button>

                {copied && (
                  <p className="text-center text-xs text-emerald-400 font-bold mt-2 animate-pulse flex items-center justify-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Review text copied to your clipboard! Opening Google Maps now... simply paste it and tap Post!</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Contact Support */}
          <div className="border-t border-slate-700/60 pt-4 text-center text-xs text-slate-400">
            Need to book your next trip? Call{" "}
            <a href={`tel:${SADHGURU_CONTACT.primaryPhone}`} className="text-amber-400 font-bold">
              {SADHGURU_CONTACT.primaryPhoneFormatted}
            </a>{" "}
            or WhatsApp{" "}
            <a
              href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 font-bold"
            >
              81061 17704
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 mt-6 space-y-1">
        <div>© {new Date().getFullYear()} Sri Sadhguru Tours & Travels · All Rights Reserved</div>
        <div>
          Developed by{" "}
          <a href="tel:+916301253789" className="text-slate-400 hover:text-white font-semibold underline decoration-dotted">
            INDENTDEV +916301253789
          </a>
        </div>
      </div>
    </div>
  );
}
