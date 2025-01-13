import { useCurrencySymbol } from '@/hooks/useCurrencySymbol';

type Props = {
    totalBudget: number;
    totalSpent: number;
    onAddRow: () => void;
}

export default function CategoryLayoutDataFooter({onAddRow, totalBudget, totalSpent }: Props) {
    const currencySymbol = useCurrencySymbol();
    const totalDifference = parseFloat((totalBudget - totalSpent).toFixed(2));

    return (
        <tfoot>
            <tr>
                <td colSpan={4}></td>
                <td className="p-[10px]">
                    <button
                        onClick={onAddRow}
                        className="w-[30px] h-[30px] border-[2px] border-green-500 text-green-500 rounded-full font-bold bg-white hover:bg-green-500 hover:text-white hover:scale-110 transition-transform"
                    >
                        +
                    </button>
                </td>
            </tr>
            <tr className="bg-[#f7f7f7] font-bold border-t-[2px] border-[#d9d9d9]">
                <td className="p-[10px]">Total</td>
                <td className="p-[10px]">
                    {currencySymbol}
                    {totalBudget.toFixed(2)}
                </td>
                <td className="p-[10px]">
                    {currencySymbol}
                    {totalSpent.toFixed(2)}{" "}
                    {totalSpent <= totalBudget ? (
                        <span className="text-green-500 font-bold">✔</span>
                    ) : (
                        <span className="text-red-500 font-bold">✘</span>
                    )}
                </td>
                <td className="p-[10px]">
                    {totalDifference < 0 ? "- " : ""}
                    {currencySymbol}
                    {Math.abs(totalDifference).toFixed(2)}
                </td>
                <td className="p-[10px]"></td>
            </tr>
        </tfoot>
    )
}
