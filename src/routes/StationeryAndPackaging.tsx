import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "./CategoryLayout/CategoryLayout";

export type StationeryAndPackaging = {
  item: string;
  budget: string;
  spent: string;
};

export const initialStationeryAndPackagingData: StationeryAndPackaging[] = [
  { item: "Cards", budget: "30", spent: "0" },
  { item: "Wrapping Paper", budget: "20", spent: "0" },
  { item: "Ribbons", budget: "10", spent: "0" },
];

function StationeryAndPackaging() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stationeryAndPackaging",
  });

  return (
    <CategoryLayout
      type="stationeryAndPackaging"
      categoryFields={fields}
      onAddRow={() => append({ item: "", budget: "0", spent: "0" })}
      onRemoveRow={remove}
      headerConfig={{
        color: "#EAC934",
        title: "Stationery & Packaging",
        icon: "./images/Card.png",
      }}
    />
  );
}

export default StationeryAndPackaging;
