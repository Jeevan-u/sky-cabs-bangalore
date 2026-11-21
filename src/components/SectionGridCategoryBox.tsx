import CardCategoryBox1 from "@/components/CardCategoryBox1";
import Heading from "@/shared/Heading";
import { TaxonomyType } from "@/data/types";
import React from "react";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/bangalore-airport-taxi",
    name: "Kempegowda International Airport (BLR)",
    taxonomy: "category",
    count: 1420,
    thumbnail:
      "https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/bangalore-to-mysuru-cabs",
    name: "Mysuru Palace",
    taxonomy: "category",
    count: 850,
    thumbnail:
      "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/bangalore-to-tirupati-cabs",
    name: "Tirupati Balaji Darshan",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/cabs-in-indiranagar",
    name: "Yelahanka & Jayanagar",
    taxonomy: "category",
    count: 940,
    thumbnail:
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/bangalore-to-ooty-cabs",
    name: "Tirupati Temple",
    taxonomy: "category",
    count: 620,
    thumbnail:
      "https://images.pexels.com/photos/161401/fountain-water-features-water-architecture-161401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "6",
    href: "/bangalore-to-coorg-cabs",
    name: "Coorg Coffee Estate Circuit",
    taxonomy: "category",
    count: 480,
    thumbnail:
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/bangalore-outstation-cabs",
    name: "Chennai & Hampi",
    taxonomy: "category",
    count: 730,
    thumbnail:
      "https://images.pexels.com/photos/1486976/pexels-photo-1486976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "8",
    href: "/listing-car",
    name: "Begur & Bengaluru Cabs",
    taxonomy: "category",
    count: 2150,
    thumbnail:
      "https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover great places near where you live"
        isCenter={headingCenter}
      >
        Explore nearby
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
          <CardComponentName key={i} taxonomy={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
