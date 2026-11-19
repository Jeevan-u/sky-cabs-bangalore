"use client";

import React, { FC, useState } from "react";
import Heading from "@/shared/Heading";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { SpotlightCard, ShinyText } from "@/components/reactbits";
import { motion, AnimatePresence } from "framer-motion";

export interface SectionFaqProps {
  className?: string;
}

const faqs = [
  {
    q: "How can I book a vehicle with Sri Sadhguru Travels?",
    a: "Booking is effortless: Call or WhatsApp us directly at +91 81061 17704 or +91 93985 22128. Mention your pickup location, destination, travel dates, and preferred vehicle size (5-seater to 50-seater). We confirm your booking with an instant transparent quotation.",
  },
  {
    q: "What vehicle types are available at Sri Sadhguru Travels?",
    a: "We maintain a comprehensive fleet: 5-seater sedans (Swift Dzire, Toyota Etios), 7-seater MPVs (Maruti Ertiga), premium SUVs (Toyota Innova Crysta), group travellers (Force Urbania & Tempo Traveller 12-17 seaters), and luxury tourist coaches (22 to 50-seater push-back AC buses).",
  },
  {
    q: "Do you provide 24x7 Airport Transfers and Wedding Transport?",
    a: "Yes! Our dispatch desk operates 24 hours a day, 7 days a week. We provide punctual doorstep pickups for Rajiv Gandhi International Airport (RGIA) Shamshabad and dedicated convoys for weddings, family functions, and corporate outings.",
  },
  {
    q: "Do you provide pilgrimage packages for Srisailam, Tirupati, and Shirdi?",
    a: "Yes, pilgrimage travel is our specialty. We operate 1-day, 2-day, and multi-day packages to Srisailam Jyotirlinga, Tirupati Balaji, Shirdi, Yadagirigutta, and Basara with drivers who have extensive experience navigating temple hill roads and darshan schedules.",
  },
  {
    q: "Are tolls, parking, and driver allowances transparently explained?",
    a: "Absolutely. We pride ourselves on zero hidden fees. Before your journey begins, our team clarifies per-km rates, standard driver bata (allowance), and estimated toll/interstate permit charges so you have complete peace of mind.",
  },
  {
    q: "How does the Digital Duty Slip and AI Review system work?",
    a: "At the end of your ride, our chauffeur presents a digital duty slip on mobile where you review start/end odometer readings and sign via touchscreen canvas (/trip-sheet). You will also receive an automated WhatsApp link to submit a 1-tap Google Review with AI rating assistance.",
  },
];

const SectionFaq: FC<SectionFaqProps> = ({ className = "" }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className={`nc-SectionFaq relative ${className}`}>
      <Heading
        desc="Everything you need to know about vehicle bookings, pricing, airport cabs, and pilgrimage tours."
        isCenter
      >
        <ShinyText text="Frequently Asked Questions" speed={3.5} />
      </Heading>

      <div className="max-w-4xl mx-auto mt-12 space-y-4">
        {faqs.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <SpotlightCard
              key={idx}
              className="!rounded-2xl overflow-hidden shadow-sm transition-all hover:border-amber-400/40"
              spotlightColor="rgba(245, 158, 11, 0.15)"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {item.q}
                </span>
                <span className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-neutral-600 dark:text-neutral-300 font-bold text-lg">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          );
        })}

        <div className="pt-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Have another question? Speak to Proprietor Rathan Kanna:{" "}
            <a
              href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
              className="text-primary-6000 dark:text-primary-400 font-bold underline ml-1"
            >
              Call +91 {SADHGURU_CONTACT.primaryPhone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionFaq;
