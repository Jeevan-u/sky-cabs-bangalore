"use client";

import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MapPinIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  CheckCircleIcon,
  TruckIcon,
  CalendarDaysIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon, ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { SADHGURU_FLEET, SADHGURU_CONTACT } from "@/data/sadhguruFleet";
import CustomVehicleSelect from "@/components/CustomVehicleSelect";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";

interface CustomRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPickup?: string;
  defaultDrop?: string;
}

const CustomRouteModal: FC<CustomRouteModalProps> = ({
  isOpen,
  onClose,
  defaultPickup = "",
  defaultDrop = "",
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState(defaultPickup || "Gachibowli, Hyderabad");
  const [dropAddress, setDropAddress] = useState(defaultDrop || "Nagarjuna Sagar Dam");
  const [vehicleId, setVehicleId] = useState("innova-crysta");
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split("T")[0]);
  const [pickupTime, setPickupTime] = useState("06:00 AM");
  const [notes, setNotes] = useState("");
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleFetchGpsLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsLocation({ lat: latitude, lng: longitude });
        setPickupAddress(`GPS Pin: ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E (Hyderabad Outer Hub)`);
        setIsLocating(false);
      },
      (err) => {
        console.warn("GPS error:", err);
        setIsLocating(false);
        alert("Could not fetch automatic GPS. Please type your pickup location address.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !pickupAddress.trim() || !dropAddress.trim()) {
      setErrorMessage("Please fill all mandatory fields (Name, Mobile, Pickup & Destination).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const selectedFleetObj =
      SADHGURU_FLEET.find((v) => v.id === vehicleId) || SADHGURU_FLEET[2];
    const resolvedVehicleType = `${selectedFleetObj.name} (${selectedFleetObj.capacity})`;

    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          pickup_address: pickupAddress.trim(),
          drop_address: dropAddress.trim(),
          vehicle_type: resolvedVehicleType,
          pickup_datetime: `${pickupDate}T${pickupTime}`,
          notes: notes.trim(),
          gps_lat: gpsLocation?.lat,
          gps_lng: gpsLocation?.lng,
          distance_km: 120, // default placeholder
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit custom quotation request.");
      }

      setSubmittedQuote(data.quotation);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl max-h-[85vh] sm:max-h-[88vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-5 sm:p-7 text-neutral-900 dark:text-neutral-100 font-sans my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {!submittedQuote ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <SparklesIcon className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                Custom Route & Non-Hub Quotation
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              Request Custom Route Quote
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Pickup from any location (Gachibowli, Financial Dist, Shamirpet, or custom towns) with Google Maps routing & manual proprietor quotation.
            </p>

            {errorMessage && (
              <div className="p-3 my-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5">
                <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Pickup location with GPS fetch button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Pickup Location (Address, Colony, or Google Maps Link) *
                  </label>
                  <button
                    type="button"
                    onClick={handleFetchGpsLocation}
                    disabled={isLocating}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <MapPinIcon className="w-3.5 h-3.5" />
                    <span>{isLocating ? "Fetching GPS..." : "Use Current GPS Pin"}</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPinIcon className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="e.g. Gachibowli, or paste Google Maps link (https://maps.app.goo.gl/...)"
                    className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-base sm:text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Destination Drop location */}
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                  Destination Drop Location (City, Landmark, or Google Maps Link) *
                </label>
                <div className="relative">
                  <MapPinIcon className="w-4 h-4 text-rose-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={dropAddress}
                    onChange={(e) => setDropAddress(e.target.value)}
                    placeholder="e.g. Nagarjuna Sagar Dam, or paste Google Maps link (https://maps.app.goo.gl/...)"
                    className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-base sm:text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Vehicle Class */}
              <CustomVehicleSelect
                value={vehicleId}
                onChange={(id) => setVehicleId(id)}
              />

              {/* Schedule: Date & Time matching website UI */}
              <CustomDateTimePicker
                label="Pickup Date & Time *"
                travelDate={pickupDate}
                travelTime={pickupTime}
                onDateChange={(d) => setPickupDate(d)}
                onTimeChange={(t) => setPickupTime(t)}
              />

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Anand Reddy"
                      className="w-full pl-10 pr-3 py-2.5 min-h-[44px] rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-base sm:text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <PhoneIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98480 12345"
                      className="w-full pl-10 pr-3 py-2.5 min-h-[44px] rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-base sm:text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Special instructions */}
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                  Trip Notes / Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Multiple stopovers, luggage space, elderly passengers onboard..."
                  className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-base sm:text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-primary-500"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 min-h-[44px] rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition active:scale-95 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 min-h-[44px] rounded-2xl bg-primary-6000 hover:bg-primary-700 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-primary-6000/25 transition active:scale-95 touch-manipulation"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                  {isSubmitting ? "Dispatching..." : "Submit Quote Request"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation Card */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircleIcon className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
              Quote Request Dispatched!
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Your custom route request (ID: <span className="font-mono font-bold text-primary-6000">{submittedQuote.id}</span>) has been received by Proprietor Rathan Kanna at our Kukatpally Command Center.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-left text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-bold">Route:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
                  <span>{submittedQuote.pickup_address}</span>
                  <ArrowRightIcon className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span>{submittedQuote.drop_address}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Vehicle:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{submittedQuote.vehicle_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Status:</span>
                <span className="font-bold text-amber-500">Pending Admin Quotation</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              You will receive an official quotation via WhatsApp/SMS within 10-15 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=Hi%20Sri%20Sadhguru%20Travels,%20I%20just%20submitted%20Custom%20Quote%20Request%20%23${submittedQuote.id}%20from%20${encodeURIComponent(submittedQuote.pickup_address)}%20to%20${encodeURIComponent(submittedQuote.drop_address)}.%20Please%20quote%20best%20rate.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Follow-up</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CustomRouteModal;
