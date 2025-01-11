import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrencyInputField from "../components/CurrencyInputField";
import InputField from "../components/InputField";
//import "./Gifts.css";
import { formatValue } from "react-currency-input-field";

export interface BudgetCategory {
  category: string;
  budget: string;
  spent: string;
}

export const initialBudgetData: BudgetCategory[] = [
  { category: "Gifts", budget: "500", spent: "0" },
  { category: "Travel", budget: "300", spent: "0" },
  { category: "Food & Drinks", budget: "200", spent: "0" },
  { category: "Entertainment", budget: "150", spent: "0" },
  { category: "Decorations", budget: "100", spent: "0" },
  { category: "Costumes & Clothing", budget: "80", spent: "0" },
  { category: "Stationery & Packaging", budget: "50", spent: "0" },
  { category: "Charitable Contributions", budget: "70", spent: "0" },
];

function Budget() {
  const navigate = useNavigate();
  const form = useFormContext();

  const { watch, control, getValues } = form;
  const currency = watch("currency");
  const currencyPrefix =
    (currency === undefined ? "$" : currency) + " ";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "budget", // Ensure this matches the key for the budget data
  });

  const totalBudget = fields.reduce(
    (sum, _, index) =>
      sum + parseFloat(getValues(`budget.${index}.budget`) || "0"),
    0
  );

  const totalSpent = fields.reduce(
    (sum, _, index) =>
      sum + parseFloat(getValues(`budget.${index}.spent`) || "0"),
    0
  );

  const totalDifference = parseFloat((totalBudget - totalSpent).toFixed(2));

  const addRow = () => {
    append({ category: "", budget: "0", spent: "0" });
  };

  useEffect(() => {
    const globalNavBar = document.querySelector(".nav-bar") as HTMLElement | null;
    const globalMenuContainer = document.querySelector(
      ".menu-container"
    ) as HTMLElement | null;

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
          <img src="./images/Budget.png" alt="Budget" className="budget-icon" />
          <h1 className="gifts-title">Budget</h1>
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
            {fields.map((row, index) => (
              <tr key={row.id}>
                <td>
                  <InputField form={form} name={`budget.${index}.category`} />
                </td>
                <td>
                  <CurrencyInputField
                    name={`budget.${index}.budget`}
                    form={form}
                    placeholder={"0.00"}
                    prefix={currencyPrefix}
                  />
                </td>
                <td>
                  <div className="currency-input-with-status">
                    <CurrencyInputField
                      name={`budget.${index}.spent`}
                      form={form}
                      placeholder={"0.00"}
                      prefix={currencyPrefix}
                    />
                    {+getValues(`budget.${index}.spent`) <=
                    +getValues(`budget.${index}.budget`) ? (
                      <span className="checkmark">✔</span>
                    ) : (
                      <span className="cross">✘</span>
                    )}
                  </div>
                </td>
                <td>
                  {formatCurrency(
                    (
                      +getValues(`budget.${index}.budget`) -
                      +getValues(`budget.${index}.spent`)
                    ).toFixed(2),
                    currencyPrefix
                  )}
                </td>
                <td>
                  <button
                    onClick={() => remove(index)}
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
              <td colSpan={4}></td>
              <td className="add-row-cell">
                <button
                  onClick={addRow}
                  className="add-row-button circle-button"
                >
                  +
                </button>
              </td>
            </tr>
            <tr className="footer-row">
              <td>Total</td>
              <td>{totalBudget.toFixed(2)}</td>
              <td>
                {totalSpent.toFixed(2)}{" "}
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

export default Budget;

function formatCurrency(value: string, prefix: string): string | undefined {
  return formatValue({
    value: String(value),
    groupSeparator: ",",
    decimalSeparator: ".",
    prefix,
  });
}
