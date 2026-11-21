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
        display_name: "Orion Mall, Dr Rajkumar Road, Rajajinagar, Bengaluru, Karnataka",
        display_place: "Orion Mall, Bengaluru",
        lat: "12.9926",
        lon: "77.5523",
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
    expect(results[0].name).toBe("Orion Mall");
    expect(results[0].subtext).toContain("Rajajinagar");
    expect(results[0].isLive).toBe(true);
    expect(results[0].lat).toBe(12.9926);
  });

  it("falls back to Photon OSM when no LocationIQ key is provided", async () => {
    delete process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

    const mockPhotonData = {
      features: [
        {
          properties: {
            osm_id: 202,
            name: "Phoenix Marketcity",
            street: "Whitefield Main Road",
            suburb: "Whitefield",
            city: "Bengaluru",
            state: "Karnataka",
          },
          geometry: {
            coordinates: [77.7499, 12.9698],
          },
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhotonData,
    }) as any;

    const results = await searchLivePlaces("Phoenix Marketcity");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("photon.komoot.io/api/?q=Phoenix%20Marketcity&lat=12.97&lon=77.59"),
      expect.anything()
    );
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("Phoenix Marketcity");
    expect(results[0].subtext).toContain("Whitefield Main Road");
    expect(results[0].isLive).toBe(true);
  });

  it("reverse geocodes coordinates gracefully with LocationIQ", async () => {
    process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY = "mock_liq_key_123";

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        address: {
          road: "Hosur Road",
          suburb: "Begur",
          city: "Bengaluru",
        },
      }),
    }) as any;

    const address = await reverseGeocodeCoordinates(12.9352, 77.6245);
    expect(address).toBe("Hosur Road, Begur, Bengaluru");
  });
});
