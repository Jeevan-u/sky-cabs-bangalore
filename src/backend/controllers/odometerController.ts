import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetOdometerRecords(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId") || searchParams.get("booking_id");

    const records = await d1Client.getOdometerRecords(bookingId || undefined);
    return apiSuccess({ count: records.length, records });
  } catch (error: any) {
    console.error("GET /api/odometer error:", error);
    return apiError(error.message || "Failed to fetch odometer records.", 500);
  }
}

export async function handleSubmitOdometer(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action,
      booking_id,
      driver_id,
      start_km,
      end_km,
      start_photo_url,
      end_photo_url,
      driver_name,
      vehicle_number,
    } = body;

    if (!booking_id || !driver_id) {
      return apiError("Missing required fields: booking_id, driver_id", 400);
    }

    if (action === "start") {
      if (typeof start_km !== "number" || !start_photo_url) {
        return apiError("Missing start_km number or start_photo_url", 400);
      }
      const record = await d1Client.submitOdometerStart({
        booking_id,
        driver_id,
        driver_name,
        vehicle_number,
        start_km,
        start_photo_url,
      });
      return apiSuccess({ action: "start", record }, 201);
    } else if (action === "end") {
      if (typeof end_km !== "number" || !end_photo_url) {
        return apiError("Missing end_km number or end_photo_url", 400);
      }
      const record = await d1Client.submitOdometerEnd({
        booking_id,
        driver_id,
        end_km,
        end_photo_url,
      });
      if (!record) {
        return apiError("Initial start reading not found for this booking", 404);
      }
      return apiSuccess({ action: "end", record });
    } else {
      return apiError("Invalid action. Must be 'start' or 'end'.", 400);
    }
  } catch (error: any) {
    console.error("POST /api/odometer error:", error);
    return apiError(error.message || "Failed to submit odometer reading.", 500);
  }
}

export async function handleAuditOdometer(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, rejection_reason } = body;

    if (!id || (status !== "Admin_Approved" && status !== "Admin_Rejected")) {
      return apiError("Valid id and status ('Admin_Approved' or 'Admin_Rejected') are required", 400);
    }

    const verified = await d1Client.verifyOdometer(id, status, rejection_reason);
    if (!verified) {
      return apiError("Odometer record not found", 404);
    }

    return apiSuccess({ record: verified });
  } catch (error: any) {
    console.error("PATCH /api/odometer error:", error);
    return apiError(error.message || "Failed to audit odometer record.", 500);
  }
}

export async function handleVerifyCustomerRideOtp(req: NextRequest) {
  try {
    const body = await req.json();
    const { booking_id, otp } = body;

    if (!booking_id || !otp) {
      return apiError("Booking ID and 6-digit OTP are required", 400);
    }

    const result = await d1Client.verifyCustomerRideOtp(booking_id, otp);
    if (!result.success) {
      return apiError(result.message, 400);
    }

    return apiSuccess({ message: result.message, record: result.record });
  } catch (error: any) {
    console.error("POST /api/verify-ride-otp error:", error);
    return apiError(error.message || "Failed to verify OTP", 500);
  }
}
