"use client";

import StoreModal from "@/components/modals/store-modal";

import { useState, useEffect } from "react";

const ModalProvider = () => {
  //avoid hydration errors between the server and the client
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  //if the app is in server side still, return nothing to avoid hydration errors
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
