import React, { useState, useEffect } from "react";
import Sidebar from "./Layout/NavBar";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import "./App.css";
import Youtube from "./Pages/Youtube";
import Notes from "./Pages/Notes";
import { usetheme } from "./Hooks/usetheme";
import { usehighlighteroption } from "./Hooks/usehighlighteroption";

const App = () => {
  const { theme, setTheme } = usetheme("dark");
  const { functionOption, setfunctionOption } = usehighlighteroption();
  const [activeTab, setActiveTab] = useState<
    "home" | "Youtube" | "settings" | "profile" | "notes"
  >("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const togglefunctionOption = () => {
    setfunctionOption((prevlaue) => !prevlaue);
  };

  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    console.log("Received message in popup:", message, sender);
    if (message.action === "hightlightoption") {
      sendResponse({ reply: functionOption });
    }
  });

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
            return (
              <Settings
                toggleTheme={toggleTheme}
                theme={theme}
                togglefunctionOption={togglefunctionOption}
                functionOption={functionOption}
              />
            );
          } else if (activeTab === "notes") {
            return <Notes />;
          }
        })()}
      </div>
    </div>
  );
};

export default App;
