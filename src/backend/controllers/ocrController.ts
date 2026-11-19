import { NextRequest } from "next/server";
import { OcrService } from "@/backend/services/ocrService";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleProcessOcr(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { photoBase64, photoUrl, rawTextHint, action, startKm } = body;

    if (!photoBase64 && !photoUrl && !rawTextHint) {
      return apiError("Missing photoBase64, photoUrl, or rawTextHint payload.", 400);
    }

    const result = await OcrService.extractOdometerFromImage({
      photoBase64,
      photoUrl,
      rawTextHint,
      action,
      startKm: typeof startKm === "number" ? startKm : undefined,
    });

    return apiSuccess({
      success: true,
      detectedKm: result.detectedKm,
      confidence: result.confidence,
      source: result.source,
      rawText: result.rawText,
      details: result.details,
    });
  } catch (err: any) {
    console.error("OCR Controller Error:", err);
    return apiError(err.message || "Failed to process car dashboard OCR.", 500);
  }
}
