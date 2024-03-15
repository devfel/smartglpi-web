/// SearchByIdForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";
// import { Settings } from "lucide-react"; //used for the settings button

import { TicketWithSimilarity } from "@/utils/appState";

interface SearchByIdFormProps {
  updateSimilarTickets: (tickets: TicketWithSimilarity[]) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestedAnswer: React.Dispatch<React.SetStateAction<string>>;
  setIsLoadingAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setHasSearchedAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchByIdForm({ updateSimilarTickets, setIsLoading, setHasSearched, setSuggestedAnswer, setIsLoadingAnswer, setHasSearchedAnswer }: SearchByIdFormProps) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [searchedTicketID, setSearchedTicketID] = useState("");
  const [isGenerateAnswerDisabled, setIsGenerateAnswerDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the input only allows 1 to 10 digit numbers
    const value = e.target.value;
    if (/^\d{1,10}$/.test(value) || value === "") {
      setTicketNumber(value);
    }
  };

  const handleSearch = async () => {
    setIsGenerateAnswerDisabled(true); // Disable the Generate Answer button while fetching tickets.
    setSuggestedAnswer("Se precisar, a sugestão de resposta será apresentada aqui."); // Clear the previous suggested answer

    try {
      setIsLoading(true); // Start the loading process
      setHasSearched(true);
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
        let embedResponse = await fetch("http://localhost:5000/create-and-embed-ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticket_id: ticketNumber }),
        });

        data = await embedResponse.json();
      }

      // To store and use this data somewhere in your component or app
      if (data.title) {
        setTicketTitle(data.title);
        setTicketLink(`https://sac-ntinf.ufsj.edu.br/front/ticket.form.php?id=${ticketNumber}`);

        // Update the displayed ticket title and set the hyperlink.
        // Logging, later set them in component state or pass them to other components.
        console.log(`Ticket Title: ${data.title}`);
        console.log(`Ticket Link: https://sac-ntinf.ufsj.edu.br/front/ticket.form.php?id=${ticketNumber}`);

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
        // have a function to do this or pass the data to a component/table that will.
        console.log(data);

        setSearchedTicketID(ticketNumber);

        // After successfully fetching ticket details (and not in an error or null state),
        // enable the Generate Answer button.
        setIsGenerateAnswerDisabled(false);
      } else {
        console.error("Ticket not found.");
        updateSimilarTickets([]); // clear the previous similar tickets data
        setTicketLink("#"); // clear the previous ticket link
      }
    } catch (error) {
      // Log any errors that occur during the fetch operations.
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // End the loading process
    }
  };

  // ----------------- Suggested Answer ----------------- //
  // Extracted Suggested Answer logic into its own function
  const handleGenerateAnswer = async () => {
    try {
      setIsLoadingAnswer(true);
      setHasSearchedAnswer(true);

      const suggestedResponse = await fetch("http://localhost:5000/get-suggested-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticket_id: searchedTicketID }),
      });

      const suggestedData = await suggestedResponse.json();
      if (suggestedData.suggested_answer) {
        console.log(`Suggested Answer: ${suggestedData.suggested_answer}`);
        setSuggestedAnswer(suggestedData.suggested_answer);
      } else {
        console.error("Suggested answer not found.");
        setSuggestedAnswer("");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingAnswer(false); // End the loading process and stop the loading animation
      setIsGenerateAnswerDisabled(true); // Disable the Generate Answer button after having one answer generated.
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            maxLength={10}
            placeholder="Ticket ID #"
            className="w-40"
          />
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={handleGenerateAnswer} disabled={isGenerateAnswerDisabled} className="mr-2">
            Suggest Answer
          </Button>
        </div>
        {/* TODO: Add the settings button to configure the API parameters */}
        {/* <Button variant="outline" className="my-2">
          <Settings className="w-4 h-4" />
        </Button> */}
      </div>

      {/* Second line with the Ticket Title and Label */}
      <div className="flex items-center mt-4">
        <Label htmlFor="ticketSearchedTitle" className="font-bold min-w-fit">
          Ticket:
        </Label>

        {ticketTitle === "" ? (
          <Button variant="link">Search a Ticket Number (E.g. 12342 or 12789).</Button>
        ) : (
          <a id="ticketSearchedTitle" href={ticketLink} target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="px-2">
              <ExternalLink className="me-1 w-5 h-5" />
              {searchedTicketID} - {ticketTitle}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
