// import { signOut } from "@/auth";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

const SignOutBtn = () => {
  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signOut();
    //   }}
    // >
    //   <button type="submit" className="flex flex-row gap-1">
    //     <LogOut size={15} />
    //     Sign out
    //   </button>
    // </form>
    <Button
      onClick={() => signOut()}
      variant={"destructive"}
      className="flex text-sm items-center pl-2 gap-2 w-full"
    >
      <span>
        <LogOut size={15} />
      </span>
      Sign out
    </Button>
  );
};

export default SignOutBtn;
