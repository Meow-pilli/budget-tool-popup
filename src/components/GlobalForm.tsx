import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { initialGiftsData } from '@/Gifts';
import { initialTravelsData } from '@/Travel';

// {
//     holiday: 'christmas',
//     currency: 'dollars',
//     gifts: [
//      { item: "Family", budget: 500.0, spent: 0.0 },
//     ]
// }

interface GlobalFormTypes {
    gifts: BudgetEntry[];
    travels: BudgetEntry[];
    foodAndDrinks: BudgetEntry[];
    holiday: string;
    currency: string;
}

interface GlobalFormProps {
    children: React.ReactNode;
}

function GlobalForm({ children }: GlobalFormProps) {
    const methods = useForm<GlobalFormTypes>({
        defaultValues: {
            gifts: initialGiftsData,
            travels: initialTravelsData,
            foodAndDrinks: [],
        }
    });
    const watch = methods.watch;
    const holiday = watch('holiday');
    const currency = watch('currency');
    const formData = watch();

    console.log("🚀 ~ GlobalForm ~ holiday, currency:", {holiday, currency, formData});

    return (
        <Form {...methods}>
            {children}
        </Form>
    );
}

export default GlobalForm;