import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "./modal";

const StoreModal = () => {
  //add zustand
  const storeModal = useStoreModal();
  return (
    <Modal
      title={"Create a store"}
      desc={"Create a new store to manage"}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future create store modal
    </Modal>
  );
};

export default StoreModal;
 