import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import Gifts from "./Gifts";
// import Travel from "./Travel";
// import FoodAndDrinks from "./FoodAndDrinks";
// import Entertainment from "./Entertainment";
// import Decorations from "./Decorations";
// import CostumesAndClothing from "./CostumesAndClothing";
// import StationeryAndPackaging from "./StationeryAndPackaging";
// import CharitableContributions from "./CharitableContributions";

// const location = useLocation();

// List of routes where the global header should not appear
const noHeaderRoutes = [
  "/gifts",
  "/travel",
  "/food-and-drinks",
  "/entertainment",
  "/decorations",
  "/costumes-and-clothing",
  "/stationery-and-packaging",
  "/charitable-contributions",
];

const menuItems = [
  { name: "Gifts", icon: "/Gifts1.png", isOpen: false, link: "/gifts" },
  { name: "Travel", icon: "/Travel1.png", isOpen: false, link: "/travel" },
  { name: "Food & Drinks", icon: "/Drinks1.png", isOpen: false, link: "/food-and-drinks" },
  { name: "Entertainment", icon: "/Entertainment1.png", isOpen: false, link: "/entertainment" },
  { name: "Decorations", icon: "/Decorations1.png", isOpen: false, link: "/decorations" },
  { name: "Costumes & Clothing", icon: "/Costumes1.png", isOpen: false, link: "/costumes-and-clothing" },
  { name: "Stationery & Packaging", icon: "/Stationery1.png", isOpen: false, link: "/stationery-and-packaging" },
  { name: "Charitable Contributions", icon: "/Charitable1.png", isOpen: false, link: "/charitable-contributions" },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemsState, setItemsState] = useState(menuItems);
  const [selectedHoliday, setSelectedHoliday] = useState("");

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
    <Router>
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

              {/* Select a Holiday Dropdown */}
              <div className="holiday-dropdown">
              <label htmlFor="holiday-select"></label>
              <select
                id="holiday-select"
                value={selectedHoliday}
                onChange={(e) => setSelectedHoliday(e.target.value)}
              >
                <option value="" disabled>
                  -- Select a Holiday --
                </option>
                <option value="All Holidays">All Holidays</option>
                <option value="Christmas">Christmas</option>
                <option value="Thanksgiving">Thanksgiving</option>
                <option value="New Year">New Year</option>
              </select>
            </div>

            {/* Menu Items */}
            <ul>
              {itemsState.map((item, index) => (
                <li
                  key={item.name}
                  className="menu-item"
                  onClick={() => window.location.href = item.link}
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
        {/* Routes for Pages */}
        {/* Routes */}
        <Routes>
          <Route path="/gifts" element={<Gifts />} />
          {/* <Route path="/travel" element={<Travel />} />
          <Route path="/food-and-drinks" element={<FoodAndDrinks />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/decorations" element={<Decorations />} />
          <Route path="/costumes-and-clothing" element={<CostumesAndClothing />} />
          <Route path="/stationery-and-packaging" element={<StationeryAndPackaging />} />
          <Route path="/charitable-contributions" element={<CharitableContributions />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
