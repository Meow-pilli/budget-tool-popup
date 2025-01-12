import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import useTotal from "./hooks/useTotal";
import HolidayForm from "./components/HolidayForm";
import holidayTrackerImg from "./Black2.png";

const menuItems = [
  { name: "Gifts", icon: "images/Gifts.png", isOpen: false, link: "/gifts", formKey: "gifts" },
  { name: "Travel", icon: "images/Travel.png", isOpen: false, link: "/travel", formKey: "travels" },
  {
    name: "Food & Drinks",
    icon: "images/Food.png",
    isOpen: false,
    link: "/food-and-drinks",
    formKey: "foodAndDrinks",
  },
  {
    name: "Entertainment",
    icon: "images/Entertainment.png",
    isOpen: false,
    link: "/entertainment",
    formKey: "entertainment",
  },
  {
    name: "Decorations",
    icon: "images/Decorations.png",
    isOpen: false,
    link: "/decorations",
    formKey: "decorations",
  },
  {
    name: "Costumes & Clothing",
    icon: "images/Costumes.png",
    isOpen: false,
    link: "/costumes-and-clothing",
    formKey: "costumesAndClothing",
  },
  {
    name: "Stationery & Packaging",
    icon: "images/Card.png",
    isOpen: false,
    link: "/stationery-and-packaging",
    formKey: "stationeryAndPackaging",
  },
  {
    name: "Charitable Contributions",
    icon: "images/Charity.png",
    isOpen: false,
    link: "/charitable-contributions",
    formKey: "charitableContributions",
  },
];

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemsState] = useState(menuItems);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as HTMLDivElement) &&
      isClickOutsideArea(dropdownRef.current, event)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuContentRef.current === null || dropdownRef.current === null) {
      return;
    }
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
                src={holidayTrackerImg}
                alt="Holiday Tracker"
                className="menu-title-image"
              />
            </div>

            <HolidayForm />

            {/* Menu Items */}
            <ul>
              {itemsState.map((item) => (
                <li
                  key={item.name}
                  className="menu-item"
                >
                  <Link to={item.link} className="menu-item-link">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="menu-icon"
                    />
                    <span className="menu-item-text">
                      {item.name}
                      <CategoryTotal item={item} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Budget and Insights */}
            <div className="budget-insights-container flex justify-center gap-8 mt-4">
              <Link
                to="/budget"
                className="budget-insight-link flex flex-col items-center text-center"
              >
                <img
                  src="images/Budget.png"
                  alt="Budget"
                  className="budget-icon w-16 h-16" // Increased size
                />
                <span className="text-md">Budget</span> {/* Not bold */}
              </Link>
              <Link
                to="/insights"
                className="budget-insight-link flex flex-col items-center text-center"
              >
                <img
                  src="images/Insights.png"
                  alt="Insights"
                  className="insights-icon w-16 h-16" // Increased size
                />
                <span className="text-md">Insights</span> {/* Not bold */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

function isClickOutsideArea(element: HTMLDivElement, event: MouseEvent) {
  const rect = element.getBoundingClientRect();
  const clickX = event.clientX;
  const clickY = event.clientY;

  return (
    clickX < rect.left ||
    clickX > rect.right ||
    clickY < rect.top ||
    clickY > rect.bottom
  );
}

interface CategoryTotalProps {
  item: typeof menuItems[0];
}

function CategoryTotal({ item }: CategoryTotalProps) {
  const { watch } = useFormContext();
  const data = watch(item.formKey);
  const totalSpent = useTotal("spent", data);

  const formattedTotal = Number(totalSpent).toFixed(2);

  return <span className="menu-item-value"> {formattedTotal}</span>;
}
