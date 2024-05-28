import BillboardClient from "./(components)/billboard-client";
import prisma from "@/lib/prisma";
import type { BillboardColumn } from "./(components)/columns";
import { format } from "date-fns";

const BillboardPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's billboards
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted billboards to the client
  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    title: item.title,
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
