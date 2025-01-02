import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

export default function CurrencyInputField({ form, name, label, placeholder, prefix = '$' }) {
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
                            className='shadcn-input-class'
                            value={field.value}
                            onValueChange={(value, _name, values) => form.setValue(name, value)}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
