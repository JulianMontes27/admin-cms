import { signIn } from "@/auth";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SignInBtn({ className }: { className: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button
        variant={"ghost"}
        className={cn(
          "border-none flex w-full justify-start p-0 gap-2",
          className
        )}
      >
        <span>Login</span>
      </Button>
    </form>
  );
}
