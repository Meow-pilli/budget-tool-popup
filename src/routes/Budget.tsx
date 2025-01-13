import { formatCurrency } from "@/components/utils/format";
import { useCurrencySymbol } from "@/hooks/useCurrencySymbol";
import { useFieldArray, useFormContext } from "react-hook-form";
import { calculateTotal } from "../hooks/useTotal";
import { categoryConfig } from "./CategoryLayout/categoryConfig";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

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

const HEADER_PROPS = {
  color: "#21C1E7",
  title: "Budget",
  icon: "/images/Budget.png",
  textColor: "black",
};

function Budget() {
  const form = useFormContext();
  const { control, watch } = form;

  const { append } = useFieldArray({
    control,
    name: 'gifts',
  });

  const categoryKeys = Object.keys(categoryConfig);
  const allCategoriesData = watch(categoryKeys).flat();

  const totalBudget = allCategoriesData.reduce((acc, val) => {
    return acc + +val.budget;
  }, 0);

  const totalSpent = allCategoriesData.reduce((acc, val) => {
    return acc + +val.spent;
  }, 0);

  const currencySymbol = useCurrencySymbol();

  const rows = categoryKeys.map(categoryKey => {
    const categoryData = watch(categoryKey);
    
    const totalCategoryBudgetNumber = calculateTotal(categoryData, "budget");
    const totalCategoryBudget = formatCurrency(totalCategoryBudgetNumber, currencySymbol)!;

    const totalCategorySpentNumber = calculateTotal(categoryData, "spent");
    const totalCategorySpent = formatCurrency(totalCategorySpentNumber, currencySymbol)!;
    
    const totalCategoryDifferenceNumber = parseFloat(totalCategoryBudgetNumber) - parseFloat(totalCategorySpentNumber);
    const totalCategoryDifference = formatCurrency(String(totalCategoryDifferenceNumber), currencySymbol)!;

    const budgetRow: BudgetRow = {
      id: categoryKey,
      name: categoryConfig[categoryKey]?.title!,
      totalCategoryBudget,
      totalCategorySpent,
      totalCategoryDifference,
    };

    return budgetRow;
  });

  return (
    <CategoryLayout
      header={<CategoryLayout.Header {...HEADER_PROPS} />}
      categoryData={<BudgetDataRows rows={rows}/>}
      dataFooter={<CategoryLayout.DataFooter onAddRow={() => append({ item: "", budget: "0", spent: "0" })} totalBudget={totalBudget} totalSpent={totalSpent} />}
    />
  );
}

export default Budget;

type BudgetRow = {
  id: string;
  name: string;
  totalCategoryBudget: string,
  totalCategorySpent: string,
  totalCategoryDifference: string,
};

type BudgetDataRowsType = {
  rows: BudgetRow[],
}

function BudgetDataRows({ rows }: BudgetDataRowsType) {
  return rows.map((r, index) => {
    return (<tr key={r.id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
    } border-[#e0e0e0]`}>
      <td className="p-2">{r.name}</td>
      <td className="p-2">{r.totalCategoryBudget}</td>
      <td className="p-2">{r.totalCategorySpent}</td>
      <td className="p-2">{r.totalCategoryDifference}</td>
      <td className="p-2"></td>
    </tr>);
  })
}
