import { AuthorType } from "./types";
import { Route } from "@/routers/types";

const REAL_AUTHORS: AuthorType[] = [
  {
    id: 1,
    firstName: "Rathan",
    lastName: "Kanna",
    displayName: "Rathan Kanna",
    email: "rathankanna@srisadhgurutoursandtravels.com",
    avatar: "/images/sri-sadhguru-travels-banner.jpg",
    bgImage: "/images/Airport-cabs.jpg",
    count: 420,
    href: "/about" as Route,
    desc: "Proprietor and Managing Director at Sri Sadhguru Tours & Travels. Overseeing 24x7 fleet operations across Telangana & AP.",
    jobName: "Proprietor & MD",
  },
  {
    id: 2,
    firstName: "Kukatpally",
    lastName: "Dispatch",
    displayName: "Kukatpally Fleet Desk",
    email: "dispatch@srisadhgurutoursandtravels.com",
    avatar: "/images/Airport-hyderabad.jpg",
    bgImage: "/images/Airport-hyderabad.jpg",
    count: 512,
    href: "/cabs-in-kukatpally" as Route,
    desc: "Central dispatch hub ensuring 10-15 minute doorstep cab arrivals across Kukatpally, KPHB Colony, and Miyapur.",
    jobName: "Operations Manager",
  },
  {
    id: 3,
    firstName: "Airport",
    lastName: "Express",
    displayName: "Shamshabad Airport Wing",
    email: "airport@srisadhgurutoursandtravels.com",
    avatar: "/images/Airport-cabs.jpg",
    bgImage: "/images/Airport-cabs.jpg",
    count: 380,
    href: "/shamshabad-airport-taxi" as Route,
    desc: "24x7 Airport cab service with fixed transparent pricing, zero surge rates, and on-time flight pickup guarantees.",
    jobName: "Airport Dispatch Lead",
  },
  {
    id: 4,
    firstName: "Pilgrimage",
    lastName: "Tours",
    displayName: "South India Pilgrimage Wing",
    email: "tours@srisadhgurutoursandtravels.com",
    avatar: "/images/srisailam-dam.jpg",
    bgImage: "/images/Tirupati.jpg",
    count: 260,
    href: "/#packages" as Route,
    desc: "Specialized hill chauffeurs for Srisailam, Tirupati, Shirdi, and Sabarimala pilgrimage journeys.",
    jobName: "Tour Coordinator",
  },
];

export const DEMO_AUTHORS = REAL_AUTHORS;
