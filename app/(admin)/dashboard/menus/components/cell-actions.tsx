"use client";

import { useEffect, useState, useCallback } from "react";
import { MenuColumn } from "./columns";
import DotsHorizontal from "../../../../../components/ui/icons/dots-horizontal";
import Loader from "@/components/loader";
import Modal from "@/components/modals/modal";
import { MenuItemType } from "@/types";

interface CellActionsProps {
  data: MenuColumn;
}

const CellActions = ({ data }: CellActionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<MenuItemType>();

  const fetchMenuById = useCallback(async (id: string) => {
    setLoading(true);
    const response = await fetch(`/api/admin/menus/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setInitialData(result);
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchMenuById(data.id);
  }, [data.id, fetchMenuById]);

  return (
    <>
      {loading && <Loader />}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={initialData}
      />
      <div
        onClick={() => {
          setModalOpen(true), fetchMenuById(data.id);
        }}
        className="flex justify-center cursor-pointer"
      >
        <DotsHorizontal props="w-4 h-4" />
      </div>
    </>
  );
};

export default CellActions;
