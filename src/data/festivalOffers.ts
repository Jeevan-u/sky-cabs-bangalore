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
    occasion: "Harvest Festival Village & Temple Return Yatra",
    bannerTitle: "Sankranti Grand Homecoming & Temple Yatra",
    discountBadge: "Flat ₹500 Off Outstation",
    startDate: "2027-01-10",
    endDate: "2027-01-20",
    isActive: true,
    themeColor: "from-amber-500 to-orange-600",
    description:
      "Travel safe with your family to Andhra & Telangana hometowns (Vijayawada, Rajahmundry, Guntur, Warangal, Kamareddy). Guaranteed fixed rates with sanitized Innova Crysta & Tempo Travellers.",
    fleetHighlight: "Innova Crysta & 12/17s Tempo Travellers",
    bookingCode: "SANKRANTI500",
    recommendedDestinations: ["Vijayawada & Godavari", "Kamareddy & Nizamabad", "Srisailam Temple", "Warangal"],
  },
  {
    id: "fest-diwali-safe",
    festivalName: "Diwali Festival of Lights",
    occasion: "Safe Family Pilgrimage & Hometown Transit",
    bannerTitle: "Diwali Safe Night-Drop & Outstation Escort",
    discountBadge: "10% Off Group Booking",
    startDate: "2026-10-25",
    endDate: "2026-11-05",
    isActive: true,
    themeColor: "from-rose-500 to-amber-600",
    description:
      "Experience illuminated festivities with 100% verified chauffeurs. Fixed non-surge airport drops and interstate temple tours to Srisailam & Tirupati.",
    fleetHighlight: "Swift Dzire, Ertiga & VIP Crysta",
    bookingCode: "DIWALI10",
    recommendedDestinations: ["Tirupati Balaji", "Srisailam Kshetram", "RGIA Airport 24x7", "Yadagirigutta"],
  },
  {
    id: "fest-newyear-2027",
    festivalName: "New Year & Winter Pilgrimage 2027",
    occasion: "Holiday Getaways & Sacred New Year Blessings",
    bannerTitle: "New Year 2027 South India Temple Circuit",
    discountBadge: "Early Bird 15% Off Buses",
    startDate: "2026-12-24",
    endDate: "2027-01-05",
    isActive: true,
    themeColor: "from-indigo-600 to-primary-6000",
    description:
      "Ring in 2027 with blessings from Tirupati, Shirdi, and Srisailam. Premium Force Urbania and 32 to 50 seater AC luxury coaches for extended family and corporate teams.",
    fleetHighlight: "Force Urbania & 32-50 Seater AC Buses",
    bookingCode: "NEWYEAR27",
    recommendedDestinations: ["Shirdi & Shani Shingnapur", "Mysore & Ooty", "Tirupati Balaji", "Srisailam 2-Day"],
  },
  {
    id: "fest-ugadi-bonalu",
    festivalName: "Ugadi & Telangana Bonalu Yatra",
    occasion: "Traditional Telugu New Year & City Goddess Temples",
    bannerTitle: "Ugadi & Bonalu Traditional Temple Tours",
    discountBadge: "Special Local 8h/80km Pack",
    startDate: "2027-03-20",
    endDate: "2027-04-10",
    isActive: false,
    themeColor: "from-emerald-600 to-teal-700",
    description:
      "Special city tour packages covering Ujjaini Mahakali Temple Secunderabad, Balkampet Yellamma, Golconda Jagadamba, and Keesaragutta.",
    fleetHighlight: "Swift Dzire & Maruti Ertiga",
    bookingCode: "UGADI2027",
    recommendedDestinations: ["Secunderabad Mahakali", "Balkampet Yellamma", "Keesaragutta", "Chilkur Balaji"],
  },
];
