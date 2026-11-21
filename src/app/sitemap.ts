import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://skycabsbangalore.com/";
  const currentDate = new Date().toISOString();

  interface RouteConfig {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }

  const routes: RouteConfig[] = [
    // 1. Core homepage
    { path: "", priority: 1.0, changeFrequency: "daily" },

    // 2. Airport & outstation gateways
    { path: "/bangalore-airport-taxi", priority: 0.95, changeFrequency: "daily" },
    { path: "/kempegowda-airport-taxi", priority: 0.95, changeFrequency: "daily" },
    { path: "/bangalore-outstation-cabs", priority: 0.95, changeFrequency: "daily" },

    // 3. Outstation routes from Bengaluru
    { path: "/bangalore-to-mysuru-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bangalore-to-tirupati-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bangalore-to-coorg-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bangalore-to-ooty-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bangalore-to-chennai-cabs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bangalore-to-mangaluru-cabs", priority: 0.9, changeFrequency: "weekly" },

    // 4. Bengaluru service hubs
    { path: "/cabs-in-begur", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-electronic-city", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-koramangala", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-hsr-layout", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-whitefield", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-indiranagar", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-jayanagar", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cabs-in-yelahanka", priority: 0.9, changeFrequency: "weekly" },

    // 5. Fleet pages
    { path: "/listing-car", priority: 0.85, changeFrequency: "weekly" },
    { path: "/listing-car-detail", priority: 0.8, changeFrequency: "weekly" },

    // 6. Trust, service area & contact
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/track-booking", priority: 0.7, changeFrequency: "monthly" },
    { path: "/review", priority: 0.7, changeFrequency: "monthly" },

    // 7. Travel guides
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ];

  return routes.map((r) => ({
    url: new URL(r.path || "/", baseUrl).toString(),
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
