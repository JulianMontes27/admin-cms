import prisma from "@/lib/prisma";
import React from "react";
import BillboardForm from "../(components)/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  //fetch billboard server-side: if there is NO billboard, then the create-billboard form is going to be rendered, instead, the edit form
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex flex-col">
      <div>
        <BillboardForm billboard={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
