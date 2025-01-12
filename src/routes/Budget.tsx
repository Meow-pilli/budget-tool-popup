import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";
import useTotal from "../hooks/useTotal";

export type BudgetCategory = {
  item: string;
  budget: string;
  spent: string;
};

const budgetData: BudgetCategory[] = [
  { item: "Gifts", budget: "500", spent: "0" },
  { item: "Travels", budget: "300", spent: "0" },
  { item: "Food & Drinks", budget: "400", spent: "0" },
  { item: "Entertainment", budget: "200", spent: "0" },
  { item: "Decorations", budget: "150", spent: "0" },
  { item: "Costumes & Clothing", budget: "100", spent: "0" },
  { item: "Stationery & Packaging", budget: "50", spent: "0" },
  { item: "Charitable Contributions", budget: "75", spent: "0" },
];

export const initialBudgetData: BudgetCategory[] = budgetData;

function Budget() {
  const form = useFormContext();
  const { watch } = form;

  // Watch data for all categories
  const categories = {
    gifts: watch("gifts"),
    travels: watch("travels"),
    foodAndDrinks: watch("foodAndDrinks"),
    entertainment: watch("entertainment"),
    decorations: watch("decorations"),
    costumesAndClothing: watch("costumesAndClothing"),
    stationeryAndPackaging: watch("stationeryAndPackaging"),
    charitableContributions: watch("charitableContributions"),
  };

  console.log("Categories Data:", categories); // Debug categories data

  // Calculate totals for budget and spent dynamically
  const budgetTotals = Object.entries(categories).map(([key, data]) => {
    console.log(`Data for ${key}:`, data); // Debug each category data

    if (!data) return { item: key, budget: "0", spent: "0" };

    const budgetTotal = useTotal("budget", data);
    const spentTotal = useTotal("spent", data);

    console.log(`${key} Budget Total:`, budgetTotal); // Debug budget total
    console.log(`${key} Spent Total:`, spentTotal); // Debug spent total

    return {
      item: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      budget: budgetTotal.toFixed(2),
      spent: spentTotal.toFixed(2),
    };
  });

  console.log("Budget Totals:", budgetTotals); // Debug final budget totals

  const { fields, append, remove } = useFieldArray({
    name: "budget",
  });

  return (
    <CategoryLayout
      type="budget"
      categoryFields={budgetTotals.map((total, index) => ({
        id: fields[index]?.id || `${index}`,
        name: total.item,
        budget: total.budget,
        spent: total.spent,
      }))}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })} // Add logic
      onRemoveRow={remove} // Remove logic
      headerConfig={{
        color: "#21C1E7",
        title: "Budget",
        icon: "/images/Budget.png", // Update with the correct path to the Budget icon
        textColor: "black",
      }}
    />
  );
}

export default Budget;
