-- Cloudflare D1 / SQLite Database Schema for Sri Sadhguru Tours & Travels

-- 1. Reset / Clear existing tables for fresh initialization
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS duty_slips;
DROP TABLE IF EXISTS odometer_records;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rate_cards;
DROP TABLE IF EXISTS festival_offers;
DROP TABLE IF EXISTS client_companies;

-- 2. Users & Drivers Roster Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('owner', 'driver', 'customer', 'admin')),
  assigned_vehicle TEXT,
  duty_status TEXT DEFAULT 'Available' CHECK(duty_status IN ('Available', 'On Duty', 'Off Duty')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Commercial Fleet Rate Cards Table
CREATE TABLE rate_cards (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  capacity TEXT NOT NULL,
  per_km_rate REAL NOT NULL,
  airport_flat_rate REAL NOT NULL,
  local_8hr_80km REAL NOT NULL,
  driver_bata_per_day REAL NOT NULL DEFAULT 400,
  night_bata REAL NOT NULL DEFAULT 300,
  min_km_per_day REAL NOT NULL DEFAULT 300,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Bookings Table
CREATE TABLE bookings (
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

-- 5. Digital Duty Slips Table
CREATE TABLE duty_slips (
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
  signature_data_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Auto_Approved' CHECK(status IN ('Auto_Approved', 'Approved', 'Pending')),
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 6. Odometer Audit & Auto-Verified Mileage Log (No image storage needed)
CREATE TABLE odometer_records (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  driver_id TEXT,
  driver_name TEXT NOT NULL,
  vehicle_number TEXT NOT NULL,
  start_km REAL NOT NULL,
  end_km REAL DEFAULT 0,
  total_km REAL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Auto_Approved' CHECK(status IN ('Dispatched', 'Auto_Approved', 'Customer_Confirmed')),
  customer_otp_verified INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

-- 7. Customer Reviews Table
CREATE TABLE reviews (
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

-- 8. Festival Offers & Promotional Banners Table
CREATE TABLE festival_offers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  festival_name TEXT NOT NULL,
  discount_text TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  valid_dates TEXT NOT NULL,
  fleet_applicable TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 9. Client Companies Marquee Table
CREATE TABLE client_companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  logo_text TEXT NOT NULL,
  accent_color TEXT NOT NULL DEFAULT '#0288d1',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
