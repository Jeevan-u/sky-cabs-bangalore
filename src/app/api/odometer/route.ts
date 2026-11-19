import { NextRequest } from "next/server";
import {
  handleGetOdometerRecords,
  handleSubmitOdometer,
  handleAuditOdometer,
} from "@/backend";

export async function GET(req: NextRequest) {
  return handleGetOdometerRecords(req);
}

export async function POST(req: NextRequest) {
  return handleSubmitOdometer(req);
}

export async function PATCH(req: NextRequest) {
  return handleAuditOdometer(req);
}
