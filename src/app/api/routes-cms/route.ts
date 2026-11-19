import { NextRequest } from "next/server";
import {
  handleGetRoutesCms,
  handleCreateRouteCms,
  handleUpdateRouteCms,
  handleDeleteRouteCms,
} from "@/backend";

export async function GET(req: NextRequest) {
  return handleGetRoutesCms(req);
}

export async function POST(req: NextRequest) {
  return handleCreateRouteCms(req);
}

export async function PATCH(req: NextRequest) {
  return handleUpdateRouteCms(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteRouteCms(req);
}
