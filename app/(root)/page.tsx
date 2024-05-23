"use client";

import SignInPage from "@/components/auth/signin-page";
import UserButton from "@/components/auth/user-button";
import { useSession } from "next-auth/react";
// import getSession from "@/lib/getSession";
// import { auth } from "@/auth";

export default function Home() {
  //server side auth
  // const session = await getSession();
  // const user = session?.user;
  const session = useSession();
  const user = session.data?.user;
  if (!user) {
    return <SignInPage />;
  }
  return (
    <main className="flex border items-center justify-between">
      <p>{user.name}</p>
      <UserButton user={user} />
    </main>
  );
}
