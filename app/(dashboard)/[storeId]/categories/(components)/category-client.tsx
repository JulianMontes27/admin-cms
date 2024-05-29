"use client";

import ApiList from "@/components/api-list";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const CategoryClient = ({ data }: { data: CategoryColumn[] }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Categories <span>({data.length})</span>
          </header>
          <p className="text-sm">Manage categories for your billboard</p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/${params.storeId}/categories/new`)}
            className="w-[170px]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add new category
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={data} filterBy={"title"} />
      </div>
      <div>
        <header className="text-2xl font-semibold ">API</header>
        <p className="text-sm">Manage categories for your categories</p>
      </div>
      <ApiList entityName={"categories"} entityIdName={"categoryId"} />
    </section>
  );
};

export default CategoryClient;
