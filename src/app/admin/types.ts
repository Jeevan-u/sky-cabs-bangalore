export type AdminTabType =
  | "overview"
  | "dispatch"
  | "odometer"
  | "gps"
  | "quotations"
  | "tours_cms"
  | "places_cms"
  | "routes_cms"
  | "fleet_catalog"
  | "dutyslips"
  | "drivers"
  | "fleet"
  | "expenses"
  | "rates"
  | "reviews"
  | "analytics";

export interface ExpenseItem {
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
    | "Miscellaneous"
    | string;
  amount: number;
  payment_mode: "FASTag Wallet" | "Cash" | "UPI / GPay" | "Company Card" | "Bank Transfer" | string;
  receipt_url?: string;
  notes?: string;
  status: "Paid" | "Pending Approval" | "Reimbursed" | string;
  created_at?: string;
}

export interface FleetVehicleItem {
  id: string;
  name: string;
  category: "Sedan" | "SUV" | "Premium SUV" | "Tempo Traveller" | "Luxury Coach" | string;
  capacity: string;
  luggage: string;
  ac: boolean;
  image: string;
  perKmRate: number;
  airportFlatRate: number;
  local8hr80km: number;
  features: string[];
  description: string;
  bestFor: string;
  is_published: boolean;
  created_at?: string;
}

export interface PlaceHubItem {
  id: string;
  name: string;
  href: string;
  count: number;
  thumbnail: string;
  is_published: boolean;
  created_at?: string;
}

export interface TourPackageItem {
  id: string;
  name: string;
  tagline: string;
  state: "Andhra Pradesh" | "Karnataka" | "Tamil Nadu" | "Kerala" | "Telangana" | string;
  image: string;
  dist: string;
  days: string;
  price?: number;
  features?: string[];
  is_published: boolean;
  created_at?: string;
}

export interface BookingItem {
  id: string;
  customerName: string;
  customerPhone: string;
  tripType: "airport" | "outstation" | "local" | "pilgrimage" | "wedding" | string;
  vehicleId: string;
  vehicleName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  estimatedPrice: number;
  status: "Pending" | "Confirmed" | "Driver Assigned" | "In Progress" | "Completed" | "Cancelled";
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  notes?: string;
  createdAt: string;
}

export interface DutySlipItem {
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

export interface DriverUserItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "owner" | "driver" | "admin";
  assigned_vehicle?: string;
  duty_status?: "Available" | "On Duty" | "Off Duty";
  created_at?: string;
}

export interface ReviewItem {
  id: string;
  booking_id?: string;
  customer_name: string;
  customer_phone: string;
  overall_rating: number;
  driver_rating?: number;
  cleanliness_rating?: number;
  comfort_rating?: number;
  feedback_notes?: string;
  created_at?: string;
}

export interface RateCardItem {
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
