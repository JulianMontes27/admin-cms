"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CollageColumn = {
  id: string;
  name: string;
  createdAt: string;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<CollageColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction collage={row.original} />,
  },
];
