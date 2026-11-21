"use client";

import React, { useState, useEffect } from "react";
import {
  SparklesIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  TagIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FESTIVAL_POSTERS } from "@/data/festivalOffers";
import { COMPANIES_SERVED } from "@/data/companiesServed";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";

export interface FestivalOffer {
  id: string;
  festival_name: string;
  occasion: string;
  discount_badge: string;
  banner_title: string;
  description: string;
  recommended_destinations: string[];
  booking_code: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  is_active: boolean;
}

export interface ClientCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  logo_text: string;
  accent_color: string;
  is_active?: boolean;
}

export default function FestivalsView() {
  const [offers, setOffers] = useState<FestivalOffer[]>([]);
  const [companies, setCompanies] = useState<ClientCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"posters" | "ai_generator" | "companies">("posters");

  // Modal State for Create / Edit Festival Offer
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [offerForm, setOfferForm] = useState({
    festival_name: "",
    occasion: "",
    discount_badge: "",
    banner_title: "",
    description: "",
    recommended_destinations: "",
    booking_code: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  });
  const [isSavingOffer, setIsSavingOffer] = useState(false);
  const [offerActionMsg, setOfferActionMsg] = useState("");

  // AI Prompt Generator Form State
  const [genFestival, setGenFestival] = useState("Makar Sankranti & Pongal");
  const [genVehicle, setGenVehicle] = useState("Toyota Innova Crysta & Tempo Traveller");
  const [genDiscount, setGenDiscount] = useState("Flat ₹500 OFF on Outstation Booking");
  const [genAudience, setGenAudience] = useState("Family Village Homecoming & Mysuru/Tirupati Yatra");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCopy, setCopiedCopy] = useState(false);

  // New Company Form State
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyIndustry, setNewCompanyIndustry] = useState("Information Technology");
  const [newCompanyLocation, setNewCompanyLocation] = useState("");
  const [newCompanyColor, setNewCompanyColor] = useState("#0288d1");
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  // Load from API on mount
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Load Festival Offers
      const fRes = await fetch("/api/festivals");
      const fData = await fRes.json();
      if (fData.success && Array.isArray(fData.offers)) {
        setOffers(fData.offers);
      } else {
        // Fallback to static
        setOffers(
          FESTIVAL_POSTERS.map((p) => ({
            id: p.id,
            festival_name: p.festivalName,
            occasion: p.occasion,
            discount_badge: p.discountBadge,
            banner_title: p.bannerTitle,
            description: p.description,
            recommended_destinations: p.recommendedDestinations,
            booking_code: p.bookingCode,
            start_date: p.startDate,
            end_date: p.endDate,
            image_url: "",
            is_active: p.isActive,
          }))
        );
      }

      // 2. Load Client Companies
      const cRes = await fetch("/api/companies");
      const cData = await cRes.json();
      if (cData.success && Array.isArray(cData.companies)) {
        setCompanies(cData.companies);
      } else {
        setCompanies(
          COMPANIES_SERVED.map((c) => ({
            id: c.id,
            name: c.name,
            industry: c.industry,
            location: c.location,
            logo_text: c.logoText,
            accent_color: c.accentColor,
            is_active: true,
          }))
        );
      }
    } catch (err) {
      console.warn("Failed to load festival data from API, using fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open Create Offer Modal
  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingOfferId(null);
    setOfferForm({
      festival_name: "",
      occasion: "Festival Celebration",
      discount_badge: "Flat ₹500 OFF",
      banner_title: "",
      description: "",
      recommended_destinations: "Mysuru, Tirupati, Mysuru",
      booking_code: "FEST" + Math.floor(100 + Math.random() * 900),
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    });
    setIsOfferModalOpen(true);
  };

  // Open Edit Offer Modal
  const handleOpenEditModal = (offer: FestivalOffer) => {
    setModalMode("edit");
    setEditingOfferId(offer.id);
    setOfferForm({
      festival_name: offer.festival_name,
      occasion: offer.occasion,
      discount_badge: offer.discount_badge,
      banner_title: offer.banner_title,
      description: offer.description,
      recommended_destinations: Array.isArray(offer.recommended_destinations)
        ? offer.recommended_destinations.join(", ")
        : offer.recommended_destinations,
      booking_code: offer.booking_code,
      start_date: offer.start_date,
      end_date: offer.end_date,
    });
    setIsOfferModalOpen(true);
  };

  // Save Offer (Create or Edit)
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.festival_name.trim() || !offerForm.discount_badge.trim() || !offerForm.banner_title.trim()) {
      alert("Please enter festival name, discount badge, and banner title.");
      return;
    }

    setIsSavingOffer(true);
    setOfferActionMsg("");

    const destinationsArray = offerForm.recommended_destinations
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (modalMode === "create") {
        const res = await fetch("/api/festivals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...offerForm,
            recommended_destinations: destinationsArray,
            is_active: true,
          }),
        });
        const data = await res.json();
        if (data.success && data.offer) {
          setOffers((prev) => [data.offer, ...prev]);
          setIsOfferModalOpen(false);
          setOfferActionMsg("Festival offer created successfully!");
        }
      } else if (modalMode === "edit" && editingOfferId) {
        const res = await fetch("/api/festivals", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingOfferId,
            ...offerForm,
            recommended_destinations: destinationsArray,
          }),
        });
        if (res.ok) {
          setOffers((prev) =>
            prev.map((o) =>
              o.id === editingOfferId
                ? {
                    ...o,
                    ...offerForm,
                    recommended_destinations: destinationsArray,
                  }
                : o
            )
          );
          setIsOfferModalOpen(false);
          setOfferActionMsg("Festival offer updated successfully!");
        }
      }
    } catch (err: any) {
      alert("Failed to save offer: " + err.message);
    } finally {
      setIsSavingOffer(false);
    }
  };

  // Toggle poster active status with API sync
  const handleTogglePoster = async (id: string, currentActive: boolean) => {
    const updatedStatus = !currentActive;
    setOffers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: updatedStatus } : p))
    );

    try {
      await fetch("/api/festivals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: updatedStatus }),
      });
    } catch (err) {
      console.warn("Toggle poster status failed:", err);
    }
  };

  // Delete Offer
  const handleDeleteOffer = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this festival offer?")) {
      return;
    }
    setOffers((prev) => prev.filter((o) => o.id !== id));
    try {
      await fetch(`/api/festivals?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Delete offer failed:", err);
    }
  };

  // Add Company with API sync
  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    setIsAddingCompany(true);
    const logoTxt = newCompanyName.trim().split(" ")[0].toUpperCase();
    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCompanyName.trim(),
          industry: newCompanyIndustry,
          location: newCompanyLocation.trim() || "Bengaluru Campus",
          logo_text: logoTxt,
          accent_color: newCompanyColor,
        }),
      });
      const data = await res.json();
      if (data.success && data.company) {
        setCompanies((prev) => [data.company, ...prev]);
      } else {
        const localComp: ClientCompany = {
          id: "comp-" + Date.now(),
          name: newCompanyName.trim(),
          industry: newCompanyIndustry,
          location: newCompanyLocation.trim() || "Bengaluru Campus",
          logo_text: logoTxt,
          accent_color: newCompanyColor,
          is_active: true,
        };
        setCompanies((prev) => [localComp, ...prev]);
      }
      setNewCompanyName("");
      setNewCompanyLocation("");
    } catch (err) {
      console.warn("Add company error:", err);
    } finally {
      setIsAddingCompany(false);
    }
  };

  // Remove Company with API sync
  const handleRemoveCompany = async (id: string) => {
    if (!confirm("Remove this client company from the trust marquee?")) return;
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/companies?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Delete company failed:", err);
    }
  };

  // Generated text and prompt
  const generatedAiImagePrompt = `High-resolution professional 8K marketing poster for "SKY CABS BANGALORE" celebrating ${genFestival}. A pristine modern white luxury commercial ${genVehicle} with official yellow commercial number plates and vibrant celebratory flower garlands, driving on a smooth 4-lane South India highway during golden sunrise. In the background, majestic temple gopurams of Mysuru / Tirupati rise amidst lush green rural landscapes. Clean bold banner header with typography reading "SKY CABS BANGALORE" in ALL CAPS, with gold/saffron badge: "${genDiscount}". Bottom contact banner displays phone numbers: "+91 96323 45415 / +91 96323 45415". Ultra-photorealistic, festive lighting, 8k commercial photography style.`;

  const generatedSocialMediaCopy = `✨ *SKY CABS BANGALORE* ✨
🎊 *${genFestival.toUpperCase()} FESTIVAL SPECIAL OFFER!* 🎊
--------------------------------------------------
Heading home for the festivities or planning a holy pilgrimage with family?
Travel in complete luxury, safety, and comfort with Bengaluru's #1 rated travels!

🚗 *Featured Fleet:* ${genVehicle}
🎁 *Special Offer:* ${genDiscount}
🎯 *Ideal For:* ${genAudience}

✅ 100% Sanitized AC Vehicles (Prime Sedan, Innova Crysta, 12/17s Tempo Travellers & Luxury Buses)
✅ Senior Hill-Trained Verified Chauffeurs
✅ Zero Surge Guaranteed Rates & No Advance Required
✅ Doorstep Pickup across Begur, Whitefield, Indiranagar, Whitefield & Airport

📞 *Call 24x7 for Instant Booking:*
📱 +91 ${SKY_CABS_CONTACT.primaryPhone}
📱 +91 ${SKY_CABS_CONTACT.secondaryPhone}
💬 *WhatsApp Booking:* https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}
🌐 *Website:* https://skycabsbangalore.com/

#SkyCabsBangalore #SankrantiTravel #BengaluruCabs #InnovaCrysta #TempoTraveller #MysuruTirupati`;

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <SparklesIcon className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 dark:text-white">
              Festival Posters, Offers & Client Logos
            </h2>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage seasonal festival discounts, generate branded marketing templates with AI, and manage &quot;Companies We&apos;ve Served&quot; marquee logos connected to D1.
          </p>
        </div>

        {/* Tab Pills & Add Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveSubTab("posters")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeSubTab === "posters"
                  ? "bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              <span>Festival Offers ({offers.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab("ai_generator")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activeSubTab === "ai_generator"
                  ? "bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>AI Prompt Tool</span>
            </button>

            <button
              onClick={() => setActiveSubTab("companies")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activeSubTab === "companies"
                  ? "bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              <BuildingOfficeIcon className="w-3.5 h-3.5" />
              <span>Client Logos ({companies.length})</span>
            </button>
          </div>

          {activeSubTab === "posters" && (
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-md transition shrink-0 active:scale-95"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create New Festival Offer</span>
            </button>
          )}
        </div>
      </div>

      {offerActionMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 shrink-0" />
          <span>{offerActionMsg}</span>
        </div>
      )}

      {/* SUB-TAB 1: FESTIVAL OFFERS MANAGER */}
      {activeSubTab === "posters" && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              <span>Loading festival offers from database...</span>
            </div>
          ) : offers.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 text-xs">
              No festival offers created yet. Click &quot;Create New Festival Offer&quot; above to create your first promotion!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((poster) => (
                <div
                  key={poster.id}
                  className={`p-5 rounded-3xl border transition shadow-sm flex flex-col justify-between ${
                    poster.is_active
                      ? "bg-white dark:bg-neutral-900 border-amber-500/40 dark:border-amber-500/30"
                      : "bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950">
                        {poster.discount_badge}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePoster(poster.id, poster.is_active)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition ${
                            poster.is_active
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                          }`}
                        >
                          {poster.is_active ? (
                            <>
                              <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Live on Home</span>
                            </>
                          ) : (
                            <>
                              <XCircleIcon className="w-3.5 h-3.5" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(poster)}
                          className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 transition"
                          title="Edit Offer"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteOffer(poster.id)}
                          className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-rose-500 transition"
                          title="Delete Offer"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-black text-base uppercase text-neutral-900 dark:text-white">
                      {poster.banner_title}
                    </h3>
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                      {poster.festival_name} · ({poster.occasion})
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      {poster.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {(Array.isArray(poster.recommended_destinations)
                        ? poster.recommended_destinations
                        : []
                      ).map((dest, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Coupon Code</span>
                      <span className="font-mono font-black text-amber-600 dark:text-amber-400">
                        {poster.booking_code}
                      </span>
                    </div>

                    <div className="text-right text-[11px] text-neutral-400">
                      <div>Valid: {poster.start_date} to {poster.end_date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: BUILT-IN AI POSTER PROMPT & TEMPLATE GENERATOR */}
      {activeSubTab === "ai_generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-4">
            <h3 className="font-black text-base uppercase text-neutral-900 dark:text-white flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-amber-500" />
              <span>Configure Festival Campaign</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Festival or Occasion
              </label>
              <select
                value={genFestival}
                onChange={(e) => setGenFestival(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
              >
                <option value="Makar Sankranti & Pongal">Makar Sankranti & Pongal</option>
                <option value="Dasara & Durga Navratri Yatra">Dasara & Durga Navratri Yatra</option>
                <option value="Diwali Festival of Lights">Diwali Festival of Lights</option>
                <option value="Ugadi Telugu New Year">Ugadi Telugu New Year</option>
                <option value="Karnataka Bonalu Jathara">Karnataka Bonalu Jathara</option>
                <option value="New Year 2027 Pilgrimage">New Year 2027 Pilgrimage</option>
                <option value="Mahashivaratri Mysuru Special">Mahashivaratri Mysuru Special</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Featured Vehicle Fleet
              </label>
              <select
                value={genVehicle}
                onChange={(e) => setGenVehicle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
              >
                <option value="Toyota Innova Crysta & Tempo Traveller">Toyota Innova Crysta & Tempo Traveller</option>
                <option value="Prime Sedan & Maruti Ertiga">Prime Sedan & Maruti Ertiga</option>
                <option value="Force Urbania Executive Luxury Van">Force Urbania Executive Luxury Van</option>
                <option value="Passenger Buses (25 to 52 Seater)">Passenger Buses (25 to 52 Seater)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Discount Offer / Offer Badge
              </label>
              <input
                type="text"
                value={genDiscount}
                onChange={(e) => setGenDiscount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Target Route & Purpose
              </label>
              <input
                type="text"
                value={genAudience}
                onChange={(e) => setGenAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <SparklesIcon className="w-4 h-4" />
                  <span>1. AI Image Generator Prompt (Midjourney / DALL-E / Gemini)</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedAiImagePrompt);
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold flex items-center gap-1 transition"
                >
                  <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                  <span>{copiedPrompt ? "Copied!" : "Copy Prompt"}</span>
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-h-40 overflow-y-auto">
                {generatedAiImagePrompt}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <ClipboardDocumentCheckIcon className="w-4 h-4" />
                  <span>2. Ready WhatsApp & Social Marketing Copy</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedSocialMediaCopy);
                    setCopiedCopy(true);
                    setTimeout(() => setCopiedCopy(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
                >
                  <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                  <span>{copiedCopy ? "Copied Copy!" : "Copy WhatsApp Text"}</span>
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
                {generatedSocialMediaCopy}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: COMPANIES WE'VE SERVED CRUD MANAGER */}
      {activeSubTab === "companies" && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddCompany}
            className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
          >
            <h3 className="font-black text-sm uppercase text-neutral-900 dark:text-white mb-3 flex items-center gap-1.5">
              <PlusIcon className="w-4 h-4 text-amber-500" />
              <span>Add New Client Company to Marquee</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="e.g. Google India"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Industry</label>
                <select
                  value={newCompanyIndustry}
                  onChange={(e) => setNewCompanyIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Pharmaceutical">Pharmaceutical</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Automotive & Logistics">Automotive & Logistics</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Campus Location</label>
                <input
                  type="text"
                  value={newCompanyLocation}
                  onChange={(e) => setNewCompanyLocation(e.target.value)}
                  placeholder="e.g. Whitefield Phase 2"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isAddingCompany}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>{isAddingCompany ? "Adding..." : "Add to Marquee"}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {companies.map((comp) => (
              <div
                key={comp.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between group hover:border-amber-500 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold uppercase text-neutral-400 truncate">
                      {comp.industry}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCompany(comp.id)}
                      className="p-1 text-neutral-400 hover:text-rose-500 transition"
                      title="Remove from marquee"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="py-2 px-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center my-1">
                    <span className="font-black text-xs truncate" style={{ color: comp.accent_color }}>
                      {comp.logo_text}
                    </span>
                  </div>

                  <div className="font-extrabold text-xs text-neutral-900 dark:text-white truncate mt-1">
                    {comp.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">
                    {comp.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE / EDIT OFFER MODAL */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-7 text-neutral-900 dark:text-white font-sans my-8">
            <button
              onClick={() => setIsOfferModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <TagIcon className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-500">
                {modalMode === "create" ? "Add Promotional Offer" : "Edit Offer Details"}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black">
              {modalMode === "create" ? "Create New Festival Offer" : "Update Festival Offer"}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Active promotions automatically display on the homepage banner carousel and sync with Cloudflare D1.
            </p>

            <form onSubmit={handleSaveOffer} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Festival Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={offerForm.festival_name}
                    onChange={(e) => setOfferForm({ ...offerForm, festival_name: e.target.value })}
                    placeholder="e.g. Ugadi Mega Festival"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Occasion / Subtitle
                  </label>
                  <input
                    type="text"
                    value={offerForm.occasion}
                    onChange={(e) => setOfferForm({ ...offerForm, occasion: e.target.value })}
                    placeholder="e.g. Telugu New Year Yatra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Discount Badge *
                  </label>
                  <input
                    type="text"
                    required
                    value={offerForm.discount_badge}
                    onChange={(e) => setOfferForm({ ...offerForm, discount_badge: e.target.value })}
                    placeholder="e.g. Flat ₹500 OFF or 15% OFF"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Coupon Booking Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={offerForm.booking_code}
                    onChange={(e) => setOfferForm({ ...offerForm, booking_code: e.target.value.toUpperCase() })}
                    placeholder="e.g. UGADI2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold uppercase outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Banner Headline *
                </label>
                <input
                  type="text"
                  required
                  value={offerForm.banner_title}
                  onChange={(e) => setOfferForm({ ...offerForm, banner_title: e.target.value })}
                  placeholder="e.g. UGADI TELUGU NEW YEAR FAMILY TRAVEL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold uppercase outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Offer Description
                </label>
                <textarea
                  rows={2}
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  placeholder="Describe vehicle coverage, terms, and highlights..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Recommended Destinations (Comma Separated)
                </label>
                <input
                  type="text"
                  value={offerForm.recommended_destinations}
                  onChange={(e) => setOfferForm({ ...offerForm, recommended_destinations: e.target.value })}
                  placeholder="e.g. Mysuru, Tirupati, Vijayawada, Mysuru"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Valid From Date
                  </label>
                  <input
                    type="date"
                    value={offerForm.start_date}
                    onChange={(e) => setOfferForm({ ...offerForm, start_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Valid Till Date
                  </label>
                  <input
                    type="date"
                    value={offerForm.end_date}
                    onChange={(e) => setOfferForm({ ...offerForm, end_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingOffer}
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-black text-xs shadow-md transition flex items-center gap-1.5"
                >
                  {isSavingOffer ? (
                    <>
                      <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to D1...</span>
                    </>
                  ) : (
                    <span>{modalMode === "create" ? "Save & Publish Offer" : "Save Changes"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
