import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const menuItems = [
  { name: "Gifts", icon: "/Gifts1.png" },
  { name: "Travel", icon: "/Travel1.png" },
  { name: "Food & Drinks", icon: "/Drinks1.png" },
  { name: "Entertainment", icon: "/Entertainment1.png" },
  { name: "Decorations", icon: "/Decorations1.png" },
  { name: "Costumes & Clothing", icon: "/Costumes1.png" },
  { name: "Stationery & Packaging", icon: "/Stationery1.png" },
  { name: "Charitable Contributions", icon: "/Charitable1.png" },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuContentRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      const contentHeight = menuContentRef.current.offsetHeight - 90; // Subtracting the footer height
      dropdownRef.current.style.height = `${contentHeight}px`;
      dropdownRef.current.style.width = "300px"; // Fixed final width
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      dropdownRef.current.style.height = "0";
      dropdownRef.current.style.width = "0";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="app">
      {/* Top Navigation Bar */}
      <div className="nav-bar">
        <button className="nav-button" onClick={toggleMenu}>
          Holiday Budget
        </button>
      </div>

      {/* Animated Dropdown Menu */}
      <div
        className={`menu-container ${isMenuOpen ? "open" : ""}`}
        ref={dropdownRef}
      >
        <div className="menu" ref={menuContentRef}>
          {/* Holiday Tracker Title at the Top */}
          <div className="menu-header">
            <img
              src={require("./Black2.png")}
              alt="Holiday Tracker"
              className="menu-title-image"
            />
          </div>

          {/* Menu Items */}
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="menu-item"
                style={{ backgroundColor: item.color }}
              >
                <img src={item.icon} alt={item.name} className="menu-icon" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
