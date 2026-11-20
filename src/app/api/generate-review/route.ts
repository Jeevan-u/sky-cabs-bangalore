import { NextResponse } from "next/server";
import { OpenRouterClient } from "@/lib/openrouter";

interface ReviewRequest {
  customerName?: string;
  driverName?: string;
  vehicleName?: string;
  pickupLocation?: string;
  dropLocation?: string;
  tripType?: string;
  rating?: number;
  tags?: string[];
  additionalNotes?: string;
}

export async function POST(request: Request) {
  try {
    const body: ReviewRequest = await request.json();
    const {
      customerName = "Customer",
      driverName,
      vehicleName = "Cab",
      pickupLocation = "Hyderabad",
      dropLocation = "Shamshabad Airport",
      rating = 5,
      tags = [],
      additionalNotes = "",
    } = body;

    const prompt = `You are a helpful assistant generating 3 realistic, authentic Google reviews written by a customer for "Sri Sadhguru Tours and Travels" (Hyderabad).
Trip Details:
- Customer: ${customerName}
- Vehicle: ${vehicleName}
- Route: ${pickupLocation} to ${dropLocation}
- Driver: ${driverName ? driverName : "the driver"}
- Rating: ${rating} out of 5 stars
- Positive highlights chosen by customer: ${tags.join(", ")}
- Customer remarks: ${additionalNotes || "Smooth trip"}

Rules:
1. Generate exactly 3 varied review options (Option 1: Detailed & Warm, Option 2: Quick & Professional, Option 3: Family/Comfort focused).
2. Write in natural Indian English as a real customer writing on Google Maps. No robotic words, no hashtags, no marketing buzzwords.
3. Mention "Sri Sadhguru Travels" or "Sadhguru Travels" naturally once.
4. Output JSON in this exact structure:
{"options": ["Review text 1", "Review text 2", "Review text 3"]}`;

    // 1. Primary AI Engine: OpenRouter
    if (OpenRouterClient.isConfigured()) {
      try {
        const aiRes = await OpenRouterClient.createChatCompletion({
          messages: [
            {
              role: "system",
              content: "You are an AI assistant that formats output strictly as JSON with key 'options' containing an array of 3 strings.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          jsonMode: true,
          temperature: 0.7,
        });

        if (aiRes.success && aiRes.content) {
          const parsed = JSON.parse(aiRes.content);
          if (Array.isArray(parsed.options) && parsed.options.length > 0) {
            return NextResponse.json({
              success: true,
              reviews: parsed.options,
              poweredBy: `OpenRouter AI (${aiRes.model})`,
            });
          }
        }
      } catch (e) {
        console.warn("OpenRouter API call encountered an issue, falling back:", e);
      }
    }

    // 2. Secondary AI Engine: Direct Gemini API key (if present)
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            if (Array.isArray(parsed.options) && parsed.options.length > 0) {
              return NextResponse.json({ success: true, reviews: parsed.options, poweredBy: "Gemini AI" });
            }
          }
        }
      } catch (e) {
        console.error("Gemini API call failed, falling back to intelligent dynamic generator:", e);
      }
    }

    // Dynamic Humanized Synthesizer (Zero-latency fallback)
    const driverMention = driverName ? `Driver ${driverName}` : "The driver";
    const tagSet = new Set(tags);

    const hasPunctual = tagSet.has("on_time") || tagSet.has("Punctual");
    const hasClean = tagSet.has("clean_cab") || tagSet.has("Cleanliness");
    const hasPolite = tagSet.has("polite_driver") || tagSet.has("Polite Driver");
    const hasAC = tagSet.has("comfort_ac") || tagSet.has("Comfortable AC");
    const hasSafe = tagSet.has("safe_driving") || tagSet.has("Safe Driving");
    const hasPrice = tagSet.has("reasonable_price") || tagSet.has("Fair Price");

    const option1 = [
      `Had a fantastic journey with Sri Sadhguru Travels from ${pickupLocation} to ${dropLocation}.`,
      hasPunctual ? `${driverMention} was right on time for pickup.` : `${driverMention} was very cooperative throughout.`,
      hasClean ? `The ${vehicleName} was spotless, sanitized, and smelled fresh.` : `The vehicle was very well maintained.`,
      hasAC ? `AC cooling was top notch, making the drive super relaxing.` : `Ride was very smooth and hassle-free.`,
      hasPrice ? `Pricing is very transparent with zero hidden charges.` : `Rates are very reasonable compared to other services.`,
      `Highly recommended for airport drops and outstation trips in Hyderabad!`,
    ].join(" ");

    const option2 = [
      `Booked ${vehicleName} with Sri Sadhguru Tours & Travels for travel to ${dropLocation}.`,
      hasPolite ? `Very polite, professional driving by ${driverMention}.` : `Driver was calm, courteous, and drove safely.`,
      hasSafe ? `Felt completely safe during the ride with family.` : `Smooth driving even in heavy Hyderabad traffic.`,
      hasPunctual ? `Reached our destination well ahead of time.` : `Timely pickup and drop.`,
      `Great service by Rathan Kanna and his team. 5 stars!`,
    ].join(" ");

    const option3 = [
      `Excellent travel experience!`,
      `Sri Sadhguru Travels provides top-notch cab service in ${pickupLocation}.`,
      hasClean && hasAC ? `Clean vehicle, chilled AC, and comfortable seating.` : `Very comfortable and clean vehicle.`,
      hasPrice ? `Best quotation guaranteed indeed, totally worth the price.` : `Very reasonable fare with trustworthy drivers.`,
      `Will definitely book with them again for our next temple tour & airport visits.`,
    ].join(" ");

    return NextResponse.json({
      success: true,
      reviews: [option1, option2, option3],
      poweredBy: "Sadhguru AI Engine",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
