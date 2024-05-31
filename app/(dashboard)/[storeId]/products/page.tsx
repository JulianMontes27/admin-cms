import prisma from "@/lib/prisma";
import type { ProductColumn } from "./(components)/columns";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import ProductClient from "./(components)/product-client";

const ProductsPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  //fetch the store's products
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //send formatted product to the client
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: item.price,
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
