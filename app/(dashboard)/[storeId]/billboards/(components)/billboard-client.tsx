"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BillboardClient = () => {
  const params = useParams();
  const router = useRouter();
  return (
    <section className="flex items-center justify-between  ">
      <div>
        <header className="text-2xl font-semibold">Billboards (0)</header>
        <p className="text-sm">Manage billboards for your store</p>
      </div>
      <div>
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add new billboard
        </Button>
      </div>
    </section>
  );
};

export default BillboardClient;
