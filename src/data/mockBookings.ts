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
    id: "SCB-101",
    customerName: "Suresh Rao",
    customerPhone: "9849012345",
    tripType: "airport",
    vehicleId: "innova-crysta",
    vehicleName: "Toyota Innova Crysta",
    pickupLocation: "Whitefield, Bengaluru",
    dropLocation: "Kempegowda International Airport (BLR), Devanahalli",
    pickupDateTime: "2026-11-18T05:30",
    flightNumber: "6E-512",
    estimatedPrice: 2499,
    status: "Confirmed",
    driverName: "K. Shiva Kumar",
    driverPhone: "9948011223",
    vehicleNumber: "KA 01 MN 4512",
    createdAt: "2026-11-17T14:20:00.000Z",
  },
  {
    id: "SCB-102",
    customerName: "Venkata Rao",
    customerPhone: "9121045678",
    tripType: "outstation",
    vehicleId: "tempo-traveller-12",
    vehicleName: "Tempo Traveller (12+1 Seater)",
    pickupLocation: "Electronic City, Bengaluru",
    dropLocation: "Mysuru Palace & Return",
    pickupDateTime: "2026-11-19T06:00",
    returnDate: "2026-11-20T21:00",
    estimatedPrice: 12500,
    status: "Driver Assigned",
    driverName: "M. Ramesh",
    driverPhone: "8885544332",
    vehicleNumber: "KA 03 TC 9821",
    createdAt: "2026-11-17T11:00:00.000Z",
  },
  {
    id: "SCB-103",
    customerName: "Praveen Kumar",
    customerPhone: "8008123999",
    tripType: "local",
    vehicleId: "ertiga",
    vehicleName: "Maruti Suzuki Ertiga",
    pickupLocation: "Koramangala, Bengaluru",
    dropLocation: "Indiranagar & HSR Layout (8hr/80km)",
    pickupDateTime: "2026-11-17T09:00",
    estimatedPrice: 2999,
    status: "Completed",
    driverName: "B. Narsing Rao",
    driverPhone: "9440123490",
    vehicleNumber: "KA 09 EA 3311",
    startKm: 42100,
    endKm: 42188,
    totalKm: 88,
    reviewStatus: "Submitted",
    reviewScore: 5,
    reviewText: "Excellent service from Sky Cabs Bangalore! The driver was very polite, reached Koramangala 10 minutes before time, and the cab was spotless. Will definitely book again for family trips.",
    createdAt: "2026-11-17T08:00:00.000Z",
  },
  {
    id: "SCB-104",
    customerName: "Ananya Sharma",
    customerPhone: "9700012344",
    tripType: "airport",
    vehicleId: "prime-sedan",
    vehicleName: "Prime Sedan",
    pickupLocation: "Jayanagar, Bengaluru",
    dropLocation: "Kempegowda International Airport (BLR), Devanahalli",
    pickupDateTime: "2026-11-17T17:30",
    estimatedPrice: 1399,
    status: "Completed",
    driverName: "V. Ravi",
    driverPhone: "9000123891",
    vehicleNumber: "KA 05 FA 7761",
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
  var __skyCabsBangaloreBookings: BookingItem[] | undefined;
}

if (!global.__skyCabsBangaloreBookings) {
  global.__skyCabsBangaloreBookings = [...INITIAL_BOOKINGS];
}

export const getBookings = (): BookingItem[] => {
  return global.__skyCabsBangaloreBookings || [...INITIAL_BOOKINGS];
};

export const addBooking = (booking: Omit<BookingItem, "id" | "createdAt" | "status">): BookingItem => {
  const current = getBookings();
  const newId = `SCB-${100 + current.length + 1}`;
  const newBooking: BookingItem = {
    ...booking,
    id: newId,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  current.unshift(newBooking);
  global.__skyCabsBangaloreBookings = current;
  return newBooking;
};

export const updateBooking = (id: string, updates: Partial<BookingItem>): BookingItem | null => {
  const current = getBookings();
  const index = current.findIndex((b) => b.id === id);
  if (index === -1) return null;
  current[index] = { ...current[index], ...updates };
  global.__skyCabsBangaloreBookings = current;
  return current[index];
};
