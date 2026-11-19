export type AdminTabType =
  | "overview"
  | "dispatch"
  | "odometer"
  | "gps"
  | "quotations"
  | "routes_cms"
  | "dutyslips"
  | "fleet"
  | "rates"
  | "reviews"
  | "analytics";

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
