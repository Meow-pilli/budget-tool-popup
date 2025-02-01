import { formatValue } from "react-currency-input-field";

export function formatCurrency(value: string, prefix: string): string | undefined {
    const prefixWithSpace:string = `${prefix} `;
    const formattedValue = formatValue({
        value: String(value).replace("-", ""), // Remove negative sign temporarily
        groupSeparator: ",",
        decimalSeparator: ".",
        prefix: prefixWithSpace,
    });

    return value.startsWith("-") ? `- ${formattedValue}` : formattedValue;
}
