import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Hyderabad to Shirdi Cabs - 3-Day Sai Baba Tour Package",
  description:
    "Book Hyderabad to Shirdi cabs with Sri Sadhguru Travels. 3-Day pilgrimage package covering Shirdi Sai Baba, Shani Shingnapur & Trimbakeshwar in Innova Crysta or Tempo Traveller. Call 8106 117704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/hyderabad-to-shirdi-cabs",
  },
};

export default function HyderabadToShirdiPage() {
  return (
    <RouteLandingTemplate
      routeName="Hyderabad to Shirdi"
      destinationName="Shirdi Sai Baba Samadhi Mandir"
      distance="620 KM (One-Way) · 1,350 KM (Round Trip)"
      duration="11 to 12 Hours via NH 44 / Nanded"
      badgeText="Shirdi Sai Baba & Shani Shingnapur Yatra Special"
      h1Title="Hyderabad to Shirdi Cabs & Tour Packages"
      tagline="Stress-Free 3-Day / 2-Night & 4-Day Pilgrimage Packages with Maharashtra Inter-State Commercial Permits, Innova Crystas & Tempo Travellers."
      overview="Traveling 620 KM from Hyderabad to Shirdi requires seasoned long-distance chauffeurs, reliable climate control, and well-maintained commercial vehicles. Sri Sadhguru Tours & Travels provides turnkey Shirdi tour packages covering Samadhi Mandir darshan, Dwarkamai, Shani Shingnapur, and optional Jyotirlinga visits to Trimbakeshwar (Nashik) or Grishneshwar (Ellora). We handle all Maharashtra inter-state road taxes, toll passes, and driver allowances with complete pricing clarity."
      highwayGuide={{
        recommendedRoute: "Hyderabad ORR -> NH 44 (Kamareddy, Nizamabad) -> Nirmal / Bhainsa -> Nanded -> Jalna -> Aurangabad -> Shirdi",
        bestDepartureTime: "4:00 AM – 5:00 AM (to reach Nanded by lunch and arrive in Shirdi by 5:30 PM for evening Dhoop Aarti)",
        gateOrTollInfo: "All vehicles carry Maharashtra commercial entry permits and Fastag for smooth highway toll passage.",
        drivingTips: [
          "A steady 4:30 AM departure lets you cross the Telangana-Maharashtra border smoothly before midday.",
          "Our chauffeurs know verified hygienic vegetarian food courts around Nizamabad, Nanded, and Jalna.",
          "Shani Shingnapur (72 KM from Shirdi) is ideally visited on Day 2 or on the return journey.",
          "Temple VIP darshan passes and special aarti passes should be booked in advance on the official Shri Saibaba Sansthan portal.",
        ],
      }}
      halts={[
        {
          name: "Sai Baba Samadhi Mandir",
          desc: "The sacred resting place and divine focal shrine of Sri Sai Baba in the heart of Shirdi.",
        },
        {
          name: "Dwarkamai & Chavadi",
          desc: "The holy dilapidated mosque where Sai Baba lived for 60 years and lit the eternal Dhuni fire.",
        },
        {
          name: "Shani Shingnapur",
          desc: "Legendary village 72 KM from Shirdi famous for the open-air Swayambhu black stone idol of Lord Shani.",
        },
        {
          name: "Trimbakeshwar Jyotirlinga",
          desc: "One of the 12 sacred Jyotirlingas situated near Nashik, surrounded by the picturesque Brahmagiri hills.",
        },
        {
          name: "Grishneshwar Jyotirlinga",
          desc: "The 12th and last Jyotirlinga located near Ellora Caves and Daulatabad Fort.",
        },
        {
          name: "Gurusthan & Lendi Baug",
          desc: "The neem tree site where Baba was first spotted as a youth and the garden he watered daily.",
        },
      ]}
      packages={[
        {
          title: "Shirdi + Shani Shingnapur 3-Day Tour",
          duration: "3 Days / 2 Nights",
          idealFor: "Most popular family pilgrimage package",
          sedanPrice: "₹18,500 Base",
          suvPrice: "₹22,500 Base",
          innovaPrice: "₹25,650 Base",
          tempoPrice: "₹37,800 Base",
          highlights: [
            "Day 1: 4:30 AM start from Hyderabad, arrival in Shirdi by 5 PM, evening Kakad aarti",
            "Day 2: Morning VIP Samadhi darshan, Dwarkamai, drive to Shani Shingnapur",
            "Day 3: Breakfast and leisurely daytime drive back to Hyderabad",
            "Doorstep pickup & drop across Hyderabad included",
            "Maharashtra inter-state tax & driver allowance included",
          ],
        },
        {
          title: "Shirdi + Trimbakeshwar + Nashik (4 Days)",
          duration: "4 Days / 3 Nights",
          idealFor: "Pilgrims visiting both Sai Baba & Trimbakeshwar Jyotirlinga",
          sedanPrice: "From ₹12/KM",
          suvPrice: "From ₹15/KM",
          innovaPrice: "From ₹19/KM",
          tempoPrice: "From ₹25/KM",
          highlights: [
            "Covers Shirdi Samadhi, Shani Shingnapur, Trimbakeshwar Jyotirlinga & Panchavati",
            "Complete vehicle dedicated for all 4 days with flexible schedules",
            "Comfortable overnight stays in Shirdi and Nashik",
            "Experienced highway chauffeur for Maharashtra circuits",
          ],
        },
        {
          title: "Tempo Traveller Shirdi Group Yatra",
          duration: "3 to 4 Days (12 to 26 Seater)",
          idealFor: "Joint families, community groups, and bhajana mandalis",
          sedanPrice: "N/A",
          suvPrice: "N/A",
          innovaPrice: "N/A",
          tempoPrice: "₹37,800 (12S) / ₹42,500 (17S)",
          highlights: [
            "Force Tempo Traveller with pushback AC recliner seats",
            "Rooftop luggage carrier & spacious cabin aisle",
            "Surround music system for devotional Sai bhajans",
            "Doorstep pickup of all family members in Hyderabad",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is the driving duration from Hyderabad to Shirdi?",
          a: "The ~620 KM drive takes approximately 11 to 12 hours including breakfast, lunch, and tea breaks. Our chauffeurs take the smooth NH 44 via Kamareddy and Nizamabad toward Nanded and Jalna.",
        },
        {
          q: "Are Maharashtra state boundary commercial road taxes included?",
          a: "Yes, our quotations clearly cover Maharashtra inter-state commercial road tax permits so you experience zero checkpoint delays at the state border.",
        },
        {
          q: "Can we include Shani Shingnapur during our Shirdi pilgrimage?",
          a: "Absolutely! Most pilgrims visit Shani Shingnapur (approx. 72 KM from Shirdi) on day 2 afternoon or on the return journey back to Hyderabad.",
        },
        {
          q: "Do you offer doorstep pickup across Kukatpally, Miyapur, and KPHB?",
          a: "Yes, our driver arrives right at your home doorstep in Kukatpally, KPHB, Miyapur, Hitec City, or Gandhari with a sanitized, air-conditioned vehicle.",
        },
      ]}
      mapQuery="Shirdi Sai Baba Samadhi Mandir Maharashtra"
      destinationCoords={{ lat: 19.7667, lng: 74.4764 }}
    />
  );
}
