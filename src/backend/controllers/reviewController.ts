import { NextRequest } from "next/server";
import { reviewService } from "@/backend/services/reviewService";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetReviews() {
  try {
    const reviews = await reviewService.getAllReviews();
    return apiSuccess({ reviews });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch reviews.", 500);
  }
}

export async function handleCreateReview(req: NextRequest) {
  try {
    const body = await req.json();
    const review = await reviewService.createReview(body);
    return apiSuccess({ review }, 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to submit review.", 400);
  }
}
