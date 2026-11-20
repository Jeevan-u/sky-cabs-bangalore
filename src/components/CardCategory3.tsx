"use client";

import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import { SpotlightCard, AnimatedCounter } from "@/components/reactbits";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  return (
    <Link href={href} className={`nc-CardCategory3 block group ${className}`}>
      <SpotlightCard
        className="p-2.5 sm:p-3 !rounded-2xl transition-all duration-300 group-hover:border-primary-500/40 group-hover:shadow-xl"
        spotlightColor="rgba(245, 158, 11, 0.22)"
      >
        <div
          className="flex-shrink-0 relative w-full aspect-[4/3] rounded-xl overflow-hidden"
        >
          <Image
            src={thumbnail || ""}
            className="object-cover w-full h-full rounded-xl group-hover:scale-108 transition-transform duration-500"
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, 300px"
          />
          <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity"></span>
        </div>
        <div className="mt-2 sm:mt-3.5 px-0.5 sm:px-1 truncate">
          <h2
            className="text-xs sm:text-lg text-neutral-900 dark:text-neutral-100 font-bold truncate group-hover:text-primary-600 transition-colors"
          >
            {name}
          </h2>
          <span
            className="block mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-medium truncate"
          >
            <AnimatedCounter to={count || 0} duration={1.2} />+ Monthly Rides
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default CardCategory3;
