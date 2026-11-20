import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Hyderabad to Tirupati Cabs - Safe Balaji Darshan Travels",
  description:
    "Book Hyderabad to Tirupati cabs with Sri Sadhguru Travels. Innova Crysta, Ertiga, Tempo Traveller for Tirumala Balaji darshan. Verified chauffeurs & transparent rates. Call 8106 117704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/hyderabad-to-tirupati-cabs",
  },
};

export default function HyderabadToTirupatiPage() {
  return (
    <RouteLandingTemplate
      routeName="Hyderabad to Tirupati"
      destinationName="Tirumala Sri Venkateswara Swamy Temple"
      distance="560 KM (One-Way) · 1,150 KM (Round Trip)"
      duration="9.5 to 10.5 Hours via NH 44"
      badgeText="Lord Venkateswara Balaji Pilgrimage Special"
      h1Title="Hyderabad to Tirupati Cabs & Tour Packages"
      tagline="Dependable 2 Nights / 3 Days & 3 Nights / 4 Days Tirumala Balaji Pilgrimage Packages with Plush Captain-Seat Innova Crystas & Verified Chauffeurs."
      overview="Sri Sadhguru Tours & Travels specializes in stress-free family travel from Hyderabad to the sacred pilgrimage center of Tirupati (560 KM). Highway driving with elderly parents, children, and heavy luggage requires well-maintained air-conditioned MPVs and mature, experienced chauffeurs who prioritize passenger comfort and steady cruising speeds. We provide Toyota Innova Crysta, Maruti Ertiga, and Force Tempo Travellers with complete transparency on Andhra Pradesh border permits, toll passes, and driver batta."
      highwayGuide={{
        recommendedRoute: "Hyderabad ORR -> NH 44 (Jadcherla, Kurnool) -> Kadapa -> Rajampet -> Tirupati -> Alipiri Gate -> Tirumala Ghat Road",
        bestDepartureTime: "5:00 AM – 6:00 AM (for relaxed daylight transit reaching Tirupati foot-hills by 4:00 PM for evening freshening and cottage check-in)",
        gateOrTollInfo: "All commercial vehicles hold yellow plates and clear TTD security checks at Alipiri Gate before climbing Tirumala Ghat.",
        drivingTips: [
          "TTD Alipiri Toll Gate has strict vehicle security; carrying original passenger Aadhaar cards and SED darshan printouts is mandatory.",
          "Our chauffeurs know clean family highway food courts at Jadcherla, Kurnool, and Kadapa.",
          "Tirumala first ghat road (uphill) and second ghat road (downhill) follow strict TTD time windows and speed limits.",
          "We arrange direct vehicle parking near your booked TTD accommodation or private hotel.",
        ],
      }}
      halts={[
        {
          name: "Tirumala Venkateswara Temple",
          desc: "The world-renowned sacred Kaliyuga Vaikuntam shrine of Lord Venkateswara atop the Seven Hills.",
        },
        {
          name: "Padmavathi Ammavari Temple",
          desc: "Divine consort shrine in Tiruchanur (5 KM from Tirupati) traditionally visited along with Balaji.",
        },
        {
          name: "Sri Kalahasti Temple",
          desc: "Ancient Vayu Linga Kshetram (38 KM from Tirupati) famous worldwide for Rahu-Kethu Sarpa Dosha Nivarana pujas.",
        },
        {
          name: "Kanipakam Varasiddhi Vinayaka",
          desc: "Miraculous self-manifested (Swayambhu) water-well Ganesha temple located 70 KM from Tirupati.",
        },
        {
          name: "Kapila Theertham",
          desc: "Sacred mountain waterfall and Shiva shrine situated right at the base of the Tirumala foothills.",
        },
        {
          name: "Chandragiri Fort",
          desc: "Historic 11th-century Vijayanagara Empire palace and sound-and-light architectural monument.",
        },
      ]}
      packages={[
        {
          title: "Tirupati Balaji 3-Day Pilgrimage",
          duration: "3 Days / 2 Nights",
          idealFor: "Families with booked Special Entry Darshan (SED ₹300) tickets",
          sedanPrice: "₹14,999 Base",
          suvPrice: "₹18,500 Base",
          innovaPrice: "₹21,850 Base",
          tempoPrice: "₹31,500 Base",
          highlights: [
            "Day 1: 5:00 AM pickup, highway transit, arrival in Tirupati by 4 PM",
            "Day 2: Ascent to Tirumala, Lord Venkateswara darshan & Tiruchanur",
            "Day 3: Breakfast and scenic daylight drive back to Hyderabad",
            "Doorstep pickup & drop across Hyderabad included",
            "State permit and night halt driver allowances included",
          ],
        },
        {
          title: "Tirupati + Kalahasti + Kanipakam",
          duration: "4 Days / 3 Nights",
          idealFor: "Complete Chittoor spiritual circuit for joint families",
          sedanPrice: "From ₹12/KM",
          suvPrice: "From ₹15/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹25/KM",
          highlights: [
            "Covers Tirumala Balaji, Padmavathi Temple, Sri Kalahasti Rahu-Kethu & Kanipakam",
            "Flexible darshan schedules accommodating all family members",
            "Dedicated vehicle at your service for local city and hilltop movement",
            "Experienced highway driver who manages local temple parking",
          ],
        },
        {
          title: "Tirupati One-Way Express Drop",
          duration: "Single Day Transit",
          idealFor: "One-way transfers to Tirupati hotels or Renigunta Airport",
          sedanPrice: "₹7,500 Flat",
          suvPrice: "₹9,500 Flat",
          innovaPrice: "₹11,500 Flat",
          tempoPrice: "₹18,000 Flat",
          highlights: [
            "Non-stop express highway transfer from your Hyderabad home",
            "Direct drop at Tirupati railway station, hotel, or hilltop cottage",
            "Zero surge guarantee with all highway tolls included",
          ],
        },
      ]}
      faqs={[
        {
          q: "What route is followed from Hyderabad to Tirupati?",
          a: "We generally operate via NH 44 through Jadcherla, Kurnool, Kadapa, and Rajampet to Tirupati. This road is extensively 4-laned, offering smooth speeds and modern food courts.",
        },
        {
          q: "Can your cab go up the Tirumala Ghat road directly to our cottage?",
          a: "Yes. All our vehicles carry commercial yellow-board RTA permits and pass TTD security toll checks at Alipiri Gate for ascent to Tirumala hilltop.",
        },
        {
          q: "Do you offer doorstep pickup in Kukatpally, KPHB, and Hitec City?",
          a: "Yes, our chauffeur arrives directly at your home doorstep at your chosen departure hour with a clean, fully-fueled, and air-conditioned vehicle.",
        },
        {
          q: "Are Andhra Pradesh state boundary permits included?",
          a: "Yes, our quotations clearly outline Andhra Pradesh inter-state commercial road taxes and toll passes with complete upfront transparency.",
        },
      ]}
      mapQuery="Tirumala Venkateswara Temple Tirupati"
      destinationCoords={{ lat: 13.6288, lng: 79.4192 }}
    />
  );
}
