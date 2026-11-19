import { NextRequest } from "next/server";
import { rateService } from "@/backend/services/rateService";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetRates() {
  try {
    const rateCards = await rateService.getAllRateCards();
    return apiSuccess({ rateCards });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch rate cards.", 500);
  }
}

export async function handleUpdateRate(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, per_km_rate, airport_flat_rate, local_8hr_80km, driver_bata_per_day } = body;
    if (!id) return apiError("Rate card ID or vehicle_id is required.", 400);

    const updated = await rateService.updateRateCard(id, {
      per_km_rate: per_km_rate ? Number(per_km_rate) : undefined,
      airport_flat_rate: airport_flat_rate ? Number(airport_flat_rate) : undefined,
      local_8hr_80km: local_8hr_80km ? Number(local_8hr_80km) : undefined,
      driver_bata_per_day: driver_bata_per_day ? Number(driver_bata_per_day) : undefined,
    });

    if (!updated) return apiError("Rate card not found.", 404);
    return apiSuccess({ rateCard: updated });
  } catch (err: any) {
    return apiError(err.message || "Failed to update rate card.", 400);
  }
}
