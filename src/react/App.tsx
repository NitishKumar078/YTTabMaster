import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Settings from "./Components/Settings";
import "./index.css";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [activeTab, setActiveTab] = useState<"home" | "settings">("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === "home" ? (
          <Home />
        ) : (
          <Settings toggleTheme={toggleTheme} theme={theme} />
        )}
      </div>
    </div>
  );
};

export default App;
