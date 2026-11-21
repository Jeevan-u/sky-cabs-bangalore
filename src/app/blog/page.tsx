import React from "react";
import { Metadata } from "next";
import { DEMO_POSTS } from "@/data/posts";
import SectionAds from "./SectionAds";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { DocumentTextIcon } from "@/components/icons";
import { StarBorder, ShinyText } from "@/components/reactbits";

export const metadata: Metadata = {
  title: "Travel Guides, Pilgrimage Routes & Car Rental Insights",
  description:
    "Expert travel guides, Mysuru & Tirupati pilgrimage tips, Kempegowda airport taxi advice, and vehicle booking guides from Sky Cabs Bangalore.",
  alternates: {
    canonical: "https://skycabsbangalore.com/blog",
  },
};

// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      {/* ======= START CONTAINER ============= */}
      <div className="container relative">
        {/* === HERO HEADER === */}
        <div className="pt-12 pb-6 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block">
            <StarBorder as="div" color="#f59e0b" speed="3.5s">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                <DocumentTextIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <ShinyText text="Travel Guides & Road Trip Insights" speed={3} />
              </div>
            </StarBorder>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Sky Cabs Bangalore Blog & Highway Guides
          </h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium">
            Explore trusted road trip advice, temple darshan schedules, airport taxi tips, and vehicle hire comparisons across Bengaluru, Karnataka, and South India.
          </p>
        </div>

        {/* === SECTION 1 === */}
        <div className="pb-16 lg:pb-28">
          <SectionMagazine5 posts={MAGAZINE1_POSTS} />
        </div>

        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        <SectionLatestPosts className="py-16 lg:py-28" />

        {/* === SECTION 1 === */}
        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default BlogPage;
