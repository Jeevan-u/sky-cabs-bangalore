import React from "react";
import { Metadata } from "next";
import LocationLandingTemplate from "@/components/LocationLandingTemplate";

export const metadata: Metadata = {
  title: "Cabs in Kukatpally - 24x7 Taxi & Car Rental Service",
  description:
    "Book 24x7 cabs in Kukatpally Hyderabad. Swift Dzire, Innova Crysta, Ertiga, Tempo Traveller. Airport drop to Shamshabad and outstation temple tours. Call 8106 117704.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/cabs-in-kukatpally",
  },
};

export default function KukatpallyPage() {
  return (
    <LocationLandingTemplate
      locationName="Kukatpally, Hyderabad"
      tagline="Headquartered in Kukatpally - Delivering 10-Minute Rapid Cab Dispatches Across IDL Lake, Y-Junction & Metro Stations."
      landmarks={[
        "IDL Lake (Rangadhamuni Cheruvu)",
        "Kukatpally Metro Station",
        "Kukatpally Y-Junction",
        "BJP Office Road",
        "Vivekananda Nagar",
        "Moosapet Flyover Junction",
      ]}
      description="Sri Sadhguru Tours and Travels is located right here in Kukatpally, operated under the personal supervision of proprietor Rathan Kanna. We specialize in early morning Shamshabad airport drop cabs, round-trip pilgrimage vehicles for Tirupati, Shirdi and Srisailam, and wedding family logistics. With a fleet spanning 5-seater sedans to 50-seater tourist buses, we assure the most competitive pricing and punctual drivers."
      popularRoutes={[
        { destination: "Shamshabad RGI Airport", distance: "42 KM", startingPrice: "Flat ₹1,299" },
        { destination: "Tirupati Balaji Darshan", distance: "560 KM", startingPrice: "From ₹12/KM" },
        { destination: "Srisailam Jyotirlinga", distance: "230 KM", startingPrice: "From ₹15/KM" },
      ]}
      faqs={[
        {
          q: "How soon can a cab arrive in Kukatpally for an emergency airport run?",
          a: "Since our primary operations hub is centered in Kukatpally, we can dispatch a cab to your doorstep within 10 to 15 minutes 24x7.",
        },
        {
          q: "What vehicles are available for family outstation trips from Kukatpally?",
          a: "We offer Maruti Ertiga (6-seater), Toyota Innova Crysta (7-seater captain seats), Force Tempo Traveller (12 to 26 seaters), and AC tourist buses.",
        },
        {
          q: "Are toll fees and driver allowances included in the quote?",
          a: "We maintain 100% price transparency. Driver batta is clearly indicated, and fastag toll payments can be billed as actuals or bundled into a flat package.",
        },
      ]}
    />
  );
}
