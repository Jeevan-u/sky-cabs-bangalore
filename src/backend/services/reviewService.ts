import { d1Client } from "@/backend/db/d1Client";
import { ReviewRecord } from "@/backend/types";

export const reviewService = {
  async getAllReviews(): Promise<ReviewRecord[]> {
    return d1Client.getReviews();
  },

  async createReview(data: Partial<ReviewRecord>) {
    return d1Client.createReview({
      booking_id: data.booking_id,
      customer_name: data.customer_name || "Valued Passenger",
      customer_phone: data.customer_phone || "",
      overall_rating: data.overall_rating || 5,
      driver_rating: data.driver_rating || 5,
      cleanliness_rating: data.cleanliness_rating || 5,
      comfort_rating: data.comfort_rating || 5,
      generated_review_text: data.feedback_notes || "",
      is_positive_google_review: (data.overall_rating || 5) >= 4 ? 1 : 0,
      feedback_notes: data.feedback_notes || "",
    });
  },
};
