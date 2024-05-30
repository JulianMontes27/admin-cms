import prisma from "@/lib/prisma";
import SizesForm from "../(components)/size-form";

const CategoryPage = async ({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) => {
  //fetch category server-side: if there is NO category, then the create-category form is going to be rendered, instead, the edit form
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div>
        <SizesForm sizeItem={size} />
      </div>
    </div>
  );
};

export default CategoryPage;
