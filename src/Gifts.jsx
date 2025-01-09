import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrencyInputField from "./components/CurrencyInputField";
import { currencyItems } from "./components/HolidayForm";
import InputField from "./components/InputField";
import "./Gifts.css";
import useGiftsTotal from "./hooks/useGiftsTotal";
import { formatValue } from "react-currency-input-field";

export const initialGiftsData = [
  { item: "Family", budget: "0", spent: "0" },
  { item: "Friends", budget: "0", spent: "0" },
  { item: "Co-workers", budget: "0", spent: "0" },
  { item: "Teachers, nannies, babysitters, etc.", budget: "0", spent: "0" },
  { item: "Charitable donations", budget: "0", spent: "0" },
];

function Gifts() {
    // const { data, setData } = useData();
  const navigate = useNavigate();

  const form = useFormContext();
  const { watch, control, getValues } = form;

  const currency = watch("currency");

  const currencyPrefix =
    (currencyItems.find((c) => c.value === currency)?.symbol || "$") + " ";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gifts",
  });
  console.log("🚀 ~ fields:", fields);


  // Calculate totals
  const totalBudget = fields.reduce(
    (sum, field, index) => sum + parseFloat(getValues(`gifts.${index}.budget`) || 0),
    0
  );

  const totalSpent = fields.reduce(
    (sum, field, index) => sum + parseFloat(getValues(`gifts.${index}.spent`) || 0),
    0
  );

  const totalDifference = parseFloat((totalBudget - totalSpent).toFixed(2));

  const addRow = () => {
    append({ item: "", budget: "0", spent: "0" });
  };

  useEffect(() => {
    const globalNavBar = document.querySelector(".nav-bar");
    const globalMenuContainer = document.querySelector(".menu-container");

    if (globalNavBar) globalNavBar.style.display = "none";
    if (globalMenuContainer) globalMenuContainer.style.display = "none";

    return () => {
      if (globalNavBar) globalNavBar.style.display = "flex";
      if (globalMenuContainer) globalMenuContainer.style.display = "block";
    };
  }, []);

  return (
    <div className="gifts-container">
      <header className="gifts-header">
        <div className="gifts-center-content">
          <img src="/Gifts.png" alt="Gifts" className="gifts-icon" />
          <h1 className="gifts-title">Gifts</h1>
        </div>
        <button
          type="button"
          className="gifts-close-button"
          onClick={() => navigate("/")}
        >
          ✖
        </button>
      </header>
      <div className="gifts-body">
        <table>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>BUDGET</th>
              <th>SPENT</th>
              <th>DIFFERENCE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((row, index) => ( */}
            {fields.map((row, index) => (
              <tr key={index}>
                <td>
                  {index < 0 ? (
                    row.item
                  ) : (
                    <InputField form={form} name={`gifts.${index}.item`} />
                  )}
                </td>
                <td>
                  <CurrencyInputField
                    name={`gifts.${index}.budget`}
                    form={form}
                    placeholder={"0.00"}
                    prefix={currencyPrefix} // Space is included here
                  />
                </td>
                <td>
                  <div className="currency-input-with-status">
                    <CurrencyInputField
                      name={`gifts.${index}.spent`}
                      form={form}
                      placeholder={"0.00"}
                      prefix={currencyPrefix} // Space is included here
                    />
                    {+row.spent <= +row.budget ? (
                      <span className="checkmark">✔</span>
                    ) : (
                      <span className="cross">✘</span>
                    )}
                  </div>
                </td>
                <td>
                  {formatCurrency(
                    (+getValues("gifts")[index].budget - +getValues("gifts")[index].spent).toFixed(2),
                    currencyPrefix
                  )}
                </td>
                <td>
                  <button
                    onClick={() => remove(index)}
                       // onClick={() => deleteRow(index)}
                    className="delete-row-button circle-button"
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"></td>
              <td className="add-row-cell">
                <button onClick={addRow} className="add-row-button circle-button">
                  +
                </button>
              </td>
            </tr>
            <tr className="footer-row">
              <td>Total</td>
              <td>{formatCurrency(totalBudget.toFixed(2), currencyPrefix)}</td>
              <td>
                {formatCurrency(totalSpent.toFixed(2), currencyPrefix)}{" "}
                {totalSpent <= totalBudget ? (
                  <span className="checkmark">✔</span>
                ) : (
                  <span className="cross">✘</span>
                )}
              </td>
              <td>
                {totalDifference < 0 ? "- " : ""}
                {formatCurrency(Math.abs(totalDifference).toFixed(2), currencyPrefix)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Gifts;

function formatCurrency(value, prefix) {
  const formattedValue = formatValue({
    value: String(value),
    groupSeparator: ",",
    decimalSeparator: ".",
    prefix: `${prefix}`,
  });

  return formattedValue;
}
