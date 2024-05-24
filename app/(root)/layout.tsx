import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  //check if the user has a store created, if he has at least one store, redirect to the dashboard page of the first store found, if nor, open the modal to create a store
  const store = await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
};

export default SetupLayout;
