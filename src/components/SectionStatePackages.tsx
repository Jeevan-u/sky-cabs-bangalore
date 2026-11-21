"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Heading from "@/shared/Heading";
import Badge from "@/shared/Badge";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";
import { WhatsAppIcon } from "@/components/icons";
import { SpotlightCard, ShinyText, MagneticButton, AnimatedTabs } from "@/components/reactbits";

export interface SectionStatePackagesProps {
  className?: string;
}

type StateKey = "Karnataka" | "Andhra Pradesh" | "Tamil Nadu" | "South India";

interface DestinationCard {
  name: string;
  tagline: string;
  image: string;
  dist: string;
  days: string;
}

const STATE_DATA: Record<StateKey, DestinationCard[]> = {
  Karnataka: [
    { name: "Mysuru Palace & Brindavan", tagline: "Palace Gardens & Chamundi Hills", image: "/images/images1.jpg", dist: "150 KM", days: "1 Day" },
    { name: "Coorg (Madikeri)", tagline: "Coffee Plantations & Waterfalls", image: "/images/images2.jpg", dist: "260 KM", days: "2 Days" },
    { name: "Chikmagalur", tagline: "Coffee Estates & Mullayanagiri", image: "/images/images3.jpg", dist: "250 KM", days: "2 Days" },
    { name: "Hampi UNESCO Heritage", tagline: "Vijayanagara Ruins & Virupaksha", image: "/images/Hampi.jpg", dist: "380 KM", days: "2-3 Days" },
    { name: "Gokarna & Murudeshwar", tagline: "Beach Temple & Coastal Drive", image: "/images/Gokarna.webp", dist: "480 KM", days: "3 Days" },
    { name: "Dharmasthala Manjunatha", tagline: "Temple Town Getaway", image: "/images/Dharmasthala.jpg", dist: "300 KM", days: "2 Days" },
    { name: "Udupi Sri Krishna", tagline: "Ashta Mathas & Coastal Cuisine", image: "/images/Udupi.jpeg", dist: "350 KM", days: "3 Days" },
    { name: "Sringeri Sharada Peetham", tagline: "Adi Shankaracharya Peetham", image: "/images/Sringeri.jpg", dist: "330 KM", days: "2-3 Days" },
  ],
  "Andhra Pradesh": [
    { name: "Tirupati Balaji Darshan", tagline: "Lord Venkateswara Temple", image: "/images/Tirupati.jpg", dist: "325 KM", days: "2 Days" },
    { name: "Srikalahasti", tagline: "Vayu Linga & Rahu Ketu Pooja", image: "/images/Srikalahasti.jpg", dist: "320 KM", days: "2 Days" },
    { name: "Visakhapatnam & Simhachalam", tagline: "Coastal City & Hill Temple", image: "/images/vizag.jpg", dist: "620 KM", days: "3-4 Days" },
    { name: "Visakhapatnam & Simhachalam", tagline: "Coastal City & Hill Temple", image: "/images/vizag.jpg", dist: "620 KM", days: "3-4 Days" },
  ],
  "Tamil Nadu": [
    { name: "Ooty Nilgiris", tagline: "Hill Station & Tea Gardens", image: "/images/images4.jpg", dist: "265 KM", days: "2-3 Days" },
    { name: "Chennai City Break", tagline: "Marina Beach & Temples", image: "/images/images1.jpg", dist: "345 KM", days: "2 Days" },
    { name: "Pondicherry", tagline: "French Quarter & Coastal Retreat", image: "/images/images2.jpg", dist: "310 KM", days: "2-3 Days" },
    { name: "Rameswaram & Dhanushkodi", tagline: "Ramanathaswamy Temple", image: "/images/Rameswaram.jpg", dist: "700 KM", days: "4 Days" },
    { name: "Thanjavur Brihadisvara", tagline: "Chola UNESCO Big Temple", image: "/images/Thanjavur.jpg", dist: "600 KM", days: "3 Days" },
    { name: "Kanyakumari Sunrise Point", tagline: "Triveni Sangam & Vivekananda Rock", image: "/images/thiruvalluvar-statue-kanyakumari-tamil-nadu-hero.jpg", dist: "700 KM", days: "4-5 Days" },
  ],
  "South India": [
    { name: "Wayanad", tagline: "Forests, Lakes & Waterfalls", image: "/images/images3.jpg", dist: "300 KM", days: "2-3 Days" },
    { name: "Kochi & Munnar", tagline: "Backwaters & Tea Hills", image: "/images/images4.jpg", dist: "440 KM", days: "3 Days" },
    { name: "Guruvayur Sri Krishna", tagline: "Bhuloka Vaikuntham Temple", image: "/images/Guruvayur.jpg", dist: "420 KM", days: "3 Days" },
    { name: "Thiruvananthapuram", tagline: "Padmanabhaswamy Temple", image: "/images/Thiruvananthapuram.jpg", dist: "650 KM", days: "4 Days" },
  ],
};

const SectionStatePackages: FC<SectionStatePackagesProps> = ({ className = "" }) => {
  const tabs: StateKey[] = ["Karnataka", "Andhra Pradesh", "Tamil Nadu", "South India"];
  const [activeTab, setActiveTab] = useState<StateKey>("Karnataka");
  const [dynamicStateData, setDynamicStateData] = useState<Record<StateKey, DestinationCard[]>>(STATE_DATA);

  React.useEffect(() => {
    fetch("/api/tours-cms?published=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.packages) && data.packages.length > 0) {
          const grouped: Record<StateKey, DestinationCard[]> = {
            Karnataka: [],
            "Andhra Pradesh": [],
            "Tamil Nadu": [],
            "South India": [],
          };
          data.packages.forEach((pkg: any) => {
            const st = pkg.state as StateKey;
            if (grouped[st]) {
              grouped[st].push({
                name: pkg.name,
                tagline: pkg.tagline,
                image: pkg.image || "/images/images3.jpg",
                dist: pkg.dist || "250 KM",
                days: pkg.days || "1-2 Days",
              });
            }
          });
          tabs.forEach((key) => {
            if (grouped[key].length === 0) {
              grouped[key] = STATE_DATA[key];
            }
          });
          setDynamicStateData(grouped);
        }
      })
      .catch((err) => {
        console.warn("Using offline fallback for tour packages:", err);
      });
  }, []);

  return (
    <div className={`nc-SectionStatePackages relative ${className}`} id="packages">
      <Heading
        desc="Curated round-trip outstation and holiday itineraries from Begur and Bengaluru. Vehicle availability and fares are confirmed before booking."
        isCenter
      >
        Outstation & Holiday Packages from Bengaluru
      </Heading>

      {/* Animated Spring Tabs */}
      <div className="flex justify-center items-center mt-8 mb-12">
        <AnimatedTabs
          tabs={tabs.map((tab) => ({ id: tab, label: tab }))}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as StateKey)}
          pillColor="bg-primary-6000 text-white font-bold shadow-md"
        />
      </div>

      {/* Cards Grid with SpotlightCard */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {(dynamicStateData[activeTab] || STATE_DATA[activeTab]).map((item, idx) => (
          <SpotlightCard
            key={idx}
            className="group flex flex-col !rounded-2xl sm:!rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-300"
            spotlightColor="rgba(245, 158, 11, 0.2)"
          >
            <div className="relative w-full h-32 sm:h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 scale-90 sm:scale-100 origin-top-left">
                <Badge name={item.days} color="green" />
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                <span className="bg-black/60 backdrop-blur-sm text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                  {item.dist}
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between space-y-2 sm:space-y-4">
              <div>
                <h3 className="font-bold text-xs sm:text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-primary-6000 transition-colors truncate">
                  {item.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 sm:mt-1 font-medium line-clamp-1 sm:line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-500 block uppercase font-bold">Round-Trip</span>
                  <span className="text-[11px] sm:text-xs font-bold text-primary-6000">Sedan/SUV/TT</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <a
                    href={`/checkout?trip=pilgrimage&drop=${encodeURIComponent(item.name + " (" + item.days + ")")}`}
                    className="flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary-6000 hover:bg-primary-700 text-white font-bold text-[10px] sm:text-xs shadow-xs transition touch-manipulation active:scale-95"
                  >
                    Book
                  </a>
                  <MagneticButton pullFactor={0.25}>
                    <a
                      href={`https://wa.me/${SKY_CABS_CONTACT.whatsappNumber}?text=Hi%20Sky%20Cabs%20Bangalore,%20I%20would%20like%20to%20get%20a%20quote%20for%20the%20${encodeURIComponent(item.name)}%20(${encodeURIComponent(item.days)})%20package.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs shadow-xs transition inline-flex items-center justify-center touch-manipulation active:scale-95"
                      title="WhatsApp Quote"
                    >
                      <WhatsAppIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default SectionStatePackages;
