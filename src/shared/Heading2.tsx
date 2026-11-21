import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "Sky Cabs Bangalore",
  subHeading,
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          4+1 to 52-Seater Vehicles
          <span className="mx-2">·</span>
          Bengaluru, Kempegowda Airport & Outstation Routes
          <span className="mx-2">·</span>24/7 · Subject to Availability
        </span>
      )}
    </div>
  );
};

export default Heading2;
