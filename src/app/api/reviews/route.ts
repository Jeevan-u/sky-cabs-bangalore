import { NextRequest } from "next/server";
import { handleGetReviews, handleCreateReview } from "@/backend";

export async function GET() {
  return handleGetReviews();
}

export async function POST(req: NextRequest) {
  return handleCreateReview(req);
}
