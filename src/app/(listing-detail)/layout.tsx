"use client";

import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { Route } from "next";

const ModalGalleryWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`/listing-car-detail/?${params.toString()}` as Route);
  };

  return (
    <ListingImageGallery
      isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
      onClose={handleCloseModalImageGallery}
      images={listingCarImageGallery}
    />
  );
};

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ListingDetailPage">
      <Suspense fallback={null}>
        <ModalGalleryWrapper />
      </Suspense>

      <div className="container ListingDetailPage__content">{children}</div>

      {/* FOOTER CALLOUT */}
      <div className="container py-16 lg:py-20">
        <SectionSubscribe2 className="pt-10 lg:pt-16" />
      </div>
    </div>
  );
};

export default DetailtLayout;
