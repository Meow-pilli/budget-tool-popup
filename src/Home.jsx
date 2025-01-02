import React, { useEffect, useRef, useState } from "react";
import { useData } from "./context/DataContext";
import CustomDropdown from "./CustomDropdown";
import useGiftsTotal from "./hooks/useGiftsTotal";
import HolidayForm from "./components/HolidayForm";

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

function Home() {
  const { data = {}, setData } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemsState, setItemsState] = useState(menuItems);
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const totalGiftsSpent = useGiftsTotal(data, "spent");

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
      // document.addEventListener("mousedown", handleClickOutside);
    } else {
      dropdownRef.current.style.height = "0";
      dropdownRef.current.style.width = "0";
      // document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
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

            <HolidayForm/>
            {/* <div className="dropdown-container">
              <div className="holiday-dropdown">
                <CustomDropdown
                  options={[
                    {
                      value: "",
                      label: "-- Select a Holiday --",
                      disabled: true,
                    },
                    { value: "Christmas", label: "Christmas" },
                    { value: "Thanksgiving", label: "Thanksgiving" },
                    { value: "New Year", label: "New Year" },
                    { value: "Easter", label: "Easter" },
                    { value: "Halloween", label: "Halloween" },
                  ]}
                  selectedOption={selectedHoliday}
                  setSelectedOption={setSelectedHoliday}
                  placeholder="-- Select a Holiday --"
                />
              </div>

              <div className="currency-dropdown">
                <CustomDropdown
                  options={[
                    {
                      value: "",
                      label: "-- Select a Currency --",
                      disabled: true,
                    },
                    { value: "Dollar ($)", label: "Dollar ($)" },
                    { value: "Pound (£)", label: "Pound (£)" },
                    { value: "Euro (€)", label: "Euro (€)" },
                    { value: "Rupees (₹)", label: "Rupees (₹)" },
                    { value: "Yen (¥)", label: "Yen (¥)" },
                  ]}
                  selectedOption={selectedCurrency}
                  setSelectedOption={setSelectedCurrency}
                  placeholder="-- Select a Currency --"
                />
              </div>
            </div> */}

            {/* Menu Items */}
            <ul>
              {itemsState.map((item, index) => (
                <li
                  key={item.name}
                  className="menu-item"
                  onClick={() => (window.location.href = item.link)}
                >
                  <img src={item.icon} alt={item.name} className="menu-icon" />
                  <span>
                    {item.name} ({item.name === "Gifts" ? totalGiftsSpent: 0})
                  </span>
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
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

export default Home;
