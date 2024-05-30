"use client";

import ApiList from "@/components/api-list";
import { SizesColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const CategoryClient = ({ sizes }: { sizes: SizesColumn[] }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Sizes <span>({sizes.length})</span>
          </header>
          <p className="text-sm">
            Manage{" "}
            <span
              onClick={() => router.push(`/${params.storeId}/sizes`)}
              className="text-md font-semibold cursor-pointer"
            >
              sizes
            </span>{" "}
            for your store
          </p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/${params.storeId}/sizes/new`)}
            className="w-[170px]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add new size
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={sizes} filterBy={"name"} />
      </div>
      <div>
        <header className="text-2xl font-semibold ">API</header>
        <p className="text-sm">Manage API calls for your sizes</p>
      </div>
      <ApiList entityName={"sizes"} entityIdName={"sizeId"} />
    </section>
  );
};

export default CategoryClient;
