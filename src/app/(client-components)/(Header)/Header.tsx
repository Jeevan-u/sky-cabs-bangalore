import React, { FC } from "react";
import MainNav1 from "./MainNav1";

export interface HeaderProps {
  navType?: "MainNav1";
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 border-b border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-colors ${className}`}
    >
      <MainNav1 />
    </header>
  );
};

export default Header;
