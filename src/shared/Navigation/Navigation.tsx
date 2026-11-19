import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";

function Navigation() {
  return (
    <ul className="nc-Navigation hidden lg:flex items-center space-x-0.5 xl:space-x-1 relative flex-nowrap whitespace-nowrap flex-shrink-0">
      {NAVIGATION_DEMO.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
