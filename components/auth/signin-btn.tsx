// import { signOut } from "@/auth";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const SignInBtn = () => {
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
      onClick={() => signIn()}
      className="flex text-sm items-center pl-2 gap-2"
    >
      Sign in
    </Button>
  );
};

export default SignInBtn;
