import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";
import useTotal from "@/hooks/useTotal";
import { categoryConfig } from "./CategoryLayout/categoryConfig";

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

const TYPE = 'travels';

function Travel() {
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

export default Travel;
