import { NextRequest } from "next/server";
import {
  handleGetQuotations,
  handleCreateQuotation,
  handleUpdateQuotation,
  handleDeleteQuotation,
} from "@/backend";

export async function GET() {
  return handleGetQuotations();
}

export async function POST(req: NextRequest) {
  return handleCreateQuotation(req);
}

export async function PATCH(req: NextRequest) {
  return handleUpdateQuotation(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteQuotation(req);
}
