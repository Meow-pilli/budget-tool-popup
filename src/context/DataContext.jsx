import { createContext,  useContext, useMemo, useState } from "react";
import { initialGiftsData } from "../Gifts";
//import { initialTravelData } from "../Travel";

const DataContext = createContext();

export default function DataProvider ({ children }) {
    const [data, setData] = useState(initialGiftsData);
    //const [travelData, setTravelData] = useState(initialTravelData);
    const value = useMemo(() => ({ data, setData }), [data]);
    //const travelValue = useMemo(() => ({ travelData, setTravelData }), [travelData]);
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
