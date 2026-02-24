"use client";

import { useState } from "react";
import CategoryModal from "./modals/category-modal";

const CreateCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => {
    setOpen((prev: boolean) => !prev);
  };
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={openModal}
          className="border px-4 py-2 rounded-full shadow-md"
        >
          Create Category
        </button>
      </div>
      <CategoryModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CreateCategory;
