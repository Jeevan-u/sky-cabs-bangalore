import { d1Client } from "@/backend/db/d1Client";
import { whatsappService } from "@/backend/services/whatsappService";
import { BookingRecord } from "@/backend/types";

export const bookingService = {
  async getAllBookings(): Promise<BookingRecord[]> {
    return d1Client.getBookings();
  },

  async createBooking(data: Partial<BookingRecord>): Promise<{ booking: BookingRecord; whatsappLink: string }> {
    const booking = await d1Client.createBooking({
      customer_name: data.customer_name || "Valued Customer",
      customer_phone: data.customer_phone || "",
      trip_type: data.trip_type || "airport",
      vehicle_type: data.vehicle_type || "Toyota Innova Crysta",
      pickup_address: data.pickup_address || "Kukatpally, Hyderabad",
      drop_address: data.drop_address || "Shamshabad Airport",
      pickup_datetime: data.pickup_datetime || new Date().toISOString(),
      estimated_price: data.estimated_price || 1999,
      status: "Pending",
      notes: data.notes || "",
    });

    const whatsappLink = whatsappService.getBookingConfirmationLink({
      bookingId: booking.id,
      customerName: booking.customer_name,
      customerPhone: booking.customer_phone,
      vehicleType: booking.vehicle_type,
      tripType: booking.trip_type,
      pickupAddress: booking.pickup_address,
      dropAddress: booking.drop_address,
      pickupDatetime: booking.pickup_datetime,
      estimatedPrice: booking.estimated_price,
      notes: booking.notes,
    });

    return { booking, whatsappLink };
  },

  async updateBooking(id: string, updates: Partial<BookingRecord>) {
    return d1Client.updateBooking(id, updates);
  },

  async updateBookingStatus(id: string, status: BookingRecord["status"]) {
    return d1Client.updateBooking(id, { status });
  },

  async deleteBooking(id: string) {
    return d1Client.deleteBooking(id);
  },
};
