// Cloudflare Pages Function for /api/* routes
export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const path = url.pathname;
  const method = context.request.method;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (method === "OPTIONS") {
    return new Response(null, { headers });
  }

  // 1. NextAuth Session & Auth endpoints
  if (path.startsWith("/api/auth/error")) {
    return Response.redirect(`${url.origin}/login`, 302);
  }

  if (path.startsWith("/api/auth/session")) {
    return new Response(JSON.stringify({}), { status: 200, headers });
  }

  if (path.startsWith("/api/auth/csrf")) {
    return new Response(JSON.stringify({ csrfToken: "sadhguru-csrf-token" }), { status: 200, headers });
  }

  if (path.startsWith("/api/auth/providers")) {
    return new Response(
      JSON.stringify({
        credentials: {
          id: "credentials",
          name: "Credentials",
          type: "credentials",
          signinUrl: "/login",
          callbackUrl: "/",
        },
      }),
      { status: 200, headers }
    );
  }

  if (path.startsWith("/api/auth/")) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  // 2. Dynamic Routes CMS
  if (path.startsWith("/api/routes-cms")) {
    const category = url.searchParams.get("category");
    const allRoutes = [
      {
        id: "route-srisailam",
        title: "Hyderabad to Srisailam Jyotirlinga Yatra",
        from_location: "Kukatpally / Hyderabad",
        to_location: "Srisailam Temple",
        category: "outstation_route",
        distance_km: 213,
        sedan_price: 4800,
        suv_price: 6500,
        tt_price: 10500,
        is_published: true,
        description: "Ghat road transit through Nallamala forest, Dindi reservoir & Dam viewpoint.",
      },
      {
        id: "route-tirupati",
        title: "Hyderabad to Tirupati Balaji Darshan",
        from_location: "Hyderabad",
        to_location: "Tirumala / Tirupati",
        category: "outstation_route",
        distance_km: 570,
        sedan_price: 12500,
        suv_price: 16500,
        tt_price: 25000,
        is_published: true,
        description: "Comfortable highway pilgrimage with experienced senior drivers.",
      },
      {
        id: "hub-kukatpally",
        title: "Kukatpally Hub (Y-Junction)",
        from_location: "Kukatpally",
        to_location: "Shamshabad Airport / City",
        category: "popular_hub",
        distance_km: 42,
        sedan_price: 1299,
        suv_price: 2199,
        tt_price: 3499,
        is_published: true,
        description: "Headquarters & rapid dispatch hub with average 10-15 minute doorstep pickup.",
      },
      {
        id: "hub-gandhari",
        title: "Gandhari / Kamareddy Hub",
        from_location: "Gandhari",
        to_location: "Hyderabad / Nizamabad",
        category: "popular_hub",
        distance_km: 145,
        sedan_price: 3200,
        suv_price: 4500,
        tt_price: 7500,
        is_published: true,
        description: "District connecting hub for outstation & return Hyderabad journeys.",
      },
    ];

    const filtered = category ? allRoutes.filter((r) => r.category === category) : allRoutes;
    return new Response(JSON.stringify({ success: true, count: filtered.length, routes: filtered }), {
      status: 200,
      headers,
    });
  }

  // 3. Tour Packages CMS
  if (path.startsWith("/api/tours-cms")) {
    const packages = [
      {
        id: "pkg-srisailam",
        name: "Srisailam Dam & Jyotirlinga",
        tagline: "Mallikarjuna Jyotirlinga & Ghat Road",
        state: "Andhra Pradesh",
        image: "/images/srisailam-dam.jpg",
        dist: "213 KM",
        days: "1-2 Days",
        price: 4500,
        features: ["VIP Darshan Assistance", "Ghat Road Certified Chauffeur", "Patala Ganga Ropeway Stop", "Dindi Dam Route"],
        is_published: true,
      },
      {
        id: "pkg-tirupati",
        name: "Tirupati Balaji Darshan",
        tagline: "Lord Venkateswara Temple Darshan",
        state: "Andhra Pradesh",
        image: "/images/Tirupati.jpg",
        dist: "570 KM",
        days: "2-3 Days",
        price: 8200,
        features: ["Alipiri Checkpoint Guidance", "Tirumala Ghat Ascent Expert", "Padmavathi Ammavari Temple", "Clean AC Fleet"],
        is_published: true,
      },
      {
        id: "pkg-srikalahasti",
        name: "Srikalahasti Rahu Ketu",
        tagline: "Vayu Linga & Rahu Ketu Pooja",
        state: "Andhra Pradesh",
        image: "/images/Srikalahasti.jpg",
        dist: "540 KM",
        days: "2 Days",
        price: 7900,
        features: ["Special Pooja Timing Advisory", "Highway Cruiser", "Kanipakam Extension Option"],
        is_published: true,
      },
      {
        id: "pkg-yaganti",
        name: "Mahanandi & Yaganti",
        tagline: "Ancient Shiva & Growing Nandi",
        state: "Andhra Pradesh",
        image: "/images/Yaganti.jpg",
        dist: "310 KM",
        days: "2 Days",
        price: 6200,
        features: ["Belum Caves Route", "Ancient Temple Tour", "Experienced Chauffeurs"],
        is_published: true,
      },
    ];

    return new Response(JSON.stringify({ success: true, count: packages.length, packages }), {
      status: 200,
      headers,
    });
  }

  // 4. Places & Hubs CMS
  if (path.startsWith("/api/places-cms")) {
    const hubs = [
      {
        id: "hub-1",
        name: "Kukatpally (IDL Lake)",
        href: "/cabs-in-kukatpally",
        count: 240,
        thumbnail: "/images/hubs/kukatpally-hq.jpg",
        is_published: true,
      },
      {
        id: "hub-2",
        name: "Shamshabad Airport (RGIA)",
        href: "/shamshabad-airport-taxi",
        count: 512,
        thumbnail: "/images/hubs/shamshabad-airport.jpg",
        is_published: true,
      },
      {
        id: "hub-3",
        name: "KPHB Colony (Nexus Mall)",
        href: "/cabs-in-kphb",
        count: 180,
        thumbnail: "/images/hubs/kphb-colony.jpg",
        is_published: true,
      },
      {
        id: "hub-4",
        name: "Hitec City (Cyber Towers)",
        href: "/cabs-in-hitec-city",
        count: 320,
        thumbnail: "/images/hubs/hitec-city.jpg",
        is_published: true,
      },
      {
        id: "hub-5",
        name: "Miyapur (Ameenpur Lake)",
        href: "/cabs-in-miyapur",
        count: 155,
        thumbnail: "/images/hubs/miyapur-hub.jpg",
        is_published: true,
      },
      {
        id: "hub-6",
        name: "Medchal (Oxygen Park)",
        href: "/cabs-in-medchal",
        count: 140,
        thumbnail: "/images/hubs/medchal-kompally.jpg",
        is_published: true,
      },
      {
        id: "hub-7",
        name: "Gandhari & Kamareddy Hub",
        href: "/cabs-in-kamareddy-gandhari",
        count: 360,
        thumbnail: "/images/hubs/kamareddy-gandhari.jpg",
        is_published: true,
      },
    ];

    return new Response(JSON.stringify({ success: true, count: hubs.length, hubs }), {
      status: 200,
      headers,
    });
  }

  // 5. Fleet Vehicles
  if (path.startsWith("/api/fleet")) {
    const vehicles = [
      {
        id: "dzire-etios",
        name: "Swift Dzire / Toyota Etios",
        category: "Sedan",
        capacity: "4+1 Passenger",
        luggage: "2 Large + 1 Small Bags",
        ac: true,
        image: "/images/fleet/swift-dzire.jpg",
        perKmRate: 12,
        airportFlatRate: 1299,
        local8hr80km: 2199,
        features: ["Dual AC", "Clean & Sanitized", "Music System", "Comfortable Legroom", "Fastag Enabled"],
        description: "Ideal for city commutes, quick airport pickups, and budget-friendly small family outstation trips.",
        bestFor: "Airport Drops, KPHB/Hitec City Local, One-Way Outstation",
        is_published: true,
      },
      {
        id: "ertiga-rumion",
        name: "Maruti Ertiga / Toyota Rumion",
        category: "SUV",
        capacity: "6+1 Passenger",
        luggage: "3 Large + 2 Small Bags",
        ac: true,
        image: "/images/fleet/maruti-ertiga.jpg",
        perKmRate: 15,
        airportFlatRate: 1699,
        local8hr80km: 2899,
        features: ["Roof AC Vents", "Adjustable Rear Seats", "Spacious Boot", "Phone Chargers", "Toll/Fastag Ready"],
        description: "The most economical 6-seater for family outings, airport group transfers, and weekend temple visits.",
        bestFor: "Family Trips, Airport Transfers, Yadagirigutta / Vemulawada",
        is_published: true,
      },
      {
        id: "innova-crysta",
        name: "Toyota Innova Crysta",
        category: "Premium SUV",
        capacity: "7+1 / 6+1 Captain Seats",
        luggage: "4 Large + 3 Small Bags",
        ac: true,
        image: "/images/fleet/innova-crysta.jpg",
        perKmRate: 19,
        airportFlatRate: 2199,
        local8hr80km: 3699,
        features: ["Plush Captain Recliners", "Dual Automatic Climate Control", "Highway Cruiser", "Premium Comfort", "GPS Tracking"],
        description: "The gold standard for long-distance highway travel, pilgrimage tours, VIP guest transport, and corporate rentals.",
        bestFor: "Tirupati, Shirdi, Srisailam, Corporate VIP & Wedding Escorts",
        is_published: true,
      },
      {
        id: "tempo-traveller-12",
        name: "Force Tempo Traveller (12/17 Seater)",
        category: "Tempo Traveller",
        capacity: "12 to 17 Passengers",
        luggage: "Dedicated Carrier & Large Boot",
        ac: true,
        image: "/images/fleet/tempo-traveller-17.jpg",
        perKmRate: 25,
        airportFlatRate: 3499,
        local8hr80km: 4999,
        features: ["Pushback Luxury Seats", "Surround Sound Audio/Video", "Individual AC Vents", "Spacious Aisle", "Experienced Hill Drivers"],
        description: "Perfect for group pilgrimages, marriage guest logistics, and corporate team day-outs from Hyderabad.",
        bestFor: "Large Family Pilgrimage, Wedding Functions, Corporate Trips",
        is_published: true,
      },
      {
        id: "tempo-traveller-26",
        name: "Force Urbania & 26-Seater TT",
        category: "Tempo Traveller",
        capacity: "20 to 26 Passengers",
        luggage: "Extra Spacious Luggage Area",
        ac: true,
        image: "/images/fleet/force-urbania.png",
        perKmRate: 32,
        airportFlatRate: 4499,
        local8hr80km: 7499,
        features: ["European Style Luxury Seats", "Ultra Silent Cabin", "LED Ambient Lighting", "Smooth Air Suspension", "High Roof"],
        description: "Ultra-luxury executive carrier with world-class Mercedes-derived architecture for grand family excursions.",
        bestFor: "Luxury Corporate Delegation, Destination Weddings, VIP Group Tours",
        is_published: true,
      },
      {
        id: "luxury-bus-50",
        name: "Luxury AC Bus / Coach (32 to 50 Seater)",
        category: "Luxury Coach",
        capacity: "32 to 50 Passengers",
        luggage: "Huge Belly Storage",
        ac: true,
        image: "/images/fleet/luxury-bus.jpg",
        perKmRate: 48,
        airportFlatRate: 6999,
        local8hr80km: 11999,
        features: ["Air Suspension", "Pushback 2x2 Reclining Seats", "Mic & PA System", "TV Entertainment", "Full Air-Conditioned Comfort"],
        description: "Flagship luxury coach transport for large convention delegates, corporate offsites, and mega pilgrim squads.",
        bestFor: "Large Pilgrimage Groups, Corporate Outings, Educational Excursions",
        is_published: true,
      },
    ];

    return new Response(JSON.stringify({ success: true, count: vehicles.length, vehicles }), {
      status: 200,
      headers,
    });
  }

  // 6. Bookings (GET & POST)
  if (path.startsWith("/api/bookings")) {
    if (method === "POST") {
      try {
        const body = await context.request.json();
        const id = "BK-" + Math.floor(1000 + Math.random() * 9000);
        return new Response(JSON.stringify({ success: true, booking: { id, ...body, status: "Confirmed" } }), {
          status: 201,
          headers,
        });
      } catch {
        return new Response(JSON.stringify({ success: true, booking: { id: "BK-1001", status: "Confirmed" } }), {
          status: 201,
          headers,
        });
      }
    }
    return new Response(JSON.stringify({ success: true, bookings: [] }), { status: 200, headers });
  }

  // 7. Generic fallback for any other API request
  return new Response(JSON.stringify({ success: true, message: "OK" }), { status: 200, headers });
}
