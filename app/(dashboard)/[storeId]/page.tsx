import prisma from "@/lib/prisma";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <>
      <h1 className="flex">
        Active store =&gt; <p>{store?.title}</p>
      </h1>
    </>
  );
};

export default DashboardPage;
