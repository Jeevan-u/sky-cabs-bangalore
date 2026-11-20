"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import FloatingTravelDock from "@/components/FloatingTravelDock";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/driver");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="relative">
        {children}
      </main>
      <FloatingTravelDock />
      <FooterNav />
      <Footer />
    </>
  );
}
