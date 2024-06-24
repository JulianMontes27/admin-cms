"use client";

import { signOut } from "@/auth";
import { User } from "next-auth";

const SignOutBtn = ({ user }: { user: User }) => {
  return (
    <button onClick={() => signOut({ redirectTo: "/", redirect: true })}>
      Sign Out
    </button>
  );
};

export default SignOutBtn;
