"use client";

import { useEffect, useState, useCallback } from "react";
import { orderColumn } from "./columns";
import DotsHorizontal from "../../../../../components/ui/icons/dots-horizontal";
import Loader from "@/components/loader";
import { OrderType } from "@/types";
import OrderModal from "@/components/modals/order-modal";

interface CellActionsProps {
  data: orderColumn;
}

const CellActions = ({ data }: CellActionsProps) => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<OrderType>();

  const fetchOrderById = useCallback(async (id: string) => {
    setLoading(true);
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setInitialData(result);
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchOrderById(data.id);
  }, [data.id, fetchOrderById]);

  return (
    <>
      {loading && <Loader />}
      <div
        onClick={() => {
          setOrderModalOpen(true), fetchOrderById(data.id);
        }}
        className="flex justify-center cursor-pointer"
      >
        <DotsHorizontal props="w-4 h-4" />
      </div>
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialData={initialData}
      />
    </>
  );
};

export default CellActions;
