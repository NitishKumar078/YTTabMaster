import React from "react";

interface SettingsProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const Settings: React.FC<SettingsProps> = ({ toggleTheme, theme }) => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div
        className="theme-toggle"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "1.5rem 1rem",
        }}
      >
        <label htmlFor="theme-switch" style={{ fontWeight: 500 }}>
          Switch Theme:
        </label>
        <label
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            id="theme-switch"
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            style={{ display: "none" }}
          />
          <span
            style={{
              width: "40px",
              height: "22px",
              background: theme === "dark" ? "#333" : "#ccc",
              borderRadius: "22px",
              position: "relative",
              transition: "background 0.3s",
              display: "inline-block",
              marginRight: "0.5rem",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: theme === "dark" ? "20px" : "2px",
                top: "2px",
                width: "18px",
                height: "18px",
                background: "#fff",
                borderRadius: "50%",
                transition: "left 0.3s",
              }}
            />
          </span>
          {theme === "light" ? "Light" : "Dark"}
        </label>
      </div>
    </div>
  );
};

export default Settings;
