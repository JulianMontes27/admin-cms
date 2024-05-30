"use client";

import ApiList from "@/components/api-list";
import { ColorsColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ColorClient = ({ colors }: { colors: ColorsColumn[] }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Colors <span>({colors.length})</span>
          </header>
          <p className="text-sm">
            Manage{" "}
            <span
              onClick={() => router.push(`/${params.storeId}/colors`)}
              className="text-md font-semibold cursor-pointer"
            >
              colors
            </span>{" "}
            for your store
          </p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/${params.storeId}/colors/new`)}
            className="w-[170px]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add new color
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={colors} filterBy={"name"} />
      </div>
      <div>
        <header className="text-2xl font-semibold ">API</header>
        <p className="text-sm">Manage API calls for your colors</p>
      </div>
      <ApiList entityName={"colors"} entityIdName={"colorId"} />
    </section>
  );
};

export default ColorClient;
