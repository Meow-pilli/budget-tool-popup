import CurrencyInputField from "@/components/CurrencyInputField";
import InputField from "@/components/InputField";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { formatValue } from "react-currency-input-field";
import { useNav } from "@/hooks/useNav";

type Props = {
  type: "gifts" | "travels" | "accommodation" | "food" | "other";
  categoryFields: Array<{ name?: string; id: string }>;
};

export default function CategoryLayout({ type, categoryFields }: Props) {
  useNav();
  const navigate = useNavigate();
  const form = useFormContext();
  const { watch, getValues } = form;
  const currency = watch("currency");
  const currencyPrefix = currency ? `${currency} ` : "$ ";

  const totalBudget = categoryFields.reduce(
    (sum, _field, index) =>
      sum + parseFloat(getValues(`${type}.${index}.budget`) || "0"),
    0
  );

  const totalSpent = categoryFields.reduce(
    (sum, _field, index) =>
      sum + parseFloat(getValues(`${type}.${index}.spent`) || "0"),
    0
  );

  const totalDifference = parseFloat((totalBudget - totalSpent).toFixed(2));

  const addRow = () => {
    categoryFields.push({ id: `${Date.now()}`, name: "" });
  };

  const remove = (index: number) => {
    categoryFields.splice(index, 1);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="flex items-center justify-center relative h-[12vh] bg-[#E24831] shadow-md">
        <div className="flex items-center gap-[1vw]">
          <img src="./images/Gifts.png" alt="Gifts" className="w-[6vh] h-[6vh]" />
          <h1 className="text-[1.5rem] font-bold text-white">Gifts</h1>
        </div>
        <button
          type="button"
          className="absolute top-[10px] right-[10px] w-[30px] h-[30px] border-[2px] border-white rounded-full bg-transparent text-white flex items-center justify-center text-[15px] font-normal hover:bg-gradient-to-r hover:from-white hover:to-[#ffcccc] hover:text-[#E24831] hover:scale-110 active:scale-95 transition-transform"
          onClick={() => navigate("/")}
        >
          ✖
        </button>
      </header>

      {/* Body Section */}
      <div className="flex-grow p-[2vw] bg-[#f9f9f9]">
        <table className="w-full border-collapse text-left">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#f7f7f7] border-b-[2px] border-[#d9d9d9]">
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">CATEGORY</th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">BUDGET</th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">SPENT</th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">DIFFERENCE</th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">ACTION</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {categoryFields.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                } border-[#e0e0e0]`}
              >
                <td className="p-[10px]">
                  <InputField form={form} name={`${type}.${index}.item`} />
                </td>
                <td className="p-[10px]">
                  <CurrencyInputField
                    name={`${type}.${index}.budget`}
                    form={form}
                    placeholder={"0.00"}
                    prefix={currencyPrefix}
                  />
                </td>
                <td className="p-[10px]">
                  <div className="flex items-center gap-[8px]">
                    <CurrencyInputField
                      name={`${type}.${index}.spent`}
                      form={form}
                      placeholder={"0.00"}
                      prefix={currencyPrefix}
                    />
                    {+getValues(`${type}.${index}.spent`) <=
                    +getValues(`${type}.${index}.budget`) ? (
                      <span className="text-green-500 font-bold">✔</span>
                    ) : (
                      <span className="text-red-500 font-bold">✘</span>
                    )}
                  </div>
                </td>
                <td className="p-[10px]">
                  {formatCurrency(
                    (
                      +getValues(`${type}.${index}.budget`) -
                      +getValues(`${type}.${index}.spent`)
                    ).toFixed(2),
                    currencyPrefix
                  )}
                </td>
                <td className="p-[10px]">
                  <button
                    onClick={() => remove(index)}
                    className="w-[30px] h-[30px] border-[2px] border-red-500 text-red-500 rounded-full font-bold bg-white hover:bg-red-500 hover:text-white hover:scale-110 transition-transform"
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Table Footer */}
          <tfoot>
            <tr>
              <td colSpan={4}></td>
              <td className="p-[10px]">
                <button
                  onClick={addRow}
                  className="w-[30px] h-[30px] border-[2px] border-green-500 text-green-500 rounded-full font-bold bg-white hover:bg-green-500 hover:text-white hover:scale-110 transition-transform"
                >
                  +
                </button>
              </td>
            </tr>
            <tr className="bg-[#f7f7f7] font-bold border-t-[2px] border-[#d9d9d9]">
              <td className="p-[10px]">Total</td>
              <td className="p-[10px]">
                {currencyPrefix}
                {totalBudget.toFixed(2)}
              </td>
              <td className="p-[10px]">
                {currencyPrefix}
                {totalSpent.toFixed(2)}{" "}
                {totalSpent <= totalBudget ? (
                  <span className="text-green-500 font-bold">✔</span>
                ) : (
                  <span className="text-red-500 font-bold">✘</span>
                )}
              </td>
              <td className="p-[10px]">
                {currencyPrefix}
                {totalDifference < 0 ? "- " : ""}
                {Math.abs(totalDifference).toFixed(2)}
              </td>
              <td className="p-[10px]"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function formatCurrency(value: string, prefix: string): string | undefined {
  return formatValue({
    value: String(value),
    groupSeparator: ",",
    decimalSeparator: ".",
    prefix,
  });
}
