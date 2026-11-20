import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.srisadhgurutoursandtravels.com";
  const currentDate = new Date().toISOString();

  interface RouteConfig {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }

  const routes: RouteConfig[] = [
    // 1. Core Homepage
    { path: "", priority: 1.0, changeFrequency: "daily" },

    // 2. High-Priority Local Hubs & Airport Express
    { path: "/shamshabad-airport-taxi", priority: 0.95, changeFrequency: "daily" },
    { path: "/hyderabad-airport-cabs", priority: 0.95, changeFrequency: "daily" },
    { path: "/hyderabad-outstation-cabs", priority: 0.95, changeFrequency: "daily" },
    { path: "/cabs-in-kukatpally", priority: 0.95, changeFrequency: "daily" },
    { path: "/cabs-in-kphb", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-hitec-city", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-miyapur", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-medchal", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-kamareddy-gandhari", priority: 0.9, changeFrequency: "weekly" },

    // 3. High-Intent Commercial Pilgrimage Routes
    { path: "/hyderabad-to-srisailam-cabs", priority: 0.95, changeFrequency: "weekly" },
    { path: "/hyderabad-to-tirupati-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/hyderabad-to-shirdi-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/hyderabad-to-yadagirigutta-cabs", priority: 0.9, changeFrequency: "weekly" },

    // 4. Commercial Fleet Pages
    { path: "/listing-car", priority: 0.85, changeFrequency: "weekly" },
    { path: "/listing-car-detail", priority: 0.8, changeFrequency: "weekly" },

    // 5. Trust, Author & Contact
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/author", priority: 0.75, changeFrequency: "monthly" },
    { path: "/track-booking", priority: 0.7, changeFrequency: "monthly" },
    { path: "/review", priority: 0.7, changeFrequency: "monthly" },

    // 6. Blog & Road Trip Travel Guides
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog/srisailam-guide", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog/tirupati-balaji", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog/airport-taxi-guide", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog/south-india-circuits", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog/vijayawada-trip", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog/shirdi-yatra", priority: 0.75, changeFrequency: "monthly" },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
