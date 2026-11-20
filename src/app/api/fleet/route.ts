import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") === "true";
    const vehicles = await d1Client.getFleetVehicles(publishedOnly);
    return apiSuccess({ count: vehicles.length, vehicles });
  } catch (error: any) {
    console.error("GET /api/fleet error:", error);
    return apiError(error.message || "Failed to fetch fleet vehicles.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      category,
      capacity,
      luggage,
      ac,
      image,
      perKmRate,
      airportFlatRate,
      local8hr80km,
      driverBattaPerDay,
      nightBatta,
      minKmPerDay,
      extraHourRate,
      extraKmRate,
      features,
      description,
      bestFor,
      is_published,
    } = body;

    if (!name || !category) {
      return apiError("Missing required fields: name and category are required.", 400);
    }

    const vehicle = await d1Client.createFleetVehicle({
      name: name.trim(),
      category,
      capacity: capacity || "4+1 Passenger",
      luggage: luggage || "2 Large Bags",
      ac: ac !== false,
      image: image || "/images/fleet/swift-dzire.jpg",
      perKmRate: Number(perKmRate) || 12,
      airportFlatRate: Number(airportFlatRate) || 1299,
      local8hr80km: Number(local8hr80km) || 2199,
      driverBattaPerDay: driverBattaPerDay !== undefined ? Number(driverBattaPerDay) : 500,
      nightBatta: nightBatta !== undefined ? Number(nightBatta) : 300,
      minKmPerDay: minKmPerDay !== undefined ? Number(minKmPerDay) : 300,
      extraHourRate: extraHourRate !== undefined ? Number(extraHourRate) : 150,
      extraKmRate: extraKmRate !== undefined ? Number(extraKmRate) : (Number(perKmRate) || 12),
      features: Array.isArray(features) ? features : ["Clean & Sanitized", "Fastag Enabled", "Dual AC"],
      description: description || "Pristine maintained commercial vehicle with commercial transport permit.",
      bestFor: bestFor || "Airport Drops, Local & Outstation Journeys",
      is_published: is_published !== false,
    });

    return apiSuccess({ vehicle }, 201);
  } catch (error: any) {
    console.error("POST /api/fleet error:", error);
    return apiError(error.message || "Failed to create fleet vehicle.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) return apiError("Vehicle ID is required.", 400);

    const updated = await d1Client.updateFleetVehicle(id, updates);
    if (!updated) return apiError("Vehicle not found.", 404);

    return apiSuccess({ vehicle: updated });
  } catch (error: any) {
    console.error("PATCH /api/fleet error:", error);
    return apiError(error.message || "Failed to update fleet vehicle.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("Vehicle ID is required.", 400);

    const deleted = await d1Client.deleteFleetVehicle(id);
    if (!deleted) return apiError("Vehicle not found.", 404);

    return apiSuccess({ message: "Vehicle deleted successfully." });
  } catch (error: any) {
    console.error("DELETE /api/fleet error:", error);
    return apiError(error.message || "Failed to delete fleet vehicle.", 500);
  }
}
