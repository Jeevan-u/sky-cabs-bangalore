import { NextRequest } from "next/server";
import { handleGetGpsLocations, handleRecordGpsPing } from "@/backend";

export async function GET() {
  return handleGetGpsLocations();
}

export async function POST(req: NextRequest) {
  return handleRecordGpsPing(req);
}
