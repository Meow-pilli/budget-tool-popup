import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./globals.css";

import Gifts from "./routes/Gifts";
import DataProvider from "./context/DataContext";
import Home from "./Home";
import GlobalForm from "./components/GlobalForm";
import Travel from "./routes/Travel";
import FoodAndDrinks from "./routes/FoodAndDrinks";
import Entertainment from "./routes/Entertainment";
import Budget from "./routes/Budget";
import { routeUrls } from "./routes/routeUrls";
import Decorations from "./routes/Decorations";
import CostumesAndClothing from "./routes/CostumesAndClothing";
import StationeryAndPackaging from "./routes/StationeryAndPackaging";
import CharitableContributions from "./routes/CharitableContributions";
import Insights from "./routes/Insights";

// const location = useLocation();

function App() {
  return (
    <GlobalForm>
    <DataProvider>
    <Router>
        {/* Routes for Pages */}
        {/* Routes */}
        <Routes>
          <Route path={routeUrls.gifts} element={<Gifts />} />
          <Route path="/" element={<Home />} />
          <Route path={routeUrls.travels} element={<Travel />} />
          <Route path={routeUrls.foodAndDrinks} element={<FoodAndDrinks />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/decorations" element={<Decorations />} />
          <Route path="/costumes-and-clothing" element={<CostumesAndClothing />} />
          <Route path="/stationery-and-packaging" element={<StationeryAndPackaging />} />
          <Route path="/charitable-contributions" element={<CharitableContributions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
    </Router>
    </DataProvider>
    </GlobalForm>
  );
}

export default App;