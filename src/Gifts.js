import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gifts.css";

const initialData = [
  { item: "Family", budget: 500.0, spent: 0.0 },
  { item: "Friends", budget: 250.0, spent: 0.0 },
  { item: "Co-workers", budget: 0.0, spent: 0.0 },
  { item: "Teachers, nannies, babysitters, etc.", budget: 0.0, spent: 0.0 },
  { item: "Charitable donations", budget: 0.0, spent: 0.0 },
];

function calculateTotal(data, key) {
  return data.reduce((acc, row) => acc + parseFloat(row[key] || 0), 0).toFixed(2);
}

function Gifts() {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();

  const totalBudget = parseFloat(calculateTotal(data, "budget"));
  const totalSpent = parseFloat(calculateTotal(data, "spent"));
  const totalDifference = parseFloat((totalBudget - totalSpent).toFixed(2));

  const handleInputChange = (index, key, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      if (key === "item") {
        newData[index][key] = value; // Non-numeric field
      } else {
        const formattedValue = parseFloat(value || 0).toFixed(2); // Format numeric inputs to two decimals
        newData[index][key] = parseFloat(formattedValue);
      }
      return newData;
    });
  };

  const addRow = () => {
    setData((prevData) => [
      ...prevData,
      { item: "", budget: 0.0, spent: 0.0 },
    ]);
  };

  const deleteRow = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const globalNavBar = document.querySelector(".nav-bar");
    const globalMenuContainer = document.querySelector(".menu-container");

    if (globalNavBar) globalNavBar.style.display = "none";
    if (globalMenuContainer) globalMenuContainer.style.display = "none";

    return () => {
      if (globalNavBar) globalNavBar.style.display = "flex";
      if (globalMenuContainer) globalMenuContainer.style.display = "block";
    };
  }, []);

  return (
    <div className="gifts-container">
      <header className="gifts-header">
        <div className="gifts-center-content">
          <img src="/Gifts1.png" alt="Gifts" className="gifts-icon" />
          <h1 className="gifts-title">Gifts</h1>
        </div>
        <button className="gifts-close-button" onClick={() => navigate(-1)}>
          ✖
        </button>
      </header>
      <div className="gifts-body">
        <table>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>BUDGET</th>
              <th>SPENT</th>
              <th>DIFFERENCE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  {index < 3 ? (
                    row.item // Fixed text for the first 3 rows
                  ) : (
                    <input
                      type="text"
                      value={row.item || ""}
                      onChange={(e) =>
                        handleInputChange(index, "item", e.target.value)
                      }
                      placeholder="Enter Category"
                    />
                  )}
                </td>
                <td>
                  $
                  <input
                    type="number"
                    step="0.01"
                    value={row.budget.toFixed(2)} // Ensure display of two decimal places
                    onChange={(e) =>
                      handleInputChange(index, "budget", e.target.value)
                    }
                    placeholder="0.00"
                  />
                </td>
                <td>
                  $
                  <input
                    type="number"
                    step="0.01"
                    value={row.spent.toFixed(2)} // Ensure display of two decimal places
                    onChange={(e) =>
                      handleInputChange(index, "spent", e.target.value)
                    }
                    placeholder="0.00"
                  />
                  {row.spent <= row.budget ? (
                    <span className="checkmark">✔</span>
                  ) : (
                    <span className="cross">✘</span>
                  )}
                </td>
                <td>
                  {row.budget - row.spent < 0
                    ? `- $${Math.abs(row.budget - row.spent).toFixed(2)}`
                    : `\u00A0 $${(row.budget - row.spent).toFixed(2)}`}
                </td>
                <td>
                  <button
                    onClick={() => deleteRow(index)}
                    className="delete-row-button circle-button"
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {/* Add Row Button */}
            <tr>
              <td colSpan="4"></td>
              <td className="add-row-cell">
                <button onClick={addRow} className="add-row-button circle-button">
                  +
                </button>
              </td>
            </tr>
            {/* Total Row */}
            <tr className="footer-row">
              <td>Total</td>
              <td>${totalBudget.toFixed(2)}</td>
              <td>
                ${totalSpent.toFixed(2)}{" "}
                {totalSpent <= totalBudget ? (
                  <span className="checkmark">✔</span>
                ) : (
                  <span className="cross">✘</span>
                )}
              </td>
              <td>
                {totalDifference < 0 ? "- $" : "\u00A0$"}
                {Math.abs(totalDifference).toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Gifts;
