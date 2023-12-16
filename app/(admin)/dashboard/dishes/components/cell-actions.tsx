"use client";

import React, { useState } from "react";
import { MenuColumn } from "./columns";
import DotsHorizontal from "../../../../../components/ui/icons/dots-horizontal";
import PencilAlt from "../../../../../components/ui/icons/pencil-alt";
import Trash from "../../../../../components/ui/icons/trash";
import AlertModal from "@/components/modals/alert-modal";
import Loader from "@/components/loader";

interface CellActionsProps {
  data: MenuColumn;
}

const CellActions = ({ data }: CellActionsProps) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = async (id: string) => {
    setLoading(true);
    setAlertOpen(false);
    await fetch(`/api/admin/menus/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    window.location.reload();
  };
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => onDelete(data.id)}
      />
      {loading && <Loader />}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-center cursor-pointer"
      >
        <DotsHorizontal className="w-4 h-4" />
      </div>
      {open && (
        <div className="relative z-10">
          <div className="fixed overflow-y-auto">
            <div
              onMouseLeave={() => setOpen(false)}
              className="border rounded-md bg-slate-50 overflow-hidden min-w-[140px] p-2"
            >
              <div className="flex justify-start">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-x-2 hover:bg-blue-100 p-1 rounded-sm cursor-pointer">
                    <PencilAlt className="w-5 h-5" />
                    <span>Update</span>
                  </div>
                  <div
                    onClick={() => setAlertOpen(true)}
                    className="flex items-center gap-x-2 hover:bg-blue-100 p-1 rounded-sm cursor-pointer"
                  >
                    <Trash className="w-5 h-5" />
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CellActions;
