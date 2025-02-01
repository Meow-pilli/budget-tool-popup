import { useNav } from "@/hooks/useNav";
import CategoryColumns from "./CategoryColumns";
import CategoryLayoutData from "./CategoryLayoutData";
import CategoryLayoutDataFooter from "./CategoryLayoutDataFooter";
import CategoryLayoutHeader from "./CategoryLayoutHeader";

export type CategoryType =
  | "gifts"
  | "travels"
  | "foodAndDrinks"
  | "entertainment"
  | "decorations"
  | "costumesAndClothing"
  | "stationeryAndPackaging"
  | "charitableContributions"
  | "budget";

type Props = {
  header: React.ReactNode;
  categoryData: React.ReactNode;
  dataFooter: React.ReactNode;
  showActionColumn?: boolean; // Optional prop to control Action column visibility
};

export default function CategoryLayout({
  header,
  categoryData,
  dataFooter,
  showActionColumn = true, // Default to true for other pages
}: Props) {
  useNav();

  return (
    <div className="flex flex-col h-screen">
      {header}

      {/* Body Section */}
      <div className="flex-grow p-[2vw] bg-[#f9f9f9]">
        <table className="w-full border-collapse text-left">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#f7f7f7] border-b-[2px] border-[#d9d9d9]">
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">
                CATEGORY
              </th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">
                BUDGET
              </th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">
                SPENT
              </th>
              <th className="font-bold p-[10px] border-b border-[#d9d9d9]">
                DIFFERENCE
              </th>
              {/* Conditionally render Action column */}
              {showActionColumn && (
                <th className="font-bold p-[10px] border-b border-[#d9d9d9]">
                  
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>{categoryData}</tbody>

          {/* Table Footer */}
          {dataFooter}
        </table>
      </div>
    </div>
  );
}

CategoryLayout.Header = CategoryLayoutHeader;
CategoryLayout.Data = CategoryLayoutData;
CategoryLayout.DataFooter = CategoryLayoutDataFooter;
CategoryLayout.Columns = CategoryColumns;
