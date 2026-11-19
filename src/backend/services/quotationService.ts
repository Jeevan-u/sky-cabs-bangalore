import { d1Client } from "@/backend/db/d1Client";

export interface CustomQuotationData {
  customer_name: string;
  customer_phone: string;
  pickup_address: string;
  drop_address: string;
  vehicle_type: string;
  pickup_datetime: string;
  notes?: string;
  distance_km?: number;
  gps_lat?: number;
  gps_lng?: number;
}

export const quotationService = {
  async getAllQuotations() {
    return d1Client.getQuotations();
  },

  async createQuotation(data: CustomQuotationData) {
    if (!data.customer_name || !data.customer_phone || !data.pickup_address || !data.drop_address) {
      throw new Error("Missing required quotation parameters (name, phone, pickup, destination).");
    }
    return d1Client.createQuotation(data);
  },

  async updateQuotationPrice(id: string, quotedPrice: number, status: "Quoted" | "Accepted" | "Rejected" = "Quoted") {
    return d1Client.updateQuotation(id, { quoted_price: quotedPrice, status });
  },

  async deleteQuotation(id: string) {
    return d1Client.deleteQuotation(id);
  },
};
