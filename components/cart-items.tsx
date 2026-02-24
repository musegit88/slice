"use client";
import Link from "next/link";
import { ChangeEvent, useContext, useState } from "react";
import { CartContext, CartContextType } from "./providers/cart-providers";
import CartItemCard from "./ui/cart-item-card";
import toast from "react-hot-toast";
import { Cart } from "@prisma/client";
import AlertModal from "./modals/alert-modal";
import SquareCheck from "./ui/icons/square-check";
import Square from "./ui/icons/square";
import Trash from "./ui/icons/trash";
import { UserAddress } from "@/types";

const CartItems = ({ userAddress }: { userAddress: UserAddress[] }) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const {
    cartItems,
    loading,
    setLoading,
    selectedItems,
    setSelectedItems,
    empty,
  }: CartContextType = useContext(CartContext);
  // destructure cart items
  const data = cartItems?.map((cart: Cart) => ({
    name: cart.name,
    id: cart.id,
    menuId: cart.menuId,
    basePrice: cart.basePrice,
    sizes: cart.sizes || [],
    extras: cart.extras || [],
    quantity: cart.quantity,
    image: cart.image,
    totalPrice: cart.totalPrice,
  }));

  // calculate total price including delivery fee
  const deliveryFee = 4.0;
  let total = 0;
  for (const item of cartItems) {
    total = total + (item.totalPrice * item.quantity) / 100;
  }

  // initiate checkout process
  const checkout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          userAddress: userAddress[0],
          cartItems: data,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        toast.error("Failed to create checkout session. Please try again");
      }
      const res: { link: string; error: string } = await response.json();
      if (res.error) {
        toast.error(res.error);
        return;
      }
      window.location.href = res.link;
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };
  if (typeof window !== "undefined") {
    if (window.location.href.includes("canceled=1")) {
      toast.error("Payment failed");
    }
  }

  // select all cart items
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // delete all selected cart items
  const handleDeleteAll = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({
          selectedItems,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("Items removed from cart");
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove items from cart");
    }
  };
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => handleDeleteAll()}
      />
      <div>
        <div className="flex items-center gap-2 mb-2">
          {cartItems.length > 1 && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="select-all"
                className=" text-white rounded-sm  text-center"
              >
                <span className="sr-only">
                  {selectedItems.length > 1 ? "Unselect All" : "Select All"}
                </span>
                <input
                  id="select-all"
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                  className="hidden"
                />
                {selectedItems.length === cartItems.length ? (
                  <SquareCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Square className="w-5 h-5 text-primary" />
                )}
              </label>
            </div>
          )}

          {/* show delete button if more than one item is selected */}
          {selectedItems.length > 1 && (
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
        <div>
          {/* show message if no item in cart */}
          {empty && (
            <div className="flex items-center justify-center h-[50vh]">
              <div className="flex items-center flex-col gap-4">
                <span className="text-center">No item in your cart!</span>
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

        {/* show cart items if there are any */}
        {cartItems.length > 0 && (
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="flex flex-col gap-4 w-full">
              <CartItemCard cartItems={cartItems} />
              <div className="flex gap-2 justify-end">
                <span className="bg-base px-4 py-2 text-xs sm:text-sm rounded-md">
                  Subtotal ${total.toFixed(2)}
                </span>
                <span className="bg-base px-4 py-2 text-xs sm:text-sm rounded-md">
                  Delivery fee ${deliveryFee}
                </span>
              </div>
            </div>

            {/* show default address for the user */}
            <div className="bg-base rounded-md px-8 py-4 h-fit w-full">
              <h1 className="text-center text-primary">Checkout</h1>
              {userAddress.length > 0 ? (
                <form className="flex flex-col gap-2 sm:p-4">
                  <div>
                    <label htmlFor="label" className="text-xs sm:text-sm">
                      Label
                    </label>
                    <input
                      title="label"
                      name="label"
                      type="text"
                      disabled
                      value={userAddress[0].label}
                      readOnly
                      className="border-2 border-primary shadow-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs sm:text-sm">
                      Phone number
                    </label>
                    <input
                      title="phone"
                      name="phone"
                      type="tel"
                      disabled
                      value={userAddress[0].phoneNumber}
                      readOnly
                      className="border-2 border-primary shadow-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="street" className="text-xs sm:text-sm">
                      Street name
                    </label>
                    <input
                      title="street"
                      name="street"
                      type="text"
                      disabled
                      value={userAddress[0].street}
                      readOnly
                      className="border-2 border-primary shadow-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="truncate text-xs sm:text-sm"
                    >
                      House Number
                    </label>
                    <input
                      title="house number"
                      name="number"
                      type="text"
                      disabled
                      value={userAddress[0].houseNumber}
                      readOnly
                      className="border-2 border-primary shadow-md"
                    />
                  </div>
                  {userAddress[0].isApartement && (
                    <div className="flex items-center gap-x-2">
                      <input
                        title="checkbox"
                        type="checkbox"
                        checked={userAddress[0].isApartement}
                        readOnly
                        className="cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm">
                        Apartement/condo
                      </span>
                    </div>
                  )}
                  {userAddress[0].isApartement && (
                    <div className="flex gap-x-2">
                      <div>
                        <label htmlFor="block" className="text-xs sm:text-sm">
                          Block
                        </label>
                        <input
                          title="block"
                          type="text"
                          name="block"
                          value={userAddress[0].block}
                          disabled
                          readOnly
                          className="border-2 border-primary shadow-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="floor" className="text-xs sm:text-sm">
                          Floor
                        </label>
                        <input
                          title="floor"
                          disabled
                          type="text"
                          name="floor"
                          value={userAddress[0].floor}
                          readOnly
                          className="border-2 border-primary shadow-md"
                        />
                      </div>
                    </div>
                  )}

                  {/* change address in profile */}
                  <Link
                    href="/profile"
                    className="text-primary underline text-sm"
                  >
                    change address
                  </Link>
                  <div className="flex items-end h-full mt-2">
                    <button
                      type="button"
                      disabled={loading || selectedItems.length > 0}
                      onClick={checkout}
                      className="bg-secondary text-white rounded-md w-full  px-3 py-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Pay ${(total + deliveryFee).toFixed(2)}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-center h-full mt-4">
                  <div className="flex items-center flex-col gap-4">
                    <span className="text-xs sm:text-sm text-center">
                      No address found!
                    </span>
                    <div className="flex items-center gap-2">
                      <p className="text-sm md:text-lg text-secondary font-bold">
                        Add an address in your{" "}
                      </p>
                      <Link
                        href={"/profile"}
                        className="bg-primary rounded-sm py-1 px-4 text-white text-center"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartItems;
