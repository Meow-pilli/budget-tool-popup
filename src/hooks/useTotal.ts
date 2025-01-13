export default function useTotal(key: "budget" | "spent", data?: { item: string, budget: string, spent: string }[]) {
  if (!data) {
    return -1;
  }
  return parseFloat(calculateTotal(data, key));
}

export function calculateTotal(data: { item: string, budget: string, spent: string }[], key: "budget" | "spent") {
  return data
    .reduce((acc, row) => acc + parseFloat(row[key] || "0"), 0)
    .toFixed(2);
}
