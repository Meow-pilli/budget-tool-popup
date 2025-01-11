import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryLayout from "../CategoryLayout/CategoryLayout";
//import "./Gifts.css";

export type Gift = {
  item: string;
  budget: string;
  spent: string;
}

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

  const { fields } = useFieldArray({
    control,
    name: "gifts",
  });

  return (
    <CategoryLayout type='gifts' categoryFields={fields}/>
  );
}

export default Gifts;
