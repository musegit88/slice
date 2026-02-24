"use client";

import { useState } from "react";
import { CategoryColumn } from "./columns";
import DotsHorizontal from "@/components/ui/icons/dots-horizontal";
import Loader from "@/components/loader";
import CategoryModal from "@/components/modals/category-modal";

interface CellActionsProps {
  data: CategoryColumn;
}

const CellActions = ({ data }: CellActionsProps) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loader />}
      <CategoryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={data}
      />
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex justify-center cursor-pointer"
      >
        <DotsHorizontal props="w-4 h-4" />
      </div>
    </>
  );
};

export default CellActions;
