export interface PackageVehicleRate {
  vehicleId: string;
  name: string;
  category: string;
  capacity: string;
  price: number;
  priceDisplay: string;
  badge?: string;
  rateType: "Flat Package" | "Base Rate" | "Per KM";
}

export interface ItineraryDay {
  day: number;
  title: string;
  time: string;
  description: string;
  highlights: string[];
}

export interface TourPackageDetail {
  slug: string;
  title: string;
  state: "Andhra Pradesh" | "Karnataka" | "Tamil Nadu" | "South India";
  duration: string;
  distanceKm: number;
  tagline: string;
  heroBadge: string;
  overview: string;
  image: string;
  startingPrice: number;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  vehicleRates: PackageVehicleRate[];
  templeTimings?: string;
  bestTimeToVisit?: string;
}

export const ALL_TOUR_PACKAGES: TourPackageDetail[] = [
  {
    slug: "mysuru-hassan-heritage",
    title: "Mysuru & Hassan Royal Heritage (1-2 Day)",
    state: "Karnataka",
    duration: "1 to 2 Days",
    distanceKm: 150,
    tagline: "Mysuru Palace, Chamundi Hills & Brindavan Gardens with an optional Hassan detour via Tumakuru",
    heroBadge: "Most Booked Bengaluru Weekend",
    overview:
      "A relaxed outstation trip from Bengaluru to Mysuru, the cultural capital of Karnataka. The drive passes Tumakuru and rolling countryside before reaching the illuminated Mysuru Palace, Chamundi Hills and Brindavan Gardens. Extend the trip to Hassan to see the Hoysala craftsmanship at Belur and Halebidu, then return to Bengaluru by evening.",
    image: "/images/images1.jpg",
    startingPrice: 4200,
    inclusions: [
      "Dedicated air-conditioned commercial vehicle for the complete round trip from Bengaluru",
      "Experienced chauffeur familiar with Bengaluru–Mysuru highway and ghat sections",
      "Toll charges, state permits, fuel and driver allowance included",
      "Flexible doorstep pickup from Begur, Electronic City, Koramangala, HSR Layout, Jayanagar or Whitefield",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "Mysuru Palace, garden and monument entry tickets",
      "Meals, snacks and personal shopping",
      "Hotel accommodation if you choose an overnight stay",
      "Specialdarshan or guide charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Mysuru, Palace & Brindavan Gardens",
        time: "07:00 AM – 09:00 PM",
        description:
          "Morning doorstep pickup in Bengaluru and a smooth drive via Tumakuru. Arrive in Mysuru, visit the grand Mysuru Palace and the Sri Chamundeshwari Temple on Chamundi Hills, then watch the evening illumination at Brindavan Gardens before returning or checking in for the night.",
        highlights: [
          "07:00 AM: Doorstep pickup anywhere in Bengaluru",
          "09:30 AM: Breakfast halt near Tumakuru",
          "11:30 AM: Mysuru Palace and royal courtyard walk",
          "02:30 PM: Chamundi Hills and Nandi viewpoint",
          "06:00 PM: Brindavan Gardens illumination",
          "09:00 PM: Drop back in Bengaluru or overnight stay in Mysuru",
        ],
      },
      {
        day: 2,
        title: "Optional Hassan & Hoysala Temples Return",
        time: "07:30 AM – 08:30 PM",
        description:
          "After breakfast, drive to Hassan to explore the intricate Hoysala temples at Belur and Halebidu. A relaxed highway drive brings you back to Bengaluru by evening with a doorstep drop.",
        highlights: [
          "07:30 AM: Breakfast in Mysuru",
          "10:30 AM: Belur Chennakeshava Temple",
          "01:00 PM: Halebidu Hoysaleswara Temple",
          "04:00 PM: Return drive towards Bengaluru",
          "08:30 PM: Doorstep arrival in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 4200,
        priceDisplay: "₹4,200 Flat",
        rateType: "Flat Package",
        badge: "Best for Couples",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 5200,
        priceDisplay: "₹5,200 Flat",
        rateType: "Flat Package",
        badge: "Family Pick",
      },
      {
        vehicleId: "innova-crysta",
        name: "Toyota Innova Crysta",
        category: "Premium SUV",
        capacity: "7+1 Passenger",
        price: 6800,
        priceDisplay: "₹6,800 Flat",
        rateType: "Flat Package",
        badge: "Extra Comfort",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 9200,
        priceDisplay: "₹9,200 Flat",
        rateType: "Flat Package",
        badge: "Group Weekend",
      },
      {
        vehicleId: "passenger-bus",
        name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
        category: "Luxury Coach",
        capacity: "25, 33, 40, 45, 50 & 52 Seater",
        price: 18000,
        priceDisplay: "₹18,000 Base",
        rateType: "Base Rate",
        badge: "Large Groups",
      },
    ],
    templeTimings: "Mysuru Palace is generally open 10:00 AM to 5:30 PM; Chamundi Hills is accessible through the day. Brindavan Gardens illumination is usually in the evening.",
    bestTimeToVisit: "October to March for pleasant weather; Dasara week is beautiful but busy, so book early.",
  },
  {
    slug: "tirupati-balaji",
    title: "Tirupati Balaji & Tirumala Pilgrimage (2-3 Day)",
    state: "Andhra Pradesh",
    duration: "2 to 3 Days",
    distanceKm: 385,
    tagline: "Lord Venkateswara Darshan, Tirumala Ghat Ascent & Sri Padmavathi Temple from Bengaluru",
    heroBadge: "Bengaluru Pilgrimage Favourite",
    overview:
      "Travel comfortably from Bengaluru to the sacred Seven Hills of Tirumala on the NH 44 corridor via Kolar and Chittoor. Our chauffeurs plan the departure around darshan schedules, manage highway halts and know the Tirumala ghat road rules, so families and senior citizens can enjoy an unhurried, respectful pilgrimage.",
    image: "/images/Tirupati.jpg",
    startingPrice: 9800,
    inclusions: [
      "Air-conditioned commercial vehicle for the entire Bengaluru round trip",
      "Chauffeur experienced with Tirumala ghat roads and uphill/downhill traffic rules",
      "National highway tolls, interstate permits, fuel and driver batta included",
      "Doorstep pickup and return drop across Bengaluru hubs including Begur, HSR Layout and Whitefield",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "TTD Special Entry Darshan or VIP tickets, which guests book on the official portal",
      "Hotel accommodation at Tirupati or Tirumala",
      "Personal tonsure, prasadam and donation expenses",
      "Meals and snacks during the journey",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Tirupati & Tiruchanur Darshan",
        time: "05:00 AM – 05:00 PM",
        description:
          "Depart Bengaluru early morning and travel the NH 44 expressway with a relaxed breakfast and lunch break. Arrive at the Tirupati foothills by late afternoon, check in, freshen up and visit Sri Padmavathi Ammavari Temple at Tiruchanur.",
        highlights: [
          "05:00 AM: Bengaluru departure",
          "08:30 AM: Breakfast halt on the highway",
          "03:30 PM: Arrival and check-in at Tirupati",
          "05:00 PM: Sri Padmavathi Ammavari Temple darshan",
          "07:30 PM: Kapila Theertham and quiet evening walk",
        ],
      },
      {
        day: 2,
        title: "Tirumala Ghat Ascent & Venkateswara Swamy Darshan",
        time: "06:00 AM – 07:00 PM",
        description:
          "Drive up the Tirumala ghat road early in the morning. Complete your scheduled darshan of Lord Venkateswara, visit Akasa Ganga and Papavinasanam, collect tirupati laddoo prasadam and descend safely to Tirupati by evening.",
        highlights: [
          "06:30 AM: Ghat road ascent to Tirumala",
          "08:30 AM: Lord Venkateswara Swamy darshan",
          "12:30 PM: Laddoo prasadam collection",
          "02:30 PM: Akasa Ganga and Papavinasanam",
          "06:00 PM: Safe descent to Tirupati foothills",
        ],
      },
      {
        day: 3,
        title: "Optional Second Darshan & Return to Bengaluru",
        time: "07:00 AM – 10:00 PM",
        description:
          "Use the morning for a second peaceful darshan or a visit to the local temples in Tirupati, then begin the highway return to Bengaluru with scheduled meal stops and a doorstep drop.",
        highlights: [
          "07:30 AM: Optional morning darshan or temple walk",
          "10:30 AM: Return drive towards Bengaluru",
          "10:00 PM: Safe doorstep arrival in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 9800,
        priceDisplay: "₹9,800 Flat",
        rateType: "Flat Package",
        badge: "Budget Pilgrim",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 11800,
        priceDisplay: "₹11,800 Flat",
        rateType: "Flat Package",
        badge: "Family Pick",
      },
      {
        vehicleId: "innova-crysta",
        name: "Toyota Innova Crysta",
        category: "Premium SUV",
        capacity: "7+1 Passenger",
        price: 14800,
        priceDisplay: "₹14,800 Flat",
        rateType: "Flat Package",
        badge: "Long-Haul Comfort",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 21500,
        priceDisplay: "₹21,500 Flat",
        rateType: "Flat Package",
        badge: "Group Pilgrimage",
      },
      {
        vehicleId: "passenger-bus",
        name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
        category: "Luxury Coach",
        capacity: "25, 33, 40, 45, 50 & 52 Seater",
        price: 42000,
        priceDisplay: "₹42,000 Base",
        rateType: "Base Rate",
        badge: "Full Group Yatra",
      },
    ],
    templeTimings: "Tirumala temple remains open for long hours across the day for sevas and darshan. Confirm your TTD slot and ghat road timings before departure.",
    bestTimeToVisit: "September to February for comfortable weather; avoid major festival rush if travelling with elders.",
  },
  {
    slug: "coorg-chikmagalur-hills",
    title: "Coorg (Madikeri) & Chikmagalur Hill Escape (2-3 Day)",
    state: "Karnataka",
    duration: "2 to 3 Days",
    distanceKm: 285,
    tagline: "Coffee estates, misty ghat roads and waterfall breaks across Coorg and Chikmagalur",
    heroBadge: "Bengaluru Monsoon Getaway",
    overview:
      "Swap the city for coffee-scented hill air on this Bengaluru outstation trip to Madikeri in Coorg and onward to Chikmagalur. The route climbs through planted valleys and small towns, with time for a waterfall, a plantation walk and a slow morning before the drive back to Bengaluru.",
    image: "/images/images2.jpg",
    startingPrice: 7500,
    inclusions: [
      "Air-conditioned commercial cab for the full Bengaluru round trip",
      "Chauffeur experienced on Karnataka ghat roads and hairpin bends",
      "Tolls, parking, fuel and driver allowance included",
      "Doorstep pickup from Electronic City, Koramangala, Whitefield, Indiranagar, Jayanagar or Begur",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "Resort or homestay accommodation in Coorg and Chikmagalur",
      "Plantation entry fees, waterfall tickets and sightseeing permits",
      "Meals and personal expenses",
      "Adventure activities and guide charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Madikeri & Coorg Sightseeing",
        time: "06:30 AM – 07:00 PM",
        description:
          "Leave Bengaluru early and drive towards Madikeri with a breakfast stop en route. After check-in, visit the town viewpoints, a nearby waterfall and a coffee estate before a quiet evening in the hills.",
        highlights: [
          "06:30 AM: Bengaluru pickup",
          "10:30 AM: Arrival in Madikeri",
          "12:00 PM: Local viewpoint and town walk",
          "03:00 PM: Waterfall and coffee estate visit",
          "07:00 PM: Evening at the homestay",
        ],
      },
      {
        day: 2,
        title: "Coorg to Chikmagalur Plantation Drive",
        time: "08:00 AM – 07:30 PM",
        description:
          "After a relaxed breakfast, take the scenic road to Chikmagalur. Stop at a tea or coffee plantation, enjoy a hillside viewpoint and check in for the night.",
        highlights: [
          "08:00 AM: Breakfast in Coorg",
          "11:30 AM: Scenic drive towards Chikmagalur",
          "02:30 PM: Plantation walk",
          "05:00 PM: Hillside sunset viewpoint",
          "07:30 PM: Overnight stay in Chikmagalur",
        ],
      },
      {
        day: 3,
        title: "Chikmagalur Morning & Return to Bengaluru",
        time: "08:00 AM – 08:30 PM",
        description:
          "Enjoy a slow morning in the estates, then begin the return journey to Bengaluru with a highway lunch halt and doorstep drop.",
        highlights: [
          "08:30 AM: Estate breakfast and local temple visit",
          "11:00 AM: Departure from Chikmagalur",
          "04:00 PM: Refreshment halt on the highway",
          "08:30 PM: Drop back in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 7500,
        priceDisplay: "₹7,500 Flat",
        rateType: "Flat Package",
        badge: "Couple Escape",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 9200,
        priceDisplay: "₹9,200 Flat",
        rateType: "Flat Package",
        badge: "Family Favourite",
      },
      {
        vehicleId: "innova-hycross",
        name: "Toyota Innova Hycross",
        category: "Premium SUV",
        capacity: "7+1 Passenger",
        price: 11800,
        priceDisplay: "₹11,800 Flat",
        rateType: "Flat Package",
        badge: "Smooth Hill Ride",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 16500,
        priceDisplay: "₹16,500 Flat",
        rateType: "Flat Package",
        badge: "Group Getaway",
      },
      {
        vehicleId: "urbania-9",
        name: "Force Urbania (9+1 Seater)",
        category: "Tempo Traveller",
        capacity: "9+1 Passenger",
        price: 19800,
        priceDisplay: "₹19,800 Flat",
        rateType: "Flat Package",
        badge: "Premium Group",
      },
    ],
    templeTimings: "Most hill attractions are best visited between 8:00 AM and 5:00 PM; waterfall and estate access depends on local rules and weather.",
    bestTimeToVisit: "June to September for lush greenery; October to February for clear, cool mornings.",
  },
  {
    slug: "ooty-wayanad-nilgiri",
    title: "Ooty & Wayanad Nilgiri Weekend (3-4 Day)",
    state: "Tamil Nadu",
    duration: "3 to 4 Days",
    distanceKm: 290,
    tagline: "Nilgiri tea gardens, Ooty lake and Wayanad forest roads from Bengaluru",
    heroBadge: "Hill Station Specialist",
    overview:
      "A longer Bengaluru escape that pairs the classic hill station of Ooty with the quieter forests of Wayanad. The route crosses Karnataka's plateau and climbs into the Nilgiris, giving you time for a botanical garden morning, a lake afternoon and a relaxed forest drive before returning to Bengaluru.",
    image: "/images/images3.jpg",
    startingPrice: 11000,
    inclusions: [
      "Air-conditioned commercial vehicle for the entire trip from Bengaluru",
      "Senior chauffeur accustomed to Nilgiri ghat roads and hairpin bends",
      "Hill station permits, tolls, parking, fuel and driver night allowance included",
      "Doorstep pickup from Whitefield, Marathahalli, Koramangala, HSR Layout, Hebbal or Begur",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "Hotel or resort accommodation in Ooty and Wayanad",
      "Entry tickets for gardens, museums, toy train and boating",
      "Meals, snacks and personal expenses",
      "Safari or guide charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Ooty via Mysuru",
        time: "06:00 AM – 06:30 PM",
        description:
          "Start early from Bengaluru and drive through Mysuru towards the Nilgiris. Break for meals on the highway and arrive in Ooty by evening, with time for a short walk around the town centre.",
        highlights: [
          "06:00 AM: Bengaluru departure",
          "10:00 AM: Highway refreshment halt",
          "03:30 PM: Ghat road climb into the Nilgiris",
          "06:30 PM: Check-in and evening walk in Ooty",
        ],
      },
      {
        day: 2,
        title: "Ooty Sightseeing: Gardens, Doddabetta & Pykara",
        time: "08:30 AM – 06:30 PM",
        description:
          "Spend the day exploring the Ooty Botanical Garden, a tea estate, Doddabetta viewpoint and Pykara Lake. Your chauffeur manages parking and hill traffic so you can enjoy each stop at your own pace.",
        highlights: [
          "08:30 AM: Ooty Botanical Garden",
          "11:00 AM: Tea estate and local chocolate factory",
          "02:00 PM: Doddabetta viewpoint",
          "04:30 PM: Pykara Lake and waterfalls",
        ],
      },
      {
        day: 3,
        title: "Ooty to Wayanad Forest Drive",
        time: "08:00 AM – 06:00 PM",
        description:
          "Descend towards Wayanad with a forest-road drive, a viewpoint stop and time at a local waterfall. Check in to your stay and enjoy a quiet hill evening.",
        highlights: [
          "08:00 AM: Departure from Ooty",
          "12:30 PM: Wayanad viewpoint and lunch halt",
          "03:30 PM: Waterfall and forest-road drive",
          "06:00 PM: Evening at the resort",
        ],
      },
      {
        day: 4,
        title: "Wayanad Morning & Return to Bengaluru",
        time: "08:00 AM – 09:00 PM",
        description:
          "After breakfast, begin the long but comfortable return to Bengaluru with planned halts and a doorstep drop in the evening.",
        highlights: [
          "08:30 AM: Breakfast and final viewpoint",
          "10:00 AM: Return journey begins",
          "05:00 PM: Dinner halt on the highway",
          "09:00 PM: Arrival in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 11000,
        priceDisplay: "₹11,000 Flat",
        rateType: "Flat Package",
        badge: "Couple Trip",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 13500,
        priceDisplay: "₹13,500 Flat",
        rateType: "Flat Package",
        badge: "Family Hill Trip",
      },
      {
        vehicleId: "innova-crysta",
        name: "Toyota Innova Crysta",
        category: "Premium SUV",
        capacity: "7+1 Passenger",
        price: 17500,
        priceDisplay: "₹17,500 Flat",
        rateType: "Flat Package",
        badge: "Ghat Road Comfort",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 24500,
        priceDisplay: "₹24,500 Flat",
        rateType: "Flat Package",
        badge: "Group Holiday",
      },
      {
        vehicleId: "passenger-bus",
        name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
        category: "Luxury Coach",
        capacity: "25, 33, 40, 45, 50 & 52 Seater",
        price: 46000,
        priceDisplay: "₹46,000 Base",
        rateType: "Base Rate",
        badge: "Large Group Trip",
      },
    ],
    templeTimings: "Gardens and viewpoints are usually open from morning to early evening; ghat road travel is best completed in daylight.",
    bestTimeToVisit: "April to June and September to November offer the clearest hill weather; carry warm layers in winter.",
  },
  {
    slug: "hampi-shivamogga-heritage",
    title: "Hampi & Shivamogga Heritage Run (2-3 Day)",
    state: "Karnataka",
    duration: "2 to 3 Days",
    distanceKm: 360,
    tagline: "Stone temples of Hampi and a relaxed Shivamogga halt on the return to Bengaluru",
    heroBadge: "Karnataka Heritage Circuit",
    overview:
      "Take a road trip from Bengaluru to Hampi, where boulder-strewn lanes and centuries-old temple architecture make for an unforgettable weekend. The return route can include a comfortable overnight halt in Shivamogga, breaking the drive and adding a green, riverside stop before you reach Bengaluru.",
    image: "/images/Hampi.jpg",
    startingPrice: 8500,
    inclusions: [
      "Air-conditioned commercial vehicle for the complete Bengaluru round trip",
      "Chauffeur familiar with the north Karnataka highway and Hampi approach roads",
      "Tolls, parking, fuel and driver allowance included",
      "Flexible pickup from Begur, Electronic City, Koramangala, Whitefield, JP Nagar or Yelahanka",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "Monument entry tickets and guided tour fees",
      "Hotel accommodation in Hampi or Shivamogga",
      "Meals, snacks and personal expenses",
      "Boat rides and activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Hampi",
        time: "06:00 AM – 04:00 PM",
        description:
          "Depart Bengaluru early and travel the north Karnataka highway with breakfast and lunch halts. Arrive at Hampi in the afternoon, check in and walk to the riverside for sunset over the boulders.",
        highlights: [
          "06:00 AM: Bengaluru departure",
          "09:00 AM: Breakfast halt on the highway",
          "02:30 PM: Arrival in Hampi",
          "05:30 PM: Riverside sunset walk",
        ],
      },
      {
        day: 2,
        title: "Hampi Temples & Bazaar Walk",
        time: "08:00 AM – 06:00 PM",
        description:
          "Explore the Virupaksha Temple, the stone chariot area and the old bazaar with a chauffeur who knows the parking points. Continue to a viewpoint in the afternoon before retiring for the night.",
        highlights: [
          "08:30 AM: Virupaksha Temple and riverside lanes",
          "11:00 AM: Stone chariot and temple complex",
          "02:30 PM: Old bazaar and local lunch",
          "05:00 PM: Hill viewpoint above the ruins",
        ],
      },
      {
        day: 3,
        title: "Optional Shivamogga Halt & Bengaluru Return",
        time: "07:30 AM – 09:30 PM",
        description:
          "Take the return highway through Shivamogga with a riverside breakfast halt, or continue directly to Bengaluru with planned meal stops and a doorstep drop.",
        highlights: [
          "08:00 AM: Departure from Hampi",
          "11:30 AM: Shivamogga refreshment halt",
          "03:00 PM: Highway onward drive",
          "09:30 PM: Arrival in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 8500,
        priceDisplay: "₹8,500 Flat",
        rateType: "Flat Package",
        badge: "Budget Explorer",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 10500,
        priceDisplay: "₹10,500 Flat",
        rateType: "Flat Package",
        badge: "Family Explorer",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova",
        category: "SUV",
        capacity: "7+1 Passenger",
        price: 13500,
        priceDisplay: "₹13,500 Flat",
        rateType: "Flat Package",
        badge: "Highway Comfort",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 19000,
        priceDisplay: "₹19,000 Flat",
        rateType: "Flat Package",
        badge: "Group Heritage Trip",
      },
      {
        vehicleId: "passenger-bus",
        name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
        category: "Luxury Coach",
        capacity: "25, 33, 40, 45, 50 & 52 Seater",
        price: 36000,
        priceDisplay: "₹36,000 Base",
        rateType: "Base Rate",
        badge: "College & Club Groups",
      },
    ],
    templeTimings: "Hampi temples are generally open in the morning and late afternoon; plan outdoor walks outside the hottest part of the day.",
    bestTimeToVisit: "October to March for comfortable walking weather; carry a hat and water through summer months.",
  },
  {
    slug: "chennai-pondicherry-coast",
    title: "Chennai & Pondicherry Coastal Break (3-4 Day)",
    state: "Tamil Nadu",
    duration: "3 to 4 Days",
    distanceKm: 390,
    tagline: "Temple mornings in Chennai and a slow coastal weekend in Pondicherry from Bengaluru",
    heroBadge: "Coastal Road-Trip Favourite",
    overview:
      "Drive from Bengaluru to the coast for a mix of city temples and seaside calm. Spend a day in Chennai, continue south to Pondicherry for its French Quarter and beach promenade, then return to Bengaluru with comfortable highway halts and a relaxed pace throughout.",
    image: "/images/images4.jpg",
    startingPrice: 12000,
    inclusions: [
      "Air-conditioned commercial vehicle for the entire Bengaluru round trip",
      "Experienced highway chauffeur familiar with the Bengaluru–Chennai corridor",
      "Tolls, interstate permits, parking, fuel and driver night allowance included",
      "Doorstep pickup from Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar or Begur",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "Hotel accommodation in Chennai and Pondicherry",
      "Monument and museum entry tickets",
      "Meals, beach activities and personal expenses",
      "Guide charges and special parking requests",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Chennai",
        time: "06:00 AM – 04:30 PM",
        description:
          "Begin early from Bengaluru and take the highway east with breakfast and lunch stops. Arrive in Chennai by late afternoon and unwind at your hotel before an evening stroll by the water.",
        highlights: [
          "06:00 AM: Bengaluru departure",
          "09:30 AM: Highway breakfast halt",
          "02:30 PM: Arrival in Chennai",
          "05:30 PM: Marina waterfront walk",
        ],
      },
      {
        day: 2,
        title: "Chennai Temples & Drive to Pondicherry",
        time: "08:00 AM – 06:30 PM",
        description:
          "Visit the Kapaleeshwarar Temple and other city landmarks in the morning, then drive south to Pondicherry. Check in and enjoy the French Quarter and seaside promenade in the evening.",
        highlights: [
          "08:30 AM: Kapaleeshwarar Temple visit",
          "11:00 AM: City landmarks and local breakfast",
          "01:00 PM: Highway drive to Pondicherry",
          "05:00 PM: French Quarter and beach promenade",
        ],
      },
      {
        day: 3,
        title: "Pondicherry Slow Day",
        time: "09:00 AM – 07:00 PM",
        description:
          "A leisurely day along the coastal roads, with cafés, a lighthouse viewpoint and time at the beach. Your cab stays available for short local hops within the town.",
        highlights: [
          "09:30 AM: Café walk in the French Quarter",
          "11:30 AM: Lighthouse and seaside viewpoint",
          "03:00 PM: Beach time and local lunch",
          "06:30 PM: Quiet evening by the promenade",
        ],
      },
      {
        day: 4,
        title: "Pondicherry to Bengaluru Return",
        time: "07:30 AM – 09:30 PM",
        description:
          "Leave after breakfast for the return drive to Bengaluru, with lunch and refreshment halts along the highway and a doorstep drop in the evening.",
        highlights: [
          "08:00 AM: Departure from Pondicherry",
          "01:00 PM: Highway lunch halt",
          "06:00 PM: Evening refreshment stop",
          "09:30 PM: Arrival in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 12000,
        priceDisplay: "₹12,000 Flat",
        rateType: "Flat Package",
        badge: "Couple Coastal Trip",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 14500,
        priceDisplay: "₹14,500 Flat",
        rateType: "Flat Package",
        badge: "Family Coastal Trip",
      },
      {
        vehicleId: "innova-crysta",
        name: "Toyota Innova Crysta",
        category: "Premium SUV",
        capacity: "7+1 Passenger",
        price: 18500,
        priceDisplay: "₹18,500 Flat",
        rateType: "Flat Package",
        badge: "Long Drive Comfort",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 26000,
        priceDisplay: "₹26,000 Flat",
        rateType: "Flat Package",
        badge: "Group Holiday",
      },
      {
        vehicleId: "passenger-bus",
        name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
        category: "Luxury Coach",
        capacity: "25, 33, 40, 45, 50 & 52 Seater",
        price: 48000,
        priceDisplay: "₹48,000 Base",
        rateType: "Base Rate",
        badge: "Large Coastal Group",
      },
    ],
    templeTimings: "Chennai temples are typically open in the morning and evening; Pondicherry attractions are best visited in daylight.",
    bestTimeToVisit: "November to February for pleasant coastal weather; avoid peak summer afternoons near the beach.",
  },
  {
    slug: "mangaluru-coastal-temple",
    title: "Mangaluru Coastal & Temple Getaway (2-3 Day)",
    state: "Karnataka",
    duration: "2 to 3 Days",
    distanceKm: 350,
    tagline: "Coastal Karnataka temples, harbour views and clean beaches from Bengaluru",
    heroBadge: "Coastal Karnataka Special",
    overview:
      "A comfortable Bengaluru outstation trip west to Mangaluru, with its coastal temples, harbour views and nearby beaches. The route crosses Karnataka's Plateau and ghat sections, and your chauffeur plans meal halts so the long drive feels easy for families and groups alike.",
    image: "/images/Dharmasthala.jpg",
    startingPrice: 9500,
    inclusions: [
      "Air-conditioned commercial cab for the full Bengaluru round trip",
      "Chauffeur experienced on Bengaluru–Mangaluru highway and coastal roads",
      "Tolls, parking, fuel and driver allowance included",
      "Doorstep pickup from Begur, Electronic City, Koramangala, HSR Layout, Whitefield or Jayanagar",
      "Vehicle allocation is subject to availability; confirm availability before booking",
    ],
    exclusions: [
      "Hotel accommodation in Mangaluru",
      "Temple entry or special darshan tickets",
      "Meals, snacks and personal expenses",
      "Beach activities and guide charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Mangaluru",
        time: "06:00 AM – 04:00 PM",
        description:
          "Depart Bengaluru early and travel west with planned breakfast and lunch halts. Arrive in Mangaluru by afternoon, check in and take an evening walk near the harbour or beach.",
        highlights: [
          "06:00 AM: Bengaluru departure",
          "09:00 AM: Breakfast halt on the highway",
          "02:30 PM: Arrival in Mangaluru",
          "05:30 PM: Harbour and beach walk",
        ],
      },
      {
        day: 2,
        title: "Mangaluru Temples & Coastline",
        time: "08:30 AM – 06:30 PM",
        description:
          "Visit the city's coastal temples in the morning, then drive along the coast for a beach stop and a local seafood lunch. Return to your hotel for a relaxed evening.",
        highlights: [
          "08:30 AM: Mangaluru temple visit",
          "11:30 AM: Coastal drive and viewpoint",
          "01:30 PM: Local lunch halt",
          "04:00 PM: Beach time and city market",
        ],
      },
      {
        day: 3,
        title: "Optional Nearby Temple & Return to Bengaluru",
        time: "07:30 AM – 09:30 PM",
        description:
          "Use the morning for a nearby Karnataka temple visit, then begin the highway return to Bengaluru with regular halts and a doorstep drop.",
        highlights: [
          "08:00 AM: Nearby temple visit",
          "10:30 AM: Return drive begins",
          "04:00 PM: Refreshment halt on the ghat section",
          "09:30 PM: Safe arrival in Bengaluru",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "prime-sedan",
        name: "Prime Sedan",
        category: "Sedan",
        capacity: "4+1 Passenger",
        price: 9500,
        priceDisplay: "₹9,500 Flat",
        rateType: "Flat Package",
        badge: "Couple Trip",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Suzuki Ertiga",
        category: "SUV",
        capacity: "6+1 Passenger",
        price: 11500,
        priceDisplay: "₹11,500 Flat",
        rateType: "Flat Package",
        badge: "Family Trip",
      },
      {
        vehicleId: "innova-crysta",
        name: "Toyota Innova Crysta",
        category: "Premium SUV",
        capacity: "7+1 Passenger",
        price: 15000,
        priceDisplay: "₹15,000 Flat",
        rateType: "Flat Package",
        badge: "Coastal Comfort",
      },
      {
        vehicleId: "tempo-traveller-12",
        name: "Tempo Traveller (12+1 Seater)",
        category: "Tempo Traveller",
        capacity: "12+1 Passenger",
        price: 21000,
        priceDisplay: "₹21,000 Flat",
        rateType: "Flat Package",
        badge: "Group Tour",
      },
      {
        vehicleId: "passenger-bus",
        name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
        category: "Luxury Coach",
        capacity: "25, 33, 40, 45, 50 & 52 Seater",
        price: 40000,
        priceDisplay: "₹40,000 Base",
        rateType: "Base Rate",
        badge: "Pilgrim Groups",
      },
    ],
    templeTimings: "Coastal temples are usually busiest in the early morning and evening; check local darshan timings before you travel.",
    bestTimeToVisit: "October to February for pleasant coastal weather; the monsoon months bring heavy rain along the ghats.",
  },
];
