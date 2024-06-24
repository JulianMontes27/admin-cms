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
      <Button className={cn("transition hover:bg-indigo-700", className)}>
        <span>Login</span>
      </Button>
    </form>
  );
}
