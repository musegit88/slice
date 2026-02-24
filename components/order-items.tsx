"use client";

import Link from "next/link";
import OrderItemCard from "./ui/order-item-card";
import { OrderType } from "@/types";
import SquareCheck from "./ui/icons/square-check";
import Square from "./ui/icons/square";
import { OrderContext, OrderContextType } from "./providers/order-providers";
import { useContext, useState } from "react";
import Trash from "./ui/icons/trash";
import AlertModal from "./modals/alert-modal";
import toast from "react-hot-toast";

const OrderItems = ({ orders }: { orders: OrderType[] }) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const { selectedOrders, setSelectedOrders } =
    useContext<OrderContextType>(OrderContext);
  const deletedOrders = orders.filter(
    (order) => order.deletedByUserAt === null,
  );

  // Handle select all orders filtered by deletedByUserAt is null
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(
        orders
          .filter((order) => order.deletedByUserAt === null)
          .map((order) => order.id),
      );
    } else {
      setSelectedOrders([]);
    }
  };

  // handle soft delete all orders
  const handleDeleteAll = async () => {
    try {
      const res = await fetch("/api/order", {
        method: "DELETE",
        body: JSON.stringify({
          selectedOrders,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("Orders removed from cart");
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove orders from cart");
    }
  };
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => handleDeleteAll()}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {deletedOrders.length > 1 && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="select-all"
                className=" text-white rounded-sm  text-center"
              >
                <span className="sr-only">
                  {selectedOrders.length > 1 ? "Unselect All" : "Select All"}
                </span>
                <input
                  id="select-all"
                  type="checkbox"
                  checked={
                    selectedOrders.length ===
                    orders.filter((order) => order.deletedByUserAt === null)
                      .length
                  }
                  onChange={(e) => handleSelectAll(e)}
                  className="hidden"
                />
                {selectedOrders.length ===
                orders.filter((order) => order.deletedByUserAt === null)
                  .length ? (
                  <SquareCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Square className="w-5 h-5 text-primary" />
                )}
              </label>
            </div>
          )}
          {selectedOrders.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAlertOpen(true)}
                className=" text-white rounded-sm  px-1 text-center flex items-center gap-2"
              >
                <span className="sr-only">Delete All</span>
                <Trash className="w-5 h-5 text-secondary" />
              </button>
            </div>
          )}
        </div>

        {/* show the orders */}
        <div className="flex flex-col gap-4">
          {deletedOrders &&
            orders.map(
              (order) =>
                order.deletedByUserAt === null && (
                  <OrderItemCard key={order.id} order={order} />
                ),
            )}

          {/* If there is no order */}
          {deletedOrders.length === 0 && (
            <div className="flex items-center justify-center h-[50vh]">
              <div className="flex flex-col gap-4">
                <span className="text-center">No orders found!</span>
                <div className="flex items-center gap-2">
                  <p className="text-lg text-secondary font-bold">
                    Explore our full{" "}
                  </p>
                  <Link
                    href={"/menu"}
                    className="bg-primary rounded-sm py-1 px-4 text-white text-center"
                  >
                    Menu
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderItems;
