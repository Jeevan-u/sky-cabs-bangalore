import { NextRequest } from "next/server";
import { handleGetRates, handleUpdateRate } from "@/backend";

export async function GET() {
  return handleGetRates();
}

export async function PATCH(req: NextRequest) {
  return handleUpdateRate(req);
}
