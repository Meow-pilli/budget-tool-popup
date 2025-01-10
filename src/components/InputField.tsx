import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldValues } from 'react-hook-form';

interface InputFieldProps {
    form: {
      control: Control<FieldValues>;
    };
    name: string;
    label?: string;
    placeholder?: string;
    [key: string]: any; // For additional props
  }

export default function InputField({ form, name, label, placeholder, ...props } : InputFieldProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            {...field} placeholder={placeholder} {...props} 
                            />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
