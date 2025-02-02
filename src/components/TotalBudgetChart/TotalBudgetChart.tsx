import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
  ChartDataset,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register necessary Chart.js components along with DataLabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

type Props = {
  data: ChartData<"doughnut", number[], string>;
  currencySymbol: string;
  total: string;
};

// Ensure dataset structure is properly typed
interface DatasetWithCurrency extends ChartDataset<"doughnut"> {
  currency?: string;
}

const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const dataset = tooltipItem.dataset as DatasetWithCurrency;
          const currency = dataset.currency || "";
          return `  ${currency}${(tooltipItem.raw as number).toFixed(2)}`; // Ensure blank space before currency
        },
      },
    },
    datalabels: {
      formatter: (value, context) => {
        const dataset = context.dataset.data as number[];
        const total = dataset.reduce((acc, val) => acc + val, 0);
        if (total === 0) return "";
        const percentage = ((value / total) * 100).toFixed(0);
        return `${percentage}%`; // Display percentage
      },
      color: "white",
      font: {
        weight: "bold",
        size: 14,
      },
      textAlign: "center",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  cutout: "75%",
};

export default function TotalBudgetChart({ data, currencySymbol, total }: Props) {
  return (
    <Card className="flex flex-col items-center order-1">
      <CardHeader className="flex justify-center items-center">
        <CardTitle className="text-center uppercase">Total Budget</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <div className="relative w-[80%] h-[280px] flex justify-center">
          <Doughnut
            data={{
              ...data,
              datasets: data.datasets.map((dataset) => ({
                ...dataset,
                currency: currencySymbol, // Inject currency symbol into dataset
              })),
            }}
            options={options}
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
  );
}
