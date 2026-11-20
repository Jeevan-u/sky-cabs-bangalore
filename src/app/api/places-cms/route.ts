import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") === "true";
    const hubs = await d1Client.getPlacesHubs(publishedOnly);
    return apiSuccess({ count: hubs.length, hubs });
  } catch (error: any) {
    console.error("GET /api/places-cms error:", error);
    return apiError(error.message || "Failed to fetch places & operational hubs.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, href, count, thumbnail, is_published } = body;

    if (!name) {
      return apiError("Missing required field: name is required.", 400);
    }

    const hub = await d1Client.createPlaceHub({
      name: name.trim(),
      href: href?.trim() || "/shamshabad-airport-taxi",
      count: Number(count) || 100,
      thumbnail: thumbnail?.trim() || "/images/hubs/shamshabad-airport.jpg",
      is_published: is_published !== false,
    });

    return apiSuccess({ hub }, 201);
  } catch (error: any) {
    console.error("POST /api/places-cms error:", error);
    return apiError(error.message || "Failed to create operational hub.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) return apiError("Hub ID is required.", 400);

    const updated = await d1Client.updatePlaceHub(id, updates);
    if (!updated) return apiError("Operational hub not found.", 404);

    return apiSuccess({ hub: updated });
  } catch (error: any) {
    console.error("PATCH /api/places-cms error:", error);
    return apiError(error.message || "Failed to update operational hub.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("Hub ID is required.", 400);

    const deleted = await d1Client.deletePlaceHub(id);
    if (!deleted) return apiError("Operational hub not found.", 404);

    return apiSuccess({ message: "Operational hub deleted successfully." });
  } catch (error: any) {
    console.error("DELETE /api/places-cms error:", error);
    return apiError(error.message || "Failed to delete operational hub.", 500);
  }
}
