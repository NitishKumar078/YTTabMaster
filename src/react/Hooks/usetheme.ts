import react, { useState, useEffect } from "react";
import { getlocalstorage, setlocalstorage } from "../utils/localStorage";

export function usetheme(initialVal?: "light" | "dark") {
  const [theme, setTheme] = useState<"light" | "dark">(initialVal || "light");

  // Load saved settings on first render
  useEffect(() => {
    const savedTheme = getlocalstorage("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    // if (savedHighlight === "true" || savedHighlight === "false") {
    //   setFunctionHighlight(savedHighlight === "true");
    // }
  }, []);

  useEffect(() => {
    setlocalstorage("theme", theme);
    // Optionally apply the theme class to the <html> or <body> for dark mode
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return { theme, setTheme };
}
