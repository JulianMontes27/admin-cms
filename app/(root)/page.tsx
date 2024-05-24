"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
// import getSession from "@/lib/getSession";
// import { auth } from "@/auth";

export default function Home() {
  // const session = sion();
  // const user = session.data?.user;
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null; //just trigger the modal
}
