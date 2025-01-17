import { Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import useTotal from "../hooks/useTotal";
import { useCurrencySymbol } from "../hooks/useCurrencySymbol";

ChartJS.register(ArcElement, Tooltip, Legend);

const Insights = () => {
  const navigate = useNavigate();
  const { watch } = useFormContext();

  // Fetch the currency symbol
  const currencySymbol = useCurrencySymbol();

  // Watch data for each category from the form context
  const categories = [
    { name: "Gifts", formKey: "gifts", color: "#E24831" },
    { name: "Travel", formKey: "travels", color: "#FF93B8" },
    { name: "Food & Drinks", formKey: "foodAndDrinks", color: "#786DD3" },
    { name: "Entertainment", formKey: "entertainment", color: "#2088E7" },
    { name: "Decorations", formKey: "decorations", color: "#21C1E7" },
    { name: "Costumes & Clothing", formKey: "costumesAndClothing", color: "#63AB5C" },
    { name: "Stationery & Packaging", formKey: "stationeryAndPackaging", color: "#EAC934" },
    { name: "Charitable Contributions", formKey: "charitableContributions", color: "#65328C" },
  ].map((category) => {
    const data = watch(category.formKey) || []; // Get data for the category
    return {
      ...category,
      budget: useTotal("budget", data), // Calculate total budget for the category
      spent: useTotal("spent", data), // Calculate total spent for the category
    };
  });

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const pieDataSpent = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map((cat) => cat.spent),
        backgroundColor: categories.map((cat) => cat.color),
      },
    ],
  };

  const doughnutDataBudget = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map((cat) => cat.budget),
        backgroundColor: categories.map((cat) => cat.color),
      },
    ],
  };

  const legendItems = categories.map((cat) => (
    <div key={cat.name} className="flex items-center space-x-2">
      <div
        className="w-4 h-4"
        style={{
          backgroundColor: cat.color,
          borderRadius: "0", // Makes it a square
        }}
      ></div>
      <span className="text-sm">{cat.name}</span>
    </div>
  ));

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <header
        className="flex items-center justify-center relative p-2 bg-[#2088E7]"
      >
        <div className="flex items-center gap-[1vw]">
          <img
            src="/images/Insights.png"
            alt="Insights"
            className="w-[12vh] h-[12vh]"
          />
          <h1 className={`text-[1.6rem] font-bold`} style={{ color: "black" }}>
            Insights
          </h1>
        </div>
        <button
          type="button"
          className="absolute top-[10px] right-[10px] w-[30px] h-[30px] border-[2px] border-white rounded-full bg-transparent text-white flex items-center justify-center text-[15px] font-normal hover:bg-gradient-to-r hover:from-white hover:to-[#ffcccc] hover:text-[#E24831] hover:scale-110 active:scale-95 transition-transform"
          onClick={() => navigate("/")}
        >
          ✖
        </button>
      </header>

      {/* Insights Content */}
      <div className="flex-grow p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Spent Chart */}
          <Card className="flex flex-col items-center">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-center uppercase">Total Spent</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="w-2/3">
                <Pie
                  data={pieDataSpent}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) =>
                            `${currencySymbol} ${(tooltipItem.raw as number).toFixed(2)}`,
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="w-1/3 flex flex-col justify-center items-start p-4 space-y-2">
                {legendItems}
              </div>
            </CardContent>
          </Card>

          {/* Total Budget Chart */}
          <Card className="flex flex-col items-center">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-center uppercase">Total Budget</CardTitle>
            </CardHeader>
            <CardContent className="flex relative">
              <div className="w-2/3 relative">
                <Doughnut
                  data={doughnutDataBudget}
                  options={{
                    cutout: "75%",
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) =>
                            `${currencySymbol} ${(tooltipItem.raw as number).toFixed(2)}`,
                        },
                      },
                    },
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-sm text-gray-500">Total Budget</span>
                  <div className="text-4xl font-bold">
                    {currencySymbol} {totalBudget.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex flex-col justify-center items-start p-4 space-y-2">
                {legendItems}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget vs Spent */}
        <Card>
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-center uppercase">Budget vs Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold text-green-500">
                  {currencySymbol} {totalSpent.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-black">
                  {currencySymbol} {remainingBudget.toFixed(2)}
                </span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${(totalSpent / totalBudget) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between w-full text-sm">
                <span className="text-green-500">Budget Spent</span>
                <span className="text-black">Budget Remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
