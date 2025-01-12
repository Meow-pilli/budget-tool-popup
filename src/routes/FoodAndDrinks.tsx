import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

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

function FoodAndDrinks() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "foodAndDrinks", // Form field array name
  });

  return (
    <CategoryLayout
      type="foodAndDrinks"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })} // Add logic
      onRemoveRow={remove} // Remove logic
      headerConfig={{
        color: "#786DD3", // Unique color for Food and Drinks
        title: "Food & Drinks", // Unique title
        icon: "./images/Food.png", // Unique icon path
      }}
    />
  );
}

export default FoodAndDrinks;
