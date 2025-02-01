import { useCurrencySymbol } from '@/hooks/useCurrencySymbol';

type Props = {
    totalBudget: number;
    totalSpent: number;
    onAddRow: () => void;
};

export default function CategoryLayoutDataFooter({
    onAddRow,
    totalBudget,
    totalSpent,
}: Props) {
    const currencySymbol = useCurrencySymbol();
    const totalDifference = parseFloat((totalBudget - totalSpent).toFixed(2));

    return (
        <tfoot>
            <tr>
                {/* Adjust Add Row Button */}
                <td colSpan={4}></td>
                <td className="p-[10px]">
                    <button
                        onClick={onAddRow}
                        className="w-[24px] h-[24px] border-[2px] border-black text-black rounded-full font-bold text-sm bg-white hover:bg-black hover:text-white hover:scale-110 transition-transform"
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
                    {/* Ensure Proper Alignment for Difference Column */}
                    <span className="inline-flex items-center gap-[2px]">
                        {totalDifference < 0 && <span>-</span>}
                        <span>
                            {currencySymbol}
                            {Math.abs(totalDifference).toFixed(2)}
                        </span>
                    </span>
                </td>
                <td className="p-[10px]"></td>
            </tr>
        </tfoot>
    );
}
