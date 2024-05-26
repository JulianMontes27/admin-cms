import SettingsForm from "@/components/settings-form";
import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface StoreSettingsProps {
  params: {
    storeId: string;
  };
}

const StoreSettings = async ({ params }: StoreSettingsProps) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>{user && store && <SettingsForm store={store} user={user} />}</div>
  );
};

export default StoreSettings;
