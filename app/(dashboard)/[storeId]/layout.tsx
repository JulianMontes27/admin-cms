import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
  params,
}) => {
  //check for auth (cached)
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/sign-in");
  }
  //load the store that matches the params' id
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });
  if (!store) {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default DashboardLayout;
