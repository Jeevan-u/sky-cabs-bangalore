import { d1Client } from "@/backend/db/d1Client";

export interface RouteCmsItem {
  id?: string;
  category: "popular_hub" | "outstation_route" | "tour_package";
  title: string;
  from_location: string;
  to_location: string;
  distance_km?: number;
  sedan_price?: number;
  suv_price?: number;
  tt_price?: number;
  is_published?: boolean;
  description?: string;
}

export const routesCmsService = {
  async getAllRoutes(category?: "popular_hub" | "outstation_route" | "tour_package") {
    return d1Client.getDynamicRoutes(category);
  },

  async createRoute(data: RouteCmsItem) {
    if (!data.title || !data.from_location || !data.to_location) {
      throw new Error("Missing mandatory route fields (title, from_location, to_location).");
    }
    return d1Client.createDynamicRoute({
      title: data.title,
      from_location: data.from_location,
      to_location: data.to_location,
      category: data.category || "outstation_route",
      distance_km: Number(data.distance_km) || 100,
      sedan_price: Number(data.sedan_price) || 2000,
      suv_price: Number(data.suv_price) || 3000,
      tt_price: Number(data.tt_price) || 5000,
      is_published: data.is_published !== false,
      description: data.description || "",
    });
  },

  async updateRoute(id: string, updates: Partial<RouteCmsItem>) {
    return d1Client.updateDynamicRoute(id, updates);
  },

  async deleteRoute(id: string) {
    return d1Client.deleteDynamicRoute(id);
  },
};
