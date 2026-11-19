import { d1Client } from "@/backend/db/d1Client";
import { whatsappService } from "@/backend/services/whatsappService";
import { DutySlipRecord } from "@/backend/types";

export const dutySlipService = {
  async getAllDutySlips(): Promise<DutySlipRecord[]> {
    return d1Client.getDutySlips();
  },

  async createDutySlip(data: DutySlipRecord): Promise<{ dutySlip: DutySlipRecord; whatsappLink: string }> {
    const dutySlip = await d1Client.createDutySlip(data);

    const whatsappLink = whatsappService.getDutySlipBillLink({
      dutySlipId: dutySlip.id,
      customerName: dutySlip.customer_name,
      customerPhone: dutySlip.customer_phone,
      driverName: dutySlip.driver_name,
      vehicleNumber: dutySlip.vehicle_number,
      vehicleModel: dutySlip.vehicle_model,
      tripRoute: dutySlip.trip_route,
      startKm: dutySlip.start_km,
      endKm: dutySlip.end_km,
      totalKm: dutySlip.total_km,
      tollParking: dutySlip.toll_parking,
      driverBata: dutySlip.driver_bata,
      totalAmount: dutySlip.total_amount,
    });

    return { dutySlip, whatsappLink };
  },
};
