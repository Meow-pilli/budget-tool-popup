import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "../CategoryLayout/CategoryLayout";
import { categoryConfig } from "../CategoryLayout/categoryConfig";
import useTotal from "@/hooks/useTotal";

export type Gift = {
  item: string;
  budget: string;
  spent: string;
};

const TYPE = "gifts";

export const initialGiftsData: Gift[] = [
  { item: "Family", budget: "500", spent: "0" },
  { item: "Friends", budget: "250", spent: "0" },
  { item: "Co-workers", budget: "0", spent: "0" },
  { item: "Teachers, nannies, babysitters, etc.", budget: "0", spent: "0" },
  { item: "Charitable donations", budget: "0", spent: "0" },
];


function Gifts() {
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

export default Gifts;
