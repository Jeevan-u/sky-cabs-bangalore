"use client";

import React, { useState } from "react";
import {
  SparklesIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  TagIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
  TruckIcon,
  EyeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FESTIVAL_POSTERS, FestivalPoster } from "@/data/festivalOffers";
import { COMPANIES_SERVED, ClientCompany } from "@/data/companiesServed";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

export default function FestivalsView() {
  const [posters, setPosters] = useState<FestivalPoster[]>(FESTIVAL_POSTERS);
  const [companies, setCompanies] = useState<ClientCompany[]>(COMPANIES_SERVED);
  const [activeSubTab, setActiveSubTab] = useState<"posters" | "ai_generator" | "companies">("posters");

  // AI Prompt Generator Form State
  const [genFestival, setGenFestival] = useState("Makar Sankranti & Pongal");
  const [genVehicle, setGenVehicle] = useState("Toyota Innova Crysta & Tempo Traveller");
  const [genDiscount, setGenDiscount] = useState("Flat ₹500 OFF on Outstation Booking");
  const [genAudience, setGenAudience] = useState("Family Village Homecoming & Srisailam/Tirupati Yatra");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCopy, setCopiedCopy] = useState(false);

  // New Company Form State
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyIndustry, setNewCompanyIndustry] = useState<any>("Information Technology");
  const [newCompanyLocation, setNewCompanyLocation] = useState("");
  const [newCompanyColor, setNewCompanyColor] = useState("#0288d1");

  // Toggle poster active status
  const handleTogglePoster = (id: string) => {
    setPosters((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  // Add Company
  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    const newComp: ClientCompany = {
      id: "comp-" + Date.now(),
      name: newCompanyName.trim(),
      industry: newCompanyIndustry,
      location: newCompanyLocation.trim() || "Hyderabad Campus",
      logoText: newCompanyName.trim().split(" ")[0].toUpperCase(),
      accentColor: newCompanyColor,
    };

    setCompanies((prev) => [newComp, ...prev]);
    setNewCompanyName("");
    setNewCompanyLocation("");
  };

  // Remove Company
  const handleRemoveCompany = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  // Generated text and prompt
  const generatedAiImagePrompt = `High-resolution professional 8K marketing poster for "SRI SADHGURU TOURS & TRAVELS" celebrating ${genFestival}. A pristine modern white luxury commercial ${genVehicle} with official yellow commercial number plates and vibrant celebratory flower garlands, driving on a smooth 4-lane South India highway during golden sunrise. In the background, majestic temple gopurams of Srisailam / Tirupati rise amidst lush green rural landscapes. Clean bold banner header with typography reading "SRI SADHGURU TOURS & TRAVELS" in ALL CAPS, with gold/saffron badge: "${genDiscount}". Bottom contact banner displays phone numbers: "+91 81061 17704 / +91 93985 22128". Ultra-photorealistic, festive lighting, 8k commercial photography style.`;

  const generatedSocialMediaCopy = `✨ *SRI SADHGURU TOURS & TRAVELS* ✨
🎊 *${genFestival.toUpperCase()} FESTIVAL SPECIAL OFFER!* 🎊
--------------------------------------------------
Heading home for the festivities or planning a holy pilgrimage with family?
Travel in complete luxury, safety, and comfort with Hyderabad's #1 rated travels!

🚗 *Featured Fleet:* ${genVehicle}
🎁 *Special Offer:* ${genDiscount}
🎯 *Ideal For:* ${genAudience}

✅ 100% Sanitized AC Vehicles (Swift Dzire, Innova Crysta, 12/17s Tempo Travellers & Luxury Buses)
✅ Senior Hill-Trained Verified Chauffeurs
✅ Zero Surge Guaranteed Rates & No Advance Required
✅ Doorstep Pickup across Kukatpally, KPHB, Miyapur, Hitec City & Airport

📞 *Call 24x7 for Instant Booking:*
📱 +91 ${SADHGURU_CONTACT.primaryPhone}
📱 +91 ${SADHGURU_CONTACT.secondaryPhone}
💬 *WhatsApp Booking:* https://wa.me/${SADHGURU_CONTACT.whatsappNumber}
🌐 *Website:* https://www.srisadhgurutoursandtravels.com

#SriSadhguruTravels #SankrantiTravel #HyderabadCabs #InnovaCrysta #TempoTraveller #SrisailamTirupati`;

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
            Manage seasonal festival discounts, generate branded marketing templates with AI, and manage &quot;Companies We&apos;ve Served&quot; marquee logos.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveSubTab("posters")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === "posters"
                ? "bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
            }`}
          >
            <span>Active Posters</span>
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
            <span>AI Template Generator</span>
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
            <span>Client Logos</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: FESTIVAL POSTERS MANAGER */}
      {activeSubTab === "posters" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posters.map((poster) => (
              <div
                key={poster.id}
                className={`p-5 rounded-3xl border transition shadow-sm flex flex-col justify-between ${
                  poster.isActive
                    ? "bg-white dark:bg-neutral-900 border-amber-500/40 dark:border-amber-500/30"
                    : "bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950">
                      {poster.discountBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTogglePoster(poster.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition ${
                        poster.isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                      }`}
                    >
                      {poster.isActive ? (
                        <>
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Visible on Home</span>
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-black text-base uppercase text-neutral-900 dark:text-white">
                    {poster.bannerTitle}
                  </h3>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                    {poster.festivalName} · ({poster.occasion})
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                    {poster.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {poster.recommendedDestinations.map((dest, idx) => (
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
                      {poster.bookingCode}
                    </span>
                  </div>

                  <div className="text-right text-[11px] text-neutral-400">
                    <div>Valid: {poster.startDate} to {poster.endDate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: BUILT-IN AI POSTER PROMPT & TEMPLATE GENERATOR */}
      {activeSubTab === "ai_generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Configure parameters */}
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
                <option value="Telangana Bonalu Jathara">Telangana Bonalu Jathara</option>
                <option value="New Year 2027 Pilgrimage">New Year 2027 Pilgrimage</option>
                <option value="Mahashivaratri Srisailam Special">Mahashivaratri Srisailam Special</option>
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
                <option value="Swift Dzire & Maruti Ertiga">Swift Dzire & Maruti Ertiga</option>
                <option value="Force Urbania Executive Luxury Van">Force Urbania Executive Luxury Van</option>
                <option value="32 to 50 Seater Luxury AC Bus">32 to 50 Seater Luxury AC Bus</option>
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

          {/* Right: AI Output Prompts & Social Copy */}
          <div className="lg:col-span-7 space-y-4">
            {/* Box 1: AI Image Prompt */}
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

            {/* Box 2: Ready WhatsApp & Social Media Text Marketing Copy */}
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
          {/* Add Company Form */}
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
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Company Name</label>
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
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Campus Location</label>
                <input
                  type="text"
                  value={newCompanyLocation}
                  onChange={(e) => setNewCompanyLocation(e.target.value)}
                  placeholder="e.g. HITEC City Phase 2"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Company</span>
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
                    <span className="font-black text-xs truncate" style={{ color: comp.accentColor }}>
                      {comp.logoText}
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
    </div>
  );
}
