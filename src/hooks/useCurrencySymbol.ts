import { currencyItems } from "@/components/HolidayForm";
import { useFormContext } from "react-hook-form";

export function useCurrencySymbol() {
    const { watch } = useFormContext();
    const currencyValue = watch("currency") || "dollar";
    const currencySymbol =
        currencyItems.find((c) => c.value === currencyValue)?.symbol + " " || "$ ";

    return currencySymbol
}