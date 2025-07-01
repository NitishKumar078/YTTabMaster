import { Home, Bell, Settings, User, Youtube } from "lucide-react";
import React from "react";

interface NavbarProps {
  activeTab: "home" | "notifications" | "settings" | "profile";
  setActiveTab: (
    tab: "home" | "notifications" | "settings" | "profile"
  ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar-modern">
      <button
        className={`nav-modern-item${activeTab === "home" ? " active" : ""}`}
        onClick={() => setActiveTab("home")}
        title="Home"
      >
        <Home className="nav-modern-icon" />
        <span className="nav-modern-label">Home</span>
      </button>
      <button
        className={`nav-modern-item${
          activeTab === "notifications" ? " active" : ""
        }`}
        onClick={() => setActiveTab("notifications")}
        title="Notifications"
      >
        <Youtube className="nav-modern-icon" />
        <span className="nav-modern-label">Notifications</span>
      </button>
      <button
        className={`nav-modern-item${
          activeTab === "settings" ? " active" : ""
        }`}
        onClick={() => setActiveTab("settings")}
        title="Settings"
      >
        <Settings className="nav-modern-icon" />
        <span className="nav-modern-label">Settings</span>
      </button>
      <button
        className={`nav-modern-item${activeTab === "profile" ? " active" : ""}`}
        onClick={() => setActiveTab("profile")}
        title="Profile"
      >
        <User className="nav-modern-icon" />
        <span className="nav-modern-label">Profile</span>
      </button>
    </nav>
  );
};

export default Navbar;
