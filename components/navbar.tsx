
import getSession from "@/lib/getSession";
import UserButton from "./auth/user-button";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="flex flex-row justify-between border items-center">
      <h1>CMS</h1>
      <UserButton user={user} />
    </div>
  );
};

export default Navbar;
