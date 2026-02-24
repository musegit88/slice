"use client";

import { UserColumn } from "./columns";
import { useState } from "react";
import Trash from "@/components/ui/icons/trash";
import AlertModal from "@/components/modals/alert-modal";
import Loader from "@/components/loader";

interface CellActionProps {
  data: UserColumn;
}

const CellActions = ({ data }: CellActionProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = async (id: string) => {
    setLoading(true);
    setAlertOpen(false);
    await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    window.location.reload();
  };
  return (
    <>
      {loading && <Loader />}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => onDelete(data.id)}
        description={data.name}
      />
      <div className="flex items-center gap-x-2">
        <div
          onClick={() => setAlertOpen(true)}
          className="cursor-pointer text-red-500"
        >
          <Trash className="w-4 h-4" />
        </div>
      </div>
    </>
  );
};

export default CellActions;
