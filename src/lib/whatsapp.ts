/**
 * Hybrid WhatsApp Automation Service for Sri Sadhguru Tours & Travels
 * Handles both WhatsApp Cloud API (HTTP Webhook/Dispatch) and 1-click wa.me deep links.
 */

import { SADHGURU_CONTACT } from "@/data/sadhguruFleet";

export interface BookingWhatsAppPayload {
  bookingId: string;
  customerName: string;
  customerPhone: string;
  vehicleType: string;
  tripType: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDatetime: string;
  estimatedPrice: number;
  notes?: string;
}

export interface DutySlipWhatsAppPayload {
  dutySlipId: string;
  customerName: string;
  customerPhone: string;
  driverName: string;
  vehicleNumber: string;
  vehicleModel: string;
  tripRoute: string;
  totalKm: number;
  startKm: number;
  endKm: number;
  tollParking: number;
  driverBata: number;
  totalAmount: number;
}

export interface ReviewEscalationPayload {
  reviewId: string;
  customerName: string;
  customerPhone: string;
  overallRating: number;
  feedbackNotes: string;
}

export const whatsappService = {
  /**
   * Generates a pre-filled direct WhatsApp link for booking confirmation
   */
  getBookingConfirmationLink(payload: BookingWhatsAppPayload): string {
    let formattedDate = payload.pickupDatetime;
    try {
      const parsed = new Date(payload.pickupDatetime);
      if (!isNaN(parsed.getTime())) {
        formattedDate = parsed.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }
    } catch {
      // Keep original string if unparseable
    }

    const msg =
      `*SRI SADHGURU TOURS & TRAVELS*\n` +
      `24x7 Cab & Bus Booking Confirmation\n` +
      `-----------------------------------------\n` +
      `• *Booking Ref:* ${payload.bookingId}\n` +
      `• *Customer:* ${payload.customerName} (${payload.customerPhone})\n` +
      `• *Vehicle:* ${payload.vehicleType}\n` +
      `• *Trip Category:* ${payload.tripType.toUpperCase()}\n` +
      `• *Pickup:* ${payload.pickupAddress}\n` +
      `• *Destination:* ${payload.dropAddress}\n` +
      `• *Pickup Time:* ${formattedDate}\n` +
      `• *Estimated Fare:* ₹${payload.estimatedPrice.toLocaleString("en-IN")}\n` +
      (payload.notes ? `• *Notes:* ${payload.notes}\n` : ``) +
      `-----------------------------------------\n` +
      `• *24x7 Support:* +91 ${SADHGURU_CONTACT.primaryPhone} | +91 ${SADHGURU_CONTACT.secondaryPhone}\n` +
      `*Thank you for choosing Sri Sadhguru Travels!*`;

    return `https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },

  /**
   * Generates a pre-filled WhatsApp link for the customer's completed trip bill / duty slip
   */
  getDutySlipBillLink(payload: DutySlipWhatsAppPayload): string {
    const msg =
      `*SRI SADHGURU TOURS & TRAVELS*\n` +
      `Official Trip Duty Slip & Bill\n` +
      `-----------------------------------------\n` +
      `• *Bill ID:* ${payload.dutySlipId}\n` +
      `• *Customer:* ${payload.customerName}\n` +
      `• *Chauffeur:* ${payload.driverName}\n` +
      `• *Vehicle:* ${payload.vehicleModel} (${payload.vehicleNumber})\n` +
      `• *Route:* ${payload.tripRoute}\n` +
      `-----------------------------------------\n` +
      `• *Start KM:* ${payload.startKm} | *End KM:* ${payload.endKm}\n` +
      `• *Total Distance:* ${payload.totalKm} KMs\n` +
      `• *Toll / Parking:* ₹${payload.tollParking}\n` +
      `• *Driver Bata:* ₹${payload.driverBata}\n` +
      `• *FINAL TOTAL BILL:* ₹${payload.totalAmount.toLocaleString("en-IN")}\n` +
      `-----------------------------------------\n` +
      `Prop: Rathan Kanna · Kukatpally & Gandhari\n` +
      `• *Leave us a review:* https://srisadgurutoursandtravels.com/review`;

    const targetPhone = payload.customerPhone.replace(/[^0-9]/g, "");
    const recipient = targetPhone.length === 10 ? `91${targetPhone}` : targetPhone || SADHGURU_CONTACT.whatsappNumber;

    return `https://wa.me/${recipient}?text=${encodeURIComponent(msg)}`;
  },

  /**
   * Generates private escalation WhatsApp link to Rathan Kanna for negative (1-3 star) feedback
   */
  getReviewEscalationLink(payload: ReviewEscalationPayload): string {
    const msg =
      `*ATTENTION: CUSTOMER SERVICE ESCALATION*\n` +
      `Sri Sadhguru Travels - Private Customer Feedback\n` +
      `-----------------------------------------\n` +
      `• *Rating:* ${payload.overallRating} / 5 Stars\n` +
      `• *Customer:* ${payload.customerName}\n` +
      `• *Phone:* ${payload.customerPhone}\n` +
      `• *Feedback / Concern:*\n"${payload.feedbackNotes}"\n` +
      `-----------------------------------------\n` +
      `• *Action Required:* Please contact this customer immediately to resolve their grievance before any public posting.`;

    return `https://wa.me/${SADHGURU_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },

  /**
   * Attempts Meta Cloud API dispatch if env tokens are provided
   */
  async sendCloudApiMessage(to: string, message: string): Promise<boolean> {
    const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!token || !phoneId) {
      // In development or when Cloud API keys aren't configured, wa.me fallback is used
      return false;
    }

    try {
      const cleanTo = to.replace(/[^0-9]/g, "");
      const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanTo,
          type: "text",
          text: { body: message },
        }),
      });
      return res.ok;
    } catch (e) {
      console.warn("WhatsApp Cloud API error:", e);
      return false;
    }
  },
};
