import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

function Gifts() {
  const navigate = useNavigate();

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
        <p></p>
      </div>
    </div>
  );
}

export default Gifts;
