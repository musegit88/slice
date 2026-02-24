"use client";

import { useState } from "react";
import Modal from "@/components/modals/modal";

const CreateMenu = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={handleOpenModal}
          className="border px-4 py-2 shadow-md rounded-full"
        >
          Create new menu
        </button>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default CreateMenu;
