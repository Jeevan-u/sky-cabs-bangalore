import { NextRequest } from "next/server";
import { userService } from "@/backend/services/userService";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function handleGetUsers() {
  try {
    const users = await userService.getAllUsers();
    return apiSuccess({ users });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch users.", 500);
  }
}

export async function handleCreateUser(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await userService.createUser(body);
    return apiSuccess({ user }, 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to create user.", 400);
  }
}

export async function handleUpdateUser(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, duty_status } = body;
    if (!id || !duty_status) return apiError("User ID and duty_status are required.", 400);

    const success = await userService.updateDutyStatus(id, duty_status);
    if (!success) return apiError("User not found.", 404);
    return apiSuccess({ message: "Duty status updated successfully." });
  } catch (err: any) {
    return apiError(err.message || "Failed to update user.", 400);
  }
}

export async function handleDeleteUser(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("User ID is required.", 400);

    await userService.deleteUser(id);
    return apiSuccess({ message: "User deleted successfully." });
  } catch (err: any) {
    return apiError(err.message || "Failed to delete user.", 400);
  }
}
