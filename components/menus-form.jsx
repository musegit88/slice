"use client";

import { useState } from "react";

import Modal from "@/components/ui/modal";
const MenusForm = ({ filteredCategory }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-center">
        <button onClick={openModal} className="border px-4 py-2 shadow-md">
          Create new menu
        </button>
      </div>
      {open && <Modal setOpen={setOpen} filteredCategory={filteredCategory} />}
    </>
  );
};

export default MenusForm;
