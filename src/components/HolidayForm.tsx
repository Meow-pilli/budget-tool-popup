import { useFormContext, Control, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useGetCurrenciesQuery } from "@/api";

const holidayItems = [
  { value: "all-holidays", label: "All Holidays" },
  { value: "christmas", label: "Christmas" },
  { value: "thanksgiving", label: "Thanksgiving" },
  { value: "new-year", label: "New Year" },
  { value: "easter", label: "Easter" },
  { value: "halloween", label: "Halloween" },
];

// export const currencyItems = [
//   { value: "dollar", label: "Dollar ($)", symbol: "$" },
//   { value: "pound", label: "Pound (£)", symbol: "£" },
//   { value: "euro", label: "Euro (€)", symbol: "€" },
//   { value: "rupees", label: "Rupees (₹)", symbol: "₹" },
//   { value: "yen", label: "Yen (¥)", symbol: "¥" },
// ];

interface MenuSelectProps {
  name: string;
  placeholder: string;
  items: { value: string; label: string; symbol?: string }[];
  form: {
    control: Control<FieldValues>;
  };
}

function HolidayForm() {
  const form = useFormContext();
  const {data: currencyItems, isLoading} = useGetCurrenciesQuery();

  return (
    <form name="holiday-form" className="grid grid-cols-2 gap-4 px-4 mb-2">
      <MenuSelect
        name="holiday"
        placeholder=" Holiday "
        items={holidayItems}
        form={form}
      />
      <MenuSelect
        name="currency"
        placeholder=" Currency "
        items={currencyItems || []}
        form={form}
      />
    </form>
  );
}

export default HolidayForm;

function MenuSelect({ name, placeholder, items = [], form }: MenuSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
                {/* {isLoading ? <LoadingSpinner /> : <SelectValue />} */}
              </SelectTrigger>
            </FormControl>
            <SelectContent className="z-[1001]">
              {items.map((h) => (
                <SelectItem key={h.value} value={h.value}>
                  {h.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
