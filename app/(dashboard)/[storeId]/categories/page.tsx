import prisma from "@/lib/prisma";
import type { CategoryColumn } from "./(components)/columns";
import { format } from "date-fns";
import CategoryClient from "./(components)/category-client";

const CategoriesPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's categories
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted categories to the client
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    title: item.title,
    billboardLabel: item.billboard.title,
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
