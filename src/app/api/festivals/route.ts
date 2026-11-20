import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";
import { FESTIVAL_POSTERS } from "@/data/festivalOffers";

export async function GET() {
  try {
    const dbOffers = await d1Client.getFestivalOffers();
    const offers = dbOffers && dbOffers.length > 0 ? dbOffers : FESTIVAL_POSTERS.map((p) => ({
      id: p.id,
      festival_name: p.festivalName,
      occasion: p.occasion,
      discount_badge: p.discountBadge,
      banner_title: p.bannerTitle,
      description: p.description,
      recommended_destinations: p.recommendedDestinations,
      booking_code: p.bookingCode,
      start_date: p.startDate,
      end_date: p.endDate,
      image_url: "",
      is_active: p.isActive,
    }));
    return apiSuccess({ count: offers.length, offers });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch festival offers.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      festival_name,
      occasion,
      discount_badge,
      banner_title,
      description,
      recommended_destinations,
      booking_code,
      start_date,
      end_date,
      image_url,
      is_active = true,
    } = body;

    if (!festival_name || !discount_badge || !banner_title) {
      return apiError("Missing required fields: festival_name, discount_badge, banner_title", 400);
    }

    const offer = await d1Client.createFestivalOffer({
      festival_name,
      occasion: occasion || "Festival Celebration",
      discount_badge,
      banner_title,
      description: description || "",
      recommended_destinations: Array.isArray(recommended_destinations)
        ? recommended_destinations
        : (recommended_destinations || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      booking_code: booking_code || "OFFER" + Math.floor(100 + Math.random() * 900),
      start_date: start_date || new Date().toISOString().split("T")[0],
      end_date: end_date || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      image_url,
      is_active: Boolean(is_active),
    });

    return apiSuccess({ offer }, 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to create festival offer.", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return apiError("Offer id is required", 400);
    }

    const updated = await d1Client.updateFestivalOffer(id, updates);
    if (!updated) {
      return apiError("Festival offer not found", 404);
    }

    return apiSuccess({ offer: updated });
  } catch (err: any) {
    return apiError(err.message || "Failed to update festival offer.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Offer id is required", 400);
    }

    const success = await d1Client.deleteFestivalOffer(id);
    return apiSuccess({ success });
  } catch (err: any) {
    return apiError(err.message || "Failed to delete festival offer.", 500);
  }
}
