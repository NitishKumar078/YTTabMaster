import React from "react";
import { FaHome, FaCog } from "react-icons/fa";

interface NavbarProps {
  activeTab: "home" | "settings";
  setActiveTab: (tab: "home" | "settings") => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="navbar">
      <button
        className={`nav-button ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        <FaHome /> Home
      </button>
      <button
        className={`nav-button ${activeTab === "settings" ? "active" : ""}`}
        onClick={() => setActiveTab("settings")}
      >
        <FaCog /> Settings
      </button>
    </div>
  );
};

export default Navbar;