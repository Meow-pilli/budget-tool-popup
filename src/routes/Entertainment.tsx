import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export type Entertainment = {
  item: string;
  budget: string;
  spent: string;
};

export const initialEntertainmentData: Entertainment[] = [
  { item: "Movies", budget: "100", spent: "0" },
  { item: "Concerts", budget: "150", spent: "0" },
  { item: "Games", budget: "50", spent: "0" },
  { item: "Subscriptions", budget: "30", spent: "0" },
];

function Entertainment() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entertainment", // Form field array name
  });

  return (
    <CategoryLayout
      type="entertainment"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#2088E7",
        title: "Entertainment",
        icon: "./images/Entertainment.png",
      }}
    />
  );
}

export default Entertainment;
