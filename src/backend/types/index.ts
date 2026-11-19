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
  feedback_notes?: string;
  created_at?: string;
}

export interface UserRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "owner" | "driver" | "admin" | "customer";
  password?: string;
  password_hash?: string;
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

