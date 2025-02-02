import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCurrencySymbol } from "../hooks/useCurrencySymbol";
import { calculateTotal } from "../hooks/useTotal";
import { categoryConfig, CategoryKeyType } from "./CategoryLayout/categoryConfig";
import TotalBudgetChart from "@/components/TotalBudgetChart";
import TotalSpentChart from "@/components/TotalSpentChart";

ChartJS.register(ArcElement, Tooltip, Legend);


type DatasetType = { 
  labels: string[];
  datasets: { 
    data: number[], 
    backgroundColor: string[],
    currency: string 
  }[];
};


const Insights = () => {
  const navigate = useNavigate();
  const { watch } = useFormContext();
  const currencySymbol = useCurrencySymbol();

  const categories = Object.entries(categoryConfig).map(([key, config]) => {
    const categoryKey = key as CategoryKeyType;
    const data = watch(categoryKey) || [];

    return {
      ...config,
      budget: parseFloat(calculateTotal(data, "budget")), //useTotal("budget", data),
      spent: parseFloat(calculateTotal(data, "spent")) //useTotal("spent", data),
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

  // const pieDataSpent = Object.entries(categoryConfig).map(([key, config]) => {
  //   const categoryKey = key as CategoryKeyType;
  //   const data = watch(categoryKey) || [];
  //   const totalSpent = parseFloat(calculateTotal(data, "spent"));

  //   return {
  //     category: categoryKey, totalSpent, fill: config.color
  //   };
  // }).filter(spentData => spentData.totalSpent > 0);

  const pieDataSpent = Object.entries(categoryConfig).reduce((acc, [key, config]) => {
      const categoryKey = key as CategoryKeyType;
      const data = watch(categoryKey) || [];
      const totalSpent = parseFloat(calculateTotal(data, "spent"));
  
      if(totalSpent > 0) {
        const label = config.title;
        const color = config.color;
        acc.labels.push(label);
        acc.datasets[0].data.push(totalSpent);
        acc.datasets[0].backgroundColor.push(color);
      }
      return acc;
    }, { labels: [], datasets: [ { data: [], backgroundColor: [], currency: currencySymbol } ] } as DatasetType);



  // const doughnutDataBudget = Object.entries(categoryConfig).map(([key, config]) => {
  //   const categoryKey = key as CategoryKeyType;
  //   const data = watch(categoryKey) || [];
  //   const totalBudget = parseFloat(calculateTotal(data, "budget"));

  //   return {
  //     category: categoryKey, totalBudget, fill: config.color
  //   };
  // }).filter(budgetData => budgetData.totalBudget > 0);

  // const doughnutDataBudget = {
  //   labels: categories.map((cat) => cat.title),
  //   datasets: [
  //     {
  //       data: categories.map((cat) => cat.budget),
  //       backgroundColor: categories.map((cat) => cat.color),
  //     },
  //   ],
  // };

  const doughnutDataBudget = Object.entries(categoryConfig).reduce((acc, [key, config]) => {
    const categoryKey = key as CategoryKeyType;
    const data = watch(categoryKey) || [];
    const totalBudget = parseFloat(calculateTotal(data, "budget"));

    if(totalBudget > 0) {
      const label = config.title;
      const color = config.color;
      acc.labels.push(label);
      acc.datasets[0].data.push(totalBudget);
      acc.datasets[0].backgroundColor.push(color);
    }
    return acc;
  }, { labels: [], datasets: [ { data: [], backgroundColor: [], currency: currencySymbol } ] } as DatasetType);


  const legendItems = (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {categories.map((cat) => (
        <div key={cat.title} className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: cat.color }}></div>
          <span className="text-sm">{cat.title}</span>
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
          <TotalBudgetChart data={doughnutDataBudget} currencySymbol={currencySymbol} total={totalBudget.toFixed(2)} />

          {/* Mobile: Legend in Between */}
          <div className="flex justify-center order-2 md:order-3 md:col-span-2">{legendItems}</div>

          {/* Mobile: Spent Chart Below, Desktop: Spent Chart on Left */}
          <TotalSpentChart data={pieDataSpent} currencySymbol={currencySymbol} />
        </div>

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
                  className={`h-full rounded-full transition-all ${budgetExceeded ? "bg-red-500" : "bg-green-500"
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
