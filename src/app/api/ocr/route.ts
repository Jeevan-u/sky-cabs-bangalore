import { NextRequest } from "next/server";
import { handleProcessOcr } from "@/backend/controllers/ocrController";

export async function POST(req: NextRequest) {
  return handleProcessOcr(req);
}
