import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
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
  data: ChartData<"pie", number[], string>;
  currencySymbol: string;
};

// Ensure dataset structure is properly typed
interface DatasetWithCurrency extends ChartDataset<"pie"> {
  currency?: string;
}

const options: ChartOptions<"pie"> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const dataset = tooltipItem.dataset as DatasetWithCurrency;
          const currency = dataset.currency || "";
          return `  ${currency} ${(tooltipItem.raw as number).toFixed(2)}`; // <- Ensuring the blank space before currency
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
      color: "white", // Color of the percentage text
      font: {
        weight: "bold",
        size: 14,
      },
      textAlign: "center",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default function TotalSpentChart({ data, currencySymbol }: Props) {
  return (
    <Card className="flex flex-col items-center order-3 md:order-1">
      <CardHeader className="flex justify-center items-center">
        <CardTitle className="text-center uppercase">Total Spent</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <div className="w-[80%] h-[280px] flex justify-center">
          <Pie
            data={{
              ...data,
              datasets: data.datasets.map((dataset) => ({
                ...dataset,
                currency: currencySymbol, // Inject currency symbol into dataset
              })),
            }}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
}
