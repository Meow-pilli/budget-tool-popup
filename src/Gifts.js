import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gifts.css";

const initialData = [
  { item: "Family", budget: 500.0, spent: 495.0 },
  { item: "Friends", budget: 250.0, spent: 325.0 },
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
      newData[index][key] = key === "item" ? value : parseFloat(value) || 0;
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
        <button className="gifts-close-button" onClick={() => navigate(-1)}>
          ✖
        </button>
        <div className="gifts-center-content">
          <img src="/Gifts1.png" alt="Gifts" className="gifts-icon" />
          <h1 className="gifts-title">Gifts</h1>
        </div>
      </header>
      <div className="gifts-body">
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>BUDGET</th>
              <th>SPENT</th>
              <th>DIFFERENCE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  {index < 3 ? (
                    row.item
                  ) : (
                    <input
                      type="text"
                      value={row.item || ""}
                      onChange={(e) => handleInputChange(index, "item", e.target.value)}
                      placeholder="Enter item"
                    />
                  )}
                </td>
                <td>
                  $
                  <input
                    type="number"
                    value={row.budget}
                    onChange={(e) => handleInputChange(index, "budget", e.target.value)}
                    placeholder="0.00"
                  />
                </td>
                <td>
                  $
                  <input
                    type="number"
                    value={row.spent}
                    onChange={(e) => handleInputChange(index, "spent", e.target.value)}
                    placeholder="0.00"
                  />
                  {row.spent <= row.budget ? (
                    <span className="checkmark"> ✔</span>
                  ) : (
                    <span className="cross"> ✘</span>
                  )}
                </td>
                <td>${(row.budget - row.spent).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="add-delete-row">
              <td colSpan="4" className="add-delete-row-container">
                <button onClick={addRow} className="add-row-button">
                  Add Row
                </button>
                <button
                  onClick={() => deleteRow(data.length - 1)}
                  className="delete-row-button"
                >
                  Delete Row
                </button>
              </td>
            </tr>
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
              <td>${totalDifference.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Gifts;
