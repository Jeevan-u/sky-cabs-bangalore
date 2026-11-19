"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import FloatingTravelDock from "@/components/FloatingTravelDock";
import { ClickSpark, ScrollProgress, CustomCursor } from "@/components/reactbits";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/driver");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <ClickSpark sparkColor="#f59e0b" sparkCount={8} sparkRadius={28} duration={400}>
      <ScrollProgress />
      <CustomCursor />
      <SiteHeader />
      {children}
      <FloatingTravelDock />
      <FooterNav />
      <Footer />
    </ClickSpark>
  );
}
