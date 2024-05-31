"use client";

import ApiList from "@/components/api-list";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ProductClient = ({ data }: { data: ProductColumn[] }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Products <span>({data.length})</span>
          </header>
          <p className="text-sm">Manage products for your store</p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/${params.storeId}/products/new`)}
            className="w-[170px]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add new product
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={data} filterBy={"name"} />
      </div>
      <div>
        <header className="text-2xl font-semibold ">API</header>
        <p className="text-sm">Manage products for your store</p>
      </div>
      <ApiList entityName={"products"} entityIdName={"productId"} />
    </section>
  );
};

export default ProductClient;
