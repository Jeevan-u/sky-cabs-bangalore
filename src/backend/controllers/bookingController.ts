import { NextRequest } from "next/server";
import { bookingService } from "@/backend/services/bookingService";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetBookings() {
  try {
    const bookings = await bookingService.getAllBookings();
    return apiSuccess({ bookings });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch bookings.", 500);
  }
}

export async function handleCreateBooking(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = body.customer_name || body.customerName;
    const customerPhone = body.customer_phone || body.customerPhone;
    const pickupAddress = body.pickup_address || body.pickupLocation || body.pickupAddress;
    const dropAddress = body.drop_address || body.dropLocation || body.dropAddress;

    if (!customerName || !customerPhone || !pickupAddress || !dropAddress) {
      return apiError("Missing required booking details (Name, Phone, Pickup, Drop).", 400);
    }

    const { booking, whatsappLink } = await bookingService.createBooking({
      customer_name: customerName,
      customer_phone: customerPhone,
      trip_type: body.trip_type || body.tripType || "airport",
      vehicle_type: body.vehicle_type || body.vehicleName || "Toyota Innova Crysta",
      pickup_address: pickupAddress,
      drop_address: dropAddress,
      pickup_datetime: body.pickup_datetime || body.pickupDateTime || new Date().toISOString(),
      estimated_price: Number(body.estimated_price || body.estimatedPrice) || 1999,
      notes: body.notes || "",
    });

    return apiSuccess({ booking, whatsappLink, message: "Booking registered successfully." }, 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to create booking.", 400);
  }
}

export async function handleUpdateBooking(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id || body.bookingId || body.booking_id;
    if (!id) return apiError("Booking ID is required for update.", 400);

    const updates: Record<string, any> = {};
    if (body.status) updates.status = body.status;
    if (body.driverName || body.driver_name) updates.driver_name = body.driverName || body.driver_name;
    if (body.driverPhone || body.driver_phone) updates.driver_phone = body.driverPhone || body.driver_phone;
    if (body.vehicleNumber || body.vehicle_number) updates.vehicle_number = body.vehicleNumber || body.vehicle_number;
    if (body.vehicle_type || body.vehicleName) updates.vehicle_type = body.vehicle_type || body.vehicleName;
    if (body.notes !== undefined) updates.notes = body.notes;

    const updated = await bookingService.updateBooking(id, updates);
    if (!updated) return apiError("Booking not found.", 404);

    return apiSuccess({ booking: updated, message: "Booking updated successfully." });
  } catch (err: any) {
    return apiError(err.message || "Failed to update booking.", 400);
  }
}

export async function handleDeleteBooking(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Booking ID is required.", 400);

    const success = await bookingService.deleteBooking(id);
    if (!success) return apiError("Booking not found.", 404);

    return apiSuccess({ message: "Booking deleted successfully." });
  } catch (err: any) {
    return apiError(err.message || "Failed to delete booking.", 400);
  }
}
