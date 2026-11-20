import React, { FC } from "react";

export interface BackgroundSectionProps {
  className?: string;
  children?: React.ReactNode;
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
  className = "bg-neutral-100 dark:bg-black dark:bg-opacity-20 ",
  children,
}) => {
  return (
    <div
      className={`nc-BackgroundSection absolute inset-0 rounded-3xl lg:rounded-[40px] z-0 ${className}`}
      data-nc-id="BackgroundSection"
    >
      {children}
    </div>
  );
};

export default BackgroundSection;
