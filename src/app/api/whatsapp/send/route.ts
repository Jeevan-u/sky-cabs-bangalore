import { NextRequest, NextResponse } from "next/server";
import { SKY_CABS_CONTACT } from "@/data/skyCabsFleet";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      pickupAddress,
      dropAddress,
      vehicleType,
      tripType,
      pickupDatetime,
      estimatedPrice,
      notes,
      bookingId,
    } = body;

    const refId = bookingId || "BK-" + Math.floor(1000 + Math.random() * 9000);

    let formattedDate = pickupDatetime || new Date().toISOString();
    try {
      const parsed = new Date(pickupDatetime);
      if (!isNaN(parsed.getTime())) {
        formattedDate = parsed.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }
    } catch {}

    const formattedMessage =
      `*SKY CABS BANGALORE*\n` +
      `24x7 Cab & Bus Booking Confirmation\n` +
      `-----------------------------------------\n` +
      `• *Booking Ref:* ${refId}\n` +
      `• *Customer:* ${customerName || "Valued Passenger"} (${customerPhone || "N/A"})\n` +
      `• *Vehicle:* ${vehicleType || "Toyota Innova Crysta"}\n` +
      `• *Trip Category:* ${(tripType || "airport").toUpperCase()}\n` +
      `• *Pickup:* ${pickupAddress || "Begur, Bengaluru"}\n` +
      `• *Destination:* ${dropAddress || "Kempegowda International Airport (BLR)"}\n` +
      `• *Pickup Time:* ${formattedDate}\n` +
      `• *Estimated Fare:* ₹${Number(estimatedPrice || 0).toLocaleString("en-IN")}\n` +
      (notes ? `• *Notes:* ${notes}\n` : ``) +
      `-----------------------------------------\n` +
      `• *24x7 Dispatch:* +91 ${SKY_CABS_CONTACT.primaryPhone} | +91 ${SKY_CABS_CONTACT.secondaryPhone}\n` +
      `*Thank you for choosing SKY CABS BANGALORE!*`;

    const adminWhatsApp = process.env.ADMIN_WHATSAPP_NUMBER || SKY_CABS_CONTACT.whatsappNumber;
    const waApiKey = process.env.WHATSAPP_API_KEY || process.env.WHATSAPP_CLOUD_API_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    const waLink = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(formattedMessage)}`;

    // If Cloud API credentials are provided, attempt live dispatch to Meta WhatsApp API
    if (waApiKey && phoneId) {
      try {
        const cleanAdmin = adminWhatsApp.replace(/[^0-9]/g, "");
        const dispatchRes = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${waApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: cleanAdmin,
            type: "text",
            text: { body: formattedMessage },
          }),
        });

        // Also message customer if phone number is provided
        if (customerPhone && customerPhone.length >= 10) {
          const cleanCust = customerPhone.replace(/[^0-9]/g, "");
          const custTarget = cleanCust.length === 10 ? `91${cleanCust}` : cleanCust;
          await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${waApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: custTarget,
              type: "text",
              text: { body: formattedMessage },
            }),
          }).catch(() => {});
        }

        if (dispatchRes.ok) {
          return NextResponse.json({
            success: true,
            mode: "cloud_api",
            bookingId: refId,
            message: "WhatsApp notification dispatched via Meta Cloud API.",
            waLink,
          });
        }
      } catch (err) {
        console.warn("WhatsApp Cloud API error, fallback to wa.me:", err);
      }
    }

    // Fallback mode when API is sandbox or unconfigured
    return NextResponse.json({
      success: true,
      mode: "fallback",
      bookingId: refId,
      message: "Ready to confirm via WhatsApp.",
      waLink,
      formattedMessage,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process WhatsApp booking." },
      { status: 500 }
    );
  }
}
