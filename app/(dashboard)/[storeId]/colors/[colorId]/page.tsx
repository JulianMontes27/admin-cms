import prisma from "@/lib/prisma";
import ColorForm from "../(components)/color-form";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  //fetch color server-side: if there is NO color, then the create-color form is going to be rendered, instead, the edit form
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div>
        <ColorForm colorItem={color} />
      </div>
    </div>
  );
};

export default ColorPage;
