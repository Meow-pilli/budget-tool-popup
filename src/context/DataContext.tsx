import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { initialGiftsData } from "../Gifts";

// Define the shape of the data
type DataType = typeof initialGiftsData;

// Define the context value type
interface DataContextValue {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

// Create the context with an undefined initial value
const DataContext = createContext<DataContextValue | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<DataType>(initialGiftsData);

  const value = useMemo(() => ({ data, setData }), [data]);

  console.log("🚀 ~ DataProvider ~ data:", data);

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const value = useContext(DataContext);

  if (value === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }

  return value;
}
