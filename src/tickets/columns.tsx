"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Ticket = {
  id: string;
  title: string;
  group?: string;
  similarity?: number;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    header: () => <Checkbox disabled />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    // This will be the Group (SIPAC/SIGRH)
    accessorKey: "status",
    header: "Group",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "similarity",
    header: "Similarity",
  },
];
