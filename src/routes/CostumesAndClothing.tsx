import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export type CostumesAndClothing = {
  item: string;
  budget: string;
  spent: string;
};

export const initialCostumesAndClothingData: CostumesAndClothing[] = [
  { item: "Costumes", budget: "80", spent: "0" },
  { item: "Formal Attire", budget: "100", spent: "0" },
  { item: "Accessories", budget: "30", spent: "0" },
];

function CostumesAndClothing() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "costumesAndClothing",
  });

  return (
    <CategoryLayout
      type="costumesAndClothing"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#63AB5C",
        title: "Costumes & Clothing",
        icon: "./images/Costumes.png",
      }}
    />
  );
}

export default CostumesAndClothing;
