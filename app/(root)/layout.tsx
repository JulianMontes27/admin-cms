import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";
import React from "react";

import LandingPage from "./_components/public-landing-page";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession(); //fetch session on the server
  const user = session?.user;
  if (!user) {
    return <LandingPage />;
  }
  //check if the user has a store created, if he has at least one store, redirect to the dashboard page of the first store found, if not, open the modal to create a store
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
