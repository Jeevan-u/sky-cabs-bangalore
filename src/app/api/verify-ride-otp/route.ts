import { NextRequest } from "next/server";
import { handleVerifyCustomerRideOtp } from "@/backend";

export async function POST(req: NextRequest) {
  return handleVerifyCustomerRideOtp(req);
}
