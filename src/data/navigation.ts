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
    href: "/bangalore-airport-taxi" as Route,
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
    href: "/bangalore-outstation-cabs" as Route,
    name: "Outstation Routes",
    type: "dropdown",
    children: [
      { id: ncNanoId(), href: "/bangalore-to-mysuru-cabs" as Route, name: "Bengaluru to Mysuru" },
      { id: ncNanoId(), href: "/bangalore-to-tirupati-cabs" as Route, name: "Bengaluru to Tirupati" },
      { id: ncNanoId(), href: "/bangalore-to-coorg-cabs" as Route, name: "Bengaluru to Coorg" },
      { id: ncNanoId(), href: "/bangalore-to-ooty-cabs" as Route, name: "Bengaluru to Ooty" },
      { id: ncNanoId(), href: "/bangalore-to-chennai-cabs" as Route, name: "Bengaluru to Chennai" },
      { id: ncNanoId(), href: "/bangalore-to-mangaluru-cabs" as Route, name: "Bengaluru to Mangaluru" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/locations" as Route,
    name: "Service Locations",
    type: "dropdown",
    children: [
      { id: ncNanoId(), href: "/cabs-in-begur" as Route, name: "Begur" },
      { id: ncNanoId(), href: "/cabs-in-electronic-city" as Route, name: "Electronic City" },
      { id: ncNanoId(), href: "/cabs-in-koramangala" as Route, name: "Koramangala" },
      { id: ncNanoId(), href: "/cabs-in-hsr-layout" as Route, name: "HSR Layout" },
      { id: ncNanoId(), href: "/cabs-in-whitefield" as Route, name: "Whitefield" },
      { id: ncNanoId(), href: "/cabs-in-indiranagar" as Route, name: "Indiranagar" },
      { id: ncNanoId(), href: "/cabs-in-jayanagar" as Route, name: "Jayanagar" },
      { id: ncNanoId(), href: "/cabs-in-yelahanka" as Route, name: "Yelahanka" },
      { id: ncNanoId(), href: "/kempegowda-airport-taxi" as Route, name: "Kempegowda Airport (BLR)" },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = NAVIGATION_DEMO;
