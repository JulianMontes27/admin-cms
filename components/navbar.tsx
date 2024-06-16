import getSession from "@/lib/getSession";
import UserButton from "./auth/user-button";
import MainNav from "./main-nav";
import { StoreCombobox } from "./store-combobox";
import prisma from "@/lib/prisma";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return null;
  }
  const data = await prisma.store.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <div className="flex justify-between border-b mb-4">
      <StoreCombobox items={data} />
      <MainNav />
      <UserButton user={user} />
    </div>
  );
};

export default Navbar;
