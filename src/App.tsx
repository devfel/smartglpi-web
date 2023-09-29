import { Header } from "@/components/Header";
import { SearchByIdForm } from "@/components/SearchByIdForm";
import { columns } from "./tickets/columns";
import { DataTable } from "./tickets/data-table";
import { useAppState } from "@/utils/appState";
import { ButtonLoading } from "@/components/ui-personalized/button-loading";
import { SectionHeader } from "@/components/SectionHeader";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function App() {
  const { setSimilarTickets, formattedData, isLoading, setIsLoading } =
    useAppState();

  return (
    <div className="bg-muted min-h-screen">
      <div className="bg-background min-h-screen flex flex-col max-w-7xl mx-auto">
        <Header />

        <SearchByIdForm
          updateSimilarTickets={setSimilarTickets}
          setIsLoading={setIsLoading}
        />

        <SectionHeader title="Related Tickets" />
        {isLoading ? (
          <div className="w-fit mx-auto my-4 h-60">
            <ButtonLoading />
          </div>
        ) : (
          <DataTable columns={columns} data={formattedData} />
        )}

        <SectionHeader title="Suggested Answer" />
        <Button className="w-fit mx-6 my-3">
          <HoverCard>
            <HoverCardTrigger>Generate Response</HoverCardTrigger>
            <HoverCardContent className="text-left">
              <p className="text-sm"> Based on the selected tickets: </p>
              <p className="text-sm"> ID: 12992 </p>
              <p className="text-sm"> ID: 13923 </p>
              <p className="text-sm"> ID: 12939 </p>
            </HoverCardContent>
          </HoverCard>
        </Button>

        <Textarea
          disabled
          className="shadow-lg w-auto mx-6 h-96 mb-6 disabled:opacity-100 disabled:cursor-text"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          debitis totam, quod nostrum, illum facilis dicta nemo consequuntur
          dolor harum reprehenderit
        </Textarea>
      </div>
    </div>
  );
}

export default App;
