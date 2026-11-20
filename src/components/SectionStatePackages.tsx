"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Heading from "@/shared/Heading";
import Badge from "@/shared/Badge";
import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import { WhatsAppIcon } from "@/components/icons";
import { SpotlightCard, ShinyText, MagneticButton, AnimatedTabs } from "@/components/reactbits";

export interface SectionStatePackagesProps {
  className?: string;
}

type StateKey = "Andhra Pradesh" | "Karnataka" | "Tamil Nadu" | "Kerala";

interface DestinationCard {
  name: string;
  tagline: string;
  image: string;
  dist: string;
  days: string;
}

const STATE_DATA: Record<StateKey, DestinationCard[]> = {
  "Andhra Pradesh": [
    {
      name: "Tirupati Balaji",
      tagline: "Lord Venkateswara Temple Darshan",
      image: "/images/Tirupati.jpg",
      dist: "570 KM",
      days: "2-3 Days",
    },
    {
      name: "Srisailam Dam & Temple",
      tagline: "Mallikarjuna Jyotirlinga & Ghat Road",
      image: "/images/srisailam-dam.jpg",
      dist: "213 KM",
      days: "1-2 Days",
    },
    {
      name: "Srikalahasti",
      tagline: "Vayu Linga & Rahu Ketu Pooja",
      image: "/images/Srikalahasti.jpg",
      dist: "540 KM",
      days: "2 Days",
    },
    {
      name: "Mahanandi & Yaganti",
      tagline: "Ancient Shiva & Growing Nandi",
      image: "/images/Yaganti.jpg",
      dist: "310 KM",
      days: "2 Days",
    },
    {
      name: "Vijayawada & Amaravati",
      tagline: "Kanaka Durga Goddess Temple",
      image: "/images/Vijayawada.avif",
      dist: "275 KM",
      days: "1-2 Days",
    },
    {
      name: "Rajahmundry & Godavari",
      tagline: "Pushkar Ghats & Kotilingala Temple",
      image: "/images/rajahmundry.jpg",
      dist: "450 KM",
      days: "2-3 Days",
    },
    {
      name: "Vizag & Simhachalam",
      tagline: "Varaha Lakshmi Narasimha & RK Beach",
      image: "/images/vizag.jpg",
      dist: "620 KM",
      days: "3-4 Days",
    },
    {
      name: "Bhimavaram Pancharama",
      tagline: "Somarama & Ksheerarama Kshetrams",
      image: "/images/bhimavaram.jpg",
      dist: "390 KM",
      days: "2 Days",
    },
  ],
  Karnataka: [
    {
      name: "Hampi UNESCO Heritage",
      tagline: "Vijayanagara Ruins & Virupaksha",
      image: "/images/Hampi.jpg",
      dist: "380 KM",
      days: "2-3 Days",
    },
    {
      name: "Gokarna & Murudeshwar",
      tagline: "Atmalinga Beach & Giant Shiva",
      image: "/images/murudeshwar.jpg",
      dist: "680 KM",
      days: "3-4 Days",
    },
    {
      name: "Dharmasthala Manjunatha",
      tagline: "Lord Manjunatha Swamy Kshetram",
      image: "/images/Dharmasthala.jpg",
      dist: "780 KM",
      days: "3-4 Days",
    },
    {
      name: "Kukke Subrahmanya",
      tagline: "Sarpa Dosha Nivarana Temple",
      image: "/images/Subrahmanya.jpg",
      dist: "760 KM",
      days: "3-4 Days",
    },
    {
      name: "Udupi Sri Krishna",
      tagline: "Ashta Mathas & Kanakadasa Window",
      image: "/images/Udupi.jpeg",
      dist: "740 KM",
      days: "3-4 Days",
    },
    {
      name: "Sringeri Sharada Peetham",
      tagline: "Adi Shankaracharya Sacred Peetham",
      image: "/images/Sringeri.jpg",
      dist: "720 KM",
      days: "3-4 Days",
    },
    {
      name: "Kollur Mookambika",
      tagline: "Saraswati Shakti Peetham",
      image: "/images/Mookambika.jpg",
      dist: "750 KM",
      days: "3-4 Days",
    },
  ],
  "Tamil Nadu": [
    {
      name: "Rameswaram & Dhanushkodi",
      tagline: "Ramanathaswamy & Holy Teerthams",
      image: "/images/Rameswaram.jpg",
      dist: "980 KM",
      days: "4-5 Days",
    },
    {
      name: "Arunachalam (Tiruvannamalai)",
      tagline: "Agni Linga & Girivalam Yatra",
      image: "/images/Arunachalam.jpg",
      dist: "650 KM",
      days: "3 Days",
    },
    {
      name: "Thanjavur Brihadisvara",
      tagline: "Chola UNESCO Big Temple",
      image: "/images/Thanjavur.jpg",
      dist: "820 KM",
      days: "3-4 Days",
    },
    {
      name: "Kumbakonam Navagraha",
      tagline: "9 Planet Temples Pilgrimage",
      image: "/images/Kumbakonam.jpg",
      dist: "810 KM",
      days: "3-4 Days",
    },
    {
      name: "Chidambaram Nataraja",
      tagline: "Akasha Lingam & Cosmic Dance",
      image: "/images/Chidambaram.avif",
      dist: "730 KM",
      days: "3 Days",
    },
    {
      name: "Srirangam Ranganathaswamy",
      tagline: "Premier 108 Divya Desam",
      image: "/images/Srirangam.jpg",
      dist: "790 KM",
      days: "3-4 Days",
    },
    {
      name: "Thiruchendur Murugan",
      tagline: "Sea-shore Arupadaiveedu Temple",
      image: "/images/Thiruchendur.jpg",
      dist: "1,020 KM",
      days: "4-5 Days",
    },
    {
      name: "Kanyakumari Sunrise Point",
      tagline: "Triveni Sangam & Vivekananda Rock",
      image: "/images/thiruvalluvar-statue-kanyakumari-tamil-nadu-hero.jpg",
      dist: "1,150 KM",
      days: "4-5 Days",
    },
  ],
  Kerala: [
    {
      name: "Guruvayur Sri Krishna",
      tagline: "Bhuloka Vaikuntham Holy Temple",
      image: "/images/Guruvayur.jpg",
      dist: "980 KM",
      days: "4 Days",
    },
    {
      name: "Sabarimala (Pampa & Pandalam)",
      tagline: "Lord Ayyappa Devasthanam Yatra",
      image: "/images/Pampa.jpg",
      dist: "1,080 KM",
      days: "4-5 Days",
    },
    {
      name: "Chottanikkara Bhagavathy",
      tagline: "Powerful Mother Goddess Kshetram",
      image: "/images/Chottanikkara.jpg",
      dist: "1,010 KM",
      days: "4 Days",
    },
    {
      name: "Thiruvananthapuram",
      tagline: "Padmanabhaswamy Temple",
      image: "/images/Thiruvananthapuram.jpg",
      dist: "1,180 KM",
      days: "4-5 Days",
    },
  ],
};

const SectionStatePackages: FC<SectionStatePackagesProps> = ({ className = "" }) => {
  const tabs: StateKey[] = ["Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala"];
  const [activeTab, setActiveTab] = useState<StateKey>("Andhra Pradesh");

  return (
    <div className={`nc-SectionStatePackages relative ${className}`} id="packages">
      <Heading
        desc="Curated round-trip pilgrimage and holiday itineraries originating from Kukatpally and Hyderabad with experienced chauffeurs."
        isCenter
      >
        South India Pilgrimage & Holiday Packages
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
        {STATE_DATA[activeTab].map((item, idx) => (
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
                      href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20would%20like%20to%20get%20a%20quote%20for%20the%20${encodeURIComponent(item.name)}%20(${encodeURIComponent(item.days)})%20package.`}
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
