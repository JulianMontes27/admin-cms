"use client";

import { useState, useEffect } from "react";
import StoreModal from "@/components/modals/store-modal";

const ModalProvider = () => {
  //avoid hydration errors between the server and the client
  const [isMounted, setisMounted] = useState(false);
  //once the client starts to hydrate...
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
