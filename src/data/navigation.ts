import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/" as Route,
    name: "Home",
    type: "none",
  },
  {
    id: ncNanoId(),
    href: "/listing-car" as Route,
    name: "Our Fleet",
    type: "none",
  },
  {
    id: ncNanoId(),
    href: "/shamshabad-airport-taxi" as Route,
    name: "Airport Taxi",
    type: "none",
  },
  {
    id: ncNanoId(),
    href: "/track-booking" as Route,
    name: "Track Trip",
    type: "none",
  },
  {
    id: ncNanoId(),
    href: "/package" as Route,
    name: "Tour Packages",
    type: "dropdown",
    children: [
      { id: ncNanoId(), href: "/package/srisailam-jyotirlinga" as Route, name: "Srisailam Jyotirlinga (1-2 Day)" },
      { id: ncNanoId(), href: "/package/tirupati-balaji" as Route, name: "Tirupati Balaji Pilgrimage" },
      { id: ncNanoId(), href: "/package/shirdi-sai-baba" as Route, name: "Shirdi Sai Baba & Shani Yatra" },
      { id: ncNanoId(), href: "/package/yadagirigutta-tour" as Route, name: "Yadagirigutta Same-Day Tour" },
      { id: ncNanoId(), href: "/package/andhra-pradesh-temple-circuit" as Route, name: "Andhra Pradesh Temple Circuit" },
      { id: ncNanoId(), href: "/package/karnataka-tamil-nadu-circuits" as Route, name: "Karnataka & Tamil Nadu Circuits" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/locations" as Route,
    name: "Service Locations",
    type: "dropdown",
    children: [
      { id: ncNanoId(), href: "/cabs-in-kukatpally" as Route, name: "Kukatpally (Headquarters)" },
      { id: ncNanoId(), href: "/shamshabad-airport-taxi" as Route, name: "Shamshabad Airport Express" },
      { id: ncNanoId(), href: "/cabs-in-kphb" as Route, name: "KPHB Colony" },
      { id: ncNanoId(), href: "/cabs-in-hitec-city" as Route, name: "Hitec City & Madhapur" },
      { id: ncNanoId(), href: "/cabs-in-miyapur" as Route, name: "Miyapur Highway Hub" },
      { id: ncNanoId(), href: "/cabs-in-medchal" as Route, name: "Medchal ORR Gateway" },
      { id: ncNanoId(), href: "/cabs-in-kamareddy-gandhari" as Route, name: "Kamareddy & Gandhari Hub" },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = NAVIGATION_DEMO;
