import React, { useState, useEffect } from "react";
import Sidebar from "./Layout/NavBar";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import "./index.css";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [activeTab, setActiveTab] = useState<
    "home" | "Youtube" | "settings" | "profile"
  >("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="color-red-500">
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
