import prisma from "@/lib/prisma";
import ProductForm from "../(components)/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  //fetch product server-side: if there is NO billboard, then the create-product form is going to be rendered, instead, the edit form
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex flex-col">
      <div>
        <ProductForm
          product={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
