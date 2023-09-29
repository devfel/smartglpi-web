import { useState } from "react";
import { Ticket } from "@/tickets/columns";

export interface TicketWithSimilarity {
  0: Ticket; //Ticket Data
  1: number; //Similarity Score
}

export function useAppState() {
  const [similarTickets, setSimilarTickets] = useState<TicketWithSimilarity[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const formattedData = similarTickets.map((ticketArray) => {
    const ticket = ticketArray[0];
    const similarityScore = ticketArray[1];
    return {
      id: ticket.id,
      title: ticket.title,
      similarity: similarityScore,
    };
  });

  return {
    similarTickets,
    setSimilarTickets,
    formattedData,
    isLoading,
    setIsLoading,
  };
}
