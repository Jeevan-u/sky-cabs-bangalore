"use client";

import React, { useEffect, useState } from "react";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/outline";
import { useThemeMode } from "@/utils/useThemeMode";

export interface SwitchDarkModeProps {
  className?: string;
}

const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {
  const { _toogleDarkMode, isDarkMode } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={_toogleDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`self-center text-xl w-9 h-9 md:w-10 md:h-10 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center transition-colors cursor-pointer ${className}`}
    >
      <span className="sr-only">
        {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      {mounted && isDarkMode ? (
        <SunIcon className="w-5 h-5 text-amber-400" aria-hidden="true" />
      ) : (
        <MoonIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
      )}
    </button>
  );
};

export default SwitchDarkMode;
