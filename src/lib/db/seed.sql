-- Production Seed Data for Sri Sadhguru Tours & Travels (sadhguru-db)

-- 1. Users & Drivers Roster
INSERT INTO users (id, name, phone, email, password, role, assigned_vehicle, duty_status) VALUES
('usr-owner-rathan', 'Rathan Kanna', '8106117704', 'owner@srisadhgurutoursandtravels.com', 'Sadhguru@2026', 'owner', 'Toyota Innova Crysta (TS 08 UB 4512)', 'Available'),
('usr-drv-shiva', 'K. Shiva Kumar', '9398522128', 'shiva.driver@srisadhguru.com', 'Driver@2026', 'driver', 'Toyota Innova Crysta (TS 08 UB 4512)', 'On Duty'),
('usr-drv-ramesh', 'M. Ramesh', '9848011223', 'ramesh.driver@srisadhguru.com', 'Driver@2026', 'driver', 'Swift Dzire (TS 09 UB 4455)', 'Available'),
('usr-drv-suresh', 'P. Suresh', '9440122334', 'suresh.driver@srisadhguru.com', 'Driver@2026', 'driver', 'Force Tempo Traveller (TS 07 UA 7890)', 'Available'),
('usr-drv-anjaneyulu', 'Ch. Anjaneyulu', '9121334455', 'anjaneyulu@srisadhguru.com', 'Driver@2026', 'driver', 'Maruti Ertiga (TS 08 UC 9988)', 'Available'),
('usr-drv-naresh', 'B. Naresh', '9000112233', 'naresh@srisadhguru.com', 'Driver@2026', 'driver', 'Force Urbania (TS 09 UD 1234)', 'Available');

-- 2. Commercial Fleet Rate Cards
INSERT INTO rate_cards (id, vehicle_id, name, category, capacity, per_km_rate, airport_flat_rate, local_8hr_80km, driver_bata_per_day, night_bata, min_km_per_day) VALUES
('rc-dzire', 'dzire-etios', 'Swift Dzire / Toyota Etios', 'Sedan', '4+1 Passengers', 12.0, 1299.0, 2499.0, 400.0, 300.0, 300.0),
('rc-ertiga', 'ertiga-rumion', 'Maruti Ertiga / Rumion', 'MPV', '6+1 Passengers', 15.0, 1699.0, 3199.0, 400.0, 300.0, 300.0),
('rc-innova', 'innova-crysta', 'Toyota Innova Crysta', 'Luxury SUV', '7+1 / 6+1 Captain Seats', 19.0, 2199.0, 3699.0, 500.0, 350.0, 300.0),
('rc-tt', 'tempo-traveller-17', 'Force Tempo Traveller (12/17s)', 'Mini Bus', '12 to 17 Passengers', 25.0, 3499.0, 4999.0, 600.0, 400.0, 350.0),
('rc-urbania', 'force-urbania', 'Force Urbania & 26s TT', 'Executive Van', '20 to 26 Passengers', 32.0, 4899.0, 7499.0, 700.0, 500.0, 350.0),
('rc-bus', 'luxury-coach-bus', 'Luxury AC Coach / Bus', 'Luxury Coach', '32 to 50 Passengers', 48.0, 6999.0, 11999.0, 1000.0, 600.0, 400.0);

-- 3. Initial Active & Completed Bookings
INSERT INTO bookings (id, customer_name, customer_phone, trip_type, vehicle_type, pickup_address, drop_address, pickup_datetime, estimated_price, status, driver_name, driver_phone, vehicle_number, notes) VALUES
('BK-1001', 'Venkat Rao', '9848012345', 'airport', 'Swift Dzire (4+1 Passengers)', 'Kukatpally Phase 3, Hyderabad', 'Shamshabad Airport (RGIA)', '2026-11-20T06:00:00', 1299.0, 'Completed', 'M. Ramesh', '9848011223', 'TS 09 UB 4455', 'Early morning flight drop, on-time guaranteed.'),
('BK-1002', 'Sunitha Reddy', '9849056789', 'outstation', 'Toyota Innova Crysta (7+1 Captain Seats)', 'KPHB Colony Phase 4, Hyderabad', 'Srisailam Mallikarjuna Temple', '2026-11-20T08:30:00', 6500.0, 'In Progress', 'K. Shiva Kumar', '9398522128', 'TS 08 UB 4512', 'Family temple pilgrimage yatra with ghat road clearance.'),
('BK-1003', 'Dr. Anand Kumar', '9988776655', 'local', 'Maruti Ertiga (6+1 Passengers)', 'Hitec City Mindspace, Hyderabad', 'Local Hyderabad City Travel (8h/80km)', '2026-11-21T09:00:00', 3199.0, 'Confirmed', 'Ch. Anjaneyulu', '9121334455', 'TS 08 UC 9988', 'Corporate client site visits across Financial District.');

-- 4. Digital Duty Slips
INSERT INTO duty_slips (id, booking_id, customer_name, customer_phone, driver_name, vehicle_number, vehicle_model, trip_route, start_km, end_km, total_km, toll_parking, driver_bata, total_amount, signature_data_url, status) VALUES
('DS-9001', 'BK-1001', 'Venkat Rao', '9848012345', 'M. Ramesh', 'TS 09 UB 4455', 'Swift Dzire', 'Kukatpally Phase 3 to Shamshabad Airport', 42100.0, 42148.0, 48.0, 150.0, 0.0, 1449.0, 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiPjxwYXRoIGQ9Ik0xMCAyMCBRIDI1IDUgNDAgMjAgVCA3MCAyMCIgc3Ryb2tlPSIjM2I4MmY2IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=', 'Auto_Approved'),
('DS-9002', 'BK-1002', 'Sunitha Reddy', '9849056789', 'K. Shiva Kumar', 'TS 08 UB 4512', 'Toyota Innova Crysta', 'KPHB Colony to Srisailam Temple Ghats', 68400.0, 68850.0, 450.0, 320.0, 500.0, 9370.0, 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiPjxwYXRoIGQ9Ik0xMCAyMCBRIDI1IDUgNDAgMjAgVCA3MCAyMCIgc3Ryb2tlPSIjM2I4MmY2IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=', 'Auto_Approved');

-- 5. Odometer Auto-Approved Audit Log
INSERT INTO odometer_records (id, booking_id, driver_id, driver_name, vehicle_number, start_km, end_km, total_km, status, customer_otp_verified) VALUES
('ODO-8001', 'BK-1001', 'usr-drv-ramesh', 'M. Ramesh', 'TS 09 UB 4455', 42100.0, 42148.0, 48.0, 'Auto_Approved', 1),
('ODO-8002', 'BK-1002', 'usr-drv-shiva', 'K. Shiva Kumar', 'TS 08 UB 4512', 68400.0, 68850.0, 450.0, 'Auto_Approved', 1);

-- 6. Customer Reviews
INSERT INTO reviews (id, booking_id, customer_name, customer_phone, overall_rating, driver_rating, cleanliness_rating, comfort_rating, generated_review_text, is_positive_google_review, feedback_notes) VALUES
('REV-501', 'BK-1001', 'Venkat Rao', '9848012345', 5, 5, 5, 5, 'Exceptional early morning airport cab service! Driver Ramesh arrived 15 minutes before time at Kukatpally. Car was spotless clean and AC was freezing cold.', 1, 'Highly recommended for airport transfers.'),
('REV-502', 'BK-1002', 'Sunitha Reddy', '9849056789', 5, 5, 5, 5, 'Wonderful family pilgrimage trip to Srisailam! Driver Shiva Kumar drove exceptionally safe on the ghat road curves. Innova Crysta was luxurious and spacious.', 1, 'Best travel agency in Hyderabad.');

-- 7. Festival Offers & Promotional Banners
INSERT INTO festival_offers (id, title, festival_name, discount_text, code, valid_dates, fleet_applicable, image_url, description, is_active) VALUES
('fest-sankranti', 'Makar Sankranti Village Yatra Special', 'Makar Sankranti', 'Flat ₹500 OFF on Outstation Booking', 'SANKRANTI500', '10 Jan – 20 Jan', 'Innova Crysta, Tempo Traveller & Ertiga', '/images/sri-sadhguru-travels-banner.jpg', 'Head home to Andhra & Telangana villages with your complete family in luxury sanitized AC vehicles. No surge pricing.', 1),
('fest-shiva', 'Maha Shivaratri Srisailam Jyotirlinga Yatra', 'Maha Shivaratri', 'Flat 10% OFF Pilgrimage Packages', 'SHIVARATRI10', '15 Feb – 28 Feb', 'Innova Crysta & 17s Tempo Traveller', '/images/srisailam-dam.jpg', 'Experience divine Jyotirlinga Darshan at Srisailam Mallikarjuna Swamy with senior ghat-road certified chauffeurs.', 1),
('fest-ugadi', 'Ugadi Telugu New Year Mega Festive Drive', 'Ugadi Festival', 'Flat ₹750 OFF on 2+ Days Outstation', 'UGADI2026', '18 Mar – 31 Mar', 'All Fleet (Sedan, MPV, SUV, Buses)', '/images/fleet/innova-crysta.jpg', 'Celebrate Telugu New Year with peaceful doorstep family road trips across Andhra Pradesh and Telangana.', 1),
('fest-airport', 'Shamshabad Airport Fixed Rate Non-Surge Guarantee', 'Airport Special', 'Flat ₹1,299 Starting Sedan Fare', 'AIRPORTFIX', 'All Year Active (24x7)', 'Swift Dzire, Ertiga, Innova Crysta', '/images/Airport-cabs.jpg', 'Guaranteed on-time doorstep pickup from Kukatpally, KPHB, Miyapur, and Hitec City to RGIA Shamshabad Airport.', 1);

-- 8. Client Companies We Have Served
INSERT INTO client_companies (id, name, industry, location, logo_text, accent_color, is_active) VALUES
('comp-tcs', 'Tata Consultancy Services', 'Information Technology', 'Adibatla & Gachibowli Campus', 'TCS', '#0288d1', 1),
('comp-infosys', 'Infosys Technologies', 'Information Technology', 'Pocharam & Gachibowli SEZ', 'INFY', '#0070ad', 1),
('comp-drreddy', 'Dr. Reddy''s Laboratories', 'Pharmaceuticals', 'Bachupally & Miyapur Hub', 'DRL', '#e53935', 1),
('comp-aurobindo', 'Aurobindo Pharma', 'Pharmaceuticals', 'HITEC City & Kazipally Unit', 'AURO', '#2e7d32', 1),
('comp-techm', 'Tech Mahindra', 'Information Technology', 'Hitec City & Bahadurpally Campus', 'TECHM', '#d32f2f', 1),
('comp-hetero', 'Hetero Drugs', 'Pharmaceuticals', 'Sanathnagar & Kukatpally Corridors', 'HETERO', '#f57c00', 1);
