import React, { useEffect } from "react";

interface SettingsProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
  togglefunctionOption: () => void;
  functionOption: string | Boolean
}


const Settings: React.FC<SettingsProps> = ({ toggleTheme, theme, togglefunctionOption, functionOption }) => {


  return (
    <div className={`settings-page ${theme}`}>
      <div className="settings-card">
        <h1 className="settings-title">Settings</h1>

        {/* Theme toggle */}
        <div className="toggle-row">
          <span className="toggle-label">Theme</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-status">
            {theme === "light" ? "Light" : "Dark"}
          </span>
        </div>

        {/* Function highlighter toggle */}
        <div className="toggle-row">
          <span className="toggle-label">Function Highlighter</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={Boolean(functionOption)}
              onChange={togglefunctionOption}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-status">
            {functionOption ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
