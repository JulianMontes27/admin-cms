"use client";

import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table";

const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <section>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <header className="text-2xl font-semibold ">
            Orders <span>({data.length})</span>
          </header>
          <p className="text-sm">Manage orders</p>
        </div>
      </div>
      <DataTable columns={columns} data={data} filterBy={"products"} />
    </section>
  );
};

export default OrderClient;
