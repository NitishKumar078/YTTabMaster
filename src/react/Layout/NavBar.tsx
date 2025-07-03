import { Home, NotebookPen, Settings, Youtube } from "lucide-react";
import React from "react";

interface NavbarProps {
  activeTab: "home" | "Youtube" | "settings" | "profile" | "notes";
  setActiveTab: (
    tab: "home" | "Youtube" | "settings" | "profile" | "notes"
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
        className={`nav-modern-item${activeTab === "Youtube" ? " active" : ""}`}
        onClick={() => setActiveTab("Youtube")}
        title="Youtube"
      >
        <Youtube className="nav-modern-icon" />
        <span className="nav-modern-label">Youtube</span>
      </button>
      <button
        className={`nav-modern-item${activeTab === "notes" ? " active" : ""}`}
        onClick={() => setActiveTab("notes")}
        title="notes"
      >
        <NotebookPen className="nav-modern-icon" />
        <span className="nav-modern-label">Notes</span>
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
      {/* <button
        className={`nav-modern-item${activeTab === "profile" ? " active" : ""}`}
        onClick={() => setActiveTab("profile")}
        title="Profile"
      >
        <User className="nav-modern-icon" />
        <span className="nav-modern-label">Profile</span>
      </button> */}
    </nav>
  );
};

export default Navbar;
