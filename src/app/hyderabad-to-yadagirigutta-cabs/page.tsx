import React from "react";
import { Metadata } from "next";
import RouteLandingTemplate from "@/components/RouteLandingTemplate";

export const metadata: Metadata = {
  title: "Hyderabad to Yadagirigutta Cabs - Same-Day Yadadri Temple Tour",
  description:
    "Book Hyderabad to Yadagirigutta cabs with Sri Sadhguru Travels. Same-day round trip for Sri Lakshmi Narasimha Swamy darshan in Swift Dzire, Ertiga or Innova Crysta. Call 8106 117704.",
  alternates: {
    canonical: "https://www.srisadhgurutoursandtravels.com/hyderabad-to-yadagirigutta-cabs",
  },
};

export default function HyderabadToYadagiriguttaPage() {
  return (
    <RouteLandingTemplate
      routeName="Hyderabad to Yadagirigutta"
      destinationName="Sri Lakshmi Narasimha Swamy Temple (Yadadri)"
      distance="65 KM (One-Way) · 140 KM (Round Trip)"
      duration="1.5 Hours via Warangal Highway (NH 163)"
      badgeText="Same-Day Yadadri Temple Darshan Special"
      h1Title="Hyderabad to Yadagirigutta Cabs & Tour Packages"
      tagline="Punctual Doorstep Pickup, Chilled AC Cabs & Transparent Round-Trip Packages for Sri Lakshmi Narasimha Swamy Darshan at Yadadri."
      overview="Located just 65 KM from Hyderabad along the smooth 4-lane Hyderabad-Warangal Highway (NH 163), Sri Lakshmi Narasimha Swamy Temple atop Yadagirigutta (Yadadri) is Telangana's most grandly renovated architectural temple marvel. Sri Sadhguru Tours & Travels provides prompt same-day cab and bus bookings from Kukatpally, KPHB, Miyapur, Hitec City, and Secunderabad, allowing families and devotees to perform morning darshan, participate in sevas, and return comfortably by evening."
      highwayGuide={{
        recommendedRoute: "Hyderabad ORR Exit 9 (Ghatkesar) -> NH 163 (Warangal Highway) -> Bhongir Bypass -> Yadagirigutta Hill Road",
        bestDepartureTime: "6:00 AM – 7:00 AM (for quick 1.5-hour highway cruise to attend Suprabhata Seva or morning Sarva Darshan before queues build)",
        gateOrTollInfo: "Smooth 4-lane highway with Fastag tolls; hill ascent allows private and commercial taxis with dedicated parking.",
        drivingTips: [
          "The modern 4-lane NH 163 expressway offers effortless driving with multiple highway breakfast food courts.",
          "Combine your Yadadri pilgrimage with an optional visit to the historic Bhongir Fort or Surendrapuri Mythological Museum.",
          "Our chauffeurs wait for you at the hilltop or base parking while you complete darshan and prasadam collection.",
          "Ideal for family special occasions: Ayushya homam, vehicle pujas, and wedding vows.",
        ],
      }}
      halts={[
        {
          name: "Sri Lakshmi Narasimha Swamy Main Temple",
          desc: "Grand Krishna Shila black-granite renovated hill temple with 7 majestic gopurams and sacred cave sanctum.",
        },
        {
          name: "Surendrapuri Kunda Satyanarayana Kaladhamam",
          desc: "Spectacular 3-KM mythological museum (located 5 KM from Yadadri) depicting celestial Hindu realms.",
        },
        {
          name: "Bhongir Fort (Bhuvanagiri)",
          desc: "Massive monolithic rock fortress built in the 10th century by Western Chalukya ruler Tribhuvanamalla Vikramaditya VI.",
        },
        {
          name: "Kolanupaka Jain Temple",
          desc: "Over 2,000 years old historic Jain shrine in Aler (25 KM from Yadadri) featuring an authentic jade Mahavira idol.",
        },
      ]}
      packages={[
        {
          title: "Yadadri Same-Day Half-Day Tour",
          duration: "Half-Day (6 Hours / 150 KM)",
          idealFor: "Quick morning or evening darshan trip",
          sedanPrice: "₹2,499 Flat",
          suvPrice: "₹3,199 Flat",
          innovaPrice: "₹3,999 Flat",
          tempoPrice: "₹5,999 Flat",
          highlights: [
            "Doorstep pickup at your scheduled hour",
            "Direct hill transit to Yadadri temple parking",
            "Waiting time included while you complete darshan",
            "Return drop to your doorstep in Hyderabad",
          ],
        },
        {
          title: "Yadadri + Surendrapuri Full-Day Tour",
          duration: "Full-Day (10 Hours / 200 KM)",
          idealFor: "Families with kids wishing to visit Surendrapuri theme park",
          sedanPrice: "₹3,199 Flat",
          suvPrice: "₹3,999 Flat",
          innovaPrice: "₹4,999 Flat",
          tempoPrice: "₹7,499 Flat",
          highlights: [
            "Morning darshan at Sri Lakshmi Narasimha Swamy Temple",
            "Lunch halt at highway vegetarian restaurant",
            "Afternoon tour of Surendrapuri Mythological Museum",
            "Photo stop at historic Bhongir Fort",
            "Return to Hyderabad by evening",
          ],
        },
        {
          title: "Yadadri + Kolanupaka Heritage Circuit",
          duration: "Full-Day Extended (12 Hours / 250 KM)",
          idealFor: "Spiritual seekers exploring ancient Telangana temples",
          sedanPrice: "₹3,799 Base",
          suvPrice: "₹4,699 Base",
          innovaPrice: "₹5,899 Base",
          tempoPrice: "₹8,800 Base",
          highlights: [
            "Yadagirigutta Narasimha Swamy darshan",
            "2000-year-old Kolanupaka Someswara & Jain temple visit",
            "Comfortable AC ride with experienced chauffeur",
            "Transparent pricing with all tolls and parking included",
          ],
        },
      ]}
      faqs={[
        {
          q: "How long does it take to reach Yadagirigutta from Hyderabad?",
          a: "The ~65 KM drive takes approximately 1 hour 30 minutes from Kukatpally, KPHB, or central Hyderabad via the Outer Ring Road and the 4-lane NH 163 Warangal Highway.",
        },
        {
          q: "Will the cab wait while we complete temple darshan?",
          a: "Yes! All our round-trip packages include generous waiting time at the temple parking while you finish darshan, offer pujas, and collect laddu prasadam.",
        },
        {
          q: "Can we book a larger 7-seater or Tempo Traveller for extended family?",
          a: "Yes, we offer Maruti Ertiga (6+1), Toyota Innova Crysta (7+1 captain seats), and 12 to 26-seater Force Tempo Travellers with dual AC and ample boot space.",
        },
        {
          q: "Are toll fees and driver allowances included?",
          a: "Yes, our flat quotes clearly itemize highway toll charges and driver batta so you experience zero surprise fees on your sacred journey.",
        },
      ]}
      mapQuery="Sri Lakshmi Narasimha Swamy Temple Yadagirigutta Yadadri"
      destinationCoords={{ lat: 17.5878, lng: 78.9405 }}
    />
  );
}
