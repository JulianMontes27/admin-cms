import prisma from "@/lib/prisma";
import type { ProductColumn } from "./(components)/columns";
import ProductClient from "./(components)/billboard-client";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

const ProductsPage = async ({
  params,
}: {
  params: {
    storeId: string;
    productId: string;
  };
}) => {
  //fetch the store's billboards
  const products = await prisma.product.findMany({
    where: {
      storeId: params.productId,
    },
    include: {
      //to access these individual models and display them in the data-table
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted products to the client
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatPrice(item.price),
    category: item.category.title,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
