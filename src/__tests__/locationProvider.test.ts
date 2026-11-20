import { searchLivePlaces, reverseGeocodeCoordinates } from "@/lib/locationProvider";

describe("locationProvider service", () => {
  const originalEnv = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY = originalEnv;
  });

  it("returns empty array when query is less than 2 characters", async () => {
    const results = await searchLivePlaces("a");
    expect(results).toEqual([]);
  });

  it("calls LocationIQ when NEXT_PUBLIC_LOCATIONIQ_API_KEY is configured", async () => {
    process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY = "mock_liq_key_123";

    const mockData = [
      {
        place_id: "101",
        display_name: "Nexus Hyderabad Mall, KPHB Colony, Kukatpally, Hyderabad, Telangana",
        display_place: "Nexus Hyderabad Mall",
        lat: "17.485",
        lon: "78.388",
      },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    }) as any;

    const results = await searchLivePlaces("Nexus");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("api.locationiq.com/v1/autocomplete?key=mock_liq_key_123"),
      expect.anything()
    );
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("Nexus Hyderabad Mall");
    expect(results[0].isLive).toBe(true);
    expect(results[0].lat).toBe(17.485);
  });

  it("falls back to Photon OSM when no LocationIQ key is provided", async () => {
    delete process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

    const mockPhotonData = {
      features: [
        {
          properties: {
            osm_id: 202,
            name: "Cyber Towers",
            street: "Hitec City Main Road",
            suburb: "Madhapur",
            city: "Hyderabad",
            state: "Telangana",
          },
          geometry: {
            coordinates: [78.376, 17.447],
          },
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhotonData,
    }) as any;

    const results = await searchLivePlaces("Cyber Towers");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("photon.komoot.io/api/?q=Cyber%20Towers"),
      expect.anything()
    );
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("Cyber Towers");
    expect(results[0].subtext).toContain("Hitec City Main Road");
    expect(results[0].isLive).toBe(true);
  });

  it("reverse geocodes coordinates gracefully with LocationIQ", async () => {
    process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY = "mock_liq_key_123";

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        address: {
          road: "JNTU Road",
          suburb: "Kukatpally",
          city: "Hyderabad",
        },
      }),
    }) as any;

    const address = await reverseGeocodeCoordinates(17.4933, 78.3914);
    expect(address).toBe("JNTU Road, Kukatpally, Hyderabad");
  });
});
