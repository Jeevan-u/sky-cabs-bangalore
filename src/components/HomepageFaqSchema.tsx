import React from "react";

export default function HomepageFaqSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I book a cab with Sri Sadhguru Tours & Travels in Hyderabad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book online via our instant reservation system on srisadgurutoursandtravels.com, message us on WhatsApp at +91 81061 17704, or call our 24x7 dispatch desk at +91 81061 17704. We guarantee 15-minute doorstep pickup across Kukatpally, KPHB, Miyapur, and Hitec City.",
        },
      },
      {
        "@type": "Question",
        name: "What is the airport taxi fare from Kukatpally or KPHB to Shamshabad Airport (RGIA)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sri Sadhguru Tours & Travels provides flat-rate airport taxi transfers: Swift Dzire (Sedan) starts at a flat ₹1,299 to ₹1,499, and Toyota Innova Crysta (VIP MPV) starts at ₹2,199 to ₹2,499 with zero surge pricing, even during midnight or early morning flight departures.",
        },
      },
      {
        "@type": "Question",
        name: "Is advance payment required to book a car or outstation cab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No! Sri Sadhguru Tours & Travels operates with 0% advance required for city airport drops and local rentals. You can pay your chauffeur directly upon trip completion via Cash, UPI (Google Pay, PhonePe, Paytm), or Card.",
        },
      },
      {
        "@type": "Question",
        name: "What commercial vehicles are available in Sri Sadhguru's fleet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our 50+ commercial vehicle fleet includes 5-Seater Sedans (Swift Dzire, Toyota Etios), 7-Seater MPVs (Maruti Ertiga, Toyota Innova Crysta, Innova Hycross), 12 to 26-Seater Force Tempo Travellers, and 32 to 50-Seater AC Luxury Tourist Buses.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer pilgrimage tour packages from Hyderabad to Srisailam and Tirupati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer specialized 1-day and 2-day round-trip packages to Srisailam Jyotirlinga, Tirupati Balaji, Shirdi, Yadagirigutta, and South India temple circuits with verified highway chauffeurs who know ghat roads and temple darshan schedules.",
        },
      },
      {
        "@type": "Question",
        name: "Who is the proprietor of Sri Sadhguru Tours & Travels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sri Sadhguru Tours & Travels is owned and personally operated by Sri Rathan Kanna, headquartered in Kukatpally, Hyderabad, with an operational branch in Gandhari, Kamareddy, Telangana.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
