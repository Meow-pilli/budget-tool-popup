import { createContext,  useContext, useMemo, useState } from "react";
import { initialGiftsData } from "../Gifts";

const DataContext = createContext();

export default function DataProvider ({ children }) {
    const [data, setData] = useState(initialGiftsData);
    const value = useMemo(() => ({ data, setData }), [data]);
    console.log("🚀 ~ DataProvider ~ data:", data)

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
}

export function useData() {
   const value = useContext(DataContext);
   if(value === undefined) {
       throw new Error("useData must be used within a DataProvider");
   }
   return value;
}
