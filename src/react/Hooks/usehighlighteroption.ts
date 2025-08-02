import react, { useState, useEffect } from "react";
import { getlocalstorage, setlocalstorage } from "../utils/localStorage";

export function usehighlighteroption(initialVal?: boolean) {
  const [functionOption, setfunctionOption] = useState<boolean | string>(
    initialVal || true
  );

  // Load saved settings on first render
  useEffect(() => {
    const optionvlaue: string | boolean | null =
      getlocalstorage("functionOption");
    // const savedHighlight = localStorage.getItem("functionHighlight");
    if (optionvlaue) {
      setfunctionOption(optionvlaue);
    }
  }, []);

  useEffect(() => {
    setlocalstorage("functionOption", functionOption);
    // Optionally apply the theme class to the <html> or <body> for dark mode
  }, [functionOption]);

  return { functionOption, setfunctionOption };
}
