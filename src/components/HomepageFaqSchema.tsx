import React from "react";

export default function HomepageFaqSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I book a cab with Sky Cabs Bangalore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book through https://skycabsbangalore.com/, call our 24x7 desk at +91 96323 45415, message the same number on WhatsApp, or email skycabsbangalore@gmail.com. Tell us your pickup area, destination and travel time, and we will confirm what is available.",
        },
      },
      {
        "@type": "Question",
        name: "What does an airport taxi from Bengaluru to Kempegowda International Airport (BLR) cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indicative airport transfer fares start from ₹1,399 for a Prime Sedan, ₹1,799 for a Maruti Suzuki Ertiga, ₹2,199 for a Toyota Innova and ₹2,499 for a Toyota Innova Crysta. Prices and vehicle types are subject to availability, so please confirm availability and the final quote before booking.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to pay in advance for a local or airport cab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Payment is generally settled directly with the chauffeur at the end of the trip by cash, UPI, Google Pay, PhonePe, Paytm or card. Any advance requirement is confirmed at the time of booking, and all vehicles are subject to availability.",
        },
      },
      {
        "@type": "Question",
        name: "What vehicles are available with Sky Cabs Bangalore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our fleet list covers Prime Sedan (4+1), Maruti Suzuki Ertiga (6+1), Toyota Innova (7+1), Toyota Innova Crysta (7+1), Toyota Innova Hycross (7+1), Toyota Fortuner (6+1), Tempo Traveller (12+1), Force Urbania in 9+1, 12+1 and 16+1 configurations, and passenger buses in 25, 33, 40, 45, 50 and 52-seater options. Vehicles are subject to availability; confirm availability before booking.",
        },
      },
      {
        "@type": "Question",
        name: "Which outstation destinations can I book from Bengaluru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Popular outstation routes from Bengaluru include Mysuru, Tirupati, Coorg (Madikeri), Ooty, Chennai and Mangaluru. We also cover Hampi, Wayanad, Chikmagalur, Pondicherry, Shivamogga, Hassan and Tumakuru. Trips are subject to availability and confirmed before booking.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas of Bengaluru do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We serve Begur, Electronic City, Koramangala, HSR Layout, BTM Layout, JP Nagar, Jayanagar, Whitefield, Marathahalli, Indiranagar, Yelahanka, Hebbal, Banashankari and Kempegowda International Airport (BLR), along with other parts of Bengaluru. Pickup availability depends on the vehicle and time, so please confirm before booking.",
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
