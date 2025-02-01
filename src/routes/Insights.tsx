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

  const currencySymbol = useCurrencySymbol();

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
    const data = watch(category.formKey) || [];
    return {
      ...category,
      budget: useTotal("budget", data),
      spent: useTotal("spent", data),
    };
  });

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

// Determine if budget is exceeded
const budgetExceeded = totalSpent > totalBudget;
const exceededAmount = totalSpent - totalBudget;

// Calculate progress bar width
const spentPercentage = Math.min((totalSpent / totalBudget) * 100, 100);

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

  const legendItems = (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {categories.map((cat) => (
        <div key={cat.name} className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: cat.color }}></div>
          <span className="text-sm">{cat.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex items-center justify-center relative p-2 bg-[#21C1E7]">
        <div className="flex items-center gap-[1vw]">
          <img src="/images/Insights.png" alt="Insights" className="w-[12vh] h-[12vh]" />
          <h1 className="text-[1.6rem] font-bold text-black">Insights</h1>
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
        {/* Mobile: Budget → Legend → Spent | Desktop: Spent → Budget → Legend Below */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
          {/* Mobile: Budget Chart First */}
          <Card className="flex flex-col items-center order-1 md:order-2">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-center uppercase">Total Budget</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full">
              <div className="relative w-[80%] h-[280px] flex justify-center">
                <Doughnut
                  data={doughnutDataBudget}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
            </CardContent>
          </Card>

          {/* Mobile: Legend in Between */}
          <div className="md:hidden flex justify-center order-2">{legendItems}</div>

          {/* Mobile: Spent Chart Below, Desktop: Spent Chart on Left */}
          <Card className="flex flex-col items-center order-3 md:order-1">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-center uppercase">Total Spent</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full">
              <div className="w-[80%] h-[280px] flex justify-center">
                <Pie
                  data={pieDataSpent}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
            </CardContent>
          </Card>
        </div>

        {/* Desktop: Legend Below Charts */}
        <div className="hidden md:flex justify-center">{legendItems}</div>

        {/* Budget vs Spent */}
        <Card>
  <CardHeader className="flex justify-center items-center">
    <CardTitle className="text-center uppercase">Budget vs Spent</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col items-center space-y-4">
      {/* Budget Summary */}
      <div className="flex items-center justify-between w-full">
        {!budgetExceeded && (
          <span className="text-lg font-bold text-black">
            {currencySymbol} {totalSpent.toFixed(2)}
          </span>
        )}
        <span className={`text-lg font-bold ${budgetExceeded ? "text-red-500 ml-auto" : "text-black"}`}>
          {currencySymbol} {budgetExceeded ? exceededAmount.toFixed(2) : remainingBudget.toFixed(2)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-6 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all ${
            budgetExceeded ? "bg-red-500" : "text-black"
          }`}
          style={{ width: `${spentPercentage}%` }}
        ></div>
      </div>

      {/* Labels for Budget Remaining or Budget Exceeded */}
      {!budgetExceeded ? (
        <div className="flex justify-between w-full text-sm">
          <span className="text-black">Budget Spent</span>
          <span className="text-black">Budget Remaining</span>
        </div>
      ) : (
        <div className="flex justify-end w-full text-sm">
          <span className="text-red-500">Budget Exceeded</span>
        </div>
      )}
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  );
};

export default Insights;
