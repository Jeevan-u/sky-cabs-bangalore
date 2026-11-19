import { NextRequest } from "next/server";
import { dutySlipService } from "@/backend/services/dutySlipService";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetDutySlips() {
  try {
    const dutySlips = await dutySlipService.getAllDutySlips();
    return apiSuccess({ dutySlips });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch duty slips.", 500);
  }
}

export async function handleCreateDutySlip(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await dutySlipService.createDutySlip(body);
    return apiSuccess({ dutySlip: result.dutySlip, whatsappLink: result.whatsappLink }, 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to create duty slip.", 400);
  }
}
