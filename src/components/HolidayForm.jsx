
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { symbol } from "zod";

const holidayItems = [
  { value: "all-holidays", label: "All Holidays" },
  { value: "christmas", label: "Christmas" },
  { value: "thanksgiving", label: "Thanksgiving" },
  { value: "new-year", label: "New Year" },
  { value: "easter", label: "Easter" },
  { value: "halloween", label: "Halloween" },
];

export const currencyItems = [
  { value: "dollar", label: "Dollar ($)", symbol: "$" },
  { value: "pound", label: "Pound (£)", symbol: "£" },
  { value: "euro", label: "Euro (€)", symbol: "€" },
  { value: "rupees", label: "Rupees (₹)", symbol: "₹" },
  { value: "yen", label: "Yen (¥)", symbol: "¥" },
];

function HolidayForm() {
  const form = useFormContext();

  return (
    <form name='holiday-form' className="grid grid-cols-2 gap-4 px-4 mb-2">
      <MenuSelect name="holiday" placeholder="-- Select a Holiday --" items={holidayItems} form={form} />
      <MenuSelect name="currency" placeholder="-- Select a Currency --" items={currencyItems} form={form} />
    </form>
  );
}

export default HolidayForm;

function MenuSelect({ name, placeholder, items = [], form }) {
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
              </SelectTrigger>
            </FormControl>
            <SelectContent className='z-[1001]'>
              {items.map(h => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

