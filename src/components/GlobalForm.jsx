import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { initialGiftsData } from '@/Gifts';
//import { initialTravelData } from '@/Travel';

// {
//     holiday: 'christmas',
//     currency: 'dollars',
//     gifts: [
//      { item: "Family", budget: 500.0, spent: 0.0 },
//     ]
// }
function GlobalForm({ children }) {
    const methods = useForm({
        defaultValues: {
            gifts: initialGiftsData
            //travels: initialTravelData,
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