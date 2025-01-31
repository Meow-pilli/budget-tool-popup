import CurrencyInputField from '@/components/CurrencyInputField';
import InputField from '@/components/InputField';
import { formatCurrency } from '@/components/utils/format';
import { useCurrencySymbol } from '@/hooks/useCurrencySymbol';
import { useFormContext } from 'react-hook-form';
import { CategoryType } from './CategoryLayout';

type Props = {
    type: CategoryType;
    index: number;
    onRemoveRow: (index: number) => void;
}

export default function CategoryColumns({ type, index, onRemoveRow }: Props) {
    const form = useFormContext();
    const { getValues } = form;
    const currencySymbol = useCurrencySymbol();

    return (
        <>
            <td className='p-2'>
                <InputField form={form} name={`${type}.${index}.item`} />
            </td>
            <td className='p-2'>
                <CurrencyInputField
                    name={`${type}.${index}.budget`}
                    form={form}
                    placeholder={"0.00"}
                    prefix={currencySymbol}
                />
            </td>
            <td className='p-2'>
                <div className="flex items-center gap-[8px]">
                    <CurrencyInputField
                        name={`${type}.${index}.spent`}
                        form={form}
                        placeholder={"0.00"}
                        prefix={currencySymbol}
                    />
                    {+getValues(`${type}.${index}.spent`) <=
                        +getValues(`${type}.${index}.budget`) ? (
                        <span className="text-green-500 font-bold">✔</span>
                    ) : (
                        <span className="text-red-500 font-bold">✘</span>
                    )}
                </div>
            </td>
            <td className="p-2">
                {formatCurrency(
                    (
                        +getValues(`${type}.${index}.budget`) -
                        +getValues(`${type}.${index}.spent`)
                    ).toFixed(2),
                    currencySymbol
                )}
            </td>
            <td className="p-2">
            <button
  onClick={() => onRemoveRow(index)}
  className="w-[30px] h-[30px] border-[2px] border-black text-black rounded-full font-bold bg-white hover:bg-black hover:text-white hover:scale-110 transition-transform"
>
  −
</button>

            </td>
        </>
    )
}

