import { CheckIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import { Metadata } from "next";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export interface PageSubcriptionProps {}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricings: PricingItem[] = [
  {
    isPopular: false,
    name: "Daily Executive Commute",
    pricing: "₹24,999",
    per: "/mo",
    features: [
      "AC Sedan (Swift Dzire / Etios)",
      "Dedicated Chauffeur & Sanitized Cab",
      "Daily Home-to-Office Pickup & Drop",
      "Priority Hitec City / Madhapur Routing",
      "GST Invoice & Monthly Billing",
    ],
    desc: "Fixed monthly transportation for business executives and IT professionals in Hyderabad.",
  },
  {
    isPopular: true,
    name: "Corporate SUV Contract",
    pricing: "₹44,999",
    per: "/mo",
    features: [
      "Toyota Innova Crysta / Maruti Ertiga",
      "2,000 KM Monthly Allowance Included",
      "VIP Client & Airport Reception Service",
      "Zero Surge & Guaranteed Availability",
      "Digital Duty Slips & Mileage Logs",
      "24x7 Dedicated Relationship Manager",
    ],
    desc: "Ideal for senior management, frequent airport commutes, and inter-city corporate travel.",
  },
  {
    isPopular: false,
    name: "Staff Shuttle Transport",
    pricing: "₹69,999",
    per: "/mo",
    features: [
      "Force Tempo Traveller / Mini Bus",
      "12 to 26 Seater Configuration",
      "Shift-Based Timed Employee Transit",
      "GPS Monitored Routes & Safety Assured",
      "Police Verified Professional Drivers",
      "Custom Flexible Routes Across Hyderabad",
    ],
    desc: "Comprehensive employee transit solution for offices, tech parks, hospitals, and schools.",
  },
];

const PageSubcription: FC<PageSubcriptionProps> = () => {
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col justify-between overflow-hidden bg-white dark:bg-neutral-900 ${
          pricing.isPopular
            ? "border-primary-500 shadow-xl"
            : "border-neutral-200 dark:border-neutral-700 shadow-sm"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full absolute top-4 right-4">
            Most Popular
          </span>
        )}

        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {pricing.name}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
            {pricing.desc}
          </p>

          <div className="mt-6 flex items-baseline">
            <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {pricing.pricing}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 ml-1 font-semibold text-sm">
              {pricing.per}
            </span>
          </div>

          <div className="my-6 border-b border-neutral-100 dark:border-neutral-800" />

          <ul className="space-y-3">
            {pricing.features.map((item, i) => (
              <li key={i} className="flex items-start text-xs font-medium text-neutral-700 dark:text-neutral-300">
                <CheckIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-4">
          <a
            href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20am%20interested%20in%20the%20${encodeURIComponent(pricing.name)}%20monthly%20package.`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 rounded-full text-xs font-bold text-center block transition ${
              pricing.isPopular
                ? "bg-primary-6000 hover:bg-primary-700 text-white shadow-md"
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            }`}
          >
            Enquire via WhatsApp
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PageSubcription container py-16 lg:py-24">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-6000 bg-primary-50 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
          Corporate & Monthly Contracts
        </span>
        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
          Monthly Travel Packages
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-medium">
          Reliable monthly cab contracts and staff shuttle transport across Kukatpally, Hitec City, Madhapur, and Hyderabad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricings.map((pricing, index) => renderPricingItem(pricing, index))}
      </div>
    </div>
  );
};

export default PageSubcription;
