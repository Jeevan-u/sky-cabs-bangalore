"use client";

import React, { FC, useState } from "react";
import { Squares2X2Icon, CheckBadgeIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { StarRating, WhatsAppIcon } from "@/components/icons";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Image from "next/image";
import { Amenities_demos, includes_demo, PHOTOS } from "./constant";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";
import { SADHGURU_FLEET, SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import {
  AnimatedCounter,
  SpotlightCard,
  StarBorder,
  MagneticButton,
  ShinyText,
  BorderBeam,
  AnimatedTabs,
  ShimmerButton,
} from "@/components/reactbits";
import CustomVehicleSelect from "@/components/CustomVehicleSelect";

export interface ListingCarDetailPageProps {}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({}) => {
  const thisPathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selected vehicle state
  const vehicleParam = searchParams?.get("vehicle") || "innova-crysta";
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicleParam);
  const [selectedTripType, setSelectedTripType] = useState<"airport" | "outstation" | "local">("airport");

  const currentVehicle =
    SADHGURU_FLEET.find(
      (v) =>
        v.id === selectedVehicleId ||
        (selectedVehicleId === "tempo-traveller-12-17" && v.id === "tempo-traveller-12") ||
        (selectedVehicleId === "urbania-26" && v.id === "tempo-traveller-26") ||
        (selectedVehicleId === "luxury-bus-32-50" && v.id === "luxury-coach-bus")
    ) || SADHGURU_FLEET[2]; // Default Innova Crysta

  // Dynamic estimated price calculation
  let displayPrice = currentVehicle.airportFlatRate;
  if (selectedTripType === "local") {
    displayPrice = currentVehicle.local8hr80km;
  } else if (selectedTripType === "outstation") {
    displayPrice = currentVehicle.perKmRate * 350; // Standard 350 KM per day minimum
  }

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const handleReserve = () => {
    router.push(
      `/checkout?vehicle=${currentVehicle.id}&trip=${selectedTripType}&price=${displayPrice}` as any
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* Badges & Save */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <StarBorder as="div" color="#10b981" speed="5s" className="inline-block">
            <span className="px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
              <span>Commercial RTA Permit Verified</span>
            </span>
          </StarBorder>
          <LikeSaveBtns />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {currentVehicle.name} ({currentVehicle.capacity}) - Sri Sadhguru Commercial Fleet
        </h1>

        {/* Rating & Hub */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <StartRating reviewCount={428} point={4.9} />
          <span>·</span>
          <span className="flex items-center text-neutral-600 dark:text-neutral-400 font-medium">
            <MapPinIcon className="w-4 h-4 mr-1 text-primary-6000" />
            Kukatpally Headquarters, Hyderabad & RGIA Shamshabad Express
          </span>
        </div>

        {/* Operator Info */}
        <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Fleet Operator:{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-bold">
              Sri Sadhguru Tours & Travels (Prop: Rathan Kanna)
            </span>
          </span>
        </div>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* Vehicle Highlights with SpotlightCards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          <SpotlightCard
            spotlightColor="rgba(217, 119, 6, 0.12)"
            className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/70 dark:border-neutral-700/70 shadow-sm"
          >
            <span className="text-[11px] text-neutral-400 block font-semibold uppercase tracking-wider">CAPACITY</span>
            <span className="font-bold text-neutral-900 dark:text-white text-base mt-0.5 block">{currentVehicle.capacity}</span>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/70 dark:border-neutral-700/70 shadow-sm"
          >
            <span className="text-[11px] text-neutral-400 block font-semibold uppercase tracking-wider">CHAUFFEUR</span>
            <span className="font-bold text-neutral-900 dark:text-white text-base mt-0.5 block">Included & Verified</span>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(234, 88, 12, 0.14)"
            className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/70 dark:border-neutral-700/70 shadow-sm"
          >
            <span className="text-[11px] text-neutral-400 block font-semibold uppercase tracking-wider">AIRPORT RATE</span>
            <span className="font-bold text-primary-6000 text-base mt-0.5 block">₹{currentVehicle.airportFlatRate} Flat</span>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(5, 150, 105, 0.14)"
            className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/70 dark:border-neutral-700/70 shadow-sm"
          >
            <span className="text-[11px] text-neutral-400 block font-semibold uppercase tracking-wider">OUTSTATION</span>
            <span className="font-bold text-emerald-600 text-base mt-0.5 block">₹{currentVehicle.perKmRate}/KM</span>
          </SpotlightCard>
        </div>
      </div>
    );
  };

  const renderSectionAmenities = () => {
    return (
      <SpotlightCard
        spotlightColor="rgba(217, 119, 6, 0.08)"
        className="listingSection__wrap !p-6 sm:!p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Vehicle Features & Passenger Comfort
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400 text-sm">
            Every vehicle in our fleet is mechanically inspected, sanitized, and GPS-monitored before dispatch.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300">
          {Amenities_demos.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
              <div className="w-10 flex-shrink-0">
                <Image src={item.icon} alt={item.name} />
              </div>
              <span className="font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>
    );
  };

  const renderSectionDescription = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Vehicle Overview & Fleet Standards
        </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium space-y-4">
          <p>
            Experience unmatched travel comfort with Sri Sadhguru Tours & Travels.
            The {currentVehicle.name} is meticulously maintained and equipped with high-efficiency
            dual air conditioning, pushback ergonomic seats, and ample luggage space for both city commutes
            and outstation highway tours.
          </p>
          <p>
            Driven by experienced highway and ghat road chauffeurs who know every highway shortcut and temple darshan
            procedure across Telangana, Andhra Pradesh, Karnataka, and Tamil Nadu. Whether you need a midnight pickup
            at Shamshabad RGIA Airport or a multi-day family pilgrimage to Srisailam, Tirupati, or Shirdi, we guarantee
            spotless cleanliness, 100% on-time arrival, and honest per-km billing without hidden charges.
          </p>
        </div>
      </div>
    );
  };

  const renderSectionInclusions = () => {
    return (
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.08)"
        className="listingSection__wrap !p-6 sm:!p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">What is Included</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400 text-sm">
            Clear standards and zero hidden costs on every trip
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          {includes_demo.map((item) => (
            <div key={item.name} className="flex items-center space-x-3 p-2 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40">
              <CheckBadgeIcon className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>
    );
  };

  const renderSectionHost = () => {
    return (
      <SpotlightCard
        spotlightColor="rgba(245, 158, 11, 0.1)"
        className="listingSection__wrap !p-6 sm:!p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Commercial Fleet Leadership</h2>
          <StarBorder as="div" color="#d97706" speed="5s" className="inline-block">
            <span className="px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
              Verified Proprietor
            </span>
          </StarBorder>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Sri Sadhguru Tours & Travels
            </h3>
            <div className="mt-1 flex items-center text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              <StartRating point={4.9} reviewCount={428} />
              <span className="mx-2">·</span>
              <span>Proprietor: Sri Rathan Kanna</span>
            </div>
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
          Operating from Kukatpally (Hyderabad) and Gandhari (Kamareddy), Sri Sadhguru Tours & Travels manages over 50
          commercial vehicles ranging from 5-seater sedans to 50-seater luxury coaches. We maintain a zero-commission,
          zero-surge policy so you always get the lowest authentic rate.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 items-center">
          <MagneticButton distance={0.2}>
            <ButtonSecondary href="/author">
              View Fleet Operator Profile
            </ButtonSecondary>
          </MagneticButton>
          <MagneticButton distance={0.2}>
            <a
              href={`tel:${SADHGURU_CONTACT.primaryPhone}`}
              className="px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <PhoneIcon className="w-4 h-4" />
              Call: +91 {SADHGURU_CONTACT.primaryPhone}
            </a>
          </MagneticButton>
        </div>
      </SpotlightCard>
    );
  };

  const renderSectionReviews = () => {
    return (
      <div className="listingSection__wrap">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Verified Passenger Reviews
          </h2>
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="text-xs font-semibold text-neutral-500">4.9 (428 Trips)</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6">
          <SpotlightCard
            spotlightColor="rgba(217, 119, 6, 0.08)"
            className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-neutral-900 dark:text-white">Suresh Babu · Hyderabad</span>
              <StarRating rating={5} />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              &ldquo;Booked an Innova Crysta for our family pilgrimage to Srisailam. The vehicle arrived 15 mins early in Kukatpally, clean seats, polite driver who negotiated the ghat road smoothly. Zero hassle billing.&rdquo;
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.08)"
            className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-neutral-900 dark:text-white">Dr. Venkat Rao · Miyapur</span>
              <StarRating rating={5} />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              &ldquo;Regular traveler for early morning Shamshabad Airport drop. Sri Sadhguru is the most reliable taxi service in Hyderabad. No sudden cancellations or surge pricing.&rdquo;
            </p>
          </SpotlightCard>
        </div>
      </div>
    );
  };

  const renderSectionLocation = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Operational Hub & Service Locations
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400 text-sm">
            Kukatpally Main Hub, Hyderabad, Telangana - 500072. Doorstep pickup across KPHB, Miyapur, Hitec City, Medchal & RGIA.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* Authentic Hyderabad Google Map */}
        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-inner border border-neutral-200 dark:border-neutral-700">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Kukatpally,Hyderabad,Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
      </div>
    );
  };

  const renderSidebarPrice = () => {
    return (
      <SpotlightCard
        spotlightColor="rgba(217, 119, 6, 0.15)"
        className="listingSectionSidebar__wrap shadow-2xl rounded-3xl border border-neutral-200/90 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-900 space-y-6 relative overflow-hidden"
      >
        <BorderBeam size={260} duration={8} colorFrom="#f59e0b" colorTo="#0284c7" borderWidth={1.5} />

        {/* PRICE HEADER */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
              Transparent Pricing
            </span>
            <ShinyText text="Zero Surge Guarantee" speed={3.5} className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-extrabold text-neutral-950 dark:text-white flex items-center">
              ₹
              <AnimatedCounter
                from={0}
                to={displayPrice}
                duration={0.6}
                formatter={(v) => v.toLocaleString("en-IN")}
              />
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              {selectedTripType === "airport" ? "Flat Airport Rate" : selectedTripType === "local" ? "8h / 80km Package" : "Base Estimate"}
            </span>
          </div>
        </div>

        {/* TRIP TYPE PICKER WITH ANIMATED TABS */}
        <div>
          <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
            Select Trip Type
          </label>
          <AnimatedTabs
            tabs={[
              { id: "airport", label: "Airport" },
              { id: "outstation", label: "Outstation" },
              { id: "local", label: "Local 8h" },
            ]}
            activeTab={selectedTripType}
            onChange={(id) => setSelectedTripType(id as any)}
            className="w-full justify-between"
            pillColor="bg-amber-500 text-neutral-950 font-bold shadow-sm"
          />
        </div>

        {/* VEHICLE SELECTOR */}
        <CustomVehicleSelect
          label="Select Commercial Vehicle"
          labelClassName="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2"
          value={currentVehicle.id}
          onChange={(id) => setSelectedVehicleId(id)}
        />

        {/* SUMMARY BREAKDOWN */}
        <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex justify-between">
            <span>Vehicle:</span>
            <span className="font-bold text-neutral-900 dark:text-white">{currentVehicle.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Chauffeur & Fuel:</span>
            <span className="font-bold text-emerald-600">Included</span>
          </div>
          <div className="flex justify-between">
            <span>Air Conditioning:</span>
            <span className="font-bold text-emerald-600">Included (Guaranteed)</span>
          </div>
          <div className="flex justify-between">
            <span>Advance Required:</span>
            <span className="font-bold text-neutral-900 dark:text-white">₹0 (Pay Chauffeur at End)</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3 pt-2">
          <ShimmerButton
            onClick={handleReserve}
            background="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
            className="w-full py-3.5 text-sm font-bold shadow-lg shadow-amber-500/25"
          >
            <span>Reserve This Vehicle</span>
            <span className="text-xs">→</span>
          </ShimmerButton>

          <MagneticButton distance={0.2} className="w-full">
            <a
              href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20want%20to%20book%20the%20${encodeURIComponent(currentVehicle.name)}%20for%20${selectedTripType}%20trip.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Instant WhatsApp Quote</span>
            </a>
          </MagneticButton>
        </div>
      </SpotlightCard>
    );
  };

  return (
    <div className="nc-ListingCarDetailPage">
      {/* VEHICLE PHOTO SHOWCASE */}
      <header className="rounded-3xl overflow-hidden mt-6">
        <div className="relative grid grid-cols-4 gap-2 h-72 sm:h-96">
          <div
            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              src={PHOTOS[0]}
              alt="Sri Sadhguru Fleet"
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div
            className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              src={PHOTOS[1]}
              alt="Sri Sadhguru Fleet"
            />
          </div>

          {PHOTOS.slice(2, 4).map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                src={item}
                alt="Sri Sadhguru Fleet"
              />
            </div>
          ))}

          <div
            className="absolute hidden md:flex items-center gap-2 left-4 bottom-4 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-900 dark:text-white text-xs font-bold cursor-pointer hover:bg-white shadow-md z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="h-4 w-4" />
            <span>Show all fleet photos</span>
          </div>
        </div>
      </header>

      {/* MAIN TWO-COLUMN CONTENT */}
      <main className="relative z-10 mt-10 mb-20 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10">
          {renderSection1()}
          {renderSectionAmenities()}
          {renderSectionDescription()}
          {renderSectionInclusions()}
          {renderSectionHost()}
          {renderSectionReviews()}
          {renderSectionLocation()}
        </div>

        <div className="w-full lg:w-2/5 xl:w-1/3">
          <div className="sticky top-28">
            {renderSidebarPrice()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingCarDetailPage;
