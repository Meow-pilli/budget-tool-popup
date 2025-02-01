import { useGetCurrenciesQuery } from "@/api";
import { useFormContext } from "react-hook-form";

export function useCurrencySymbol() {
    const {data: currencyItems} = useGetCurrenciesQuery();
    const { watch } = useFormContext();
    const currencyValue = watch("currency") || "dollar";
    const currencySymbol =
        currencyItems?.find((c) => c.value === currencyValue)?.symbol || "$";

    return currencySymbol
}