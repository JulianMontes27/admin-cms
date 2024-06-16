import prisma from "@/lib/prisma";
import { Collage } from "@prisma/client";
import { format } from "date-fns";

import { CollageColumn } from "./(components)/columns";
import CollageClient from "./(components)/collage-client";

const CollagesPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's collages
  const collages = await prisma.collage.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted categories to the client
  const formattedCollages: CollageColumn[] = collages.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <CollageClient collages={formattedCollages} />
      </div>
    </div>
  );
};

export default CollagesPage;
