import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";
import { categoryConfig } from "./CategoryLayout/categoryConfig";
import useTotal from "@/hooks/useTotal";

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

const TYPE = 'decorations';

function Decorations() {
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

export default Decorations;
