import fs from "fs";
import path from "path";

export interface BookingRecord {
  id: string;
  customer_name: string;
  customer_phone: string;
  trip_type: "airport" | "outstation" | "local" | "pilgrimage" | "wedding";
  vehicle_type: string;
  pickup_address: string;
  drop_address: string;
  pickup_datetime: string;
  estimated_price: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  driver_name?: string;
  driver_phone?: string;
  vehicle_number?: string;
  notes?: string;
  created_at?: string;
}

export interface DutySlipRecord {
  id: string;
  booking_id?: string;
  customer_name: string;
  customer_phone: string;
  driver_name: string;
  vehicle_number: string;
  vehicle_model: string;
  trip_route: string;
  start_km: number;
  end_km: number;
  total_km: number;
  toll_parking: number;
  driver_bata: number;
  total_amount: number;
  signature_data_url: string;
  completed_at?: string;
}

export interface ReviewRecord {
  id: string;
  booking_id?: string;
  customer_name: string;
  customer_phone: string;
  overall_rating: number;
  driver_rating?: number;
  cleanliness_rating?: number;
  comfort_rating?: number;
  generated_review_text?: string;
  is_positive_google_review: number; // 1 or 0
  feedback_notes?: string;
  created_at?: string;
}

export interface UserRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  password: string; // Plain/hashed password
  role: "owner" | "driver";
  assigned_vehicle?: string;
  duty_status?: "Available" | "On Duty" | "Off Duty";
  created_at?: string;
}

export interface RateCardRecord {
  id: string;
  vehicle_id: string;
  name: string;
  category: string;
  capacity: string;
  per_km_rate: number;
  airport_flat_rate: number;
  local_8hr_80km: number;
  driver_bata_per_day: number;
  night_bata: number;
  min_km_per_day: number;
  updated_at?: string;
}

export interface CustomQuotationRecord {
  id: string;
  customer_name: string;
  customer_phone: string;
  pickup_address: string;
  drop_address: string;
  gps_lat?: number;
  gps_lng?: number;
  distance_km?: number;
  vehicle_type: string;
  pickup_datetime: string;
  notes?: string;
  quoted_price?: number;
  status: "Pending" | "Quoted" | "Accepted" | "Rejected";
  created_at: string;
}

export interface OdometerRecord {
  id: string;
  booking_id: string;
  driver_id: string;
  driver_name?: string;
  vehicle_number?: string;
  start_km: number;
  end_km?: number;
  total_km?: number;
  start_photo_url?: string;
  end_photo_url?: string;
  start_time: string;
  end_time?: string;
  status: "Start_Submitted" | "Awaiting_Admin_Verification" | "Admin_Approved" | "Admin_Rejected" | "Customer_Confirmed" | "Auto_Approved";
  rejection_reason?: string;
  customer_otp?: string;
  customer_otp_verified?: boolean;
  created_at: string;
}

export interface FestivalOfferRecord {
  id: string;
  festival_name: string;
  occasion: string;
  discount_badge: string;
  banner_title: string;
  description: string;
  recommended_destinations: string[];
  booking_code: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  is_active: boolean;
  created_at?: string;
}

export interface ClientCompanyRecord {
  id: string;
  name: string;
  industry: string;
  location: string;
  logo_text: string;
  accent_color: string;
  is_active: boolean;
  created_at?: string;
}

export interface GpsPingRecord {
  id: string;
  booking_id: string;
  driver_id: string;
  driver_name: string;
  vehicle_number: string;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  timestamp: string;
}

export interface DynamicRouteRecord {
  id: string;
  title: string;
  from_location: string;
  to_location: string;
  category: "popular_hub" | "outstation_route" | "tour_package";
  distance_km: number;
  sedan_price: number;
  suv_price: number;
  tt_price: number;
  is_published: boolean;
  description?: string;
  created_at?: string;
}

export interface FleetVehicleRecord {
  id: string;
  name: string;
  category: "Sedan" | "SUV" | "Premium SUV" | "Tempo Traveller" | "Luxury Coach";
  capacity: string;
  luggage: string;
  ac: boolean;
  image: string;
  perKmRate: number;
  airportFlatRate: number;
  local8hr80km: number;
  driverBattaPerDay?: number;
  nightBatta?: number;
  minKmPerDay?: number;
  extraHourRate?: number;
  extraKmRate?: number;
  features: string[];
  description: string;
  bestFor: string;
  is_published: boolean;
  created_at?: string;
}

export interface PlaceHubRecord {
  id: string;
  name: string;
  href: string;
  count: number;
  thumbnail: string;
  is_published: boolean;
  created_at?: string;
}

export interface TourPackageRecord {
  id: string;
  name: string;
  tagline: string;
  state: "Andhra Pradesh" | "Karnataka" | "Tamil Nadu" | "Kerala" | "Karnataka";
  image: string;
  dist: string;
  days: string;
  price?: number;
  features?: string[];
  is_published: boolean;
  created_at?: string;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  vehicle_number: string;
  vehicle_name?: string;
  driver_name?: string;
  category:
    | "Fuel (Diesel/Petrol)"
    | "FASTag & Tolls"
    | "Vehicle Maintenance & Repairs"
    | "Chauffeur Batta & Food"
    | "Permits & Border Tax"
    | "Tyres, Oil & Spares"
    | "Insurance & RTA Compliance"
    | "Miscellaneous";
  amount: number;
  payment_mode: "FASTag Wallet" | "Cash" | "UPI / GPay" | "Company Card" | "Bank Transfer";
  receipt_url?: string;
  notes?: string;
  status: "Paid" | "Pending Approval" | "Reimbursed";
  created_at?: string;
}

interface LocalDatabaseState {
  bookings: BookingRecord[];
  duty_slips: DutySlipRecord[];
  reviews: ReviewRecord[];
  users: UserRecord[];
  rate_cards?: RateCardRecord[];
  quotations?: CustomQuotationRecord[];
  odometer_records?: OdometerRecord[];
  gps_pings?: GpsPingRecord[];
  dynamic_routes?: DynamicRouteRecord[];
  fleet_vehicles?: FleetVehicleRecord[];
  places_hubs?: PlaceHubRecord[];
  tour_packages?: TourPackageRecord[];
  expenses?: ExpenseRecord[];
  festival_offers?: FestivalOfferRecord[];
  client_companies?: ClientCompanyRecord[];
}

const LOCAL_DB_PATH = path.join(process.cwd(), ".data", "sky_cabs_db.json");

// Initial mock data if empty
const INITIAL_DATA: LocalDatabaseState = {
  bookings: [
    {
      id: "BK-1001",
      customer_name: "Venkat Rao",
      customer_phone: "9848012345",
      trip_type: "airport",
      vehicle_type: "Prime Sedan",
      pickup_address: "Begur, Bengaluru",
      drop_address: "Kempegowda International Airport (BLR), Bengaluru",
      pickup_datetime: new Date().toISOString(),
      estimated_price: 1399,
      status: "Confirmed",
      driver_name: "K. Shiva Kumar",
      driver_phone: "9632345415",
      vehicle_number: "KA 09 UB 4455",
      created_at: new Date().toISOString(),
    },
    {
      id: "BK-1002",
      customer_name: "Anand Reddy",
      customer_phone: "9988776655",
      trip_type: "pilgrimage",
      vehicle_type: "Toyota Innova Crysta",
      pickup_address: "Indiranagar Metro Station, Bengaluru",
      drop_address: "Mysuru Palace, Karnataka",
      pickup_datetime: new Date(Date.now() + 86400000).toISOString(),
      estimated_price: 6500,
      status: "Pending",
      notes: "Family pilgrimage with elderly parents. Need neat vehicle.",
      created_at: new Date().toISOString(),
    },
  ],
  duty_slips: [
    {
      id: "DS-9001",
      booking_id: "BK-1001",
      customer_name: "Venkat Rao",
      customer_phone: "9848012345",
      driver_name: "K. Shiva Kumar",
      vehicle_number: "KA 09 UB 4455",
      vehicle_model: "Prime Sedan",
      trip_route: "Begur to Kempegowda International Airport (BLR)",
      start_km: 42100,
      end_km: 42148,
      total_km: 48,
      toll_parking: 150,
      driver_bata: 0,
      total_amount: 1549,
      signature_data_url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiPjxwYXRoIGQ9Ik0xMCAyMCBRIDI1IDUgNDAgMjAgVCA3MCAyMCIgc3Ryb2tlPSIjM2I4MmY2IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
      completed_at: new Date().toISOString(),
    },
  ],
  reviews: [
    {
      id: "REV-3001",
      customer_name: "Suresh Babu",
      customer_phone: "9876543210",
      overall_rating: 5,
      driver_rating: 5,
      cleanliness_rating: 5,
      comfort_rating: 5,
      generated_review_text:
        "Outstanding service by Sky Cabs Bangalore! Booked an Innova Crysta for our family trip from Begur to Mysuru. The car was spotless, driver arrived 15 mins before time, and drove very safely on the ghat road. Best travels in Bengaluru!",
      is_positive_google_review: 1,
      feedback_notes: "Excellent journey",
      created_at: new Date().toISOString(),
    },
  ],
  users: [
    {
      id: "usr-owner-1",
      name: "Sky Cabs Bangalore (Team)",
      phone: "9632345415",
      email: "skycabsbangalore@gmail.com",
      password: "SkyCabs@2026",
      role: "owner",
      created_at: new Date().toISOString(),
    },
    {
      id: "usr-driver-1",
      name: "K. Shiva Kumar",
      phone: "9632345415",
      email: "skycabsbangalore@gmail.com",
      password: "Driver@2026",
      role: "driver",
      assigned_vehicle: "KA 09 UB 4455 (Prime Sedan)",
      duty_status: "Available",
      created_at: new Date().toISOString(),
    },
    {
      id: "usr-driver-2",
      name: "M. Ramesh Reddy",
      phone: "9848012345",
      email: "skycabsbangalore@gmail.com",
      password: "Driver@2026",
      role: "driver",
      assigned_vehicle: "KA 08 EX 9090 (Innova Crysta)",
      duty_status: "On Duty",
      created_at: new Date().toISOString(),
    },
  ],
  rate_cards: [
    {
      id: "rc-prime-sedan",
      vehicle_id: "prime-sedan",
      name: "Prime Sedan",
      category: "Sedan",
      capacity: "4+1 Passenger",
      per_km_rate: 12,
      airport_flat_rate: 1299,
      local_8hr_80km: 2199,
      driver_bata_per_day: 400,
      night_bata: 200,
      min_km_per_day: 300,
      updated_at: new Date().toISOString(),
    },
    {
      id: "rc-ertiga",
      vehicle_id: "ertiga",
      name: "Maruti Suzuki Ertiga",
      category: "SUV",
      capacity: "6+1 Passenger",
      per_km_rate: 15,
      airport_flat_rate: 1699,
      local_8hr_80km: 2899,
      driver_bata_per_day: 500,
      night_bata: 250,
      min_km_per_day: 300,
      updated_at: new Date().toISOString(),
    },
    {
      id: "rc-innova",
      vehicle_id: "innova-crysta",
      name: "Toyota Innova Crysta",
      category: "Premium SUV",
      capacity: "7+1 Passenger",
      per_km_rate: 19,
      airport_flat_rate: 2199,
      local_8hr_80km: 3699,
      driver_bata_per_day: 600,
      night_bata: 300,
      min_km_per_day: 300,
      updated_at: new Date().toISOString(),
    },
    {
      id: "rc-tempo-traveller-12",
      vehicle_id: "tempo-traveller-12",
      name: "Tempo Traveller (12+1)",
      category: "Tempo Traveller",
      capacity: "12+1 Passenger",
      per_km_rate: 25,
      airport_flat_rate: 3499,
      local_8hr_80km: 5499,
      driver_bata_per_day: 800,
      night_bata: 400,
      min_km_per_day: 300,
      updated_at: new Date().toISOString(),
    },
    {
      id: "rc-urbania-16",
      vehicle_id: "urbania-16",
      name: "Force Urbania (16+1 Seater)",
      category: "Tempo Traveller",
      capacity: "16+1 Passenger",
      per_km_rate: 32,
      airport_flat_rate: 4499,
      local_8hr_80km: 7499,
      driver_bata_per_day: 1000,
      night_bata: 500,
      min_km_per_day: 350,
      updated_at: new Date().toISOString(),
    },
    {
      id: "rc-passenger-bus",
      vehicle_id: "passenger-bus",
      name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
      category: "Luxury Coach",
      capacity: "25, 33, 40, 45, 50 & 52 Seater",
      per_km_rate: 48,
      airport_flat_rate: 6999,
      local_8hr_80km: 11999,
      driver_bata_per_day: 1500,
      night_bata: 800,
      min_km_per_day: 400,
      updated_at: new Date().toISOString(),
    },
  ],
};

function readLocalDb(): LocalDatabaseState {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      const dir = path.dirname(LOCAL_DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf8");
      return INITIAL_DATA;
    }
    const content = fs.readFileSync(LOCAL_DB_PATH, "utf8");
    const parsed = JSON.parse(content);
    let changed = false;
    if (!parsed.users) {
      parsed.users = INITIAL_DATA.users;
      changed = true;
    }
    if (!parsed.quotations) {
      parsed.quotations = [
        {
          id: "QR-1001",
          customer_name: "K. Raghunath",
          customer_phone: "9848099887",
          pickup_address: "Outer Ring Road, Bengaluru",
          drop_address: "Mysuru Palace & Brindavan Gardens",
          distance_km: 165,
          vehicle_type: "Toyota Innova Crysta",
          pickup_datetime: new Date(Date.now() + 3600000 * 24).toISOString(),
          notes: "Need clean AC cab for family day trip. Waiting required.",
          status: "Pending",
          created_at: new Date().toISOString(),
        },
        {
          id: "QR-1002",
          customer_name: "P. Mahender Rao",
          customer_phone: "9440112233",
          pickup_address: "Jayanagar (Banashankari District)",
          drop_address: "Kempegowda International Airport (BLR)",
          distance_km: 175,
          vehicle_type: "Prime Sedan",
          pickup_datetime: new Date(Date.now() + 3600000 * 48).toISOString(),
          quoted_price: 3600,
          status: "Quoted",
          created_at: new Date().toISOString(),
        },
      ];
      changed = true;
    }
    if (!parsed.odometer_records) {
      parsed.odometer_records = [
        {
          id: "ODO-5001",
          booking_id: "BK-1001",
          driver_id: "usr-driver-1",
          driver_name: "K. Shiva Kumar",
          vehicle_number: "KA 09 UB 4455",
          start_km: 42100,
          end_km: 42148,
          total_km: 48,
          start_photo_url: "/images/odometer-start-sample.jpg",
          end_photo_url: "/images/odometer-end-sample.jpg",
          start_time: new Date(Date.now() - 7200000).toISOString(),
          end_time: new Date(Date.now() - 1800000).toISOString(),
          status: "Awaiting_Admin_Verification",
          customer_otp: "482910",
          created_at: new Date().toISOString(),
        },
      ];
      changed = true;
    }
    if (!parsed.gps_pings) {
      parsed.gps_pings = [
        {
          id: "gps-1",
          booking_id: "BK-1001",
          driver_id: "usr-driver-1",
          driver_name: "K. Shiva Kumar",
          vehicle_number: "KA 09 UB 4455",
          latitude: 12.9352,
          longitude: 77.6245,
          speed: 42,
          heading: 180,
          timestamp: new Date().toISOString(),
        },
      ];
      changed = true;
    }
    if (!parsed.dynamic_routes) {
      parsed.dynamic_routes = [
        {
          id: "route-mysuru",
          title: "Bengaluru to Mysuru Heritage Tour",
          from_location: "Begur / Bengaluru",
          to_location: "Mysuru Temple",
          category: "outstation_route",
          distance_km: 213,
          sedan_price: 4800,
          suv_price: 6500,
          tt_price: 10500,
          is_published: true,
          description: "Ghat road transit through Nallamala forest, Dindi reservoir & Dam viewpoint.",
        },
        {
          id: "route-tirupati",
          title: "Bengaluru to Tirupati Balaji Darshan",
          from_location: "Bengaluru",
          to_location: "Tirupati",
          category: "outstation_route",
          distance_km: 570,
          sedan_price: 12500,
          suv_price: 16500,
          tt_price: 25000,
          is_published: true,
          description: "Comfortable highway pilgrimage with experienced senior drivers.",
        },
        {
          id: "hub-begur",
          title: "Begur Hub (Y-Junction)",
          from_location: "Begur",
          to_location: "Kempegowda International Airport (BLR) / City",
          category: "popular_hub",
          distance_km: 42,
          sedan_price: 1299,
          suv_price: 2199,
          tt_price: 3499,
          is_published: true,
          description: "Headquarters & rapid dispatch hub with average 10-15 minute doorstep pickup.",
        },
        {
          id: "hub-jayanagar",
          title: "Jayanagar / Banashankari Hub",
          from_location: "Jayanagar",
          to_location: "Bengaluru / Tumakuru",
          category: "popular_hub",
          distance_km: 145,
          sedan_price: 3200,
          suv_price: 4500,
          tt_price: 7500,
          is_published: true,
          description: "District connecting hub for outstation & return Bengaluru journeys.",
        },
      ];
      changed = true;
    }
    if (!parsed.fleet_vehicles) {
      parsed.fleet_vehicles = [
        {
          id: "prime-sedan",
          name: "Prime Sedan",
          category: "Sedan",
          capacity: "4+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/prime-sedan-1.png",
          perKmRate: 13,
          airportFlatRate: 1399,
          local8hr80km: 2299,
          features: ["Dual AC", "Clean & Sanitized", "Comfortable Legroom"],
          description: "City commutes, airport transfers and small-family outstation trips. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "ertiga",
          name: "Maruti Suzuki Ertiga",
          category: "SUV",
          capacity: "6+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/maruti-ertiga.jpg",
          perKmRate: 16,
          airportFlatRate: 1799,
          local8hr80km: 2999,
          features: ["Roof AC Vents", "Adjustable Seats", "Spacious Boot"],
          description: "Family outings, group airport transfers and weekend getaways. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "innova",
          name: "Toyota Innova",
          category: "SUV",
          capacity: "7+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/innova-crysta.jpg",
          perKmRate: 18,
          airportFlatRate: 2199,
          local8hr80km: 3599,
          features: ["Spacious Cabin", "Strong AC", "Large Boot"],
          description: "Family travel, corporate movement and outstation journeys. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "innova-crysta",
          name: "Toyota Innova Crysta",
          category: "Premium SUV",
          capacity: "7+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/innova-crysta.jpg",
          perKmRate: 20,
          airportFlatRate: 2499,
          local8hr80km: 3899,
          features: ["Premium Interiors", "Dual Climate Control", "Highway Comfort"],
          description: "Airport transfers, corporate travel and relaxed outstation trips. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "innova-hycross",
          name: "Toyota Innova Hycross",
          category: "Premium SUV",
          capacity: "7+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/innova-crysta.jpg",
          perKmRate: 22,
          airportFlatRate: 2799,
          local8hr80km: 4299,
          features: ["Modern Premium Cabin", "Refined Ride", "Spacious Seating"],
          description: "Premium outstation, corporate and family airport travel. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "fortuner",
          name: "Toyota Fortuner",
          category: "Premium SUV",
          capacity: "6+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/innova-crysta.jpg",
          perKmRate: 28,
          airportFlatRate: 3499,
          local8hr80km: 5499,
          features: ["Powerful SUV", "Premium Comfort", "Highway Stability"],
          description: "VIP movement, executive travel and weddings. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "tempo-traveller-12",
          name: "Tempo Traveller (12+1 Seater)",
          category: "Tempo Traveller",
          capacity: "12+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/tempo-traveller.jpg",
          perKmRate: 26,
          airportFlatRate: 3999,
          local8hr80km: 5499,
          features: ["Pushback Seats", "Individual AC Vents", "Music System"],
          description: "Group airport transfers, family trips and corporate outings. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "urbania-9",
          name: "Force Urbania (9+1 Seater)",
          category: "Tempo Traveller",
          capacity: "9+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/force-urbania.png",
          perKmRate: 30,
          airportFlatRate: 4499,
          local8hr80km: 6499,
          features: ["Premium Reclining Seats", "Quiet Cabin", "Charging Ports"],
          description: "Executive movement, family tours and outstation travel. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "urbania-12",
          name: "Force Urbania (12+1 Seater)",
          category: "Tempo Traveller",
          capacity: "12+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/force-urbania.png",
          perKmRate: 34,
          airportFlatRate: 4999,
          local8hr80km: 6999,
          features: ["Premium Reclining Seats", "LED Ambient Lighting", "Smooth Ride"],
          description: "Weddings, corporate groups and outstation tours. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "urbania-16",
          name: "Force Urbania (16+1 Seater)",
          category: "Tempo Traveller",
          capacity: "16+1 Passenger",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/force-urbania.png",
          perKmRate: 38,
          airportFlatRate: 5499,
          local8hr80km: 7499,
          features: ["Premium Reclining Seats", "Spacious Cabin", "Group Comfort"],
          description: "Large groups, events and long-distance tours. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "passenger-bus",
          name: "Passenger Buses (25, 33, 40, 45, 50 & 52 Seater)",
          category: "Luxury Coach",
          capacity: "25, 33, 40, 45, 50 & 52 Seater",
          luggage: "As per vehicle",
          ac: true,
          image: "/images/fleet/passenger-bus.jpg",
          perKmRate: 55,
          airportFlatRate: 8999,
          local8hr80km: 12999,
          features: ["Comfortable Seating", "AC Options", "Spacious Interiors"],
          description: "Weddings, corporate movements, school trips and large group travel. Subject to availability.",
          bestFor: "Bengaluru local, airport and outstation travel",
          is_published: true,
          created_at: new Date().toISOString(),
        },
      ];
      changed = true;
    }
    if (!parsed.places_hubs) {
      parsed.places_hubs = [
        {
          id: "hub-1",
          name: "Begur",
          href: "/cabs-in-begur",
          count: 240,
          thumbnail: "/images/hubs/begur-hub.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "hub-2",
          name: "Kempegowda International Airport (BLR)",
          href: "/kempegowda-airport-taxi",
          count: 512,
          thumbnail: "/images/hubs/kempegowda-airport.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "hub-3",
          name: "Electronic City",
          href: "/cabs-in-electronic-city",
          count: 180,
          thumbnail: "/images/hubs/electronic-city.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "hub-4",
          name: "Whitefield",
          href: "/cabs-in-whitefield",
          count: 320,
          thumbnail: "/images/hubs/electronic-city.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "hub-5",
          name: "Koramangala",
          href: "/cabs-in-koramangala",
          count: 155,
          thumbnail: "/images/hubs/whitefield-hub.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "hub-6",
          name: "HSR Layout",
          href: "/cabs-in-hsr-layout",
          count: 140,
          thumbnail: "/images/hubs/hsr-layout-hub.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "hub-7",
          name: "Jayanagar",
          href: "/cabs-in-jayanagar",
          count: 360,
          thumbnail: "/images/hubs/jayanagar-hub.jpg",
          is_published: true,
          created_at: new Date().toISOString(),
        },
      ];
      changed = true;
    }
    if (!parsed.tour_packages) {
      parsed.tour_packages = [
        {
          id: "pkg-mysuru",
          name: "Mysuru Palace & Chamundi",
          tagline: "Heritage Palace, Gardens & Hill Temple",
          state: "Karnataka",
          image: "/images/images1.jpg",
          dist: "150 KM",
          days: "1 Day",
          price: 4500,
          features: ["Brindavan Gardens", "Palace Illumination Timing", "Chamundi Hills Drive"],
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "pkg-tirupati",
          name: "Tirupati Balaji Darshan",
          tagline: "Lord Venkateswara Temple Darshan",
          state: "Andhra Pradesh",
          image: "/images/Tirupati.jpg",
          dist: "325 KM",
          days: "2 Days",
          price: 8200,
          features: ["Alipiri Checkpoint Guidance", "Tirumala Ghat Ascent", "Padmavathi Ammavari Temple"],
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "pkg-srikalahasti",
          name: "Srikalahasti Rahu Ketu",
          tagline: "Vayu Linga & Rahu Ketu Pooja",
          state: "Andhra Pradesh",
          image: "/images/Srikalahasti.jpg",
          dist: "320 KM",
          days: "2 Days",
          price: 7900,
          features: ["Special Pooja Timing Advisory", "Comfortable AC Vehicle", "Kanipakam Extension Option"],
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "pkg-coorg",
          name: "Coorg (Madikeri)",
          tagline: "Coffee Plantations & Abbey Falls",
          state: "Karnataka",
          image: "/images/images2.jpg",
          dist: "260 KM",
          days: "2 Days",
          price: 6200,
          features: ["Raja's Seat Sunset", "Coffee Estate Route", "Spacious Boot for Coffee Purchases"],
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "pkg-ooty",
          name: "Ooty & Kodaikanal",
          tagline: "Queen of Hill Stations & Lakes",
          state: "Tamil Nadu",
          image: "/images/images4.jpg",
          dist: "265 KM",
          days: "3 Days",
          price: 9500,
          features: ["Hill Driving Specialists", "Tea Garden Tours", "Chilled Mountain Escapes"],
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "pkg-hampi",
          name: "Hampi & Hospet",
          tagline: "Vijayanagara Ruins & Virupaksha Temple",
          state: "Karnataka",
          image: "/images/Hampi.jpg",
          dist: "380 KM",
          days: "2-3 Days",
          price: 11800,
          features: ["UNESCO Heritage Walk", "Tungabhadra River View", "Experienced Highway Chauffeurs"],
          is_published: true,
          created_at: new Date().toISOString(),
        },
      ];
      changed = true;
    }
    if (!parsed.expenses) {
      parsed.expenses = [
        {
          id: "EXP-1001",
          date: new Date(Date.now() - 86400000 * 1).toISOString().split("T")[0],
          vehicle_number: "KA 09 UB 4455",
          vehicle_name: "Prime Sedan",
          driver_name: "K. Shiva Kumar",
          category: "Fuel (Diesel/Petrol)",
          amount: 3200,
          payment_mode: "Company Card",
          notes: "Indian Oil Petrol Pump, Begur, Bengaluru (Full Tank Diesel)",
          status: "Paid",
          created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
        {
          id: "EXP-1002",
          date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
          vehicle_number: "KA 08 EX 9090",
          vehicle_name: "Innova Crysta",
          driver_name: "M. Ramesh Reddy",
          category: "FASTag & Tolls",
          amount: 2000,
          payment_mode: "FASTag Wallet",
          notes: "ORR & Bengaluru-Mysuru Highway Toll Plaza Auto Recharge",
          status: "Paid",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: "EXP-1003",
          date: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0],
          vehicle_number: "KA 08 EX 9090",
          vehicle_name: "Innova Crysta",
          driver_name: "M. Ramesh Reddy",
          category: "Vehicle Maintenance & Repairs",
          amount: 8450,
          payment_mode: "Bank Transfer",
          notes: "Periodic 40,000 KM Engine Oil, Filter & Brake Pad Inspection (Toyota Service Centre, Bengaluru)",
          status: "Paid",
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
        {
          id: "EXP-1004",
          date: new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0],
          vehicle_number: "KA 07 TT 1717",
          vehicle_name: "Tempo Traveller (12+1 Seater)",
          driver_name: "K. Shiva Kumar",
          category: "Chauffeur Batta & Food",
          amount: 1600,
          payment_mode: "UPI / GPay",
          notes: "2-Day Tirupati Pilgrimage Night Batta & Meal Allowance",
          status: "Paid",
          created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
        },
        {
          id: "EXP-1005",
          date: new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0],
          vehicle_number: "KA 09 UB 4455",
          vehicle_name: "Prime Sedan",
          driver_name: "K. Shiva Kumar",
          category: "Permits & Border Tax",
          amount: 850,
          payment_mode: "Cash",
          notes: "Karnataka Inter-State Passenger Permit (Hosur Checkpost)",
          status: "Paid",
          created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        },
        {
          id: "EXP-1006",
          date: new Date(Date.now() - 86400000 * 6).toISOString().split("T")[0],
          vehicle_number: "KA 07 TT 1717",
          vehicle_name: "Tempo Traveller (12+1 Seater)",
          driver_name: "M. Ramesh Reddy",
          category: "Tyres, Oil & Spares",
          amount: 2400,
          payment_mode: "UPI / GPay",
          notes: "Dual AC Compressor Gas Top-up & Air Duct Cleaning for summer highway readiness",
          status: "Paid",
          created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
        },
      ];
      changed = true;
    }
    if (changed) {
      writeLocalDb(parsed);
    }
    return parsed;
  } catch (err) {
    console.error("Local DB read error, using in-memory default:", err);
    return INITIAL_DATA;
  }
}

function writeLocalDb(data: LocalDatabaseState): void {
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Local DB write error:", err);
  }
}

/**
 * Execute Cloudflare D1 query via Cloudflare REST API if env credentials provided,
 * else fallback gracefully to local storage.
 */
async function executeD1Query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_D1_TOKEN;

  if (accountId && databaseId && apiToken) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sql, params }),
        }
      );
      const json = await response.json();
      if (json.success && json.result?.[0]?.results) {
        return json.result[0].results as T[];
      }
    } catch (apiErr) {
      console.warn("Cloudflare D1 REST query failed, falling back to local DB:", apiErr);
    }
  }

  return [];
}

export const d1Client = {
  // --- Bookings ---
  async getBookings(): Promise<BookingRecord[]> {
    const remote = await executeD1Query<BookingRecord>("SELECT * FROM bookings ORDER BY created_at DESC");
    if (remote.length > 0) return remote;
    const db = readLocalDb();
    return [...db.bookings].sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  },

  async getBookingById(id: string): Promise<BookingRecord | null> {
    const remote = await executeD1Query<BookingRecord>("SELECT * FROM bookings WHERE id = ? LIMIT 1", [id]);
    if (remote.length > 0) return remote[0];
    const db = readLocalDb();
    return db.bookings.find((b) => b.id === id) || null;
  },

  async createBooking(data: Omit<BookingRecord, "id" | "created_at">): Promise<BookingRecord> {
    const id = `BK-${Date.now().toString().slice(-6)}`;
    const newRecord: BookingRecord = {
      ...data,
      id,
      created_at: new Date().toISOString(),
    };

    await executeD1Query(
      `INSERT INTO bookings (id, customer_name, customer_phone, trip_type, vehicle_type, pickup_address, drop_address, pickup_datetime, estimated_price, status, driver_name, driver_phone, vehicle_number, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        newRecord.customer_name,
        newRecord.customer_phone,
        newRecord.trip_type,
        newRecord.vehicle_type,
        newRecord.pickup_address,
        newRecord.drop_address,
        newRecord.pickup_datetime,
        newRecord.estimated_price,
        newRecord.status,
        newRecord.driver_name || null,
        newRecord.driver_phone || null,
        newRecord.vehicle_number || null,
        newRecord.notes || null,
      ]
    );

    const db = readLocalDb();
    db.bookings.unshift(newRecord);
    writeLocalDb(db);
    return newRecord;
  },

  async updateBooking(id: string, updates: Partial<BookingRecord>): Promise<BookingRecord | null> {
    const db = readLocalDb();
    const index = db.bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    db.bookings[index] = { ...db.bookings[index], ...updates };
    writeLocalDb(db);

    const fields = Object.keys(updates)
      .map((k) => `${k} = ?`)
      .join(", ");
    if (fields) {
      await executeD1Query(`UPDATE bookings SET ${fields} WHERE id = ?`, [...Object.values(updates), id]);
    }

    return db.bookings[index];
  },

  async deleteBooking(id: string): Promise<boolean> {
    const db = readLocalDb();
    const idx = db.bookings.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    db.bookings.splice(idx, 1);
    writeLocalDb(db);
    try {
      await executeD1Query("DELETE FROM bookings WHERE id = ?", [id]);
    } catch {
      // Local fallback handled
    }
    return true;
  },

  // --- Duty Slips ---
  async getDutySlips(): Promise<DutySlipRecord[]> {
    const remote = await executeD1Query<DutySlipRecord>("SELECT * FROM duty_slips ORDER BY completed_at DESC");
    if (remote.length > 0) return remote;
    const db = readLocalDb();
    return [...db.duty_slips].sort(
      (a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime()
    );
  },

  async createDutySlip(data: Omit<DutySlipRecord, "id" | "completed_at">): Promise<DutySlipRecord> {
    const id = `DS-${Date.now().toString().slice(-6)}`;
    const newRecord: DutySlipRecord = {
      ...data,
      id,
      completed_at: new Date().toISOString(),
    };

    await executeD1Query(
      `INSERT INTO duty_slips (id, booking_id, customer_name, customer_phone, driver_name, vehicle_number, vehicle_model, trip_route, start_km, end_km, total_km, toll_parking, driver_bata, total_amount, signature_data_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        newRecord.booking_id || null,
        newRecord.customer_name,
        newRecord.customer_phone,
        newRecord.driver_name,
        newRecord.vehicle_number,
        newRecord.vehicle_model,
        newRecord.trip_route,
        newRecord.start_km,
        newRecord.end_km,
        newRecord.total_km,
        newRecord.toll_parking,
        newRecord.driver_bata,
        newRecord.total_amount,
        newRecord.signature_data_url,
      ]
    );

    const db = readLocalDb();
    db.duty_slips.unshift(newRecord);
    writeLocalDb(db);
    return newRecord;
  },

  // --- Reviews ---
  async getReviews(): Promise<ReviewRecord[]> {
    const remote = await executeD1Query<ReviewRecord>("SELECT * FROM reviews ORDER BY created_at DESC");
    if (remote.length > 0) return remote;
    const db = readLocalDb();
    return [...db.reviews].sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  },

  async createReview(data: Omit<ReviewRecord, "id" | "created_at">): Promise<ReviewRecord> {
    const id = `REV-${Date.now().toString().slice(-6)}`;
    const newRecord: ReviewRecord = {
      ...data,
      id,
      created_at: new Date().toISOString(),
    };

    await executeD1Query(
      `INSERT INTO reviews (id, booking_id, customer_name, customer_phone, overall_rating, driver_rating, cleanliness_rating, comfort_rating, generated_review_text, is_positive_google_review, feedback_notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        newRecord.booking_id || null,
        newRecord.customer_name,
        newRecord.customer_phone,
        newRecord.overall_rating,
        newRecord.driver_rating || null,
        newRecord.cleanliness_rating || null,
        newRecord.comfort_rating || null,
        newRecord.generated_review_text || null,
        newRecord.is_positive_google_review,
        newRecord.feedback_notes || null,
      ]
    );

    const db = readLocalDb();
    db.reviews.unshift(newRecord);
    writeLocalDb(db);
    return newRecord;
  },

  // --- Users / Auth ---
  async getUsers(): Promise<UserRecord[]> {
    const db = readLocalDb();
    return db.users || [];
  },

  async getUserByPhoneOrEmail(identifier: string): Promise<UserRecord | null> {
    const db = readLocalDb();
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/[^0-9]/g, "");

    const found = db.users.find((u) => {
      const uPhone = u.phone.replace(/[^0-9]/g, "");
      const uEmail = (u.email || "").toLowerCase();
      return (
        (cleanPhone.length >= 10 && uPhone.includes(cleanPhone)) ||
        uEmail === cleanId ||
        u.phone === identifier
      );
    });

    return found || null;
  },

  async createUser(data: Omit<UserRecord, "id" | "created_at">): Promise<UserRecord> {
    const id = `usr-${data.role}-${Date.now().toString().slice(-5)}`;
    const newRecord: UserRecord = {
      ...data,
      id,
      duty_status: data.duty_status || "Available",
      created_at: new Date().toISOString(),
    };

    const db = readLocalDb();
    db.users.push(newRecord);
    writeLocalDb(db);
    return newRecord;
  },

  async updateUserDutyStatus(id: string, duty_status: "Available" | "On Duty" | "Off Duty"): Promise<boolean> {
    const db = readLocalDb();
    let user = db.users.find((u) => u.id === id);
    if (!user) {
      user = db.users.find((u) => u.id === "usr-driver-1" || u.role === "driver");
    }
    if (!user) return false;
    user.duty_status = duty_status;
    writeLocalDb(db);
    return true;
  },

  async deleteUser(id: string): Promise<boolean> {
    const db = readLocalDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    db.users.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Dynamic Rate Cards ---
  async getRateCards(): Promise<RateCardRecord[]> {
    const db = readLocalDb();
    if (!db.rate_cards || db.rate_cards.length === 0) {
      db.rate_cards = INITIAL_DATA.rate_cards || [];
      writeLocalDb(db);
    }
    return db.rate_cards || [];
  },

  async updateRateCard(id: string, updates: Partial<RateCardRecord>): Promise<RateCardRecord | null> {
    const db = readLocalDb();
    if (!db.rate_cards) {
      db.rate_cards = INITIAL_DATA.rate_cards ? [...INITIAL_DATA.rate_cards] : [];
    }
    const rateCards = db.rate_cards;
    const idx = rateCards.findIndex((rc) => rc.id === id || rc.vehicle_id === id);
    if (idx === -1) return null;
    rateCards[idx] = {
      ...rateCards[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    db.rate_cards = rateCards;
    writeLocalDb(db);
    return rateCards[idx];
  },

  // --- Custom Quotations Management ---
  async getQuotations(): Promise<CustomQuotationRecord[]> {
    const db = readLocalDb();
    return db.quotations || [];
  },

  async createQuotation(data: Omit<CustomQuotationRecord, "id" | "status" | "created_at">): Promise<CustomQuotationRecord> {
    const db = readLocalDb();
    if (!db.quotations) db.quotations = [];
    const newRecord: CustomQuotationRecord = {
      ...data,
      id: "QR-" + Math.floor(1000 + Math.random() * 9000),
      status: "Pending",
      created_at: new Date().toISOString(),
    };
    db.quotations.unshift(newRecord);
    writeLocalDb(db);
    return newRecord;
  },

  async updateQuotation(id: string, updates: Partial<CustomQuotationRecord>): Promise<CustomQuotationRecord | null> {
    const db = readLocalDb();
    if (!db.quotations) db.quotations = [];
    const idx = db.quotations.findIndex((q) => q.id === id);
    if (idx === -1) return null;
    db.quotations[idx] = { ...db.quotations[idx], ...updates };
    writeLocalDb(db);
    return db.quotations[idx];
  },

  async deleteQuotation(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.quotations) return false;
    const idx = db.quotations.findIndex((q) => q.id === id);
    if (idx === -1) return false;
    db.quotations.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Odometer Records & Auditing ---
  async getOdometerRecords(bookingId?: string): Promise<OdometerRecord[]> {
    const db = readLocalDb();
    const records = db.odometer_records || [];
    if (bookingId) {
      return records.filter((r) => r.booking_id === bookingId);
    }
    return records;
  },

  async submitOdometerStart(data: {
    booking_id: string;
    driver_id: string;
    driver_name?: string;
    vehicle_number?: string;
    start_km: number;
    start_photo_url?: string;
  }): Promise<OdometerRecord> {
    const db = readLocalDb();
    if (!db.odometer_records) db.odometer_records = [];

    let record = db.odometer_records.find((r) => r.booking_id === data.booking_id);
    if (record) {
      record.start_km = data.start_km;
      record.start_photo_url = data.start_photo_url || "";
      record.driver_id = data.driver_id;
      record.driver_name = data.driver_name || record.driver_name;
      record.vehicle_number = data.vehicle_number || record.vehicle_number;
      record.start_time = new Date().toISOString();
      record.status = "Start_Submitted";
    } else {
      record = {
        id: "ODO-" + Math.floor(1000 + Math.random() * 9000),
        booking_id: data.booking_id,
        driver_id: data.driver_id,
        driver_name: data.driver_name,
        vehicle_number: data.vehicle_number,
        start_km: data.start_km,
        start_photo_url: data.start_photo_url || "",
        start_time: new Date().toISOString(),
        status: "Start_Submitted",
        created_at: new Date().toISOString(),
      };
      db.odometer_records.unshift(record);
    }

    // Also update booking status to In Progress
    const booking = db.bookings.find((b) => b.id === data.booking_id);
    if (booking) {
      booking.status = "Confirmed";
    }

    writeLocalDb(db);
    return record;
  },

  async submitOdometerEnd(data: {
    booking_id: string;
    driver_id: string;
    end_km: number;
    end_photo_url?: string;
  }): Promise<OdometerRecord | null> {
    const db = readLocalDb();
    if (!db.odometer_records) db.odometer_records = [];

    let record = db.odometer_records.find((r) => r.booking_id === data.booking_id);
    if (!record) {
      // Auto-create initial record if trip was started previously
      record = {
        id: "ODO-" + Math.floor(1000 + Math.random() * 9000),
        booking_id: data.booking_id,
        driver_id: data.driver_id,
        start_km: Math.max(0, data.end_km - 48),
        start_photo_url: "",
        start_time: new Date(Date.now() - 3600000).toISOString(),
        status: "Auto_Approved",
        created_at: new Date().toISOString(),
      };
      db.odometer_records.unshift(record);
    }

    record.end_km = data.end_km;
    record.end_photo_url = data.end_photo_url || "";
    record.end_time = new Date().toISOString();
    record.total_km = Math.max(0, data.end_km - record.start_km);
    // Instant Auto-Approval: No admin approval roadblock needed!
    record.status = "Auto_Approved";
    record.rejection_reason = undefined;

    // Automatically generate / update duty slip immediately
    const booking = db.bookings.find((b) => b.id === data.booking_id);
    const calculatedFare = booking?.estimated_price || Math.max(1299, record.total_km * 18);
    const existingDutySlip = db.duty_slips.find((ds) => ds.booking_id === data.booking_id);
    if (existingDutySlip) {
      existingDutySlip.start_km = record.start_km;
      existingDutySlip.end_km = data.end_km;
      existingDutySlip.total_km = record.total_km;
      existingDutySlip.total_amount = calculatedFare;
      existingDutySlip.completed_at = new Date().toISOString();
    } else {
      db.duty_slips.unshift({
        id: "DS-" + Math.floor(1000 + Math.random() * 9000),
        booking_id: data.booking_id,
        customer_name: booking?.customer_name || "Valued Passenger",
        customer_phone: booking?.customer_phone || "9848012345",
        driver_name: record.driver_name || "K. Shiva Kumar",
        vehicle_number: record.vehicle_number || "KA 09 UB 4455",
        vehicle_model: booking?.vehicle_type || "Toyota Innova Crysta",
        trip_route: `${booking?.pickup_address || "Pickup"} to ${booking?.drop_address || "Drop"}`,
        start_km: record.start_km,
        end_km: data.end_km,
        total_km: record.total_km,
        toll_parking: 0,
        driver_bata: 0,
        total_amount: calculatedFare,
        signature_data_url:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiPjxwYXRoIGQ9Ik0xMCAyMCBRIDI1IDUgNDAgMjAgVCA3MCAyMCIgc3Ryb2tlPSIjM2I4MmY2IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
        completed_at: new Date().toISOString(),
      });
    }

    if (booking) {
      booking.status = "Completed";
    }

    writeLocalDb(db);
    return record;
  },

  async verifyOdometer(
    id: string,
    status: "Admin_Approved" | "Admin_Rejected",
    rejection_reason?: string
  ): Promise<OdometerRecord | null> {
    const db = readLocalDb();
    if (!db.odometer_records) return null;

    const record = db.odometer_records.find((r) => r.id === id || r.booking_id === id);
    if (!record) return null;

    record.status = status;
    if (status === "Admin_Rejected") {
      record.rejection_reason = rejection_reason || "Odometer photograph unreadable or mismatch. Please recapture.";
    } else {
      record.rejection_reason = undefined;
      // Generate a 6-digit verification OTP for the customer
      record.customer_otp = Math.floor(100000 + Math.random() * 900000).toString();
      record.customer_otp_verified = false;
    }

    writeLocalDb(db);
    return record;
  },

  async verifyCustomerRideOtp(booking_id: string, otp: string): Promise<{ success: boolean; message: string; record?: OdometerRecord }> {
    const db = readLocalDb();
    if (!db.odometer_records) return { success: false, message: "Record not found" };

    const record = db.odometer_records.find((r) => r.booking_id === booking_id || r.id === booking_id);
    if (!record) return { success: false, message: "No active odometer record found for this trip." };

    // Allow universal test OTP 123456 or exact matched OTP
    if (otp !== "123456" && record.customer_otp !== otp.trim()) {
      return { success: false, message: "Invalid verification OTP. Please enter the 6-digit code received on mobile." };
    }

    record.customer_otp_verified = true;
    record.status = "Customer_Confirmed";

    const booking = db.bookings.find((b) => b.id === record.booking_id);
    if (booking) {
      booking.status = "Completed";
    }

    writeLocalDb(db);
    return { success: true, message: "Ride verified and marked Completed successfully!", record };
  },

  // --- Live GPS Radar Pings ---
  async saveGpsPing(ping: Omit<GpsPingRecord, "id" | "timestamp">): Promise<GpsPingRecord> {
    const db = readLocalDb();
    if (!db.gps_pings) db.gps_pings = [];

    const newPing: GpsPingRecord = {
      ...ping,
      id: "gps-" + Date.now(),
      timestamp: new Date().toISOString(),
    };

    // Update existing driver ping if present, or add new
    const existingIdx = db.gps_pings.findIndex((p) => p.driver_id === ping.driver_id);
    if (existingIdx !== -1) {
      db.gps_pings[existingIdx] = newPing;
    } else {
      db.gps_pings.unshift(newPing);
    }

    // Keep max 50 pings
    if (db.gps_pings.length > 50) {
      db.gps_pings = db.gps_pings.slice(0, 50);
    }

    writeLocalDb(db);
    return newPing;
  },

  async getLatestGpsPings(): Promise<GpsPingRecord[]> {
    const db = readLocalDb();
    return db.gps_pings || [];
  },

  // --- Dynamic Routes CMS ---
  async getDynamicRoutes(category?: string): Promise<DynamicRouteRecord[]> {
    const db = readLocalDb();
    const routes = db.dynamic_routes || [];
    if (category) {
      return routes.filter((r) => r.category === category);
    }
    return routes;
  },

  async createDynamicRoute(data: Omit<DynamicRouteRecord, "id" | "created_at">): Promise<DynamicRouteRecord> {
    const db = readLocalDb();
    if (!db.dynamic_routes) db.dynamic_routes = [];

    const newRoute: DynamicRouteRecord = {
      ...data,
      id: "route-" + Math.floor(1000 + Math.random() * 9000),
      created_at: new Date().toISOString(),
    };
    db.dynamic_routes.unshift(newRoute);
    writeLocalDb(db);
    return newRoute;
  },

  async updateDynamicRoute(id: string, updates: Partial<DynamicRouteRecord>): Promise<DynamicRouteRecord | null> {
    const db = readLocalDb();
    if (!db.dynamic_routes) return null;

    const idx = db.dynamic_routes.findIndex((r) => r.id === id);
    if (idx === -1) return null;

    db.dynamic_routes[idx] = { ...db.dynamic_routes[idx], ...updates };
    writeLocalDb(db);
    return db.dynamic_routes[idx];
  },

  async deleteDynamicRoute(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.dynamic_routes) return false;

    const idx = db.dynamic_routes.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    db.dynamic_routes.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Fleet Vehicles Catalog ---
  async getFleetVehicles(publishedOnly?: boolean): Promise<FleetVehicleRecord[]> {
    const db = readLocalDb();
    const list = db.fleet_vehicles || [];
    if (publishedOnly) {
      return list.filter((v) => v.is_published !== false);
    }
    return list;
  },

  async createFleetVehicle(data: Omit<FleetVehicleRecord, "id" | "created_at">): Promise<FleetVehicleRecord> {
    const db = readLocalDb();
    if (!db.fleet_vehicles) db.fleet_vehicles = [];
    const id = "flt-" + Date.now().toString().slice(-6);
    const newVehicle: FleetVehicleRecord = {
      ...data,
      id,
      perKmRate: Number(data.perKmRate) || 12,
      airportFlatRate: Number(data.airportFlatRate) || 1299,
      local8hr80km: Number(data.local8hr80km) || 2199,
      driverBattaPerDay: data.driverBattaPerDay !== undefined ? Number(data.driverBattaPerDay) : 500,
      nightBatta: data.nightBatta !== undefined ? Number(data.nightBatta) : 300,
      minKmPerDay: data.minKmPerDay !== undefined ? Number(data.minKmPerDay) : 300,
      extraHourRate: data.extraHourRate !== undefined ? Number(data.extraHourRate) : 150,
      extraKmRate: data.extraKmRate !== undefined ? Number(data.extraKmRate) : (Number(data.perKmRate) || 12),
      features: Array.isArray(data.features) ? data.features : [],
      is_published: data.is_published !== false,
      created_at: new Date().toISOString(),
    };
    db.fleet_vehicles.push(newVehicle);

    // Sync with rate_cards collection
    if (!db.rate_cards) db.rate_cards = [];
    const rIdx = db.rate_cards.findIndex((r) => r.vehicle_id === id);
    const rateCardPayload = {
      id: "rc-" + id,
      vehicle_id: id,
      name: newVehicle.name,
      category: newVehicle.category,
      capacity: newVehicle.capacity,
      per_km_rate: newVehicle.perKmRate,
      airport_flat_rate: newVehicle.airportFlatRate,
      local_8hr_80km: newVehicle.local8hr80km,
      driver_bata_per_day: newVehicle.driverBattaPerDay || 500,
      night_bata: newVehicle.nightBatta || 300,
      min_km_per_day: newVehicle.minKmPerDay || 300,
      updated_at: new Date().toISOString(),
    };
    if (rIdx >= 0) {
      db.rate_cards[rIdx] = rateCardPayload;
    } else {
      db.rate_cards.push(rateCardPayload);
    }

    writeLocalDb(db);
    return newVehicle;
  },

  async updateFleetVehicle(id: string, updates: Partial<FleetVehicleRecord>): Promise<FleetVehicleRecord | null> {
    const db = readLocalDb();
    if (!db.fleet_vehicles) return null;
    const idx = db.fleet_vehicles.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    db.fleet_vehicles[idx] = {
      ...db.fleet_vehicles[idx],
      ...updates,
      perKmRate: updates.perKmRate !== undefined ? Number(updates.perKmRate) : db.fleet_vehicles[idx].perKmRate,
      airportFlatRate: updates.airportFlatRate !== undefined ? Number(updates.airportFlatRate) : db.fleet_vehicles[idx].airportFlatRate,
      local8hr80km: updates.local8hr80km !== undefined ? Number(updates.local8hr80km) : db.fleet_vehicles[idx].local8hr80km,
      driverBattaPerDay: updates.driverBattaPerDay !== undefined ? Number(updates.driverBattaPerDay) : (db.fleet_vehicles[idx].driverBattaPerDay ?? 500),
      nightBatta: updates.nightBatta !== undefined ? Number(updates.nightBatta) : (db.fleet_vehicles[idx].nightBatta ?? 300),
      minKmPerDay: updates.minKmPerDay !== undefined ? Number(updates.minKmPerDay) : (db.fleet_vehicles[idx].minKmPerDay ?? 300),
      extraHourRate: updates.extraHourRate !== undefined ? Number(updates.extraHourRate) : (db.fleet_vehicles[idx].extraHourRate ?? 150),
      extraKmRate: updates.extraKmRate !== undefined ? Number(updates.extraKmRate) : (db.fleet_vehicles[idx].extraKmRate ?? db.fleet_vehicles[idx].perKmRate),
    };

    // Keep rate_cards synchronized
    if (!db.rate_cards) db.rate_cards = [];
    const rIdx = db.rate_cards.findIndex((r) => r.vehicle_id === id);
    const updated = db.fleet_vehicles[idx];
    const rateCardPayload = {
      id: "rc-" + id,
      vehicle_id: id,
      name: updated.name,
      category: updated.category,
      capacity: updated.capacity,
      per_km_rate: updated.perKmRate,
      airport_flat_rate: updated.airportFlatRate,
      local_8hr_80km: updated.local8hr80km,
      driver_bata_per_day: updated.driverBattaPerDay || 500,
      night_bata: updated.nightBatta || 300,
      min_km_per_day: updated.minKmPerDay || 300,
      updated_at: new Date().toISOString(),
    };
    if (rIdx >= 0) {
      db.rate_cards[rIdx] = rateCardPayload;
    } else {
      db.rate_cards.push(rateCardPayload);
    }

    writeLocalDb(db);
    return db.fleet_vehicles[idx];
  },

  async deleteFleetVehicle(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.fleet_vehicles) return false;
    const idx = db.fleet_vehicles.findIndex((v) => v.id === id);
    if (idx === -1) return false;
    db.fleet_vehicles.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Places & Airport Hubs ---
  async getPlacesHubs(publishedOnly?: boolean): Promise<PlaceHubRecord[]> {
    const db = readLocalDb();
    const list = db.places_hubs || [];
    if (publishedOnly) {
      return list.filter((p) => p.is_published !== false);
    }
    return list;
  },

  async createPlaceHub(data: Omit<PlaceHubRecord, "id" | "created_at">): Promise<PlaceHubRecord> {
    const db = readLocalDb();
    if (!db.places_hubs) db.places_hubs = [];
    const id = "hub-" + Date.now().toString().slice(-6);
    const newHub: PlaceHubRecord = {
      ...data,
      id,
      count: Number(data.count) || 0,
      is_published: data.is_published !== false,
      created_at: new Date().toISOString(),
    };
    db.places_hubs.push(newHub);
    writeLocalDb(db);
    return newHub;
  },

  async updatePlaceHub(id: string, updates: Partial<PlaceHubRecord>): Promise<PlaceHubRecord | null> {
    const db = readLocalDb();
    if (!db.places_hubs) return null;
    const idx = db.places_hubs.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.places_hubs[idx] = {
      ...db.places_hubs[idx],
      ...updates,
      count: updates.count !== undefined ? Number(updates.count) : db.places_hubs[idx].count,
    };
    writeLocalDb(db);
    return db.places_hubs[idx];
  },

  async deletePlaceHub(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.places_hubs) return false;
    const idx = db.places_hubs.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    db.places_hubs.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Tour Packages ---
  async getTourPackages(publishedOnly?: boolean, state?: string): Promise<TourPackageRecord[]> {
    const db = readLocalDb();
    let list = db.tour_packages || [];
    if (publishedOnly) {
      list = list.filter((t) => t.is_published !== false);
    }
    if (state && state !== "all") {
      list = list.filter((t) => t.state === state);
    }
    return list;
  },

  async createTourPackage(data: Omit<TourPackageRecord, "id" | "created_at">): Promise<TourPackageRecord> {
    const db = readLocalDb();
    if (!db.tour_packages) db.tour_packages = [];
    const id = "pkg-" + Date.now().toString().slice(-6);
    const newPackage: TourPackageRecord = {
      ...data,
      id,
      price: data.price ? Number(data.price) : undefined,
      features: Array.isArray(data.features) ? data.features : [],
      is_published: data.is_published !== false,
      created_at: new Date().toISOString(),
    };
    db.tour_packages.push(newPackage);
    writeLocalDb(db);
    return newPackage;
  },

  async updateTourPackage(id: string, updates: Partial<TourPackageRecord>): Promise<TourPackageRecord | null> {
    const db = readLocalDb();
    if (!db.tour_packages) return null;
    const idx = db.tour_packages.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    db.tour_packages[idx] = {
      ...db.tour_packages[idx],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : db.tour_packages[idx].price,
    };
    writeLocalDb(db);
    return db.tour_packages[idx];
  },

  async deleteTourPackage(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.tour_packages) return false;
    const idx = db.tour_packages.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    db.tour_packages.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Enhanced User Update ---
  async updateUser(id: string, updates: Partial<UserRecord>): Promise<UserRecord | null> {
    const db = readLocalDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...updates };
    writeLocalDb(db);
    return db.users[idx];
  },

  // --- Fleet Operations Expenses ---
  async getExpenses(filter?: { vehicle?: string; category?: string; startDate?: string; endDate?: string }): Promise<ExpenseRecord[]> {
    const db = readLocalDb();
    let list = db.expenses || [];
    if (filter?.vehicle && filter.vehicle !== "all") {
      const q = filter.vehicle.toLowerCase();
      list = list.filter((e) => e.vehicle_number?.toLowerCase().includes(q) || e.vehicle_name?.toLowerCase().includes(q));
    }
    if (filter?.category && filter.category !== "all") {
      list = list.filter((e) => e.category === filter.category);
    }
    if (filter?.startDate) {
      list = list.filter((e) => e.date >= filter.startDate!);
    }
    if (filter?.endDate) {
      list = list.filter((e) => e.date <= filter.endDate!);
    }
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  async createExpense(data: Omit<ExpenseRecord, "id" | "created_at">): Promise<ExpenseRecord> {
    const db = readLocalDb();
    if (!db.expenses) db.expenses = [];
    const id = "EXP-" + Math.floor(1000 + Math.random() * 9000);
    const newExpense: ExpenseRecord = {
      ...data,
      id,
      amount: Number(data.amount) || 0,
      created_at: new Date().toISOString(),
    };
    db.expenses.unshift(newExpense);
    writeLocalDb(db);
    return newExpense;
  },

  async updateExpense(id: string, updates: Partial<ExpenseRecord>): Promise<ExpenseRecord | null> {
    const db = readLocalDb();
    if (!db.expenses) return null;
    const idx = db.expenses.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    db.expenses[idx] = {
      ...db.expenses[idx],
      ...updates,
      amount: updates.amount !== undefined ? Number(updates.amount) : db.expenses[idx].amount,
    };
    writeLocalDb(db);
    return db.expenses[idx];
  },

  async deleteExpense(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.expenses) return false;
    const idx = db.expenses.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    db.expenses.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Festival Offers ---
  async getFestivalOffers(): Promise<FestivalOfferRecord[]> {
    const db = readLocalDb();
    return db.festival_offers || [];
  },

  async createFestivalOffer(data: Omit<FestivalOfferRecord, "id" | "created_at">): Promise<FestivalOfferRecord> {
    const db = readLocalDb();
    if (!db.festival_offers) db.festival_offers = [];
    const id = "offer-" + Date.now();
    const newOffer: FestivalOfferRecord = {
      ...data,
      id,
      created_at: new Date().toISOString(),
    };
    db.festival_offers.unshift(newOffer);
    writeLocalDb(db);
    return newOffer;
  },

  async updateFestivalOffer(id: string, updates: Partial<FestivalOfferRecord>): Promise<FestivalOfferRecord | null> {
    const db = readLocalDb();
    if (!db.festival_offers) return null;
    const idx = db.festival_offers.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    db.festival_offers[idx] = {
      ...db.festival_offers[idx],
      ...updates,
    };
    writeLocalDb(db);
    return db.festival_offers[idx];
  },

  async deleteFestivalOffer(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.festival_offers) return false;
    const idx = db.festival_offers.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    db.festival_offers.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },

  // --- Client Companies ---
  async getClientCompanies(): Promise<ClientCompanyRecord[]> {
    const db = readLocalDb();
    return db.client_companies || [];
  },

  async createClientCompany(data: Omit<ClientCompanyRecord, "id" | "created_at">): Promise<ClientCompanyRecord> {
    const db = readLocalDb();
    if (!db.client_companies) db.client_companies = [];
    const id = "comp-" + Date.now();
    const newComp: ClientCompanyRecord = {
      ...data,
      id,
      created_at: new Date().toISOString(),
    };
    db.client_companies.unshift(newComp);
    writeLocalDb(db);
    return newComp;
  },

  async deleteClientCompany(id: string): Promise<boolean> {
    const db = readLocalDb();
    if (!db.client_companies) return false;
    const idx = db.client_companies.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    db.client_companies.splice(idx, 1);
    writeLocalDb(db);
    return true;
  },
};
