import { NextResponse } from "next/server";

export interface ApiResponsePayload<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, any>;
}

export function apiSuccess<T>(data: T, status: number = 200, meta?: Record<string, any>) {
  return NextResponse.json(
    {
      success: true,
      ...(data && typeof data === "object" && !Array.isArray(data) ? data : { data }),
      ...(meta ? { meta } : {}),
    },
    { status }
  );
}

export function apiError(message: string, status: number = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details ? { details } : {}),
    },
    { status }
  );
}
