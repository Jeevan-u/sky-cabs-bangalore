import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Hyderabad to Srisailam Cabs - 1 & 2 Day Pilgrimage Packages",
  description:
    "Book Hyderabad to Srisailam cabs with Sri Sadhguru Travels. Swift Dzire, Innova Crysta, Tempo Traveller for Mallikarjuna Jyotirlinga darshan. Experienced ghat drivers. Call 8106 117704.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/hyderabad-to-srisailam-cabs",
  },
};

export default function HyderabadToSrisailamPage() {
  return (
    <RouteLandingTemplate
      routeName="Hyderabad to Srisailam"
      destinationName="Srisailam Mallikarjuna Jyotirlinga Temple"
      distance="213 KM (One-Way) · 450 KM (Round Trip)"
      duration="4.5 to 5 Hours via Nallamala Forest"
      badgeText="Sacred Mallikarjuna Jyotirlinga Darshan Special"
      h1Title="Hyderabad to Srisailam Cabs & Tour Packages"
      tagline="Specialized 1-Day Express & 2-Day Leisure Jyotirlinga Darshan Packages with Hill-Trained Chauffeurs, AC Fleet & Guaranteed Zero Surge Pricing."
      overview="Sri Sadhguru Tours & Travels is Hyderabad's most trusted travel partner for the sacred Srisailam pilgrimage. Located 213 KM from Hyderabad via Kalwakurthy, Dindi, and the Nallamala forest, this scenic highway journey requires disciplined, experienced drivers who understand ghat road hairpins, forest checkpost gate timings, and temple darshan schedules. We provide 24x7 doorstep pickup across Kukatpally, KPHB, Miyapur, Hitec City, Medchal, and Shamshabad Airport."
      highwayGuide={{
        recommendedRoute: "Hyderabad ORR -> Kalwakurthy -> Dindi Reservoir -> Munnanur Forest Checkpost -> Srisailam Dam -> Srisailam Temple",
        bestDepartureTime: "4:00 AM – 5:30 AM (cross Munnanur gate right when it opens at 6:00 AM to reach before temple rush)",
        gateOrTollInfo: "Amrabad Tiger Reserve / Munnanur Checkpost is strictly closed for night traffic from 9:00 PM to 6:00 AM.",
        drivingTips: [
          "Ghat section hairpins require experienced hill chauffeurs; our drivers have 7+ years of Nallamala ghat driving experience.",
          "Stop at Dindi Reservoir or Munnanur forest cafeteria for hygienic breakfast and refreshments.",
          "Monsoon and post-monsoon trips (July–Nov) offer breathtaking views of the Srisailam Dam spillway gates.",
          "All vehicles carry commercial yellow plates, valid state RTA permits, Fastag, and comprehensive passenger insurance.",
        ],
      }}
      halts={[
        {
          name: "Mallikarjuna Swamy Temple",
          desc: "Ancient 2nd of the 12 sacred Shiva Jyotirlingas and 18 Maha Shakti Peethas (Bhramaramba Devi).",
        },
        {
          name: "Srisailam Dam & Reservoir",
          desc: "One of South India's largest hydroelectric dams spanning the majestic Krishna River.",
        },
        {
          name: "Patala Ganga & Ropeway",
          desc: "Sacred bathing ghat on the Krishna River accessible via modern ropeway cable car or steps.",
        },
        {
          name: "Sakshi Ganapathi Temple",
          desc: "Sacred shrine where Lord Ganesha keeps record (sakshi) of every pilgrim visiting Srisailam.",
        },
        {
          name: "Paladhara Panchadhara",
          desc: "Scenic natural mountain springs where Adi Shankaracharya performed rigorous penance.",
        },
        {
          name: "Sikharam Peak",
          desc: "The highest hill peak in Srisailam providing a panoramic view of the temple and Nallamala forest.",
        },
      ]}
      packages={[
        {
          title: "Srisailam Same-Day Express Tour",
          duration: "1 Day (Same-Day Return)",
          idealFor: "Pilgrims with limited time wanting quick darshan",
          sedanPrice: "₹5,500 Flat",
          suvPrice: "₹6,800 Flat",
          innovaPrice: "₹8,500 Flat",
          tempoPrice: "₹12,500 Flat",
          highlights: [
            "Early morning 4:30 AM doorstep pickup in Hyderabad",
            "Morning darshan at Mallikarjuna Swamy Temple",
            "Visit Sakshi Ganapathi & Srisailam Dam View",
            "Return to Hyderabad by 9:30 PM",
            "Doorstep drop included",
          ],
        },
        {
          title: "Srisailam 2-Day Leisure Darshan",
          duration: "2 Days / 1 Night",
          idealFor: "Families & senior citizens seeking relaxed temple visit",
          sedanPrice: "₹7,500 Base",
          suvPrice: "₹9,200 Base",
          innovaPrice: "₹11,500 Base",
          tempoPrice: "₹16,500 Base",
          highlights: [
            "Day 1: Scenic drive, check-in, evening aarti & Patala Ganga",
            "Day 2: Early morning special darshan & Sikhareswaram",
            "Ropeway & boat ride to Akkamahadevi Caves (optional)",
            "Leisurely return drive with daylight forest views",
            "Night halt allowance included",
          ],
        },
        {
          title: "Srisailam + Mahanandi + Ahobilam",
          duration: "3 Days / 2 Nights",
          idealFor: "Grand spiritual circuit covering 3 divine kshetras",
          sedanPrice: "From ₹12/KM",
          suvPrice: "From ₹15/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹25/KM",
          highlights: [
            "Covers Srisailam Jyotirlinga, Mahanandi temple tank & Ahobilam 9 Narasimhas",
            "Complete vehicle dedicated for 3 full days",
            "Transparent per-km billing (300 km/day minimum)",
            "Chauffeur familiar with all 3 temple traditions",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is the best departure time from Hyderabad for a Srisailam same-day trip?",
          a: "We recommend starting between 4:00 AM and 5:00 AM from Kukatpally, KPHB, or central Hyderabad. This allows you to reach the Munnanur forest gate shortly after it opens at 6:00 AM and arrive at Srisailam by 9:00 AM before peak darshan queues.",
        },
        {
          q: "Are your drivers trained for ghat road and Nallamala forest driving?",
          a: "Yes. All chauffeurs assigned to the Srisailam route have a minimum of 7 years of ghat road experience, adhere strictly to speed limits in tiger reserve corridors, and maintain safe overtaking discipline.",
        },
        {
          q: "What vehicles are available for family trips to Srisailam?",
          a: "We provide Maruti Swift Dzire (4+1), Maruti Ertiga (6+1), Toyota Innova Crysta (7+1 captain seats), and Force Tempo Travellers (12 to 26 seaters) with chilled AC, pushback seats, and clean interiors.",
        },
        {
          q: "Are toll charges, parking, and driver batta included in the quotation?",
          a: "Our package quotes clearly itemize toll charges, forest entry fees, and driver allowances with 100% upfront clarity and zero hidden surcharges.",
        },
      ]}
      mapQuery="Sri Bhramaramba Mallikarjuna Temple Srisailam"
      destinationCoords={{ lat: 16.0748, lng: 78.8682 }}
    />
  );
}
