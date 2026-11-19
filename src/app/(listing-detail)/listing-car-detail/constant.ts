import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";
import carUtilities1 from "@/images/carUtilities/1.png";
import carUtilities2 from "@/images/carUtilities/2.png";
import carUtilities3 from "@/images/carUtilities/3.png";
import carUtilities4 from "@/images/carUtilities/4.png";
import carUtilities5 from "@/images/carUtilities/5.png";
import carUtilities6 from "@/images/carUtilities/6.png";
import carUtilities7 from "@/images/carUtilities/7.png";
import carUtilities8 from "@/images/carUtilities/8.png";

export const PHOTOS: string[] = [
  "/images/fleet/innova-crysta.jpg",
  "/images/fleet/swift-dzire.jpg",
  "/images/fleet/maruti-ertiga.jpg",
  "/images/fleet/tempo-traveller-17.jpg",
  "/images/fleet/force-urbania.png",
  "/images/fleet/luxury-coach-bus.jpg",
  "/images/Airport-hyderabad.jpg",
  "/images/srisailam-dam.jpg",
];

export const includes_demo = [
  { name: "Verified & courteous highway chauffeur included" },
  { name: "Dual-zone high-performance chilled Air Conditioning" },
  { name: "Zero cancellation fee up to 3 hours before pickup" },
  { name: "Fastag enabled for nonstop expressway toll clearance" },
  { name: "Spotless vehicle interior cleaned & sanitized before every trip" },
  { name: "Guaranteed on-time doorstep arrival across Hyderabad & Airport" },
  { name: "All Telangana & South India commercial RTA permits active" },
  { name: "Transparent digital duty slip generated upon trip completion" },
];

export const Amenities_demos = [
  { name: "Powerful AC with rear passenger blower vents", icon: carUtilities1 },
  { name: "Plush ergonomic pushback reclining seats", icon: carUtilities2 },
  { name: "Spacious trunk luggage boot space for airport suitcases", icon: carUtilities3 },
  { name: "Bluetooth music system & mobile USB charging ports", icon: carUtilities4 },
  { name: "Fastag equipped for quick highway toll clearing", icon: carUtilities5 },
  { name: "Experienced ghat road & hill station chauffeur", icon: carUtilities6 },
  { name: "First aid medical kit & vehicle emergency tools", icon: carUtilities7 },
  { name: "24x7 live operations support & fleet tracking", icon: carUtilities8 },
];

export const imageGallery: ListingGalleryImage[] = [...PHOTOS].map(
  (item, index): ListingGalleryImage => {
    return {
      id: index,
      url: item,
    };
  }
);
