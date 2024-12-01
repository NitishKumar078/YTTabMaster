import React from "react";

interface SettingsProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const Settings: React.FC<SettingsProps> = ({ toggleTheme, theme }) => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="theme-toggle">
        <label>Switch Theme:</label>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default Settings;