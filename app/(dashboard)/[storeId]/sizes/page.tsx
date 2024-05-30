import prisma from "@/lib/prisma";
import type { SizesColumn } from "./(components)/columns";
import { format } from "date-fns";
import CategoryClient from "./(components)/category-client";

const SizesPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's sizes
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted sizes to the client
  const formattedSizes: SizesColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <CategoryClient sizes={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
