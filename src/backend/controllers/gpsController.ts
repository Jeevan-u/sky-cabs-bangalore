import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetGpsLocations() {
  try {
    const pings = await d1Client.getLatestGpsPings();
    return apiSuccess({ count: pings.length, pings });
  } catch (error: any) {
    console.error("GET /api/gps error:", error);
    return apiError(error.message || "Failed to fetch GPS locations.", 500);
  }
}

export async function handleRecordGpsPing(req: NextRequest) {
  try {
    const body = await req.json();
    const { booking_id, driver_id, driver_name, vehicle_number, latitude, longitude, speed, heading } = body;

    if (!driver_id || typeof latitude !== "number" || typeof longitude !== "number") {
      return apiError("Missing required fields: driver_id, latitude, longitude", 400);
    }

    const ping = await d1Client.saveGpsPing({
      booking_id: booking_id || "",
      driver_id,
      driver_name: driver_name || "Assigned Chauffeur",
      vehicle_number: vehicle_number || "Commercial Vehicle",
      latitude,
      longitude,
      speed: speed || 0,
      heading: heading || 0,
    });

    return apiSuccess({ ping }, 201);
  } catch (error: any) {
    console.error("POST /api/gps error:", error);
    return apiError(error.message || "Failed to record GPS telemetry.", 500);
  }
}
