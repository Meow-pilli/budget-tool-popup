import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";
import { categoryConfig } from "./CategoryLayout/categoryConfig";
import useTotal from "@/hooks/useTotal";

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

const TYPE = 'entertainment';

function Entertainment() {
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

export default Entertainment;
