import { AuthorType } from "./types";
import { Route } from "@/routers/types";

const REAL_AUTHORS: AuthorType[] = [
  {
    id: 1,
    firstName: "Sky Cabs",
    lastName: "Bangalore",
    displayName: "Sky Cabs Bangalore",
    email: "skycabsbangalore@gmail.com",
    avatar: "/images/Airport-cabs.jpg",
    bgImage: "/images/Airport-cabs.jpg",
    count: 420,
    href: "/about" as Route,
    desc: "Sky Cabs Bangalore handles 24x7 cab dispatch across Begur, Electronic City, Koramangala and every major Bengaluru neighbourhood with clean AC vehicles and transparent fares.",
    jobName: "Travel Desk",
  },
  {
    id: 2,
    firstName: "Sky Cabs",
    lastName: "Bangalore",
    displayName: "Sky Cabs Bangalore Dispatch",
    email: "skycabsbangalore@gmail.com",
    avatar: "/images/images1.jpg",
    bgImage: "/images/corporate/command-center-dispatch.jpg",
    count: 512,
    href: "/cabs-in-begur" as Route,
    desc: "Bengaluru dispatch desk arranging doorstep pickups across Begur, HSR Layout, BTM Layout, JP Nagar and Jayanagar. Vehicle allocation is subject to availability.",
    jobName: "Dispatch Lead",
  },
  {
    id: 3,
    firstName: "Sky Cabs",
    lastName: "Bangalore",
    displayName: "Sky Cabs Bangalore Airport Desk",
    email: "skycabsbangalore@gmail.com",
    avatar: "/images/Airport-cabs.jpg",
    bgImage: "/images/Airport-cabs.jpg",
    count: 380,
    href: "/bangalore-airport-taxi" as Route,
    desc: "Round-the-clock airport transfer desk for Kempegowda International Airport (BLR), Devanahalli, with fixed fares from Whitefield, Marathahalli, Indiranagar and North Bengaluru.",
    jobName: "Airport Dispatch Lead",
  },
  {
    id: 4,
    firstName: "Sky Cabs",
    lastName: "Bangalore",
    displayName: "Sky Cabs Bangalore Tours",
    email: "skycabsbangalore@gmail.com",
    avatar: "/images/Tirupati.jpg",
    bgImage: "/images/Hampi.jpg",
    count: 260,
    href: "/#packages" as Route,
    desc: "Outstation desk for Bengaluru getaways to Mysuru, Tirupati, Coorg, Ooty, Chennai, Mangaluru, Hampi and other Karnataka escapes. Confirm availability before booking.",
    jobName: "Tour Coordinator",
  },
];

export const DEMO_AUTHORS = REAL_AUTHORS;
