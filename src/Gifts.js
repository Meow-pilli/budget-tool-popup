import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Gifts.css";
import useGiftsTotal from "./hooks/useGiftsTotal";
import { useData } from "./context/DataContext";

export const initialGiftsData = [
  { item: "Family", budget: 500.0, spent: 0.0 },
  { item: "Friends", budget: 250.0, spent: 0.0 },
  { item: "Co-workers", budget: 0.0, spent: 0.0 },
  { item: "Teachers, nannies, babysitters, etc.", budget: 0.0, spent: 0.0 },
  { item: "Charitable donations", budget: 0.0, spent: 0.0 },
];

function Gifts() {
  //const [data, setData] = useState(initialData);
  const {data, setData} = useData();
  console.log("🚀 ~ Gifts ~ data:", data)
  const navigate = useNavigate();

  const totalBudget = useGiftsTotal(data, "budget");
  const totalSpent = useGiftsTotal(data, "spent");
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
        <div className="gifts-center-content">
          <img src="/Gifts1.png" alt="Gifts" className="gifts-icon" />
          <h1 className="gifts-title">Gifts</h1>
        </div>
        <button type = "button" className="gifts-close-button" onClick={() => navigate("/")}>
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
                      onChange={(e) => handleInputChange(index, "item", e.target.value)}
                      placeholder="Enter Category"
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
    {/* Empty cells for alignment */}
    <td colSpan="4"></td>
    {/* Add Row Button in ACTION column */}
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
