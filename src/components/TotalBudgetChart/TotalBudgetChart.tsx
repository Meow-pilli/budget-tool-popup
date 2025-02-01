import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { Label, Pie, PieChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { categoryConfig, CategoryKeyType } from "@/routes/CategoryLayout/categoryConfig";

import { renderCustomizedLabel } from "../utils/charts";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js";

const chartConfig = Object.entries(categoryConfig).reduce((acc, [categoryKey, config]) => {
    const ckey = categoryKey as CategoryKeyType;
    acc[ckey] = {
        label: config.title,
        color: config.color
    }
    return acc;
}, {} as ChartConfig);



type Props = {
    data: ChartData<"doughnut", number[], unknown>,
    currencySymbol: string;
    total: string;
}

export default function TotalBudgetChart({ data, currencySymbol, total }: Props) {
    return (
        <Card className="flex flex-col items-center order-1 md:order-2">
            <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-center uppercase">Total Budget</CardTitle>
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
                        />
                        <Pie
                            data={data}
                            label={renderCustomizedLabel}
                            labelLine={false}
                            dataKey="totalBudget"
                            nameKey="category"
                            innerRadius={100}
                            strokeWidth={0}
            
                            // cx="50%"
                            // cy="50%"
            
            
                            // outerRadius={90}
                            fill="#8884d8"
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
                                                    y={(viewBox.cy || 0) - 15}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Budget
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 15}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {`${currencySymbol} ${total}`} 
                                                </tspan>
                                                
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer> */}

                
                <div className="relative w-[80%] h-[280px] flex justify-center">
                    <Doughnut
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: "75%",
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) =>
                                            ` ${currencySymbol}${(tooltipItem.raw as number).toFixed(2)}`,
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
                        }}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-sm text-gray-500">Total Budget</span>
                        <div className="text-4xl font-bold">
                            {currencySymbol} {total}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}