import { d1Client } from "@/backend/db/d1Client";

export interface OdometerSubmissionData {
  action: "start" | "end";
  booking_id: string;
  driver_id?: string;
  driver_name?: string;
  vehicle_number?: string;
  start_km?: number;
  end_km?: number;
  start_photo_url?: string;
  end_photo_url?: string;
}

export interface OdometerAuditData {
  id: string;
  action: "approve" | "reject";
  admin_id?: string;
  rejection_reason?: string;
}

export const odometerService = {
  async getAllRecords(bookingId?: string) {
    return d1Client.getOdometerRecords(bookingId);
  },

  async getRecordByBookingId(bookingId: string) {
    const records = await d1Client.getOdometerRecords(bookingId);
    return records[0] || null;
  },

  async submitReading(data: OdometerSubmissionData) {
    if (data.action === "start") {
      if (!data.start_km || data.start_km <= 0) {
        throw new Error("A valid starting odometer reading (km) is required.");
      }
      return d1Client.submitOdometerStart({
        booking_id: data.booking_id,
        driver_id: data.driver_id || "DRV-101",
        driver_name: data.driver_name || "Chauffeur",
        vehicle_number: data.vehicle_number || "TS 08 UB 2026",
        start_km: data.start_km,
        start_photo_url: data.start_photo_url || "/images/odometer-start-sample.jpg",
      });
    } else if (data.action === "end") {
      if (!data.end_km || data.end_km <= 0) {
        throw new Error("A valid ending odometer reading (km) is required.");
      }
      return d1Client.submitOdometerEnd({
        booking_id: data.booking_id,
        driver_id: data.driver_id || "DRV-101",
        end_km: data.end_km,
        end_photo_url: data.end_photo_url || "/images/odometer-end-sample.jpg",
      });
    }
    throw new Error(`Invalid odometer action: ${(data as any).action}`);
  },

  async auditRecord(data: OdometerAuditData) {
    if (data.action === "approve") {
      return d1Client.verifyOdometer(data.id, "Admin_Approved");
    } else if (data.action === "reject") {
      return d1Client.verifyOdometer(
        data.id,
        "Admin_Rejected",
        data.rejection_reason || "Blurry photo. Retake clear photo."
      );
    }
    throw new Error(`Invalid audit action: ${(data as any).action}`);
  },
};
