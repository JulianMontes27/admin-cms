import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

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
    redirect("/api/auth/signin");
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
  return (
    <main className="container">
      <Navbar />
      <div className="mt-6">{children}</div>
    </main>
  );
};

export default DashboardLayout;
