import { d1Client } from "@/backend/db/d1Client";

export interface GpsPingData {
  booking_id: string;
  driver_id: string;
  driver_name?: string;
  vehicle_number?: string;
  latitude: number;
  longitude: number;
  speed_kmh?: number;
  heading?: number;
}

export const gpsService = {
  async getLatestLocations() {
    return d1Client.getLatestGpsPings();
  },

  async recordPing(data: GpsPingData) {
    if (!data.booking_id || !data.latitude || !data.longitude) {
      throw new Error("Missing mandatory GPS telemetry fields (booking_id, latitude, longitude).");
    }
    return d1Client.saveGpsPing({
      booking_id: data.booking_id,
      driver_id: data.driver_id,
      driver_name: data.driver_name || "Assigned Chauffeur",
      vehicle_number: data.vehicle_number || "Commercial Vehicle",
      latitude: data.latitude,
      longitude: data.longitude,
      speed: data.speed_kmh || 0,
      heading: data.heading || 0,
    });
  },
};
