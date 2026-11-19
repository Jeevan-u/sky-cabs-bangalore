import { NextRequest } from "next/server";
import { handleGetDutySlips, handleCreateDutySlip } from "@/backend";

export async function GET() {
  return handleGetDutySlips();
}

export async function POST(req: NextRequest) {
  return handleCreateDutySlip(req);
}
