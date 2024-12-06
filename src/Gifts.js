import React from "react";
import "./Gifts.css";

const data = [
  { item: "Family", budget: 500.0, spent: 500.0, difference: 500.0 },
  { item: "Friends", budget: 500.0, spent: 500.0, difference: 500.0 },
  { item: "Co-Workers", budget: "", spent: "", difference: "" },
  { item: "Teachers", budget: "", spent: "", difference: "" },
  {
    item: "Others (tab in last columns of the row to add row)",
    budget: "",
    spent: "",
    difference: "",
  },
];

function Gifts({ onClose }) {
  const totalBudget = data.reduce((sum, row) => sum + (row.budget || 0), 0);
  const totalSpent = data.reduce((sum, row) => sum + (row.spent || 0), 0);
  const totalDifference = data.reduce(
    (sum, row) => sum + (row.difference || 0),
    0
  );

  return (
    <div className="gifts-container">
      {/* Header Section */}
      <header className="gifts-header">
        <div className="gifts-header-content">
          <img src="/Gifts1.png" alt="Gifts" className="gifts-icon" />
          <h1 className="gifts-title">Gifts</h1>
        </div>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
      </header>

      {/* Table Section */}
      <div className="gifts-table-container">
        <table className="gifts-table">
          <thead>
            <tr>
              <th>ITEMS</th>
              <th>BUDGET</th>
              <th>SPENT</th>
              <th>DIFFERENCE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td>{row.budget !== "" ? `$${row.budget.toFixed(2)}` : ""}</td>
                <td>{row.spent !== "" ? `$${row.spent.toFixed(2)}` : ""}</td>
                <td
                  className={
                    row.difference > 0
                      ? "positive-diff"
                      : row.difference < 0
                      ? "negative-diff"
                      : ""
                  }
                >
                  {row.difference > 0 && (
                    <span>✔ ${row.difference.toFixed(2)}</span>
                  )}
                  {row.difference < 0 && (
                    <span>✘ ${row.difference.toFixed(2)}</span>
                  )}
                  {row.difference === "" && ""}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>${totalBudget.toFixed(2)}</td>
              <td>${totalSpent.toFixed(2)}</td>
              <td>
                {totalDifference > 0 ? (
                  <span className="positive-diff">✔ ${totalDifference.toFixed(2)}</span>
                ) : totalDifference < 0 ? (
                  <span className="negative-diff">✘ ${totalDifference.toFixed(2)}</span>
                ) : (
                  "$0.00"
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Gifts;
