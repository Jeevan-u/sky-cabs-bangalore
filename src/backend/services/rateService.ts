import { d1Client } from "@/backend/db/d1Client";

export interface RateCardUpdateData {
  per_km_rate?: number;
  airport_flat_rate?: number;
  local_8hr_80km?: number;
  driver_bata_per_day?: number;
}

export const rateService = {
  async getAllRateCards() {
    return d1Client.getRateCards();
  },

  async updateRateCard(id: string, updates: RateCardUpdateData) {
    if (!id) throw new Error("Rate card ID or vehicle_id is required.");
    return d1Client.updateRateCard(id, updates);
  },
};
