import prisma from "@/lib/prisma";
import type { ColorsColumn } from "./(components)/columns";
import { format } from "date-fns";
import ColorClient from "./(components)/color-client";

const SizesPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's colors
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted sizes to the client
  const formattedSizes: ColorsColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <ColorClient colors={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
