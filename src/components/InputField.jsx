import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

export default function InputField({ form, name, label, placeholder, ...props }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            {...field}
                            />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
