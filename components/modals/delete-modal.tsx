"use client";

import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { Button } from "../ui/button";

interface DeleteModalProps {
  title: string;
  desc: string;
  onClose: () => void;
  isOpen: boolean;
  closeModal: (open: boolean) => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  desc,
  onClose,
  isOpen,
  closeModal,
  handleDelete,
}) => {
  //hydration error check
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Modal title={title} desc={desc} isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-end gap-5">
        <Button variant={"outline"} onClick={closeModal}>
          Cancel
        </Button>
        <Button variant={"destructive"} onClick={handleDelete}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
