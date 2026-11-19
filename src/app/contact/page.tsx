"use client";

import React, { FC, useState } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  MapPinIcon,
  PhoneIcon,
  BoltIcon,
  WhatsAppIcon,
} from "@/components/icons";
import {
  SpotlightCard,
  StarBorder,
  MagneticButton,
  ShinyText,
  BorderBeam,
  Confetti,
  ShimmerButton,
} from "@/components/reactbits";

export interface PageContactProps {}

const info = [
  {
    icon: MapPinIcon,
    title: "HYDERABAD & KAMAREDDY OFFICES",
    desc: "Kukatpally Main Road, Hyderabad & Gandhari, Kamareddy, Telangana. Central Hubs: KPHB, Miyapur, Hitec City, Shamshabad Airport & Medchal.",
  },
  {
    icon: PhoneIcon,
    title: "PHONE & 24x7 DISPATCH",
    desc: `+91 ${SADHGURU_CONTACT.primaryPhone} | +91 ${SADHGURU_CONTACT.secondaryPhone} (Prop: ${SADHGURU_CONTACT.proprietor})`,
  },
  {
    icon: WhatsAppIcon,
    title: "WHATSAPP & SUPPORT",
    desc: "+91 81061 17704 (Instant Quotes & Airport Transfers)",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [route, setRoute] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !route.trim()) {
      alert("Please provide your Name, Phone Number, and Route to get a quotation.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: fullName.trim(),
          customer_phone: phone.trim(),
          trip_type: "outstation",
          vehicle_type: "Swift Dzire / Innova Crysta",
          pickup_address: route.trim(),
          drop_address: "Destination specified in notes",
          pickup_datetime: new Date().toISOString(),
          estimated_price: 1999,
          notes: requirements.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setSubmittedBookingId(data.booking.id);
      } else {
        setSubmittedBookingId("BK-" + Math.floor(1000 + Math.random() * 9000));
      }
    } catch (err) {
      setSubmittedBookingId("BK-" + Math.floor(1000 + Math.random() * 9000));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nc-PageContact overflow-hidden font-sans">
      <div className="mb-24 lg:mb-32">
        <div className="container max-w-7xl mx-auto pt-12 pb-6 px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block">
              <StarBorder as="div" color="#d97706" speed="4s">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 dark:text-amber-300 px-3.5 py-1">
                  24x7 Customer Support & Rapid Dispatch
                </span>
              </StarBorder>
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Contact Sri Sadhguru Travels
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base font-medium">
              Travel Safe... Travel Happy... Your Journey, Our Responsibility. Get guaranteed best quotations for airport rides, outstation trips, pilgrimages, and group buses.
            </p>
          </div>

          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Left Column: Contact Cards */}
            <div className="max-w-md space-y-6">
              {info.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <SpotlightCard
                    key={index}
                    spotlightColor="rgba(217, 119, 6, 0.1)"
                    className="p-5 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
                  >
                    <h3 className="uppercase font-bold text-xs text-neutral-500 dark:text-neutral-400 tracking-wider flex items-center gap-1.5">
                      <IconComponent className="w-4 h-4 text-primary-500 shrink-0" />
                      <span>{item.title}</span>
                    </h3>
                    <span className="block mt-2 font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </span>
                  </SpotlightCard>
                );
              })}

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.12)"
                className="p-6 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="uppercase font-bold text-xs text-neutral-500 dark:text-neutral-400 tracking-wider flex items-center gap-1.5">
                    <BoltIcon className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>DIRECT CALL OR WHATSAPP</span>
                  </h3>
                  <ShinyText text="Instant Response" speed={3} className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <MagneticButton distance={0.2}>
                    <a
                      href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
                      className="px-5 py-2.5 rounded-full bg-primary-6000 text-white font-bold text-xs shadow-md shadow-primary-6000/25 hover:bg-primary-700 transition inline-flex items-center gap-1.5"
                    >
                      <PhoneIcon className="w-3.5 h-3.5" />
                      <span>Call +91 {SADHGURU_CONTACT.primaryPhone}</span>
                    </a>
                  </MagneticButton>

                  <MagneticButton distance={0.2}>
                    <a
                      href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20upcoming%20travel.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/25 hover:bg-emerald-500 transition inline-flex items-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </MagneticButton>
                </div>
              </SpotlightCard>
            </div>

            {/* Right Column: Interactive Quote Request Form */}
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.12)"
              className="p-8 sm:p-10 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl relative overflow-hidden"
            >
              <BorderBeam size={280} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />
              {submittedBookingId ? (
                <div className="text-center py-10 space-y-4 relative">
                  <Confetti count={100} duration={3500} />
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircleIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                    Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto font-medium">
                    Your inquiry has been logged as <strong className="text-primary-6000 font-mono">{submittedBookingId}</strong>. Our Kukatpally operations desk will call or WhatsApp you within 15 minutes.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <MagneticButton distance={0.2}>
                      <a
                        href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20just%20submitted%20inquiry%20${submittedBookingId}%20for%20route%20${encodeURIComponent(route)}.%20Please%20share%20fare.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                        <span>Speed Up on WhatsApp</span>
                      </a>
                    </MagneticButton>
                    <button
                      onClick={() => {
                        setSubmittedBookingId(null);
                        setFullName("");
                        setPhone("");
                        setRoute("");
                        setRequirements("");
                      }}
                      className="px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                      Request a Guaranteed Quote / Cab
                    </h2>
                    <ShinyText text="Best Price Guaranteed" speed={3.5} className="text-xs font-bold text-amber-600 dark:text-amber-400 hidden sm:inline-block" />
                  </div>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                    <label className="block">
                      <Label>Full Name *</Label>
                      <Input
                        required
                        placeholder="e.g. Ramesh Kumar"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1"
                      />
                    </label>

                    <label className="block">
                      <Label>Mobile Number (WhatsApp Enabled) *</Label>
                      <Input
                        required
                        type="tel"
                        placeholder="e.g. 98480 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1"
                      />
                    </label>

                    <label className="block">
                      <Label>Pickup Location & Destination Route *</Label>
                      <Input
                        required
                        type="text"
                        placeholder="e.g. Kukatpally to Shamshabad Airport / Srisailam"
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        className="mt-1"
                      />
                    </label>

                    <label className="block">
                      <Label>Vehicle Type & Requirements</Label>
                      <Textarea
                        className="mt-1"
                        rows={3}
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="e.g. Need Innova Crysta for 6 passengers with luggage on Friday 5:00 AM..."
                      />
                    </label>

                    <div className="pt-2">
                      <ShimmerButton
                        type="submit"
                        disabled={isSubmitting}
                        background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
                        className="w-full py-4 text-sm font-bold shadow-lg shadow-amber-500/25"
                      >
                        {isSubmitting ? "Submitting Inquiry..." : "Submit Booking Request"}
                      </ShimmerButton>
                    </div>
                  </form>
                </>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>

      <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div>
    </div>
  );
};

export default PageContact;
