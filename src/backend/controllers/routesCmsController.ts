import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetRoutesCms(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const routes = await d1Client.getDynamicRoutes(category || undefined);
    return apiSuccess({ count: routes.length, routes });
  } catch (error: any) {
    console.error("GET /api/routes-cms error:", error);
    return apiError(error.message || "Failed to fetch routes CMS.", 500);
  }
}

export async function handleCreateRouteCms(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, from_location, to_location, category, distance_km, sedan_price, suv_price, tt_price, is_published, description } = body;

    if (!title || !from_location || !to_location) {
      return apiError("Missing required fields: title, from_location, to_location", 400);
    }

    const route = await d1Client.createDynamicRoute({
      title,
      from_location,
      to_location,
      category: category || "outstation_route",
      distance_km: Number(distance_km) || 100,
      sedan_price: Number(sedan_price) || 2000,
      suv_price: Number(suv_price) || 3000,
      tt_price: Number(tt_price) || 5000,
      is_published: is_published !== false,
      description: description || "",
    });

    return apiSuccess({ route }, 201);
  } catch (error: any) {
    console.error("POST /api/routes-cms error:", error);
    return apiError(error.message || "Failed to create CMS route.", 500);
  }
}

export async function handleUpdateRouteCms(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) return apiError("Route ID is required", 400);

    const updated = await d1Client.updateDynamicRoute(id, updates);
    if (!updated) return apiError("Route not found", 404);

    return apiSuccess({ route: updated });
  } catch (error: any) {
    console.error("PATCH /api/routes-cms error:", error);
    return apiError(error.message || "Failed to update CMS route.", 500);
  }
}

export async function handleDeleteRouteCms(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("Route ID required", 400);

    const deleted = await d1Client.deleteDynamicRoute(id);
    if (!deleted) return apiError("Route not found", 404);

    return apiSuccess({ message: "Route deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/routes-cms error:", error);
    return apiError(error.message || "Failed to delete CMS route.", 500);
  }
}
