import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") === "true";
    const state = searchParams.get("state") || undefined;
    const packages = await d1Client.getTourPackages(publishedOnly, state);
    return apiSuccess({ count: packages.length, packages });
  } catch (error: any) {
    console.error("GET /api/tours-cms error:", error);
    return apiError(error.message || "Failed to fetch tour packages.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, tagline, state, image, dist, days, price, features, is_published } = body;

    if (!name || !tagline || !state) {
      return apiError("Missing required fields: name, tagline, and state are required.", 400);
    }

    const pkg = await d1Client.createTourPackage({
      name: name.trim(),
      tagline: tagline.trim(),
      state,
      image: image?.trim() || "/images/srisailam-dam.jpg",
      dist: dist?.trim() || "250 KM",
      days: days?.trim() || "1-2 Days",
      price: price ? Number(price) : undefined,
      features: Array.isArray(features) ? features : ["Clean Sanitized AC Cab", "Experienced Highway Chauffeur"],
      is_published: is_published !== false,
    });

    return apiSuccess({ package: pkg }, 201);
  } catch (error: any) {
    console.error("POST /api/tours-cms error:", error);
    return apiError(error.message || "Failed to create tour package.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) return apiError("Package ID is required.", 400);

    const updated = await d1Client.updateTourPackage(id, updates);
    if (!updated) return apiError("Tour package not found.", 404);

    return apiSuccess({ package: updated });
  } catch (error: any) {
    console.error("PATCH /api/tours-cms error:", error);
    return apiError(error.message || "Failed to update tour package.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("Package ID is required.", 400);

    const deleted = await d1Client.deleteTourPackage(id);
    if (!deleted) return apiError("Tour package not found.", 404);

    return apiSuccess({ message: "Tour package deleted successfully." });
  } catch (error: any) {
    console.error("DELETE /api/tours-cms error:", error);
    return apiError(error.message || "Failed to delete tour package.", 500);
  }
}
