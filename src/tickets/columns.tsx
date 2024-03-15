"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateSimilarityPercentageLinear } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";

export type Ticket = {
  id: string;
  title: string;
  group?: string;
  similarity?: number;
};

export const columns: ColumnDef<Ticket>[] = [
  //  will be the checkbox to select the tickets for an automated answer
  // {
  //   id: "select",
  //   header: () => <Checkbox disabled />,
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  // },
  {
    accessorKey: "id",
    header: "ID",
  },
  // {
  //   // This will be the Group (SIPAC/SIGRH)
  //   accessorKey: "status",
  //   header: "Group",
  // },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const ticketLink = `https://sac-ntinf.ufsj.edu.br/front/ticket.form.php?id=${row.original.id}`;
      return (
        <a id="ticketSearchedTitle" href={ticketLink} target="_blank" rel="noopener noreferrer">
          <Button variant="link" className="p-0 h-auto align-middle text-left">
            <ExternalLink className="me-1 w-4 h-4 flex-shrink-0" />
            {row.original.title}
          </Button>
        </a>
      );
    },
  },
  {
    accessorKey: "similarity",
    header: "Similarity",
    cell: ({ row }) => {
      const similarity = row.original.similarity || 0;
      const percentage = calculateSimilarityPercentageLinear(similarity).toFixed(1);
      return (
        <div className="w-full bg-secondary border border-muted-foreground rounded-sm">
          <div className="bg-primary text-xs font-medium text-primary-foreground text-center p-0.5 leading-none rounded-sm" style={{ width: `${percentage}%` }}>
            {percentage}%
          </div>
        </div>
      );
    },
  },
];
