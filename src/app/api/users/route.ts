import { NextRequest } from "next/server";
import {
  handleGetUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} from "@/backend";

export async function GET() {
  return handleGetUsers();
}

export async function POST(req: NextRequest) {
  return handleCreateUser(req);
}

export async function PATCH(req: NextRequest) {
  return handleUpdateUser(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteUser(req);
}
