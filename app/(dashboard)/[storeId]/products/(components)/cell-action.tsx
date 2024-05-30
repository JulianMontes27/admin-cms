"use client";

import { Copy, Edit, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";

import { ProductColumn } from "./columns";

const CellAction = ({ data }: { data: ProductColumn }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          <Copy />
          Copy category ID
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-3"
          onClick={() =>
            router.push(`/${params.storeId}/categories/${data.id}`)
          }
        >
          <Edit /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
