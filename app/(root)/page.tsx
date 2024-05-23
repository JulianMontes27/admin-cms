"use client";

import SignInBtn from "@/components/auth/signin-btn";
import SignInPage from "@/components/auth/signin-page";
import UserButton from "@/components/auth/user-button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import getSession from "@/lib/getSession";
// import { auth } from "@/auth";

export default function Home() {
  //server side auth
  // const session = await getSession();
  // const user = session?.user;
  const session = useSession();
  const user = session.data?.user;

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return (
    <main className="flex border items-center justify-between">
      {user && (
        <>
          <p>{user.name}</p>
          <UserButton user={user} />
        </>
      )}
    </main>
  );
}
