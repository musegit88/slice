"use client";

import { useState } from "react";
import CheckCircle from "./ui/icons/check-circle";
import { cn } from "@/libs/utils";
import ChevronUp from "./ui/icons/chevron-up";
import ChevronDown from "./ui/icons/chevron-down";
import toast from "react-hot-toast";

const OrderStatusSelect = ({
  orderStatus,
  orderId,
}: {
  orderStatus: string;
  orderId: string;
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const statusList = [
    "Pending",
    "Preparing",
    "Completed",
    "Delivering",
    "Delivered",
  ];

  const handleStatusChange = async (status: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        window.location.reload();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.log("ORDER_STATUS_CHANGE_ERROR", error);
      toast.error("Failed to update status");
    }
  };
  return (
    <div
      onClick={() => setOpened((prev) => !prev)}
      className="relative w-full rounded-md py-2 pl-4 text-left sm:text-sm cursor-pointer border"
    >
      <div>
        {orderStatus.charAt(0).toUpperCase() +
          orderStatus.slice(1).toLocaleLowerCase()}
      </div>
      <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
        {opened ? (
          <ChevronUp className="w-4 h-4 text-gray-400 transition" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 transition" />
        )}
      </span>
      {opened && (
        <div className="absolute mt-3 max-h-60 w-full left-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg z-[999]">
          {statusList.map((status) => (
            <div
              key={status}
              onClick={() => handleStatusChange(status.toUpperCase())}
              className=" flex items-center justify-between py-2 pl-4 pr-4 hover:bg-base text-primary px-2 cursor-pointer"
            >
              <span
                className={cn(
                  status.toUpperCase() === orderStatus && "font-bold",
                )}
              >
                {status}
              </span>
              <span>
                {status.toUpperCase() === orderStatus && (
                  <CheckCircle className="w-4 h-5" />
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatusSelect;
