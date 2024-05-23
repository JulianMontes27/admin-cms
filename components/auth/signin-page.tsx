// import { signIn } from "@/auth";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const SignInPage = () => {
  return (
    // <div className="flex items-center justify-center">
    //   <form
    //     action={async () => {
    //       "use server";
    //       await signIn();
    //     }}
    //   >
    //     <Button type="submit">Sign In!</Button>
    //   </form>
    // </div>
    <div>
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  );
};

export default SignInPage;
