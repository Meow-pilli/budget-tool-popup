import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


type CurrencyType = {
    "currencyid": number,
    "symbol": string,
    "name": string,
    "symbol_native": string,
    "decimal_digits": number,
    "rounding": number,
    "code": string,
    "name_plural": string
}

type TransformedCurrencyType = {
    value: string, label: string, symbol: string
}

const baseUrl = "http://localhost:3000";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCurrencies: builder.query<TransformedCurrencyType[], void>({
            query: () => '/api/budget_tool/currency',
            transformResponse: (response: CurrencyType[]): TransformedCurrencyType[] => {
                return response?.map(c => ({
                    value: String(c.currencyid),
                    label: c.name,
                    symbol: c.symbol
                })) || [];
            }
        }),
    }),
});

export const { useGetCurrenciesQuery } = api;
