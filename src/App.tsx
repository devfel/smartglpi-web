/// App.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchByIdForm } from "@/components/SearchByIdForm";
import { columns } from "./tickets/columns";
import { DataTable } from "./tickets/data-table";
import { useAppState } from "@/utils/appState";
import { ButtonLoading } from "@/components/ui-personalized/button-loading";
import { SectionHeader } from "@/components/SectionHeader";
import { Textarea } from "./components/ui/textarea";

export function App() {
  const { setSimilarTickets, formattedData, isLoading, setIsLoading, hasSearched, setHasSearched, suggestedAnswer, setSuggestedAnswer, isLoadingAnswer, setIsLoadingAnswer, hasSearchedAnswer, setHasSearchedAnswer } = useAppState();

  return (
    <div className="bg-muted min-h-screen">
      <div className="bg-background min-h-screen flex flex-col max-w-7xl mx-auto">
        <Header />

        <SearchByIdForm updateSimilarTickets={setSimilarTickets} setIsLoading={setIsLoading} setHasSearched={setHasSearched} setSuggestedAnswer={setSuggestedAnswer} setIsLoadingAnswer={setIsLoadingAnswer} setHasSearchedAnswer={setHasSearchedAnswer} />

        <SectionHeader title="Related Tickets" />
        {isLoading ? (
          <div className="w-fit mx-auto my-4 h-60">
            <ButtonLoading />
          </div>
        ) : (
          <DataTable columns={columns} data={formattedData} hasSearched={hasSearched} />
        )}

        <SectionHeader title="Suggested Answer" />
        {isLoadingAnswer ? (
          <div className="w-fit mx-auto my-4 h-60">
            <ButtonLoading />
          </div>
        ) : (
          <Textarea value={suggestedAnswer} hasSearchedAnswer={hasSearchedAnswer} disabled className="shadow-lg w-auto mx-6 h-72 my-3 disabled:opacity-100 disabled:cursor-text" />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
