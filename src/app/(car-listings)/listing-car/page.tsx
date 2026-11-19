import React, { FC } from "react";
import { Metadata } from "next";
import SectionGridFilterCard from "../SectionGridFilterCard";

export const metadata: Metadata = {
  title: "Commercial Car Fleet & Luxury Bus Rental Rates",
  description:
    "Browse 50+ commercial vehicles from Sri Sadhguru Travels: Swift Dzire sedans, Ertiga MPVs, Toyota Innova Crysta, 12-26 seater Tempo Travellers & 50-seater AC buses in Hyderabad.",
  alternates: {
    canonical: "https://srisadgurutoursandtravels.com/listing-car",
  },
};

export interface ListingCarPageProps {}

const ListingCarPage: FC<ListingCarPageProps> = () => {
  return (
    <div className="container ">
      <SectionGridFilterCard className="pb-24 lg:pb-28" />
    </div>
  );
};

export default ListingCarPage;
