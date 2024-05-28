"use client";

import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BillboardClient = ({ data }: { data: BillboardColumn[] }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Billboards <span>({data.length})</span>
          </header>
          <p className="text-sm">Manage billboards for your store</p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
            className="w-[170px]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add new billboard
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={data} filterBy={"title"} />
      </div>
    </section>
  );
};

export default BillboardClient;
