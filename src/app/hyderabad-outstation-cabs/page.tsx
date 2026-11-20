import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Hyderabad Outstation Cabs - Round Trip & One Way Intercity Taxi",
  description:
    "Book Hyderabad outstation cabs with Sri Sadhguru Tours & Travels. Dzire, Ertiga, Innova Crysta & Tempo Traveller for all South India tours. Transparent per-km rates from ₹12/km. Call +91 81061 17704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/hyderabad-outstation-cabs",
  },
};

export default function HyderabadOutstationPage() {
  return (
    <RouteLandingTemplate
      routeName="Hyderabad Outstation Cabs"
      destinationName="All South India Intercity Routes"
      distance="Custom Distance · One Way & Round Trip Options"
      duration="Flexible Hourly & Multi-Day Hire"
      badgeText="Reliable Intercity Outstation Taxi Services"
      h1Title="Hyderabad Outstation Cabs & Multi-Day Tour Packages"
      tagline="Travel beyond the city with 100% peace of mind, experienced highway chauffeurs, clean commercial vehicles, and zero hidden charges."
      overview="Sri Sadhguru Tours & Travels is Hyderabad's premier outstation cab provider, operating a full commercial fleet of sedans, 7-seater SUVs, luxury Innova Crystas, and 12-to-26 seater Tempo Travellers. Whether you are traveling for a family temple pilgrimage to Srisailam or Tirupati, an executive business trip to Vijayawada or Bengaluru, or a leisure vacation to Araku or Goa, we deliver dependable door-to-door service."
      highwayGuide={{
        recommendedRoute: "Direct highway connectivity via NH44, NH65, ORR Expressways & State Highways",
        bestDepartureTime: "Early mornings (4:00 AM - 6:00 AM) for smooth traffic clearance out of Hyderabad",
        gateOrTollInfo: "All highway toll charges are billed at actual FASTag government receipts with zero markup",
        drivingTips: [
          "Uniformed, verified drivers with at least 5+ years of highway driving experience.",
          "Speed governors installed at 80 km/h for maximum passenger safety and compliance.",
          "Chilled dual-zone AC and USB charging ports available on every seat.",
          "Complimentary bottled water and sanitized clean cabin interiors on all trips.",
        ],
      }}
      halts={[
        {
          name: "Srisailam Jyotirlinga (213 KM)",
          desc: "Sacred shrine nestled in the Nallamala forests with scenic ghat roads.",
        },
        {
          name: "Vijayawada & Kanaka Durga (275 KM)",
          desc: "Fast smooth journey via NH65 4-lane expressway with river views.",
        },
        {
          name: "Tirupati Balaji Darshan (555 KM)",
          desc: "Complete 2-to-3 day pilgrimage package with experienced hill drivers.",
        },
        {
          name: "Kamareddy & Gandhari Corridor (140 KM)",
          desc: "Direct daily service via NH44 for business, personal, and family visits.",
        },
      ]}
      packages={[
        {
          title: "Same Day Round Trip Outstation",
          duration: "1 Day (Up to 300 KM)",
          idealFor: "Nearby business visits, Yadagirigutta, Warangal, Medak Cathedral",
          sedanPrice: "₹3,999",
          suvPrice: "₹4,999",
          innovaPrice: "₹5,999",
          tempoPrice: "₹8,999",
          highlights: [
            "Doorstep pickup & return anywhere in Hyderabad",
            "Includes driver bata and fuel",
            "Tolls & state tax at actuals",
            "12 hours vehicle duty duration",
          ],
        },
        {
          title: "Multi-Day South India Tour Package",
          duration: "2 to 5 Days (300 KM/Day Average)",
          idealFor: "Pilgrimage circuits, Srisailam, Mantralayam, Tirupati, Hampi",
          sedanPrice: "₹12/KM + Bata",
          suvPrice: "₹14/KM + Bata",
          innovaPrice: "₹17/KM + Bata",
          tempoPrice: "₹24/KM + Bata",
          highlights: [
            "Vehicle remains exclusively with your family throughout the tour",
            "Zero night driving surcharges during daylight temple hops",
            "Flexible sightseeing stops along scenic routes",
            "Digital daily trip sheets with live WhatsApp updates",
          ],
        },
      ]}
      faqs={[
        {
          q: "How are outstation fares calculated?",
          a: "Outstation fares are calculated based on round-trip kilometers with a minimum daily threshold of 250 or 300 KM depending on the vehicle class, plus driver allowance (bata). All rates are quoted transparently with zero hidden surcharges.",
        },
        {
          q: "Can I book a one-way outstation cab from Hyderabad?",
          a: "Yes! We provide dedicated one-way outstation drops to Vijayawada, Warangal, Guntur, Kamareddy, Nizamabad, and Bangalore. Contact proprietor Sri Rathan Kanna at +91 81061 17704 for custom one-way rates.",
        },
        {
          q: "What safety measures are implemented on long-distance highway trips?",
          a: "All our vehicles hold valid commercial taxi permits, comprehensive insurance, emergency SOS kits, well-treaded radial tires, and are piloted by senior chauffeurs who undergo regular defensive driving verification.",
        },
      ]}
      mapQuery="Hyderabad,Telangana"
      destinationCoords={{ lat: 17.385, lng: 78.4867 }}
    />
  );
}
