import React, { useState } from "react";
import "./CustomDropdown.css"; // Import styles if you want a dedicated CSS file

function CustomDropdown({ options, selectedOption, setSelectedOption, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {selectedOption || placeholder}
      </button>
      <ul className={isOpen ? "visible" : ""}>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => !option.disabled && handleOptionClick(option.value)}
            className={option.disabled ? "disabled" : ""}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomDropdown;
