import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { initialGiftsData } from '@/routes/Gifts/Gifts';
import { initialTravelsData } from '@/routes/Travel';
import { initialDrinksData } from '@/routes/FoodAndDrinks';

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
            foodAndDrinks: initialDrinksData,
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