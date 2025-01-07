import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrencyInputField from "./components/CurrencyInputField";
import { currencyItems } from "./components/HolidayForm";
import InputField from "./components/InputField";
import "./Gifts.css";
import useTravelsTotal from "./hooks/useGiftsTotal";
import { formatValue } from "react-currency-input-field";

export const initialTravelData = [
  { item: "Family", budget: "500", spent: "0" },
  { item: "Friends", budget: "250", spent: "0" },
  { item: "Co-workers", budget: "0", spent: "0" },
  { item: "Teachers, nannies, babysitters, etc.", budget: "0", spent: "0" },
  { item: "Charitable donations", budget: "0", spent: "0" },
];

function Travel() {
  // const { data, setData } = useData();
  const navigate = useNavigate();

  const form = useFormContext();

  const { watch, control, defaultValues, getValues } = form;
  const currency = watch("currency");
  const currencyPrefix =
    currencyItems.find((c) => c.value === currency)?.symbol || "$";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travels",
  });
  console.log("🚀 ~ fields:", fields);

  const totalBudget = fields.reduce(
    (sum, field, index) => sum + parseFloat(getValues(`travels.${index}.budget`) || 0),
    0
  );
  
  const totalSpent = fields.reduce(
    (sum, field, index) => sum + parseFloat(getValues(`travels.${index}.spent`) || 0),
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
          <img src="/Travel.png" alt="Travels" className="gifts-icon" />
          <h1 className="gifts-title">Travels</h1>
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
                    <InputField form={form} name={`travels.${index}.item`} />
                  )}
                </td>
                <td>
                  <CurrencyInputField
                    name={`travels.${index}.budget`}
                    form={form}
                    placeholder={"0.00"}
                    prefix={currencyPrefix}
                  />
                </td>
                <td>
                  <div className="currency-input-with-status">
                    <CurrencyInputField
                      name={`travels.${index}.spent`}
                      form={form}
                      placeholder={"0.00"}
                      prefix={currencyPrefix}
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
                    +getValues("travels")[index].budget -
                      +getValues("travels")[index].spent,
                    currencyPrefix
                  )}
                  {/* {+row.budget - +row.spent < 0
                    ? `- $${Math.abs(row.budget - row.spent).toFixed(2)}`
                    : `\u00A0 $${(row.budget - row.spent).toFixed(2)}`} */}
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
            {/* Add Row Button */}
            <tr>
              {/* Empty cells for alignment */}
              <td colSpan="4"></td>
              {/* Add Row Button in ACTION column */}
              <td className="add-row-cell">
                <button
                  onClick={addRow}
                  className="add-row-button circle-button"
                >
                  +
                </button>
              </td>
            </tr>
            {/* Total Row */}
            <tr className="footer-row">
              <td>Total</td>
              <td>${totalBudget.toFixed(2)}</td>
              <td>
                ${totalSpent.toFixed(2)}{" "}
                {totalSpent <= totalBudget ? (
                  <span className="checkmark">✔</span>
                ) : (
                  <span className="cross">✘</span>
                )}
              </td>
              <td>
                {totalDifference < 0 ? "- $" : "\u00A0$"}
                {Math.abs(totalDifference).toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Travels;

function formatCurrency(value, prefix) {
  const formattedValue = formatValue({
    value: String(value),
    groupSeparator: ",",
    decimalSeparator: ".",
    prefix,
  });

  return formattedValue;
}
