import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export type Decorations = {
  item: string;
  budget: string;
  spent: string;
};

export const initialDecorationsData: Decorations[] = [
  { item: "Lights", budget: "50", spent: "0" },
  { item: "Ornaments", budget: "40", spent: "0" },
  { item: "Flowers", budget: "20", spent: "0" },
];

function Decorations() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "decorations",
  });

  return (
    <CategoryLayout
      type="decorations"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#21C1E7",
        title: "Decorations",
        icon: "./images/Decorations.png",
      }}
    />
  );
}

export default Decorations;
