"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CategoryColumn = {
  id: string;
  title: string;
  billboardLabel: string;
  createdAt: string;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction cate={row.original} />,
  },
];
