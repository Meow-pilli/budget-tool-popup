import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const menuItems = [
  { name: "Gifts", icon: "/Gifts1.png", isOpen: false },
  { name: "Travel", icon: "/Travel1.png", isOpen: false },
  { name: "Food & Drinks", icon: "/Drinks1.png", isOpen: false },
  { name: "Entertainment", icon: "/Entertainment1.png", isOpen: false },
  { name: "Decorations", icon: "/Decorations1.png", isOpen: false },
  { name: "Costumes & Clothing", icon: "/Costumes1.png", isOpen: false },
  { name: "Stationery & Packaging", icon: "/Stationery1.png", isOpen: false },
  { name: "Charitable Contributions", icon: "/Charitable1.png", isOpen: false },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemsState, setItemsState] = useState(menuItems);

  const dropdownRef = useRef(null);
  const menuContentRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const toggleItem = (index) => {
    setItemsState((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  useEffect(() => {
    if (isMenuOpen) {
      const contentHeight = menuContentRef.current.offsetHeight - 60; // Adjust height based on content
      dropdownRef.current.style.height = `${contentHeight}px`;
      dropdownRef.current.style.width = "500px"; // Fixed width for dropdown
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
            {itemsState.map((item, index) => (
              <li
                key={item.name}
                className="menu-item"
                onClick={() => toggleItem(index)}
              >
                <img src={item.icon} alt={item.name} className="menu-icon" />
                <span>{item.name}</span>
                <div
                  className={`arrow ${
                    item.isOpen ? "arrow-up" : "arrow-down"
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
