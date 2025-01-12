import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export type Travel = {
  item: string;
  budget: string;
  spent: string
};

export const initialTravelsData: Travel[] = [
  { item: "Flights", budget: "1000", spent: "0" },
  { item: "Hotels", budget: "800", spent: "0" },
  { item: "Car Rentals", budget: "200", spent: "0" },
  { item: "Meals", budget: "300", spent: "0" },
  { item: "Excursions", budget: "400", spent: "0" },
];

function Travel() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travels",
  });

  return (
    <CategoryLayout
      type="travels"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#FF93B8",
        title: "Travel",
        icon: "./images/Travel.png",
      }}
    />
  );
}

export default Travel;
