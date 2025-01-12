import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";
import useTotal from "../hooks/useTotal";

export type BudgetCategory = {
  item: string;
  budget: string;
  spent: string;
};

export const initialBudgetData: BudgetCategory[] = [
  { item: "Gifts", budget: "500", spent: "0" },
  { item: "Travels", budget: "300", spent: "0" },
  { item: "Food & Drinks", budget: "400", spent: "0" },
  { item: "Entertainment", budget: "200", spent: "0" },
  { item: "Decorations", budget: "150", spent: "0" },
  { item: "Costumes & Clothing", budget: "100", spent: "0" },
  { item: "Stationery & Packaging", budget: "50", spent: "0" },
  { item: "Charitable Contributions", budget: "75", spent: "0" },
];

function Budget() {
  const { control, watch } = useFormContext();

  // Categories array with form keys
  const categories = [
    { name: "Gifts", formKey: "gifts" },
    { name: "Travels", formKey: "travels" },
    { name: "Food & Drinks", formKey: "foodAndDrinks" },
    { name: "Entertainment", formKey: "entertainment" },
    { name: "Decorations", formKey: "decorations" },
    { name: "Costumes & Clothing", formKey: "costumesAndClothing" },
    { name: "Stationery & Packaging", formKey: "stationeryAndPackaging" },
    { name: "Charitable Contributions", formKey: "charitableContributions" },
  ];

  // Calculate totals dynamically
  const budgetTotals = categories.map((category) => {
    const data = watch(category.formKey) || []; 
    const budgetTotal = useTotal("budget", data); // Calculate total budget
    const spentTotal = useTotal("spent", data); // Calculate total spent
    return {
      item: category.name,
      budget: budgetTotal ? budgetTotal.toFixed(2) : "0",
      spent: spentTotal ? spentTotal.toFixed(2) : "0", 
    };
  });

  console.log("Budget Totals:", budgetTotals); // Debugging

  const { fields, append, remove } = useFieldArray({
    control,
    name: "budget",
  });

  return (
    <CategoryLayout
      type="budget"
      categoryFields={fields.map((field, index) => ({
        id: field.id,
        name: budgetTotals[index]?.item,
        budget: budgetTotals[index]?.budget,
        spent: budgetTotals[index]?.spent,
      }))}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#21C1E7",
        title: "Budget",
        icon: "/images/Budget.png",
        textColor: "black",
      }}
    />
  );
}

export default Budget;
