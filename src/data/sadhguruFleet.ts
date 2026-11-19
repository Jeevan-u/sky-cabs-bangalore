export interface FleetVehicle {
  id: string;
  name: string;
  category: "Sedan" | "SUV" | "Premium SUV" | "Tempo Traveller" | "Luxury Coach";
  capacity: string;
  luggage: string;
  ac: boolean;
  image: string;
  perKmRate: number;
  airportFlatRate: number; // e.g. Kukatpally/KPHB to Shamshabad
  local8hr80km: number;
  features: string[];
  description: string;
  bestFor: string;
}

export const SADHGURU_FLEET: FleetVehicle[] = [
  {
    id: "dzire-etios",
    name: "Swift Dzire / Toyota Etios",
    category: "Sedan",
    capacity: "4+1 Passenger",
    luggage: "2 Large + 1 Small Bags",
    ac: true,
    image: "/images/fleet/swift-dzire.jpg",
    perKmRate: 12,
    airportFlatRate: 1299,
    local8hr80km: 2199,
    features: ["Dual AC", "Clean & Sanitized", "Music System", "Comfortable Legroom", "Fastag Enabled"],
    description: "Ideal for city commutes, quick airport pickups, and budget-friendly small family outstation trips.",
    bestFor: "Airport Drops, KPHB/Hitec City Local, One-Way Outstation",
  },
  {
    id: "ertiga-rumion",
    name: "Maruti Ertiga / Toyota Rumion",
    category: "SUV",
    capacity: "6+1 Passenger",
    luggage: "3 Large + 2 Small Bags",
    ac: true,
    image: "/images/fleet/maruti-ertiga.jpg",
    perKmRate: 15,
    airportFlatRate: 1699,
    local8hr80km: 2899,
    features: ["Roof AC Vents", "Adjustable Rear Seats", "Spacious Boot", "Phone Chargers", "Toll/Fastag Ready"],
    description: "The most economical 6-seater for family outings, airport group transfers, and weekend temple visits.",
    bestFor: "Family Trips, Airport Transfers, Yadagirigutta / Vemulawada",
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Premium SUV",
    capacity: "7+1 / 6+1 Captain Seats",
    luggage: "4 Large + 3 Small Bags",
    ac: true,
    image: "/images/fleet/innova-crysta.jpg",
    perKmRate: 19,
    airportFlatRate: 2199,
    local8hr80km: 3699,
    features: ["Plush Captain Recliners", "Dual Automatic Climate Control", "Highway Cruiser", "Premium Comfort", "GPS Tracking"],
    description: "The gold standard for long-distance highway travel, pilgrimage tours, VIP guest transport, and corporate rentals.",
    bestFor: "Tirupati, Shirdi, Srisailam, Corporate VIP & Wedding Escorts",
  },
  {
    id: "tempo-traveller-12",
    name: "Force Tempo Traveller (12/17 Seater)",
    category: "Tempo Traveller",
    capacity: "12 to 17 Passengers",
    luggage: "Dedicated Carrier & Large Boot",
    ac: true,
    image: "/images/fleet/tempo-traveller-17.jpg",
    perKmRate: 25,
    airportFlatRate: 3499,
    local8hr80km: 4999,
    features: ["Pushback Luxury Seats", "Surround Sound Audio/Video", "Individual AC Vents", "Spacious Aisle", "Experienced Hill Drivers"],
    description: "Perfect for group pilgrimages, marriage guest logistics, and corporate team day-outs from Hyderabad.",
    bestFor: "Large Family Pilgrimage, Wedding Functions, Corporate Trips",
  },
  {
    id: "tempo-traveller-26",
    name: "Force Urbania & 26-Seater TT",
    category: "Tempo Traveller",
    capacity: "20 to 26 Passengers",
    luggage: "Ample Overhead & Boot Space",
    ac: true,
    image: "/images/fleet/force-urbania.png",
    perKmRate: 32,
    airportFlatRate: 4899,
    local8hr80km: 6999,
    features: ["European Style Luxury Seats", "Ultra Silent Cabin", "LED Ambient Lighting", "Smooth Air Suspension", "Curtains & Charging Ports"],
    description: "Next-gen luxury travel for mid-size wedding groups, corporate delegate transit, and long-haul group tours.",
    bestFor: "Luxury Group Tourism, Destination Weddings, Airport Delegations",
  },
  {
    id: "luxury-coach-bus",
    name: "Luxury AC Bus / Coach (32 to 50 Seater)",
    category: "Luxury Coach",
    capacity: "32 to 50 Passengers",
    luggage: "Massive Underfloor Luggage Bays",
    ac: true,
    image: "/images/fleet/luxury-coach-bus.jpg",
    perKmRate: 48,
    airportFlatRate: 7499,
    local8hr80km: 10999,
    features: ["Air Suspension", "Pushback 2x2 Reclining Seats", "Mic & PA System", "TV Entertainment", "Emergency Exits"],
    description: "Full-scale passenger coaches for grand weddings, school/college excursions, and enterprise corporate movements.",
    bestFor: "Grand Weddings, Corporate Events, Mega Pilgrimage Groups",
  },
];

export const SADHGURU_SERVICES = [
  {
    id: "airport",
    title: "Airport Transfers",
    icon: "airplane",
    desc: "24x7 guaranteed on-time pickups and drops to Rajiv Gandhi International Airport (Shamshabad) from Kukatpally, KPHB, Miyapur, Hitec City, Medchal, and across Hyderabad.",
  },
  {
    id: "pilgrimage",
    title: "Pilgrimage Tours",
    icon: "temple",
    desc: "Specialized darshan packages for Tirupati Balaji, Shirdi, Srisailam Mallikarjuna, Yadagirigutta, Vemulawada, Basara Saraswathi Temple with experienced temple-route drivers.",
  },
  {
    id: "family-group",
    title: "Family & Group Travel",
    icon: "users",
    desc: "Spacious 5-seater to 50-seater vehicles ensuring your entire family travels comfortably together with ample luggage space and safety.",
  },
  {
    id: "corporate",
    title: "Corporate Travel",
    icon: "building",
    desc: "Professional transportation solutions for IT corridors in Hitec City, Madhapur, Gachibowli, and Financial District with GST invoicing and courteous chauffeurs.",
  },
  {
    id: "wedding",
    title: "Wedding Transport",
    icon: "sparkles",
    desc: "Complete guest logistics management for weddings: decorated bridal cars, Innova fleets for family elders, and luxury Tempo Travellers for barat & guests.",
  },
  {
    id: "tour-packages",
    title: "Custom Tour Packages",
    icon: "map",
    desc: "Tailor-made holiday and weekend getaways to Araku Valley, Goa, Ooty, Coorg, Nagarjuna Sagar, and Warangal with transparent per-km or fixed package rates.",
  },
];

export const SADHGURU_CONTACT = {
  brandName: "Sri Sadhguru Travels",
  fullName: "Sri Sadhguru Tours and Travels",
  proprietor: "Rathan Kanna",
  tagline: "Travel Safe... Travel Happy...",
  slogan: "Your Journey... Our Responsibility...",
  primaryPhone: "8106117704",
  secondaryPhone: "9398522128",
  primaryPhoneFormatted: "+91 8106 117704",
  secondaryPhoneFormatted: "+91 9398 522128",
  whatsappNumber: "918106117704",
  locations: [
    "Kukatpally, Hyderabad",
    "KPHB Colony, Hyderabad",
    "Miyapur, Hyderabad",
    "Hitec City / Madhapur, Hyderabad",
    "Shamshabad (RGI Airport)",
    "Medchal, Hyderabad",
    "Gandhari, Kamareddy",
  ],
  serviceHours: "24 Hours / 7 Days a Week",
  guarantee: "Best Quotations Guaranteed | 5-Seater to 50-Seater Available",
};

export const HYDERABAD_HUBS = [
  "Kukatpally",
  "KPHB Colony",
  "Miyapur",
  "Hitec City",
  "Gachibowli",
  "Madhapur",
  "Medchal",
  "Shamshabad (RGI Airport)",
  "Secunderabad",
  "Kondapur",
  "Chandanagar",
  "Nizampet",
  "Bachupally",
  "Gandhari, Kamareddy",
];

export const OUTSTATION_POPULAR_DESTINATIONS = [
  "Tirupati",
  "Srisailam",
  "Shirdi",
  "Yadagirigutta",
  "Vemulawada",
  "Basara",
  "Vijayawada",
  "Warangal",
  "Bangalore",
  "Goa",
  "Mantralayam",
  "Kamareddy",
  "Nizamabad",
];
