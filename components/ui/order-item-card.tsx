"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { cn } from "@/libs/utils";
import { OrderType } from "@/types";
import Trash from "./icons/trash";
import ChevronDown from "./icons/chevron-down";
import ChevronUp from "./icons/chevron-up";
import { OrderContext, OrderContextType } from "../providers/order-providers";
import Clock from "./icons/clock";
import ChefHat from "./icons/chef-hat";
import CheckCircle from "./icons/check-circle";
import Bike from "./icons/bike";
import PackageCheck from "./icons/package-check";
import AlertModal from "../modals/alert-modal";

const OrderItemCard = ({ order }: { order: OrderType }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  // show the rest of the items if the order has more than one item
  const [showItems, setShowItems] = useState(false);

  const { selectedOrders, setSelectedOrders } =
    useContext<OrderContextType>(OrderContext);

  // calculate the total price of the order
  const deliveryFee = 4.0;
  let total = 0;
  for (const item of order.cartItems) {
    total = total + (item.totalPrice * item.quantity) / 100;
  }

  // soft delete the order
  const handleDelete = async (orderId: string) => {
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("Order deleted successfully");
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete order");
    }
  };

  // handle selected orders
  const handleSelectedOrders = (
    e: React.ChangeEvent<HTMLInputElement>,
    orderId: string,
  ) => {
    if (e.target.checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => handleDelete(order.id)}
      />
      <div
        className={cn(
          "relative bg-base w-full max-w-lg p-4 rounded-md overflow-hidden",
        )}
      >
        <label htmlFor="select-item" className="cursor-pointer">
          <input
            id="select-item"
            type="checkbox"
            value={order.id}
            checked={selectedOrders.includes(order.id)}
            onChange={(e) => handleSelectedOrders(e, order.id)}
          />
        </label>
        <div className="flex flex-col gap-4 w-full">
          {/* show the first item */}
          {
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="relative w-16 h-16">
                      <Image
                        src={order.cartItems[0].image}
                        width={100}
                        height={100}
                        alt={order.cartItems[0].name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span>{order.cartItems[0].name}</span>
                      <span>x{order.cartItems[0].quantity}</span>
                      <span>
                        ${(order.cartItems[0].basePrice / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2  overflow-x-scroll">
                      {order.cartItems[0]?.sizes.length > 0 && (
                        <div className="flex items-center gap-2">
                          <h4 className="bg-primary text-white text-sm rounded-md px-1">
                            Size
                          </h4>
                          <div className="bg-white flex items-center gap-1 px-1 py-0.5 rounded-md">
                            <span className="text-sm">
                              {order.cartItems[0].sizes
                                .map((size) => size.name)
                                .toString()}
                            </span>
                            <span className="text-sm">
                              $
                              {order.cartItems[0].sizes
                                .map((size) =>
                                  (size.extraPrice / 100).toFixed(2),
                                )
                                .toString()}
                            </span>
                          </div>
                        </div>
                      )}
                      {order.cartItems[0].extras.length > 0 && (
                        <div className="flex items-center gap-2">
                          <h4 className="bg-secondary text-white text-sm rounded-md px-1">
                            Extras
                          </h4>
                          {order.cartItems[0].extras.map((extra) => (
                            <div
                              key={extra.name}
                              className="bg-white flex items-center gap-1 px-1 py-0.5 rounded-md"
                            >
                              <span className="text-sm">{extra.name}</span>
                              <span className="text-sm">
                                ${(extra.extraPrice / 100).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* show the rest of the items if the order has more than one item */}
          {showItems && (
            <>
              {order.cartItems.slice(1).map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="relative w-14 h-16 overflow-hidden">
                            <Image
                              src={item.image}
                              width={100}
                              height={100}
                              alt={item.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                            <span>${(item.basePrice / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item?.sizes.length > 0 && (
                              <div className="flex items-center">
                                <h4 className="bg-primary text-white text-xs sm:text-sm rounded-tl-md rounded-bl-md px-1">
                                  Size
                                </h4>
                                <div className="bg-white flex items-center gap-1 px-1 rounded-tr-md rounded-br-md">
                                  <span className="text-xs sm:text-sm">
                                    {item.sizes
                                      .map((size) => size.name)
                                      .toString()}
                                  </span>
                                  <span className="text-xs sm:text-sm">
                                    $
                                    {item.sizes.map((size) =>
                                      (size.extraPrice / 100).toFixed(2),
                                    )}
                                  </span>
                                </div>
                              </div>
                            )}
                            {item.extras.length > 0 && (
                              <div className="flex items-center">
                                <h4 className="bg-secondary text-white text-xs sm:text-sm rounded-tl-md rounded-bl-md px-1">
                                  Extras
                                </h4>
                                {item.extras.map((extra) => (
                                  <div
                                    key={extra.name}
                                    className="bg-white flex items-center gap-1 px-1 py-0.5 rounded-md"
                                  >
                                    <span className="text-xs sm:text-sm">
                                      {extra.name}
                                    </span>
                                    <span className="text-xs sm:text-sm">
                                      ${(extra.extraPrice / 100).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b  border-primary/40" />
                </div>
              ))}
            </>
          )}

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* show the status of the order */}
            {!order.paid && (
              <span className="bg-red-600 text-white rounded-md px-1">
                Unpaid
              </span>
            )}
            {
              <div className="flex items-center gap-2">
                <h4 className="bg-blue-600 text-white rounded-md px-1">
                  Status
                </h4>
                {order.status === "PENDING" && (
                  <div className="bg-white text-orange-700 p-1 rounded-md flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">Pending</span>
                  </div>
                )}
                {order.status === "PREPARING" && (
                  <div className="bg-white text-secondary p-1 rounded-md flex items-center gap-1">
                    <ChefHat className="w-5 h-5 " />
                    <span className="text-sm">Preparing</span>
                  </div>
                )}
                {order.status === "COMPLETED" && (
                  <div className="bg-white text-blue-500 p-1 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
                {order.status === "DELIVERING" && (
                  <div className="bg-white text-green-500 p-1 rounded-md flex items-center gap-1">
                    <Bike className="w-5 h-5" />
                    <span className="text-sm">Delivering</span>
                  </div>
                )}
                {order.status === "DELIVERED" && (
                  <div className="bg-white text-primary p-1 rounded-md flex items-center gap-1">
                    <PackageCheck className="w-5 h-5" />
                    <span className="text-sm">Delivered</span>
                  </div>
                )}
              </div>
            }

            <div className="flex items-center gap-2">
              <h4 className="bg-blue-600 text-white rounded-md px-1">Total</h4>
              <span className="bg-white text-sm text-primary px-1 py-0.5 rounded-md">
                ${(total + deliveryFee).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="bg-blue-600 text-white rounded-md px-1">Date</h4>
              <span className="bg-white text-sm text-primary px-1 py-0.5 rounded-md truncate">
                {order.createdAt.toDateString()}
              </span>
            </div>
          </div>

          {/* control the showing of the rest of the items */}
          {order.cartItems.length > 1 && (
            <div
              onClick={() => setShowItems((prev) => !prev)}
              className="bg-white w-fit p-1 rounded-md cursor-pointer"
            >
              {showItems ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <div className="flex items-center gap-1">
                  <ChevronDown className="w-5 h-5" />
                  <span>{order.cartItems.length - 1}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* delete the order */}
        {selectedOrders.length <= 1 && (
          <div
            onClick={() => setAlertOpen(true)}
            className="absolute top-4 right-4 bg-white p-1 rounded-md cursor-pointer"
          >
            <span className="sr-only">Delete</span>
            <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderItemCard;
