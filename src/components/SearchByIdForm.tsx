import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { ExternalLink } from "lucide-react";

import { TicketWithSimilarity } from "@/utils/appState";

interface SearchByIdFormProps {
  updateSimilarTickets: (tickets: TicketWithSimilarity[]) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchByIdForm({
  updateSimilarTickets,
  setIsLoading,
}: SearchByIdFormProps) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the input only allows 1 to 10 digit numbers
    const value = e.target.value;
    if (/^\d{1,10}$/.test(value) || value === "") {
      setTicketNumber(value);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true); // Start the loading process
      // Fetch the details of the searched ticket from the backend.
      let response = await fetch("http://localhost:5000/get-ticket-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticket_id: ticketNumber }),
      });

      // Parse the JSON response.
      let data = await response.json();

      // If the ticket is not found, fetch the ticket from GLPI and generate its embedding
      if (data.error && data.error === "Ticket not found") {
        let embedResponse = await fetch(
          "http://localhost:5000/create-and-embed-ticket",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticket_id: ticketNumber }),
          }
        );

        data = await embedResponse.json();
      }

      // Assuming you'll want to store and use this data somewhere in your component or app
      if (data.title) {
        setTicketTitle(data.title);
        setTicketLink(
          `https://sac-ntinf.ufsj.edu.br/front/ticket.form.php?id=${ticketNumber}`
        );

        // Update the displayed ticket title and set the hyperlink.
        // For now, I'm just logging them. You might want to set them in component state or pass them to other components.
        console.log(`Ticket Title: ${data.title}`);
        console.log(
          `Ticket Link: https://sac-ntinf.ufsj.edu.br/front/ticket.form.php?id=${ticketNumber}`
        );

        // Fetch similar tickets from the backend.
        response = await fetch("http://localhost:5000/find-similar-tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticket_id: ticketNumber }),
        });

        // Parse the JSON response for similar tickets.
        data = await response.json();
        updateSimilarTickets(data);

        // Update the table with similar tickets.
        // Assuming you'll have a function to do this or pass the data to a component/table that will.
        console.log(data);
      } else {
        console.error("Ticket not found.");
      }
    } catch (error) {
      // Log any errors that occur during the fetch operations.
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // End the loading process
    }
  };

  return (
    <div className="px-6 py-3 flex flex-col justify-between">
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
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Second line with the Ticket Title and Label */}
      <div className="flex items-center">
        <Label htmlFor="ticketSearchedTitle" className="font-bold min-w-fit">
          Ticket Title:
        </Label>

        {ticketTitle === "" ? (
          <Button variant="link">
            Search a Ticket Number (E.g. 12342 or 12789).
          </Button>
        ) : (
          <a
            id="ticketSearchedTitle"
            href={ticketLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="link" className="px-2">
              <ExternalLink className="me-1 w-5 h-5" />
              {ticketTitle}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
