import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetQuotations() {
  try {
    const quotations = await d1Client.getQuotations();
    return apiSuccess({ count: quotations.length, quotations });
  } catch (error: any) {
    console.error("GET /api/quotations error:", error);
    return apiError(error.message || "Failed to fetch quotations.", 500);
  }
}

export async function handleCreateQuotation(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer_name, customer_phone, pickup_address, drop_address, vehicle_type, pickup_datetime } = body;

    if (!customer_name || !customer_phone || !pickup_address || !drop_address) {
      return apiError("Missing required fields: customer_name, customer_phone, pickup_address, drop_address.", 400);
    }

    const quotation = await d1Client.createQuotation({
      customer_name,
      customer_phone,
      pickup_address,
      drop_address,
      gps_lat: body.gps_lat,
      gps_lng: body.gps_lng,
      distance_km: body.distance_km || 40,
      vehicle_type: vehicle_type || "Toyota Innova Crysta",
      pickup_datetime: pickup_datetime || new Date().toISOString(),
      notes: body.notes,
      quoted_price: body.quoted_price,
    });

    return apiSuccess({ message: "Custom route quote request created successfully", quotation }, 201);
  } catch (error: any) {
    console.error("POST /api/quotations error:", error);
    return apiError(error.message || "Failed to create quotation.", 500);
  }
}

export async function handleUpdateQuotation(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) return apiError("Quotation ID is required", 400);

    const updated = await d1Client.updateQuotation(id, updates);
    if (!updated) return apiError("Quotation not found", 404);

    return apiSuccess({ quotation: updated });
  } catch (error: any) {
    console.error("PATCH /api/quotations error:", error);
    return apiError(error.message || "Failed to update quotation.", 500);
  }
}

export async function handleDeleteQuotation(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("Quotation ID required", 400);

    const deleted = await d1Client.deleteQuotation(id);
    if (!deleted) return apiError("Quotation not found", 404);

    return apiSuccess({ message: "Quotation deleted" });
  } catch (error: any) {
    console.error("DELETE /api/quotations error:", error);
    return apiError(error.message || "Failed to delete quotation.", 500);
  }
}
