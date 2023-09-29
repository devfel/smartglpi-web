import { Header } from "@/components/Header";
import { SearchByIdForm } from "@/components/SearchByIdForm";
import { columns } from "./tickets/columns";
import { DataTable } from "./tickets/data-table";
import { useAppState } from "@/utils/appState";

export function App() {
  const { setSimilarTickets, formattedData } = useAppState();

  return (
    <div className="bg-muted min-h-screen">
      <div className="bg-background min-h-screen flex flex-col max-w-7xl mx-auto">
        <Header />
        <SearchByIdForm updateSimilarTickets={setSimilarTickets} />
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
}

export default App;
