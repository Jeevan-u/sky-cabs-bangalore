export interface BookingItem {
  id: string;
  customerName: string;
  customerPhone: string;
  tripType: "airport" | "outstation" | "local";
  vehicleId: string;
  vehicleName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDateTime: string;
  flightNumber?: string;
  returnDate?: string;
  estimatedPrice: number;
  status: "Pending" | "Confirmed" | "Driver Assigned" | "In Progress" | "Completed" | "Cancelled";
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  startKm?: number;
  endKm?: number;
  totalKm?: number;
  customerSignature?: string;
  reviewStatus?: "Not Sent" | "Sent" | "Submitted";
  reviewScore?: number;
  reviewText?: string;
  createdAt: string;
}

export const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: "SSG-101",
    customerName: "Suresh Reddy",
    customerPhone: "9849012345",
    tripType: "airport",
    vehicleId: "innova-crysta",
    vehicleName: "Toyota Innova Crysta",
    pickupLocation: "KPHB Phase 1, Hyderabad",
    dropLocation: "Shamshabad RGI Airport (HYD)",
    pickupDateTime: "2026-11-18T05:30",
    flightNumber: "6E-512",
    estimatedPrice: 2199,
    status: "Confirmed",
    driverName: "K. Shiva Kumar",
    driverPhone: "9948011223",
    vehicleNumber: "TS 08 UB 4512",
    createdAt: "2026-11-17T14:20:00.000Z",
  },
  {
    id: "SSG-102",
    customerName: "Venkata Rao",
    customerPhone: "9121045678",
    tripType: "outstation",
    vehicleId: "tempo-traveller-12",
    vehicleName: "Force Tempo Traveller (12 Seater)",
    pickupLocation: "Kukatpally Housing Board",
    dropLocation: "Srisailam Temple & Return",
    pickupDateTime: "2026-11-19T06:00",
    returnDate: "2026-11-20T21:00",
    estimatedPrice: 16500,
    status: "Driver Assigned",
    driverName: "M. Ramesh",
    driverPhone: "8885544332",
    vehicleNumber: "TS 07 UA 9821",
    createdAt: "2026-11-17T11:00:00.000Z",
  },
  {
    id: "SSG-103",
    customerName: "Praveen Kumar",
    customerPhone: "8008123999",
    tripType: "local",
    vehicleId: "ertiga-rumion",
    vehicleName: "Maruti Ertiga (6+1)",
    pickupLocation: "Miyapur Metro Station",
    dropLocation: "Hitec City / Financial District (8hr/80km)",
    pickupDateTime: "2026-11-17T09:00",
    estimatedPrice: 2899,
    status: "Completed",
    driverName: "B. Narsing Rao",
    driverPhone: "9440123490",
    vehicleNumber: "TS 09 EA 3311",
    startKm: 42100,
    endKm: 42188,
    totalKm: 88,
    reviewStatus: "Submitted",
    reviewScore: 5,
    reviewText: "Excellent service from Sri Sadhguru Travels! Driver Narsing Rao was very polite, reached Miyapur 10 mins before time, and the cab was crystal clean. Will definitely book again for family trips.",
    createdAt: "2026-11-17T08:00:00.000Z",
  },
  {
    id: "SSG-104",
    customerName: "Ananya Sharma",
    customerPhone: "9700012344",
    tripType: "airport",
    vehicleId: "dzire-etios",
    vehicleName: "Swift Dzire",
    pickupLocation: "Hitec City Cyber Towers",
    dropLocation: "Shamshabad RGI Airport",
    pickupDateTime: "2026-11-17T17:30",
    estimatedPrice: 1299,
    status: "Completed",
    driverName: "V. Ravi",
    driverPhone: "9000123891",
    vehicleNumber: "TS 08 FA 7761",
    startKm: 18500,
    endKm: 18542,
    totalKm: 42,
    reviewStatus: "Sent",
    createdAt: "2026-11-17T15:00:00.000Z",
  },
];

// Global in-memory cache for development sessions
declare global {
  // eslint-disable-next-line no-var
  var __sadhguruBookings: BookingItem[] | undefined;
}

if (!global.__sadhguruBookings) {
  global.__sadhguruBookings = [...INITIAL_BOOKINGS];
}

export const getBookings = (): BookingItem[] => {
  return global.__sadhguruBookings || [...INITIAL_BOOKINGS];
};

export const addBooking = (booking: Omit<BookingItem, "id" | "createdAt" | "status">): BookingItem => {
  const current = getBookings();
  const newId = `SSG-${100 + current.length + 1}`;
  const newBooking: BookingItem = {
    ...booking,
    id: newId,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  current.unshift(newBooking);
  global.__sadhguruBookings = current;
  return newBooking;
};

export const updateBooking = (id: string, updates: Partial<BookingItem>): BookingItem | null => {
  const current = getBookings();
  const index = current.findIndex((b) => b.id === id);
  if (index === -1) return null;
  current[index] = { ...current[index], ...updates };
  global.__sadhguruBookings = current;
  return current[index];
};
