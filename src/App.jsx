import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "./globals.css";
import CustomDropdown from "./CustomDropdown";

import Gifts, { initialGiftsData } from "./Gifts";
import useGiftsTotal from "./hooks/useGiftsTotal";
import DataProvider from "./context/DataContext";
// import Travel from "./Travel";
import Home from "./Home";
import GlobalForm from "./components/GlobalForm";
// import Travel from "./Travel";
// import FoodAndDrinks from "./FoodAndDrinks";
// import Entertainment from "./Entertainment";
// import Decorations from "./Decorations";
// import CostumesAndClothing from "./CostumesAndClothing";
// import StationeryAndPackaging from "./StationeryAndPackaging";
// import CharitableContributions from "./CharitableContributions";

// const location = useLocation();

// List of routes where the global header should not appear
const noHeaderRoutes = [
  "/gifts",
  "/travel",
  "/food-and-drinks",
  "/entertainment",
  "/decorations",
  "/costumes-and-clothing",
  "/stationery-and-packaging",
  "/charitable-contributions",
];

function App() {
  return (
    <GlobalForm>
    <DataProvider>
    <Router>
        {/* Routes for Pages */}
        {/* Routes */}
        <Routes>
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/travel" element={<Travel />} />
          <Route path="/food-and-drinks" element={<FoodAndDrinks />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/decorations" element={<Decorations />} />
          <Route path="/costumes-and-clothing" element={<CostumesAndClothing />} />
          <Route path="/stationery-and-packaging" element={<StationeryAndPackaging />} />
          <Route path="/charitable-contributions" element={<CharitableContributions />} /> */}
        </Routes>
    </Router>
    </DataProvider>
    </GlobalForm>
  );
}

export default App;