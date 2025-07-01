import { useEffect, useState } from "react";

export function useGetwincrrWidth(initialVal?: number) {
  const [width, setwidth] = useState(initialVal || window.innerWidth);

  useEffect(() => {
    const handleResize = () => setwidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Set initial width in case initialVal is provided
    setwidth(window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, setwidth };
}
