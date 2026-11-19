-- Cloudflare D1 / SQLite Database Schema for Sri Sadhguru Tours & Travels

-- 1. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  trip_type TEXT NOT NULL CHECK(trip_type IN ('airport', 'outstation', 'local', 'pilgrimage', 'wedding')),
  vehicle_type TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  drop_address TEXT NOT NULL,
  pickup_datetime TEXT NOT NULL,
  estimated_price REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'Confirmed', 'Driver Assigned', 'In Progress', 'Completed', 'Cancelled')),
  driver_name TEXT,
  driver_phone TEXT,
  vehicle_number TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Digital Duty Slips Table
CREATE TABLE IF NOT EXISTS duty_slips (
  id TEXT PRIMARY KEY,
  booking_id TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  driver_name TEXT NOT NULL,
  vehicle_number TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  trip_route TEXT NOT NULL,
  start_km REAL NOT NULL,
  end_km REAL NOT NULL,
  total_km REAL NOT NULL,
  toll_parking REAL DEFAULT 0,
  driver_bata REAL DEFAULT 0,
  total_amount REAL NOT NULL,
  signature_data_url TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 3. Customer Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  booking_id TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  overall_rating INTEGER NOT NULL CHECK(overall_rating BETWEEN 1 AND 5),
  driver_rating INTEGER,
  cleanliness_rating INTEGER,
  comfort_rating INTEGER,
  generated_review_text TEXT,
  is_positive_google_review INTEGER DEFAULT 1,
  feedback_notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 4. Users & Drivers Roster Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('owner', 'driver', 'customer')),
  assigned_vehicle TEXT,
  duty_status TEXT DEFAULT 'Available' CHECK(duty_status IN ('Available', 'On Duty', 'Off Duty')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5. Fleet Rate Cards Table
CREATE TABLE IF NOT EXISTS rate_cards (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  capacity TEXT NOT NULL,
  per_km_rate REAL NOT NULL,
  airport_flat_rate REAL NOT NULL,
  local_8hr_80km REAL NOT NULL,
  driver_bata_per_day REAL NOT NULL,
  night_bata REAL NOT NULL,
  min_km_per_day REAL NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
