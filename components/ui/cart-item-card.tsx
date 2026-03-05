"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Trash from "./icons/trash";
import { Cart } from "@prisma/client";
import toast from "react-hot-toast";
import AlertModal from "../modals/alert-modal";
import { CartContext, CartContextType } from "../providers/cart-providers";
import Minus from "./icons/minus";
import Plus from "./icons/plus";

const CartItemCard = ({ cartItems }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const { selectedItems, setSelectedItems } =
    useContext<CartContextType>(CartContext);
  // map cart items
  const data: Cart[] = cartItems?.map((cart: Cart) => ({
    name: cart.name,
    id: cart.id,
    basePrice: cart.basePrice,
    sizes: cart.sizes || [],
    extras: cart.extras || [],
    quantity: cart.quantity,
    image: cart.image,
    totalPrice: cart.totalPrice,
  }));

  // handle delete item from cart
  const handleDelete = async (itemId: string | number) => {
    // if item id is number then delete from local storage
    if (typeof itemId === "number") {
      const newCartItem = cartItems.filter(
        (_, index: number) => index !== itemId,
      );
      const updatedCartItem = newCartItem;
      localStorage.setItem("cart", JSON.stringify(updatedCartItem));
      setAlertOpen(false);
      toast.success("Item removed from cart");
      window.location.reload();
    } else {
      // if item id is string then delete from database
      try {
        const res = await fetch(`/api/cart/${itemId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          toast.success("Item removed from cart");
        }
        window.location.reload();
      } catch (error) {
        console.log(error);
        toast.error("Failed to remove item from cart");
      }
    }
  };

  // handle selected items
  const handleSelectedItems = (
    e: React.ChangeEvent<HTMLInputElement>,
    // if the user is logged in id is string else id is the index of the item
    id: string | number,
  ) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  // handle quantity selection on plus and minus button
  const handleQuantity = async (
    currentQuantity: number,
    // type of operation
    type: "plus" | "minus",
    // if the user is logged in use the id of the item to update the quantity in database
    itemId?: string,
    // if the user is not logged in use the current index of the item to update the quantity in local storage
    currentIndex?: number,
  ) => {
    try {
      if (type === "plus") {
        // if the user is logged in use the id of the item to update the quantity in database
        if (itemId) {
          const res = await fetch(`/api/cart/${itemId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: currentQuantity + 1,
            }),
          });
          if (res.ok) {
            toast.success("Item quantity updated");
          }
          window.location.reload();
        } else {
          // if the user is not logged in use the current index of the item to update the quantity in local storage
          const increaseQunatity = cartItems.map(
            (item: Cart, index: number) => {
              // calculate unit price based on previous total price and quantity
              const unitPrice = item.totalPrice / item.quantity;
              // calculate new total price
              const newTotalPrice = unitPrice * (item.quantity + 1);
              if (index === currentIndex) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: newTotalPrice,
                };
              }
              return item;
            },
          );
          localStorage.setItem("cart", JSON.stringify(increaseQunatity));
          toast.success("Item quantity updated");
          window.location.reload();
        }
      }
      if (type === "minus") {
        // if the user is logged in use the id of the item to update the quantity in database
        if (itemId) {
          const res = await fetch(`/api/cart/${itemId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: currentQuantity - 1,
            }),
          });
          if (res.ok) {
            toast.success("Item quantity updated");
          }
          window.location.reload();
        } else {
          // if the user is not logged in use the current index of the item to update the quantity in local storage
          const decreaseQunatity = cartItems.map(
            (item: Cart, index: number) => {
              // calculate unit price based on previous total price and quantity
              const unitPrice = item.totalPrice / item.quantity;
              // calculate new total price
              const newTotalPrice = unitPrice * (item.quantity - 1);
              if (index === currentIndex) {
                return {
                  ...item,
                  quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                  totalPrice: newTotalPrice,
                };
              }
              return item;
            },
          );
          localStorage.setItem("cart", JSON.stringify(decreaseQunatity));
          toast.success("Item quantity updated");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update item quantity");
    }
  };

  return (
    <>
      {alertOpen && (
        <AlertModal
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          onConfirm={() => handleDelete(data[0].id ? data[0].id : deletedIndex)}
        />
      )}
      {data?.map((item, index) => (
        <div
          key={item.id ? item.id : index}
          className="relative bg-base w-full p-4 rounded-md overflow-hidden"
        >
          <label htmlFor="select-item" className="cursor-pointer">
            <input
              id="select-item"
              type="checkbox"
              value={item.id}
              checked={selectedItems.includes(item.id ? item.id : index)}
              onChange={(e) =>
                // if the user is not logged in set the index of the item to be selected else set the id of the item to be selected
                handleSelectedItems(e, item.id ? item.id : index)
              }
            />
          </label>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="relative w-16 h-16">
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
                    <span className="max-sm:text-sm">{item.name}</span>
                    <span className="max-sm:text-sm">
                      ${(item.basePrice / 100).toFixed(2)}
                    </span>
                    <span className="max-sm:text-sm">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-scroll">
                    {item?.sizes.length > 0 && (
                      <div className="flex items-center">
                        <h4 className="bg-primary text-white text-xs sm:text-sm rounded-tl-md rounded-bl-md px-1">
                          Size
                        </h4>
                        {item.sizes?.map((size) => (
                          <div
                            key={size.name}
                            className="bg-white flex items-center gap-1 px-1 rounded-tr-md rounded-br-md"
                          >
                            <span className="text-xs sm:text-sm whitespace-nowrap">
                              {size.name}
                            </span>
                            <span className="text-xs sm:text-sm">
                              ${(size.extraPrice / 100).toFixed(2)}
                            </span>
                          </div>
                        ))}
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
                            className="bg-white flex items-center gap-1 px-1 rounded-tr-md rounded-br-md"
                          >
                            <span className="text-xs sm:text-sm whitespace-nowrap">
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
            {selectedItems.length <= 1 && (
              <div
                onClick={() => {
                  setAlertOpen(true);
                  // set the index of the item to be deleted
                  setDeletedIndex(index);
                }}
                className="absolute top-4 right-4 bg-white p-1 rounded-md cursor-pointer"
              >
                <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <h4 className="bg-blue-500 text-white rounded-sm px-1">
                  Total
                </h4>
                <span>${(item.totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <button
                  disabled={item.quantity === 1}
                  onClick={() =>
                    handleQuantity(item.quantity, "minus", item.id, index)
                  }
                  className="bg-secondary text-white px-2 py-1 rounded-tl-full rounded-bl-full disabled:bg-secondary/50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm text-white text-center bg-secondary px-2 py-0.5 w-full">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantity(item.quantity, "plus", item.id, index)
                  }
                  className="bg-secondary  px-2 py-1 rounded-tr-full rounded-br-full"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItemCard;
