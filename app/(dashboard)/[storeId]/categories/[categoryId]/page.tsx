import prisma from "@/lib/prisma";
import CategoryForm from "../(components)/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  //fetch category server-side: if there is NO category, then the create-category form is going to be rendered, instead, the edit form
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex flex-col">
      <div>
        <CategoryForm category={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
