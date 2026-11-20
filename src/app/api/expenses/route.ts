import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vehicle = searchParams.get("vehicle") || undefined;
    const category = searchParams.get("category") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    const expenses = await d1Client.getExpenses({ vehicle, category, startDate, endDate });
    const totalAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

    return apiSuccess({
      count: expenses.length,
      totalAmount,
      expenses,
    });
  } catch (error: any) {
    console.error("GET /api/expenses error:", error);
    return apiError(error.message || "Failed to fetch expenses.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      date,
      vehicle_number,
      vehicle_name,
      driver_name,
      category,
      amount,
      payment_mode,
      receipt_url,
      notes,
      status,
    } = body;

    if (!vehicle_number || !category || !amount) {
      return apiError("Missing required fields: vehicle_number, category, and amount are required.", 400);
    }

    const expense = await d1Client.createExpense({
      date: date || new Date().toISOString().split("T")[0],
      vehicle_number: vehicle_number.trim(),
      vehicle_name: vehicle_name?.trim() || "",
      driver_name: driver_name?.trim() || "",
      category,
      amount: Number(amount) || 0,
      payment_mode: payment_mode || "Cash",
      receipt_url: receipt_url?.trim() || "",
      notes: notes?.trim() || "",
      status: status || "Paid",
    });

    return apiSuccess({ expense }, 201);
  } catch (error: any) {
    console.error("POST /api/expenses error:", error);
    return apiError(error.message || "Failed to create expense entry.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) return apiError("Expense ID is required.", 400);

    const updated = await d1Client.updateExpense(id, updates);
    if (!updated) return apiError("Expense record not found.", 404);

    return apiSuccess({ expense: updated });
  } catch (error: any) {
    console.error("PATCH /api/expenses error:", error);
    return apiError(error.message || "Failed to update expense entry.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("Expense ID is required.", 400);

    const deleted = await d1Client.deleteExpense(id);
    if (!deleted) return apiError("Expense record not found.", 404);

    return apiSuccess({ message: "Expense record deleted successfully." });
  } catch (error: any) {
    console.error("DELETE /api/expenses error:", error);
    return apiError(error.message || "Failed to delete expense entry.", 500);
  }
}
