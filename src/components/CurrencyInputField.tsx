import CurrencyInput from "react-currency-input-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Control, FieldValues } from "react-hook-form";

interface CurrencyInputFieldProps {
  form: {
    control: Control<FieldValues>;
    setValue: (name: string, value: any) => void;
  };
  name: string;
  label?: string;
  placeholder?: string;
  prefix?: string;
}

export default function CurrencyInputField({
  form,
  name,
  label,
  placeholder,
  prefix = "$",
}: CurrencyInputFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CurrencyInput
              id={name}
              placeholder={placeholder}
              prefix={prefix}
              decimalSeparator="."
              groupSeparator=","
              decimalScale={2}
              className="shadcn-input-class w-32 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" // Match width
              value={field.value}
              onValueChange={(value) => form.setValue(name, value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
