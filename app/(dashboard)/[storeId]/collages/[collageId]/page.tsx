import prisma from "@/lib/prisma";
import CollageForm from "../(components)/collage-form";

const CollagesPage = async ({
  params,
}: {
  params: { collageId: string; storeId: string };
}) => {
  //fetch category server-side: if there is NO category, then the create-category form is going to be rendered, instead, the edit form
  const collage = await prisma.collage.findUnique({
    where: {
      id: params.collageId,
    },
    include: {
      collageImages: true,
    },
  });

  return (
    <div className="flex flex-col">
      <CollageForm collage={collage} />
    </div>
  );
};

export default CollagesPage;
