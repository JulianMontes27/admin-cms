"use client";

import ApiList from "@/components/api-list";
import { CollageColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

const CollageClient = ({ collages }: { collages: CollageColumn[] }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Collages <span>({collages.length})</span>
          </header>
          <p className="text-sm">Manage collages for your store</p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/${params.storeId}/collages/new`)}
            className="w-[170px] flex flex-row items-center"
          >
            <Plus className="mr-2" /> Add new collage
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={collages} filterBy={"name"} />
      </div>
      <div>
        <header className="text-2xl font-semibold ">API</header>
        <p className="text-sm">Manage collages for your store</p>
      </div>
      <ApiList entityName={"collages"} entityIdName={"collageId"} />
    </section>
  );
};

export default CollageClient;
