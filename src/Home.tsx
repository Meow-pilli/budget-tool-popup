import { useEffect, useRef, useState } from "react";
// import { useData } from "./context/DataContext";
// import CustomDropdown from "./CustomDropdown";
import useTotal from "./hooks/useTotal";
import HolidayForm from "./components/HolidayForm";
import { Link, useNavigate } from "react-router-dom";
import holidayTrackerImg from "./Black2.png";
import { useFormContext } from "react-hook-form";

const menuItems = [
  { name: "Gifts", icon: "/Gifts.png", isOpen: false, link: "/gifts", formKey: "gifts" },
  { name: "Travel", icon: "/Travel.png", isOpen: false, link: "/travel", formKey: "travels" },
  {
    name: "Food & Drinks",
    icon: "/Drinks1.png",
    isOpen: false,
    link: "/food-and-drinks",
    formKey: "foodAndDrinks",
  },
  {
    name: "Entertainment",
    icon: "/Entertainment.png",
    isOpen: false,
    link: "/entertainment",
    formKey: "entertainment",
  },
  {
    name: "Decorations",
    icon: "/Decorations.png",
    isOpen: false,
    link: "/decorations",
    formKey: "decorations",
  },
  {
    name: "Costumes & Clothing",
    icon: "/Costumes1.png",
    isOpen: false,
    link: "/costumes-and-clothing",
    formKey: "costumesAndClothing",
  },
  {
    name: "Stationery & Packaging",
    icon: "/Stationery1.png",
    isOpen: false,
    link: "/stationery-and-packaging",
    formKey: "stationeryAndPackaging",
  },
  {
    name: "Charitable Contributions",
    icon: "/Charitable1.png",
    isOpen: false,
    link: "/charitable-contributions",
    formKey: "charitableContributions",
  },
];

function Home() {
  const navigate = useNavigate();
  //const { data } = useData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemsState, setItemsState] = useState(menuItems);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log("🚀 ~ handleClickOutside ~ event:", event);
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as HTMLDivElement) &&
      isClickOutsideArea(dropdownRef.current, event)
    ) {
      setIsMenuOpen(false);
    }
  };

  // const toggleItem = (index) => {
  //   setItemsState((prev) =>
  //     prev.map((item, i) =>
  //       i === index ? { ...item, isOpen: !item.isOpen } : item
  //     )
  //   );
  // };

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
              {itemsState.map((item, index) => (
                <li
                  key={item.name}
                  className="menu-item"
                  // onClick={() => navigate(item.link)}
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

  if (
    clickX < rect.left ||
    clickX > rect.right ||
    clickY < rect.top ||
    clickY > rect.bottom
  ) {
    return true;
  }

  return false;
}

interface CategoryTotalProps {
  item: typeof menuItems[0];
}

function CategoryTotal({ item }: CategoryTotalProps) {
  const { watch } = useFormContext();
  const data = watch(item.formKey);
  const currency = watch("currency") || "$"; // Ensure default is $

  const totalSpent = useTotal("spent", data);

  // Ensure totalSpent is formatted to 2 decimal places
  const formattedTotal = `${currency} ${Number(totalSpent).toFixed(2)}`;

  return <span className="menu-item-value">{formattedTotal}</span>;
}