export interface FestivalPoster {
  id: string;
  festivalName: string;
  occasion: string;
  bannerTitle: string;
  discountBadge: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  themeColor: string;
  description: string;
  fleetHighlight: string;
  bookingCode: string;
  recommendedDestinations: string[];
}

export const FESTIVAL_POSTERS: FestivalPoster[] = [
  {
    id: "fest-sankranti-2027",
    festivalName: "Makar Sankranti & Pongal Special",
    occasion: "Harvest Festival Family & Temple Return Trips",
    bannerTitle: "Sankranti Homecoming & Bengaluru Temple Yatra",
    discountBadge: "Flat ₹500 Off Outstation",
    startDate: "2027-01-10",
    endDate: "2027-01-20",
    isActive: true,
    themeColor: "from-amber-500 to-orange-600",
    description:
      "Travel safely with family across Bengaluru and nearby Karnataka towns. Fixed fares with Prime Sedan, Maruti Suzuki Ertiga and Toyota Innova Crysta. Vehicles are subject to availability; confirm availability before booking.",
    fleetHighlight: "Prime Sedan, Maruti Suzuki Ertiga & Toyota Innova Crysta",
    bookingCode: "SANKRANTI500",
    recommendedDestinations: ["Mysuru", "Hassan", "Tumakuru", "Tirupati"],
  },
  {
    id: "fest-diwali-safe",
    festivalName: "Diwali Festival of Lights",
    occasion: "Safe Family Travel & Outstation Escort",
    bannerTitle: "Diwali Safe Night-Drop & Outstation Escort",
    discountBadge: "10% Off Group Booking",
    startDate: "2026-10-25",
    endDate: "2026-11-05",
    isActive: true,
    themeColor: "from-rose-500 to-amber-600",
    description:
      "Celebrate with verified chauffeurs and fixed, non-surge drops to Kempegowda International Airport (BLR) from Koramangala, Whitefield, Jayanagar and Yelahanka. Outstation trips to Mysuru, Tirupati and Coorg are subject to availability.",
    fleetHighlight: "Prime Sedan, Maruti Suzuki Ertiga & Toyota Innova Crysta",
    bookingCode: "DIWALI10",
    recommendedDestinations: ["Mysuru", "Tirupati", "Coorg (Madikeri)", "Kempegowda Airport (BLR)"],
  },
  {
    id: "fest-newyear-2027",
    festivalName: "New Year & Winter Getaways 2027",
    occasion: "Holiday Escapes & Sacred New Year Blessings",
    bannerTitle: "New Year 2027 Bengaluru Outstation Special",
    discountBadge: "Early Bird 15% Off Buses",
    startDate: "2026-12-24",
    endDate: "2027-01-05",
    isActive: true,
    themeColor: "from-indigo-600 to-primary-6000",
    description:
      "Ring in 2027 with relaxed hill and coastal trips from Bengaluru. Force Urbania and Passenger Buses (25, 33, 40, 45, 50 & 52 Seater) are available for extended families and corporate teams, subject to availability.",
    fleetHighlight: "Force Urbania & Passenger Buses (25–52 Seater)",
    bookingCode: "NEWYEAR27",
    recommendedDestinations: ["Ooty", "Coorg (Madikeri)", "Chennai & Pondicherry", "Mangaluru"],
  },
  {
    id: "fest-ugadi-bonalu",
    festivalName: "Ugadi & Dasara Bengaluru Yatra",
    occasion: "Kannada New Year & City Temple Visits",
    bannerTitle: "Ugadi & Dasara Temple Tours Around Bengaluru",
    discountBadge: "Special Local 8h/80km Pack",
    startDate: "2027-03-20",
    endDate: "2027-04-10",
    isActive: false,
    themeColor: "from-emerald-600 to-teal-700",
    description:
      "A comfortable local temple circuit covering ISKCON Temple, Banashankari Temple and Kote Venkataramana Temple with doorstep pickup from Jayanagar, Indiranagar, HSR Layout and Begur. Confirm availability before booking.",
    fleetHighlight: "Prime Sedan & Maruti Suzuki Ertiga",
    bookingCode: "UGADI2027",
    recommendedDestinations: ["ISKCON Temple, Bengaluru", "Banashankari Temple", "Jayanagar", "Hassan"],
  },
];
