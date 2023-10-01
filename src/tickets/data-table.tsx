"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

import { Ticket, columns as ticketColumns } from "@/tickets/columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasSearched: boolean;
}

function calculateSimilarityPercentageLinear(x) {
  // Create the Function
  const linearAdjustment = 1.33; //increase the results in 33%
  let remove90PercentAdj = (x - 0.9) * 10 * linearAdjustment; //remove the 0.90  from the backend value
  if (remove90PercentAdj < 0) remove90PercentAdj = 0; //if the value is negative, set to 0
  if (remove90PercentAdj > 1) remove90PercentAdj = 1; //if the value is greater than 1, set to 1 (100%
  return remove90PercentAdj * 100;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hasSearched,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="mx-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>{" "}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    if (
                      (cell.column.columnDef as any).accessorKey ===
                      "similarity"
                    ) {
                      console.log("Entrou no if");
                      console.log(cell);
                      // Display progress bar
                      const percentage = calculateSimilarityPercentageLinear(
                        (cell.row.original as Ticket).similarity || 0
                      ).toFixed(1);
                      // Assuming cell.value contains the similarity percentage
                      return (
                        <TableCell key={cell.id}>
                          <div className="w-full bg-secondary border rounded-sm">
                            <div
                              className="bg-primary text-xs font-medium text-primary-foreground text-center p-0.5 leading-none rounded-sm"
                              style={{ width: `${percentage}%` }}
                            >
                              {percentage}%
                            </div>
                          </div>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))
            ) : hasSearched ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-60 text-center"
                >
                  Ticket Searched Not Found
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-60 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
