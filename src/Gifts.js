import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Gifts.css";

const data = [
    { item: "Family", budget: 500.0, spent: 495.0, difference: 5.0 },
    { item: "Friends", budget: 250.0, spent: 325.0, difference: -75.0 },
    { item: "Co-workers", budget: 0.0, spent: 0.0, difference: 0.0 },
    { item: "Teachers, nannies, babysitters, etc.", budget: 0.0, spent: 0.0, difference: 0.0 },
    { item: "Charitable donations", budget: 0.0, spent: 0.0, difference: 0.0 },
    { item: "Other (tab in last column of this row to add row)", budget: 0.0, spent: 0.0, difference: 0.0 },
  ];
  
function calculateTotal(data, key) {
    return data.reduce((acc, row) => acc + row[key], 0).toFixed(2);
}

function Gifts() {
  const navigate = useNavigate();
  const totalBudget = calculateTotal(data, "budget");
  const totalSpent = calculateTotal(data, "spent");
  const totalDifference = calculateTotal(data, "difference");

  useEffect(() => {
    // Hide the global menu when this component is rendered
    const globalNavBar = document.querySelector(".nav-bar");
    const globalMenuContainer = document.querySelector(".menu-container");

    if (globalNavBar) globalNavBar.style.display = "none";
    if (globalMenuContainer) globalMenuContainer.style.display = "none";

    // Restore visibility when unmounting
    return () => {
      if (globalNavBar) globalNavBar.style.display = "flex";
      if (globalMenuContainer) globalMenuContainer.style.display = "block";
    };
  }, []);

  return (
    <div className="gifts-container">
      <header className="gifts-header">
        <button className="gifts-back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <div className="gifts-center-content">
          <img src="/Gifts1.png" alt="Gifts" className="gifts-icon" />
          <h1 className="gifts-title">Gifts</h1>
        </div>
      </header>
      <div className="gifts-body">
        <p>
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
                    <td>{row.item}</td>
                    <td>${row.budget.toFixed(2)}</td>
                    <td>${row.spent.toFixed(2)}</td>
                    <td>
                        {row.difference >= 0 ? (
                        <span className="checkmark">✔ ${row.difference.toFixed(2)}</span>
                        ) : (
                        <span className="cross">✘ ${row.difference.toFixed(2)}</span>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td>Total</td>
                    <td>${totalBudget}</td>
                    <td>${totalSpent}</td>
                    <td>
                    {totalDifference >= 0 ? (
                        <span className="checkmark">✔ ${totalDifference}</span>
                    ) : (
                        <span className="cross">✘ ${totalDifference}</span>
                    )}
                    </td>
                </tr>
                </tfoot>
            </table>
        </p>
      </div>
    </div>
  );
}

export default Gifts;
