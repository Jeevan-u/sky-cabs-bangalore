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
  state: "Andhra Pradesh" | "Maharashtra" | "Telangana" | "Karnataka" | "Tamil Nadu" | "South India";
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
    slug: "srisailam-jyotirlinga",
    title: "Srisailam Mallikarjuna Jyotirlinga (1-2 Day)",
    state: "Andhra Pradesh",
    duration: "1 to 2 Days",
    distanceKm: 213,
    tagline: "Sacred 2nd Shiva Jyotirlinga & Bhramaramba Devi Shakti Peetham with Nallamala Forest Drive",
    heroBadge: "Most Booked Pilgrimage Circuit",
    overview:
      "Embark on a sacred journey from Hyderabad to Srisailam, home to Lord Mallikarjuna Swamy—one of the 12 revered Shiva Jyotirlingas—and Goddess Bhramaramba Devi, one of the 18 Maha Shakti Peethas. The scenic 213 KM drive winds through Kalwakurthy, Dindi Reservoir, and the verdant Nallamala Tiger Reserve with breathtaking views of the Krishna River and Srisailam Hydroelectric Dam.",
    image: "/images/srisailam-dam.jpg",
    startingPrice: 5500,
    inclusions: [
      "Dedicated Air-Conditioned Commercial Vehicle for entire round-trip",
      "Hill & Ghat-Road certified senior chauffeur with 7+ years experience",
      "Toll Plazas, AP State Border Tax & Interstate Entry Permits",
      "Driver Batta, night halt allowance & fuel charges included",
      "Flexible doorstep pickup from Kukatpally, KPHB, Miyapur, Hitec City or Airport",
    ],
    exclusions: [
      "Temple VIP Darshan tickets & Special Pooja fees",
      "Pilgrim personal meals, snacks & beverages",
      "Hotel / dharamshala accommodation in Srisailam",
      "Ropeway cable car & Patala Ganga boating tickets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hyderabad to Srisailam, Temple Darshan & Sightseeing",
        time: "04:30 AM – 09:30 PM",
        description:
          "Early morning pickup from your doorstep in Hyderabad. Travel via ORR and Kalwakurthy, stopping at Dindi Reservoir for breakfast. Pass the Munnanur Forest Checkpost when gates open at 6:00 AM. Arrive in Srisailam, check in / fresh up, and proceed for divine darshan of Sri Mallikarjuna Swamy and Bhramaramba Devi. Visit Patala Ganga via ropeway, Sakshi Ganapathi, and Srisailam Dam Viewpoint before evening return or overnight stay.",
        highlights: [
          "04:30 AM: Doorstep pickup in Hyderabad",
          "07:30 AM: Scenic breakfast halt at Dindi Reservoir",
          "09:30 AM: Arrival in Srisailam Kshetram",
          "10:30 AM: Mallikarjuna Swamy & Shakti Peetham Darshan",
          "02:00 PM: Patala Ganga Krishna River & Ropeway",
          "04:30 PM: Sakshi Ganapathi & Dam Spillway Viewpoint",
          "09:30 PM: Safe return doorstep drop in Hyderabad",
        ],
      },
      {
        day: 2,
        title: "Optional Day 2: Sikharam Peak & Akkamahadevi Caves",
        time: "06:00 AM – 08:00 PM",
        description:
          "Attend early morning Suprabhata Seva or Abhishekam. Visit Sikharam—the highest peak in Srisailam with panoramic forest views. Optional boat cruise through the Krishna River gorge to Akkamahadevi Caves. Leisurely daylight drive back through Nallamala forest with doorstep drop in Hyderabad.",
        highlights: [
          "06:00 AM: Early morning temple seva / peaceful second darshan",
          "08:30 AM: Sikhareswaram hill summit & Nandi darshan",
          "11:00 AM: Akkamahadevi natural rock caves boat expedition",
          "03:00 PM: Scenic return highway drive",
          "08:00 PM: Doorstep arrival in Hyderabad",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "sedan",
        name: "Swift Dzire / Toyota Etios",
        category: "AC Sedan",
        capacity: "4 Passengers + 1 Driver",
        price: 5500,
        priceDisplay: "₹5,500 Flat",
        rateType: "Flat Package",
        badge: "Best for Couple / Small Family",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Ertiga / Rumion",
        category: "AC MPV",
        capacity: "6 Passengers + 1 Driver",
        price: 6800,
        priceDisplay: "₹6,800 Flat",
        rateType: "Flat Package",
        badge: "Family Economical",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova Crysta",
        category: "Premium VIP SUV",
        capacity: "7 Passengers + 1 Driver",
        price: 8500,
        priceDisplay: "₹8,500 Flat",
        rateType: "Flat Package",
        badge: "VIP Ghat Master",
      },
      {
        vehicleId: "tempo",
        name: "Force Tempo Traveller",
        category: "Luxury Mini Coach",
        capacity: "12 to 17 Passengers",
        price: 12500,
        priceDisplay: "₹12,500 Flat",
        rateType: "Flat Package",
        badge: "Group Favorite",
      },
      {
        vehicleId: "bus",
        name: "Luxury AC Bus / Coach",
        category: "Grand Coach",
        capacity: "32 to 50 Passengers",
        price: 24000,
        priceDisplay: "₹24,000 Flat",
        rateType: "Flat Package",
        badge: "Corporate & Community",
      },
    ],
    templeTimings: "Temple opens 4:30 AM to 10:00 PM (Sparsha Darshan: 6:00 AM – 3:30 PM & 6:00 PM – 10:00 PM).",
    bestTimeToVisit: "September to March for pleasant forest weather and dam water outflow.",
  },
  {
    slug: "tirupati-balaji",
    title: "Tirupati Balaji & Tirumala Pilgrimage (2-3 Day)",
    state: "Andhra Pradesh",
    duration: "2 to 3 Days",
    distanceKm: 570,
    tagline: "Divine Lord Venkateswara Darshan, Tirumala Ghat Ascent & Padmavathi Ammavari Temple",
    heroBadge: "Sacred South India Flagship",
    overview:
      "Travel comfortably on the smooth 570 KM southern expressway from Hyderabad to the sacred Seven Hills of Tirumala. Our senior highway chauffeurs assist you with Alipiri security checkpoint clearance, Tirumala ghat road regulations, luggage safety, and temple schedules so your family experiences serene, unhurried darshan of Lord Balaji.",
    image: "/images/Tirupati.jpg",
    startingPrice: 12500,
    inclusions: [
      "AC commercial fleet with yellow board commercial permits & passenger insurance",
      "Experienced Tirumala Ghat-trained chauffeur who knows uphill/downhill gate rules",
      "Toll charges across NH 44 / NH 716 and AP interstate entry tax included",
      "Driver night batta and vehicle fuel included for entire itinerary",
      "Doorstep pickup and return drop across Hyderabad",
    ],
    exclusions: [
      "TTD Special Entry Darshan (₹300) or VIP tickets (guests book on TTD portal)",
      "Pilgrim hotel accommodation at Tirupati or Tirumala",
      "Personal temple tonsure/prasadam expenses",
      "Laddoo prasadam extra tokens",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hyderabad to Tirupati via Kurnool & Kadapa",
        time: "05:00 AM – 04:00 PM",
        description:
          "Depart Hyderabad early morning. Travel on 4-lane expressway past Kurnool and Kadapa. Scenic lunch stop en route. Arrive at Tirupati foothills by late afternoon, check in to your hotel, refresh, and visit Sri Padmavathi Ammavari Temple in Tiruchanur.",
        highlights: [
          "05:00 AM: Hyderabad departure",
          "08:30 AM: Breakfast halt near Kurnool",
          "03:30 PM: Check in at Tirupati hotel",
          "05:00 PM: Sri Padmavathi Ammavari Temple Darshan",
          "07:30 PM: Kapilatheertham waterfalls and Shiva temple",
        ],
      },
      {
        day: 2,
        title: "Tirumala Ghat Ascent & Lord Venkateswara Swamy Darshan",
        time: "06:00 AM – 06:00 PM",
        description:
          "Chauffeur drives you up the Alipiri ghat road to Tirumala. Attend morning Special Entry Darshan / Seeghra Darshan. Visit Akasa Ganga, Papavinasanam, Srivari Padaalu, and collect sacred Tirupati Laddoos before descending to Tirupati.",
        highlights: [
          "06:30 AM: Scenic Tirumala 1st Ghat road ascent",
          "08:30 AM: Lord Venkateswara Swamy Sacred Darshan",
          "12:30 PM: Srivari Laddu Prasadam collection",
          "02:00 PM: Papavinasanam & Akasa Ganga holy springs",
          "05:00 PM: Safe descent to Tirupati foothills",
        ],
      },
      {
        day: 3,
        title: "Srikalahasti / Kanipakam Extension & Hyderabad Return",
        time: "07:00 AM – 09:30 PM",
        description:
          "Visit Sri Srikalahasteeswara Temple (Rahu Ketu Pooja / Vayu Lingam) or Sri Varasiddhi Vinayaka Temple in Kanipakam. Embark on smooth return journey to Hyderabad with doorstep arrival.",
        highlights: [
          "07:30 AM: Srikalahasti Vayu Linga temple darshan",
          "11:30 AM: Departure for Hyderabad",
          "09:30 PM: Safe doorstep arrival in Hyderabad",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "sedan",
        name: "Swift Dzire / Toyota Etios",
        category: "AC Sedan",
        capacity: "4 Passengers + 1 Driver",
        price: 12500,
        priceDisplay: "₹12,500 All-Inc",
        rateType: "Flat Package",
        badge: "Budget Pilgrim",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Ertiga / Rumion",
        category: "AC MPV",
        capacity: "6 Passengers + 1 Driver",
        price: 14800,
        priceDisplay: "₹14,800 All-Inc",
        rateType: "Flat Package",
        badge: "Family Pick",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova Crysta",
        category: "Premium VIP SUV",
        capacity: "7 Passengers + 1 Driver",
        price: 18500,
        priceDisplay: "₹18,500 All-Inc",
        rateType: "Flat Package",
        badge: "VIP Long-Haul Comfort",
      },
      {
        vehicleId: "tempo",
        name: "Force Tempo Traveller (12/17s)",
        category: "Group Carrier",
        capacity: "12 to 17 Passengers",
        price: 27500,
        priceDisplay: "₹27,500 All-Inc",
        rateType: "Flat Package",
        badge: "Group Pilgrimage",
      },
      {
        vehicleId: "bus",
        name: "Luxury AC Coach (32-50s)",
        category: "Air-Suspension Bus",
        capacity: "32 to 50 Passengers",
        price: 52000,
        priceDisplay: "₹52,000 All-Inc",
        rateType: "Flat Package",
        badge: "Full Samaj Yatra",
      },
    ],
    templeTimings: "Tirumala temple is open nearly 20 hours daily for various sevas and sarva darshan.",
    bestTimeToVisit: "September to February for pleasant weather; avoid heavy Brahmotsavam rush days if traveling with elders.",
  },
  {
    slug: "shirdi-sai-baba",
    title: "Shirdi Sai Baba & Shani Shingnapur Yatra (3-4 Day)",
    state: "Maharashtra",
    duration: "3 to 4 Days",
    distanceKm: 610,
    tagline: "Sacred Samadhi Mandir Darshan, Dwarkamai, Gurusthan & Shani Shingnapur Miracle Village",
    heroBadge: "Interstate Spiritual Yatra",
    overview:
      "A soulful interstate yatra connecting Hyderabad to Shirdi Sai Baba Samadhi Mandir via Nizamabad and Nanded/Aurangabad. Experience supreme spiritual peace at Baba's Samadhi, Kakad Aarti, Dwarkamai, Chavadi, and the swayambhu Shani temple at Shani Shingnapur with verified interstate permit-cleared vehicles.",
    image: "/images/post-large-3.jpg",
    startingPrice: 15500,
    inclusions: [
      "Commercial yellow board vehicle with Maharashtra interstate commercial permit",
      "Experienced interstate highway chauffeur fluent in Telugu, Hindi & Marathi",
      "All National Highway toll taxes & driver day/night batta included",
      "Clean sanitized AC cabin with luggage carriers for group luggage",
      "Doorstep pickup & drops in Hyderabad",
    ],
    exclusions: [
      "Shirdi Trust VIP Darshan passes or special Aarti passes",
      "Hotel accommodation in Shirdi",
      "Prasadam, personal donations & meals",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hyderabad to Shirdi via Nizamabad & Jalna",
        time: "05:00 AM – 06:30 PM",
        description:
          "Depart from Hyderabad early morning via NH 44 past Kamareddy and Nizamabad, crossing into Maharashtra. Lunch halt on the highway. Arrive in holy town of Shirdi by evening. Check in to your hotel and attend evening Dhoop Aarti at the Samadhi Mandir.",
        highlights: [
          "05:00 AM: Early morning departure from Hyderabad",
          "06:30 PM: Arrival at Shirdi holy town",
          "07:30 PM: Evening Dhoop Aarti & peaceful premises walk",
        ],
      },
      {
        day: 2,
        title: "Samadhi Mandir Darshan, Dwarkamai, Chavadi & Gurusthan",
        time: "06:00 AM – 08:00 PM",
        description:
          "Sacred Samadhi Mandir Darshan of Sri Sai Baba. Visit Dwarkamai where Baba spent most of his divine life, the sacred Dhuni, Chavadi, and Gurusthan neem tree. Evening leisure in Shirdi bazaar for holy prasad and souvenirs.",
        highlights: [
          "06:00 AM: Kakad Aarti or morning Samadhi Darshan",
          "10:00 AM: Dwarkamai Masjid & Holy Dhuni sacred ash",
          "02:00 PM: Gurusthan & Chavadi heritage tour",
          "05:00 PM: Sai Heritage Village cultural exploration",
        ],
      },
      {
        day: 3,
        title: "Shani Shingnapur & Return to Hyderabad",
        time: "06:30 AM – 10:30 PM",
        description:
          "Drive 70 KM from Shirdi to Shani Shingnapur, the famous lockless village where Lord Shani Dev is worshipped as a swayambhu black stone idol in an open-air shrine. After oil abhishek and darshan, begin smooth return transit to Hyderabad.",
        highlights: [
          "07:30 AM: Shani Shingnapur Lord Shani Dev sacred darshan",
          "11:00 AM: Highway return journey commences",
          "10:30 PM: Safe arrival at your doorstep in Hyderabad",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "sedan",
        name: "Swift Dzire / Toyota Etios",
        category: "AC Sedan",
        capacity: "4 Passengers + 1 Driver",
        price: 15500,
        priceDisplay: "₹15,500 All-Inc",
        rateType: "Flat Package",
        badge: "Budget Yatra",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Ertiga / Rumion",
        category: "AC MPV",
        capacity: "6 Passengers + 1 Driver",
        price: 18500,
        priceDisplay: "₹18,500 All-Inc",
        rateType: "Flat Package",
        badge: "Family Yatra",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova Crysta",
        category: "Premium VIP SUV",
        capacity: "7 Passengers + 1 Driver",
        price: 23500,
        priceDisplay: "₹23,500 All-Inc",
        rateType: "Flat Package",
        badge: "Highway Champion",
      },
      {
        vehicleId: "tempo",
        name: "Force Tempo Traveller",
        category: "Group Carrier",
        capacity: "12 to 17 Passengers",
        price: 34500,
        priceDisplay: "₹34,500 All-Inc",
        rateType: "Flat Package",
        badge: "Family Group",
      },
      {
        vehicleId: "bus",
        name: "Luxury AC Bus / Coach",
        category: "Large Bus",
        capacity: "32 to 50 Passengers",
        price: 68000,
        priceDisplay: "₹68,000 All-Inc",
        rateType: "Flat Package",
        badge: "Devotee Sangham",
      },
    ],
    templeTimings: "Samadhi Temple: 4:00 AM to 11:15 PM daily.",
    bestTimeToVisit: "October to March. Avoid Thursday/Gurupurnima extreme rush if traveling with infants.",
  },
  {
    slug: "yadagirigutta-tour",
    title: "Yadagirigutta Sri Lakshmi Narasimha Swamy (Same-Day)",
    state: "Telangana",
    duration: "Same Day (8-10 Hours)",
    distanceKm: 65,
    tagline: "Grand Yadadri Temple Architecture, Golden Vimana Gopuram & Divine Narasimha Swamy Darshan",
    heroBadge: "Telangana Architectural Wonder",
    overview:
      "Just 65 KM from Hyderabad on the Warangal Highway, the completely re-sculpted black granite marvel of Yadagirigutta (Yadadri) stands as one of modern India's most breathtaking architectural wonders. Perfect for a hassle-free, half-day or same-day family temple trip with early morning pickup and evening return.",
    image: "/images/post-large-1.jpg",
    startingPrice: 2800,
    inclusions: [
      "AC commercial cab with round-trip pickup and doorstep drop in Hyderabad",
      "Toll charges on Warangal Expressway included",
      "Hill ascent parking & driver allowance included",
      "Zero hidden fees & fixed non-surge guaranteed rates",
    ],
    exclusions: [
      "Temple VIP break darshan tickets or prasadam costs",
      "Meals and personal temple donations",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hyderabad to Yadagirigutta Same-Day Temple Tour",
        time: "07:00 AM – 03:00 PM",
        description:
          "Convenient morning doorstep pickup in Hyderabad. Smooth 75-minute drive via the 4-lane Warangal Highway (NH 163). Ascent to Yadadri hill shrine. Darshan of Sri Lakshmi Narasimha Swamy in the sanctum sanctorum. Marvel at the 100-pillar mandapam, golden vimana gopuram, and prahlada charitra rock carvings. Visit Surendrapuri Mythological Theme Park on the way down before returning to Hyderabad.",
        highlights: [
          "07:00 AM: Doorstep pickup in Hyderabad",
          "08:30 AM: Arrival at Yadadri foothills and hill ascent",
          "09:30 AM: Sanctum Sanctorum Darshan of Lord Narasimha Swamy",
          "11:30 AM: Exploration of granite sculptures & Vimana Gopuram",
          "01:00 PM: Optional halt at Surendrapuri (Kunda Satyanarayana Kaladhamam)",
          "03:30 PM: Comfortable return drop in Hyderabad",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "sedan",
        name: "Swift Dzire / Toyota Etios",
        category: "AC Sedan",
        capacity: "4 Passengers + 1 Driver",
        price: 2800,
        priceDisplay: "₹2,800 Flat",
        rateType: "Flat Package",
        badge: "Half-Day Economy",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Ertiga / Rumion",
        category: "AC MPV",
        capacity: "6 Passengers + 1 Driver",
        price: 3400,
        priceDisplay: "₹3,400 Flat",
        rateType: "Flat Package",
        badge: "Family Pick",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova Crysta",
        category: "Premium VIP SUV",
        capacity: "7 Passengers + 1 Driver",
        price: 4500,
        priceDisplay: "₹4,500 Flat",
        rateType: "Flat Package",
        badge: "VIP Luxury",
      },
      {
        vehicleId: "tempo",
        name: "Force Tempo Traveller",
        category: "Group Carrier",
        capacity: "12 to 17 Passengers",
        price: 6800,
        priceDisplay: "₹6,800 Flat",
        rateType: "Flat Package",
        badge: "Group Tour",
      },
      {
        vehicleId: "bus",
        name: "Luxury AC Coach",
        category: "Bus 32-50s",
        capacity: "32 to 50 Passengers",
        price: 13500,
        priceDisplay: "₹13,500 Flat",
        rateType: "Flat Package",
        badge: "Family Function",
      },
    ],
    templeTimings: "Temple Darshan: 4:00 AM to 9:30 PM continuously.",
    bestTimeToVisit: "Throughout the year; mornings are best to avoid midday granite heat.",
  },
  {
    slug: "andhra-pradesh-temple-circuit",
    title: "Andhra Pradesh Maha Kshetra Temple Circuit (3-4 Day)",
    state: "Andhra Pradesh",
    duration: "3 to 4 Days",
    distanceKm: 850,
    tagline: "Kanipakam Varasiddhi Vinayaka, Sripuram Golden Temple, Mahanandi, Yaganti & Belum Caves",
    heroBadge: "Grand Pilgrimage Odyssey",
    overview:
      "A customized spiritual expedition spanning Andhra Pradesh's most renowned sacred shrines: Lord Vinayaka at Kanipakam (growing swayambhu idol), Sripuram Mahalakshmi Golden Temple, Mahanandi perennial thermal spring, Yaganti Uma Maheswara Swamy (growing Nandi idol), and the subterranean wonder of Belum Caves.",
    image: "/images/Yaganti.jpg",
    startingPrice: 18500,
    inclusions: [
      "AC commercial yellow board vehicle with AP permit and passenger insurance",
      "Experienced interstate spiritual route chauffeur",
      "All tolls, parking, interstate tax, and driver batta included",
      "Complete flexibility for elder and family halts",
    ],
    exclusions: [
      "Special Darshan tickets & Archana seva receipts",
      "Hotel accommodations & pilgrim personal meals",
      "Cave entrance tickets at Belum",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hyderabad to Mahanandi & Yaganti",
        time: "05:00 AM – 06:00 PM",
        description:
          "Depart Hyderabad early morning. Reach Mahanandi for holy dip in the crystal-clear natural mineral water temple pushkarini. Drive to Yaganti, home of the miraculous Agastya pushkarini and the continuously growing Nandi bull statue.",
        highlights: [
          "05:00 AM: Hyderabad departure",
          "11:00 AM: Sacred dip and darshan at Mahanandi",
          "03:00 PM: Yaganti Uma Maheswara Swamy Temple & Caves",
          "06:30 PM: Overnight stay near Kurnool / Nandyal",
        ],
      },
      {
        day: 2,
        title: "Belum Caves & Transit to Kanipakam",
        time: "07:30 AM – 07:00 PM",
        description:
          "Explore the natural underground limestone formations of Belum Caves (longest in the Indian subcontinent). Highway transit past Anantapur and Chittoor to Kanipakam for evening darshan of Swayambhu Varasiddhi Vinayaka.",
        highlights: [
          "08:30 AM: Exploration of Belum Caves",
          "01:00 PM: Highway journey through Rayalaseema",
          "06:00 PM: Kanipakam Sri Varasiddhi Vinayaka Temple Darshan",
        ],
      },
      {
        day: 3,
        title: "Sripuram Golden Temple & Hyderabad Return",
        time: "06:00 AM – 10:30 PM",
        description:
          "Visit the awe-inspiring Sri Lakshmi Narayani Golden Temple at Sripuram (Vellore border), adorned with over 1,500 kg of pure gold. Begin the scenic return journey to Hyderabad with late evening arrival.",
        highlights: [
          "07:00 AM: Sripuram Golden Temple star-shaped path & darshan",
          "11:30 AM: Return highway drive commences",
          "10:30 PM: Doorstep arrival in Hyderabad",
        ],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "sedan",
        name: "Swift Dzire / Toyota Etios",
        category: "AC Sedan",
        capacity: "4 Passengers + 1 Driver",
        price: 18500,
        priceDisplay: "₹18,500 All-Inc",
        rateType: "Flat Package",
        badge: "Couple Circuit",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Ertiga / Rumion",
        category: "AC MPV",
        capacity: "6 Passengers + 1 Driver",
        price: 22000,
        priceDisplay: "₹22,000 All-Inc",
        rateType: "Flat Package",
        badge: "Family Circuit",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova Crysta",
        category: "Premium VIP SUV",
        capacity: "7 Passengers + 1 Driver",
        price: 28500,
        priceDisplay: "₹28,500 All-Inc",
        rateType: "Flat Package",
        badge: "Luxury Highway Glide",
      },
      {
        vehicleId: "tempo",
        name: "Force Tempo Traveller (12/17s)",
        category: "Group Carrier",
        capacity: "12 to 17 Passengers",
        price: 39500,
        priceDisplay: "₹39,500 All-Inc",
        rateType: "Flat Package",
        badge: "Group Yatra",
      },
      {
        vehicleId: "bus",
        name: "Luxury AC Coach (32-50s)",
        category: "Grand Coach",
        capacity: "32 to 50 Passengers",
        price: 78000,
        priceDisplay: "₹78,000 All-Inc",
        rateType: "Flat Package",
        badge: "Samaj Excursion",
      },
    ],
    bestTimeToVisit: "October to March for cool cave exploration and comfortable daytime temple walking.",
  },
  {
    slug: "karnataka-tamil-nadu-circuits",
    title: "Karnataka & Tamil Nadu Heritage & Hill Station Circuit (4-6 Day)",
    state: "South India",
    duration: "4 to 6 Days",
    distanceKm: 1450,
    tagline: "Bangalore, Mysore Palace, Chamundi Hills, Ooty Nilgiris, Madurai Meenakshi & Rameswaram",
    heroBadge: "Grand Interstate Leisure & Spiritual Tour",
    overview:
      "A breathtaking multi-state South India expedition combining the royal heritage of Mysore Palace, lush tea gardens of Ooty Nilgiri hills, the architectural majesty of Madurai Meenakshi Amman Temple, and sacred Rameswaram Ramanathaswamy sea shrine. Handled by our most experienced long-distance captains.",
    image: "/images/hero-right.png",
    startingPrice: 28000,
    inclusions: [
      "Heavy commercial yellow board vehicle with all-South India interstate permits",
      "Senior interstate highway captain fluent in Telugu, English, Tamil & Kannada",
      "National highway FASTag tolls, border checkpost taxes & hill station green permits",
      "Driver night batta and fuel for the entire circuit included",
      "Doorstep pickup & drops in Hyderabad",
    ],
    exclusions: [
      "Hotel & hill resort accommodation",
      "Sightseeing monument entry fees (Mysore Palace, Botanical Gardens, Boat House)",
      "Temple VIP darshan tickets & personal meals",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hyderabad to Bangalore & Mysore",
        time: "05:00 AM – 06:30 PM",
        description:
          "Smooth 570 KM cruise down NH 44 through Anantapur and Chikkaballapur to Bangalore. Continue on the 10-lane expressway to Mysore. Evening visit to the illuminated Brindavan Gardens.",
        highlights: [
          "05:00 AM: Hyderabad departure",
          "02:00 PM: Bangalore bypass",
          "05:00 PM: Mysore arrival and Brindavan Gardens illumination",
        ],
      },
      {
        day: 2,
        title: "Mysore Palace, Chamundi Hills & Nilgiri Ghat Ascent to Ooty",
        time: "08:00 AM – 06:00 PM",
        description:
          "Visit the magnificent Mysore Palace and Sri Chamundeshwari Temple atop Chamundi Hills. Cross Bandipur and Mudumalai Tiger Reserves. Negotiate the famous 36 hairpin bends of Kalhatty ghat road into misty Ooty.",
        highlights: [
          "08:30 AM: Mysore Palace royal architecture tour",
          "11:00 AM: Chamundi Hills darshan",
          "02:30 PM: Bandipur forest corridor safari drive",
          "05:30 PM: Arrival in misty Ooty",
        ],
      },
      {
        day: 3,
        title: "Ooty Sightseeing: Botanical Garden, Doddabetta & Pykara Lake",
        time: "09:00 AM – 06:00 PM",
        description:
          "Explore Doddabetta Peak (highest point in the Nilgiris), Ooty Botanical Garden, Rose Garden, Tea Factory, and Pykara lake speed boating.",
        highlights: [
          "Doddabetta Nilgiri viewpoint",
          "Tea plantation & chocolate factory walk",
          "Pykara waterfalls & lake boating",
        ],
      },
      {
        day: 4,
        title: "Ooty to Coimbatore & Madurai / Rameswaram",
        time: "07:00 AM – 07:00 PM",
        description:
          "Descend the Nilgiris through Mettupalayam. Travel past Coimbatore and Dindigul to Madurai for evening darshan at the legendary Madurai Meenakshi Amman Temple.",
        highlights: [
          "Scenic Nilgiri descent",
          "Madurai Meenakshi Amman Gopuram & Hall of 1000 Pillars",
        ],
      },
      {
        day: 5,
        title: "Pamban Sea Bridge, Rameswaram 22 Kundas & Return Transit",
        time: "06:00 AM – 08:00 PM",
        description:
          "Cross the historic Pamban Bridge over the turquoise ocean to Rameswaram island. Sacred bath in the 22 holy Teerthams and darshan of Ramanathaswamy Jyotirlinga. Visit Dhanushkodi ghost town.",
        highlights: [
          "Pamban cantilever sea bridge crossing",
          "22 Sacred Wells Teertha snanam & Ramanathaswamy Darshan",
          "Dhanushkodi Ram Setu point",
        ],
      },
      {
        day: 6,
        title: "Highway Transit & Safe Return to Hyderabad",
        time: "06:00 AM – 09:30 PM",
        description:
          "Comfortable return drive via Salem, Hosur, Bangalore outer bypass, and Kurnool back to your doorstep in Hyderabad.",
        highlights: ["Smooth highway cruising", "Doorstep drop in Hyderabad"],
      },
    ],
    vehicleRates: [
      {
        vehicleId: "sedan",
        name: "Swift Dzire / Toyota Etios",
        category: "AC Sedan",
        capacity: "4 Passengers + 1 Driver",
        price: 28000,
        priceDisplay: "₹28,000 Base",
        rateType: "Flat Package",
        badge: "Budget Touring",
      },
      {
        vehicleId: "ertiga",
        name: "Maruti Ertiga / Rumion",
        category: "AC MPV",
        capacity: "6 Passengers + 1 Driver",
        price: 34000,
        priceDisplay: "₹34,000 Base",
        rateType: "Flat Package",
        badge: "Family Road Trip",
      },
      {
        vehicleId: "innova",
        name: "Toyota Innova Crysta",
        category: "Premium VIP SUV",
        capacity: "7 Passengers + 1 Driver",
        price: 44000,
        priceDisplay: "₹44,000 Base",
        rateType: "Flat Package",
        badge: "Ultimate Highway Cruiser",
      },
      {
        vehicleId: "tempo",
        name: "Force Tempo Traveller",
        category: "Group Carrier",
        capacity: "12 to 17 Passengers",
        price: 62000,
        priceDisplay: "₹62,000 Base",
        rateType: "Flat Package",
        badge: "Group Safari",
      },
      {
        vehicleId: "bus",
        name: "Luxury AC Coach",
        category: "Grand Coach",
        capacity: "32 to 50 Passengers",
        price: 115000,
        priceDisplay: "₹1,15,000 Base",
        rateType: "Flat Package",
        badge: "Grand South Tour",
      },
    ],
    bestTimeToVisit: "September to March for the best weather across both hill stations and coastal temple towns.",
  },
];
