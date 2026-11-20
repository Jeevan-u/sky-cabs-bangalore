"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // When pathname changes, finish progress animation
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Intercept all internal anchor clicks for instant visual feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only track internal navigation (starts with / and not # or external or same page)
      if (
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.includes("#") &&
        !target.hasAttribute("download") &&
        target.target !== "_blank"
      ) {
        if (href !== window.location.pathname) {
          setLoading(true);
          setProgress(40);
        }
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3px] bg-transparent"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-amber-500 to-emerald-500 shadow-sm shadow-primary-500/50 transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "150ms" : "300ms",
        }}
      />
    </div>
  );
}
