import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { ExternalLink } from "lucide-react";

export function SearchByIdForm() {
  const [ticketNumber, setTicketNumber] = useState("");

  const handleInputChange = (e) => {
    // Ensure the input only allows 1 to 10 digit numbers
    const value = e.target.value;
    if (/^\d{1,10}$/.test(value) || value === "") {
      setTicketNumber(value);
    }
  };

  const handleSearch = () => {
    // Logic to handle the search by ticket number goes here
    console.log(`Searching for ticket number: ${ticketNumber}`);
  };

  return (
    <div className="px-6 py-3 flex flex-col justify-between border-b">
      {/* First line with ID Label, ID Input, and Search Button */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center gap-2">
          <Label htmlFor="ticketNumber" className="font-bold min-w-fit">
            Ticket Number:
          </Label>
          <Input
            type="text"
            id="ticketNumber"
            value={ticketNumber}
            onChange={handleInputChange}
            maxLength={10}
            placeholder="Ticket ID #"
            className="w-40"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Button variant="outline" className="my-2">
          <Settings className="w-4 h-4 " />
        </Button>
      </div>

      {/* Second line with the Ticket Title and Label */}
      <div className="flex items-center">
        <Label htmlFor="ticketSearchedTitle" className="font-bold min-w-fit">
          Ticket Title:
        </Label>

        <a id="ticketSearchedTitle" href="#">
          <Button variant="link">
            This is a nameplace holder
            <ExternalLink className="mx-2" />
          </Button>
        </a>
      </div>
    </div>
  );
}
