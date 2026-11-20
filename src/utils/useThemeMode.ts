import { useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { isDarkmode: false };
const { useGlobalState } = createGlobalState(initialState);

export const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useGlobalState("isDarkmode");

  useEffect(() => {
    try {
      const isDark =
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches) ||
        document.documentElement.classList.contains("dark");

      if (isDark) {
        toDark();
      } else {
        toLight();
      }
    } catch (e) {
      if (document.documentElement.classList.contains("dark")) {
        toDark();
      } else {
        toLight();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toDark = () => {
    setIsDarkMode(true);
    const root = document.documentElement;
    if (root && !root.classList.contains("dark")) {
      root.classList.add("dark");
    }
    try {
      localStorage.setItem("theme", "dark");
    } catch (e) {}
  };

  const toLight = () => {
    setIsDarkMode(false);
    const root = document.documentElement;
    if (root && root.classList.contains("dark")) {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", "light");
    } catch (e) {}
  };

  function _toogleDarkMode() {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      toLight();
    } else {
      toDark();
    }
  }

  return {
    isDarkMode,
    toDark,
    toLight,
    _toogleDarkMode,
  };
};
