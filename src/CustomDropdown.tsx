import { useState } from "react";
import "./CustomDropdown.css"; // Import styles if you want a dedicated CSS file

// Define the type for an individual option
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

// Define the props for the CustomDropdown component
interface CustomDropdownProps {
  options: Option[];
  selectedOption: string | null;
  setSelectedOption: (value: string) => void;
  placeholder?: string;
}

function CustomDropdown({
  options,
  selectedOption,
  setSelectedOption,
  placeholder = "Select an option",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
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
