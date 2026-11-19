import React, { FC } from "react";
import { Metadata } from "next";
import SectionGridHasMap from "../SectionGridHasMap";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export interface ListingCarMapPageProps {}

const ListingCarMapPage: FC<ListingCarMapPageProps> = () => {
  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap />
    </div>
  );
};

export default ListingCarMapPage;
