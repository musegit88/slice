"use client";

import { OrderType } from "@/types";
import Close from "../ui/icons/close";
import OrderStatusSelect from "../order-status-select";
import Clipboard from "../ui/icons/clipboard";
import { useState } from "react";
import ClipboardCheck from "../ui/icons/clipboard-check";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  initialData?: OrderType;
}

const OrderModal = ({ isOpen, onClose, initialData }: ModalProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const allPrices = initialData?.cartItems.map((item) => item.totalPrice);
  const totalPrice = allPrices?.reduce((acc, price) => acc + price, 0);
  return (
    <>
      {isOpen && (
        <div className="relative z-10">
          {" "}
          <div
            onClick={() => onClose}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm"
          />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-center justify-center min-h-full p-4 text-center">
              <div className="w-full max-w-md h-[420px] transform overflow-auto bg-white p-6 rounded-md text-left align-middle shadow-xl transition-all">
                <span
                  onClick={() => onClose()}
                  className="absolute top-2 right-4 bg-base p-1 rounded-full cursor-pointer"
                >
                  <Close props="w-4 h-4" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold">Order Details</h1>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm md:text-lg font-semibold">
                    {initialData.id}
                  </h4>
                  <span
                    onClick={() => handleCopy(initialData.id)}
                    className="cursor-pointer"
                  >
                    {copied ? (
                      <ClipboardCheck props="w-6 h-6" />
                    ) : (
                      <Clipboard props="w-6 h-6" />
                    )}
                  </span>
                </div>
                <span>
                  orderd by <strong>{initialData.username}</strong> on{" "}
                  <strong>
                    {initialData.createdAt &&
                      format(new Date(initialData.createdAt), "MMM d, yyyy")}
                  </strong>
                </span>
                <div className="mt-4">
                  <OrderStatusSelect
                    orderStatus={initialData?.status}
                    orderId={initialData?.id}
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  {initialData?.cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-1 border p-2 rounded-md hover:bg-base"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Menu</h4>
                          <p>{item.name}</p>
                          <h4 className="font-semibold">Price</h4>
                          <p>${item.basePrice}</p>
                        </div>
                        {item.sizes.length > 0 && (
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Size</h4>
                            <p>{item.sizes[0]?.name}</p>
                            <h4 className="font-semibold">Price</h4>
                            <p>${item.sizes[0]?.extraPrice}</p>
                          </div>
                        )}
                        {item.extras.length > 0 && (
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Extra</h4>
                            <p>{item.extras[0]?.name}</p>
                            <h4 className="font-semibold">Price</h4>
                            <p>${item.extras[0]?.extraPrice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="bg-primary text-white flex items-center gap-2 p-2 rounded-md border w-fit ml-auto">
                    <h4 className="font-semibold">Total</h4>
                    <p>${totalPrice}</p>
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

export default OrderModal;
