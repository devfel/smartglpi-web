import { Header } from "@/components/Header";
import { SearchByIdForm } from "@/components/SearchByIdForm";

export function App() {
  return (
    <div className="bg-muted min-h-screen">
      <div className="bg-background min-h-screen flex flex-col max-w-7xl mx-auto">
        <Header />
        <SearchByIdForm />
      </div>
    </div>
  );
}

export default App;
