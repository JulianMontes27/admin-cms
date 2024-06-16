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
  return <div>{store?.title}</div>;
};

export default DashboardPage;
