import { signOut } from "@/auth";
import { User } from "next-auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutBtn = ({ user }: { user: User }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        variant={"ghost"}
        className="border-none flex w-full justify-start p-0 gap-2"
      >
        <LogOut size={15} />
        <span>Sign out</span>
      </Button>
    </form>
  );
};

export default SignOutBtn;
