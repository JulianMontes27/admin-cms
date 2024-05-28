"use client";

import CellAction from "@/components/cell-action";
import { ColumnDef } from "@tanstack/react-table";

export type BillboardColumn = {
  id: string;
  title: string;
  createdAt: string;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
