import React, { useState, useEffect } from "react";
import Sidebar from "./Layout/NavBar";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import "./App.css";
import Youtube from "./Pages/Youtube";
import Notes from "./Pages/Notes";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [activeTab, setActiveTab] = useState<
    "home" | "Youtube" | "settings" | "profile" | "notes"
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
        {(() => {
          if (activeTab === "home") {
            return <Home />;
          } else if (activeTab === "Youtube") {
            return <Youtube />;
          } else if (activeTab === "settings") {
            return <Settings toggleTheme={toggleTheme} theme={theme} />;
          } else if (activeTab === "notes") {
            return <Notes />;
          }
        })()}
      </div>
    </div>
  );
};

export default App;
