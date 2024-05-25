import getSession from "@/lib/getSession";
import UserButton from "./auth/user-button";
import MainNav from "./main-nav";
import { StoreCombobox } from "./store-combobox";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-row justify-between border-b items-center mb-4">
    {/* <StoreCombobox items={} /> */}
      <MainNav />
      <UserButton user={user} />
    </div>
  );
};

export default Navbar;
