import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";
import { categoryConfig } from "./CategoryLayout/categoryConfig";
import useTotal from "@/hooks/useTotal";

export type FoodAndDrinks = {
  item: string;
  budget: string;
  spent: string;
};

export const initialFoodAndDrinksData: FoodAndDrinks[] = [
  { item: "Groceries", budget: "200", spent: "0" },
  { item: "Dining Out", budget: "150", spent: "0" },
  { item: "Special Treats", budget: "50", spent: "0" },
  { item: "Drinks", budget: "100", spent: "0" },
];

const TYPE = 'foodAndDrinks';

function FoodAndDrinks() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: TYPE,
  });

  const headerProps = categoryConfig[TYPE];
  const data = form.watch(TYPE);
  const totalBudget = useTotal("budget", data);
  const totalSpent = useTotal("spent", data);

  return (
    <CategoryLayout
      header={<CategoryLayout.Header {...headerProps} />}
      categoryData={<CategoryLayout.Data type={TYPE} rows={fields} onRemoveRow={remove} />}
      dataFooter={<CategoryLayout.DataFooter onAddRow={() => append({ item: "", budget: "0", spent: "0" })} totalBudget={totalBudget} totalSpent={totalSpent} />}
    />
  );
}

export default FoodAndDrinks;
