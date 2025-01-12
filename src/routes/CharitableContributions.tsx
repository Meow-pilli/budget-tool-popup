import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export type CharitableContributions = {
  item: string;
  budget: string;
  spent: string;
};

export const initialCharitableContributionsData: CharitableContributions[] = [
  { item: "Food Bank", budget: "50", spent: "0" },
  { item: "Local Charity", budget: "100", spent: "0" },
  { item: "School Fundraiser", budget: "30", spent: "0" },
];

function CharitableContributions() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "charitableContributions",
  });

  return (
    <CategoryLayout
      type="charitableContributions"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#65328C",
        title: "Charitable Contributions",
        icon: "./images/Charity.png",
      }}
    />
  );
}

export default CharitableContributions;
