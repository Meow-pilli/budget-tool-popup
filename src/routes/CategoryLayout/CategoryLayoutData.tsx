import CategoryColumns from './CategoryColumns';
import { CategoryType } from './CategoryLayout';


type Props = {
    type: CategoryType;
    rows: {
        id: string;
    }[],
    onRemoveRow: (index: number) => void;
}

export default function CategoryLayoutData({ type, rows, onRemoveRow }: Props) {
    return rows.map((r, index) => {
        return (<tr key={r.id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
            } border-[#e0e0e0]`}>
            <CategoryColumns type={type} index={index} onRemoveRow={onRemoveRow} />
        </tr>);
    })
}