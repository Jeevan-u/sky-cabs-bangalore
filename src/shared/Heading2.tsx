import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "Sri Sadhguru Tours & Travels",
  subHeading,
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          50+ Commercial Cabs
          <span className="mx-2">·</span>
          Kukatpally, Hyderabad, RGIA Airport & Outstation Circuits
          <span className="mx-2">·</span>24/7 Available
        </span>
      )}
    </div>
  );
};

export default Heading2;
