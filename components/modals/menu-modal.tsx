"use client";

import Image from "next/image";
import Close from "../ui/icons/close";
import ShoppingCart from "../ui/icons/shopping-cart";
import { SizesAndExtraProps, MenuItemType } from "@/types";
import { ChangeEvent, useContext, useState, useEffect } from "react";
import { CartContext } from "../providers/cart-providers";
import toast from "react-hot-toast";
import Minus from "../ui/icons/minus";
import Plus from "../ui/icons/plus";
import { cn } from "@/libs/utils";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  selected: MenuItemType[];
}

const MenuModal = ({ isOpen, onClose, selected }: MenuModalProps) => {
  // Set initial selected size for the selected item if it has sizes
  const [selectedSizes, setSelectedSizes] = useState<SizesAndExtraProps>(
    selected?.[0]?.sizes[0] || null,
  );

  const [selectedExtras, setSelectedExtras] = useState<SizesAndExtraProps[]>(
    [],
  );
  const [quantity, setQuantity] = useState(1);

  const handleExtra = (
    e: ChangeEvent<HTMLInputElement>,
    extra: SizesAndExtraProps,
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  };
  let selectedPrice = selected?.map((item) => {
    return item.price;
  });
  if (selectedSizes) {
    selectedPrice[0] = selectedPrice[0] + selectedSizes.extraPrice;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice[0] = selectedPrice[0] + extra.extraPrice;
    }
  }
  if (quantity > 1) {
    selectedPrice[0] = selectedPrice[0] * quantity;
  }
  const handleClose = () => {
    onClose();
    const mainUrl = window.location.pathname;
    setSelectedSizes(null);
    setSelectedExtras([]);
    setQuantity(1);
    return window.history.replaceState(null, null, mainUrl);
  };

  const { addToCart }: any = useContext(CartContext);
  const handleAddToCart = async () => {
    // if (!userEmail) {
    //   addToCart(selected, selectedSizes, selectedExtras, selectedPrice);
    // }
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuId: selected[0].id,
          name: selected[0].name,
          image: selected[0].image,
          basePrice: selected[0].price,
          totalPrice: selectedPrice[0],
          sizes: selectedSizes ? selectedSizes : [],
          extras: selectedExtras,
          quantity: quantity,
        }),
      });
      toast.success("Item added to cart");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }

    onClose();
  };
  return (
    <>
      {isOpen && (
        <>
          <div onClick={handleClose} className="relative z-10">
            <div className="fixed inset-0 bg-black/5 backdrop-blur-sm" />
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm sm:max-w-lg md:max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
              <div className="flex items-center justify-center min-h-fit p-4 text-center overflow-hidden">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md transform overflow-auto bg-white p-6 rounded-md text-left align-middle shadow-sm transition-all"
                >
                  <span
                    onClick={handleClose}
                    className="absolute top-2 right-4 bg-base p-1 rounded-full cursor-pointer"
                  >
                    <Close props="w-4 h-4" />
                  </span>

                  <div className="grid gap-2">
                    {selected?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center w-full overflow-hidden"
                      >
                        <div className="flex justify-center">
                          <div className="relative w-52 h-52">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <span className="font-semibold text-2xl text-primary text-center">
                          {item.name}
                        </span>
                        <div className="w-full h-16 overflow-auto">
                          <p className="text-sm text-center break-words">
                            {item.description}
                          </p>
                        </div>
                        <div className="w-full">
                          {item.sizes?.length > 0 && (
                            <>
                              <h4 className="mb-1">Select size</h4>
                              <div className="flex flex-col gap-2 mb-1">
                                {item.sizes.map((size, index) => (
                                  <label
                                    key={index}
                                    className={cn(
                                      "flex items-center justify-between bg-base border rounded-md gap-2 capitalize px-2 py-1 transition-all duration-300",
                                      selectedSizes?.name === size.name &&
                                        "bg-primary text-white",
                                    )}
                                  >
                                    <span className="inline-flex gap-2">
                                      <input
                                        title={size.name}
                                        type="radio"
                                        name="size"
                                        value={selectedSizes?.name}
                                        checked={
                                          selectedSizes?.name === size.name
                                        }
                                        onChange={() => setSelectedSizes(size)}
                                        className="opacity-0"
                                      />
                                      <span>{size.name}</span>
                                    </span>
                                    <p className="inline-flex gap-4">
                                      {size.extraPrice === 0
                                        ? ""
                                        : ` + $${(size.extraPrice / 100).toFixed(2)}`}
                                    </p>
                                  </label>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="w-full">
                          {item.extras?.length > 0 && (
                            <>
                              <h4 className="mb-1">Select extra</h4>
                              <div className="flex flex-col gap-2 mb-1">
                                {item.extras.map((extra, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col bg-base border rounded-md"
                                  >
                                    <label className="flex items-center justify-between gap-2 capitalize px-2 py-1">
                                      <span className="inline-flex gap-2">
                                        <input
                                          title={extra.name}
                                          type="checkbox"
                                          name={extra.name}
                                          defaultChecked={false}
                                          onChange={(e) =>
                                            handleExtra(e, extra)
                                          }
                                        />
                                        <span>{extra.name}</span>
                                      </span>
                                      <p className="inline-flex">
                                        ${(extra.extraPrice / 100).toFixed(2)}
                                      </p>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        disabled={quantity === 1}
                        onClick={() =>
                          setQuantity(quantity > 1 && quantity - 1)
                        }
                        className="bg-secondary text-2xl text-white px-4 py-2 rounded-tl-full rounded-bl-full disabled:bg-secondary/50"
                      >
                        <Minus className="w-6 h-6" />
                      </button>
                      <span className="text-2xl text-white text-center bg-secondary py-1 w-full">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-secondary text-2xl text-white px-4 py-2 rounded-tr-full rounded-br-full"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleAddToCart}
                        className="sticky bottom-2 inline-flex items-center justify-center gap-4 bg-secondary text-white text-lg font-bold px-5 py-2 rounded-full w-full"
                      >
                        <span>Add to cart</span>
                        <ShoppingCart className="w-7 h-7" />$
                        {(selectedPrice[0] / 100).toFixed(2)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuModal;
