export interface LocationResult {
  id: string;
  name: string;
  subtext: string;
  category: "hub" | "airport" | "pilgrimage" | "outstation" | "local";
  popular?: boolean;
  lat?: number;
  lng?: number;
  isLive?: boolean;
}

/**
 * Searches live places using LocationIQ (if API key is present)
 * with automatic, zero-config fallback to Photon (OpenStreetMap).
 */
export async function searchLivePlaces(
  query: string,
  options?: { signal?: AbortSignal }
): Promise<LocationResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const locationIqKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

  // 1. If LocationIQ API Key is configured, use LocationIQ Developer API (5,000 free requests/day)
  if (locationIqKey && locationIqKey !== "your_locationiq_api_key_here") {
    try {
      const url = `https://api.locationiq.com/v1/autocomplete?key=${locationIqKey}&q=${encodeURIComponent(
        q
      )}&limit=6&countrycodes=in&viewbox=78.10,17.15,78.70,17.70&bounded=0&format=json`;

      const res = await fetch(url, { signal: options?.signal });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item: any, idx: number) => {
            const parts = (item.display_name || "").split(",");
            const title = parts[0]?.trim() || item.display_place || q;
            const subtitle = parts.slice(1, 4).join(",").trim() || "Hyderabad & Telangana";

            let category: LocationResult["category"] = "hub";
            const lower = (item.display_name || "").toLowerCase();
            if (lower.includes("airport") || lower.includes("rgia")) category = "airport";
            else if (lower.includes("temple") || lower.includes("darshan")) category = "pilgrimage";

            return {
              id: `liq-${item.place_id || idx}`,
              name: title,
              subtext: subtitle,
              category,
              lat: item.lat ? parseFloat(item.lat) : undefined,
              lng: item.lon ? parseFloat(item.lon) : undefined,
              isLive: true,
            };
          });
        }
      }
    } catch (err) {
      if ((err as any)?.name === "AbortError") throw err;
      console.warn("[LocationIQ] Autocomplete fallback triggered:", err);
    }
  }

  // 2. High-speed, 100% Free Fallback: Photon (OpenStreetMap Elasticsearch engine)
  try {
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      q
    )}&lat=17.44&lon=78.38&limit=6`;

    const res = await fetch(photonUrl, { signal: options?.signal });
    if (res.ok) {
      const data = await res.json();
      if (data.features && Array.isArray(data.features)) {
        return data.features.map((feat: any, idx: number) => {
          const props = feat.properties || {};
          const title = props.name || props.street || q;
          const subParts = [
            props.street !== title ? props.street : null,
            props.suburb || props.district,
            props.city || props.county || "Hyderabad",
            props.state,
          ].filter(Boolean);

          const subtitle = subParts.length > 0 ? subParts.join(", ") : "Telangana, India";

          let category: LocationResult["category"] = "hub";
          const lower = (title + " " + subtitle).toLowerCase();
          if (lower.includes("airport") || lower.includes("rgia")) category = "airport";
          else if (lower.includes("temple")) category = "pilgrimage";

          return {
            id: `osm-${props.osm_id || idx}`,
            name: title,
            subtext: subtitle,
            category,
            lat: feat.geometry?.coordinates?.[1],
            lng: feat.geometry?.coordinates?.[0],
            isLive: true,
          };
        });
      }
    }
  } catch (err) {
    if ((err as any)?.name === "AbortError") throw err;
    console.warn("[Photon OSM] Search request failed:", err);
  }

  return [];
}

/**
 * High-accuracy reverse geocoding via LocationIQ or Nominatim
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lng: number,
  options?: { signal?: AbortSignal }
): Promise<string | null> {
  const locationIqKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

  // 1. Try LocationIQ Reverse Geocode if key is present
  if (locationIqKey && locationIqKey !== "your_locationiq_api_key_here") {
    try {
      const url = `https://us1.locationiq.com/v1/reverse?key=${locationIqKey}&lat=${lat}&lon=${lng}&format=json`;
      const res = await fetch(url, { signal: options?.signal });
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const suburb = addr.suburb || addr.neighbourhood || addr.residential;
        const road = addr.road;
        const city = addr.city || addr.town || "Hyderabad";

        if (road && suburb) return `${road}, ${suburb}, ${city}`;
        if (suburb) return `${suburb}, ${city}`;
        if (data.display_name) return data.display_name.split(",").slice(0, 3).join(",");
      }
    } catch (err) {
      console.warn("[LocationIQ Reverse] fallback to Nominatim:", err);
    }
  }

  // 2. Nominatim OpenStreetMap Reverse Geocode Fallback
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    const res = await fetch(url, { signal: options?.signal });
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const suburb =
        addr.suburb ||
        addr.neighbourhood ||
        addr.residential ||
        addr.commercial ||
        addr.quarter;
      const road = addr.road || addr.street;
      const city = addr.city || addr.town || addr.county || "Hyderabad";

      if (suburb && road) return `${road}, ${suburb}, ${city}`;
      if (suburb) return `${suburb}, ${city}`;
      if (data.name) return `${data.name}, ${city}`;
      if (data.display_name) return data.display_name.split(",").slice(0, 3).join(",");
    }
  } catch (err) {
    console.warn("[Nominatim Reverse] failed:", err);
  }

  return null;
}
