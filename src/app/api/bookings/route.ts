import { NextRequest } from "next/server";
import {
  handleGetBookings,
  handleCreateBooking,
  handleUpdateBooking,
  handleDeleteBooking,
} from "@/backend";

export async function GET() {
  return handleGetBookings();
}

export async function POST(req: NextRequest) {
  return handleCreateBooking(req);
}

export async function PATCH(req: NextRequest) {
  return handleUpdateBooking(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteBooking(req);
}
