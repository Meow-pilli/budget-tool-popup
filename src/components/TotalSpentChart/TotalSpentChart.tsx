import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Label, Pie, PieChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { categoryConfig, CategoryKeyType } from "@/routes/CategoryLayout/categoryConfig";
import { renderCustomizedLabel } from "../utils/charts";


import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartData, ChartOptions, TooltipItem } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Register necessary Chart.js components along with DataLabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);


const chartConfig = Object.entries(categoryConfig).reduce((acc, [categoryKey, config]) => {
    const ckey = categoryKey as CategoryKeyType;
    acc[ckey] = {
        label: config.title,
        color: config.color
    }
    return acc;
}, {} as ChartConfig);



// type TooltipItem = ChartOptions<"pie">['plugins']

type Props = {
    data: ChartData<"pie", number[], unknown>,
    currencySymbol: string;
}

type DatasetWithCurrencyType = TooltipItem<"pie">['dataset'] & {currency: string};


// const dataPie = {
//         labels: ['Red', 'Blue', 'Yellow'],
//         datasets: [
//             {
//                 data: [300, 50, 100],
//                 backgroundColor: ['red', 'blue', 'yellow'],
//             },
//         ],
//     };


const options:ChartOptions<"pie"> = {
    plugins: {
        legend: false,
        tooltip: {
            callbacks: {
                label: (tooltipItem) => {
                    console.log("🚀 ~ tooltipItem:", tooltipItem);
                    const datasetWithCurrency = tooltipItem.dataset as DatasetWithCurrencyType;
                    const currency = datasetWithCurrency?.currency || '';
                    return `  ${currency} ${(tooltipItem.raw as number).toFixed(2)}`;
                },
            },
        },
        datalabels: {
            formatter: (value, ctx) => {
                const total = ctx.dataset.data.reduce((acc, value) => acc + value, 0);
                const percentage = ((value / total) * 100).toFixed(0);
                return `${percentage}%`;  // Display the percentage
            },
            color: 'white',  // Color of the percentage text
            font: {
                weight: 'bold',
                size: 14,
            },
            textAlign: 'center',
        },
    },
};


export default function TotalSpentChart({ data, currencySymbol }: Props) {
    


    return (
        <Card className="flex flex-col items-center order-3 md:order-1">
            <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-center uppercase">Total Spent</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full">
                {/* <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[450px] w-full p-0"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            labelFormatter={labelFormatter}
                        />
                        <Pie
                            data={data}
                            label={renderCustomizedLabel}
                            labelLine={false}
                            dataKey="totalSpent"
                            nameKey="category"
                            // innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    500
                                                    
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >TITLE
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer> */}

                <div className="w-[80%] h-[280px] flex justify-center">
                    <Pie data={data} options={options} />
                </div>
                {/* <div className="w-[80%] h-[280px] flex justify-center">
                    <Pie
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) =>
                                            `${currencySymbol} ${(tooltipItem.raw as number).toFixed(2)}`,
                                    },
                                },
                            },
                        }}
                    />
                </div> */}
            </CardContent>
        </Card>
    )
}

