"use client";

import { CartItem, SizesAndExtraProps } from "@/types";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedItems: (string | number)[];
  setSelectedItems: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  clearCart: () => void;
  empty: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (
    menuId: string,
    name: string,
    image: string,
    basePrice: number,
    totalPrice: number,
    sizes: SizesAndExtraProps | SizesAndExtraProps[],
    extras: SizesAndExtraProps[],
    quantity: number,
  ) => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // selected items for delete
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const { status } = useSession();
  // loading state
  const [loading, setLoading] = useState(true);

  // fetch cart items from database if the user is logged in else from local storage
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        if (status === "authenticated") {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const data = await response.json();
            setCartItems(data || []);
          }
        } else if (status === "unauthenticated") {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          } else {
            setCartItems([]);
          }
        }
      } catch (error) {
        console.log("Failed to fetch from API", error);
      } finally {
        setLoading(false);
      }
    };

    if (status !== "loading") {
      fetchCartItems();
    }
  }, [status]);

  // sync cart items to database
  useEffect(() => {
    if (status === "authenticated") {
      const syncCartToDb = async () => {
        if (typeof window === "undefined") return;

        const savedCart = localStorage.getItem("cart");
        if (!savedCart) return;

        try {
          const localItems: CartItem[] = JSON.parse(savedCart);
          if (localItems.length === 0) return;

          const response = await fetch("/api/cart/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(localItems),
          });

          if (response.ok) {
            localStorage.removeItem("cart");
            toast.success("Cart synced successfully");
            window.location.reload();
          }
        } catch (error) {
          console.error("Failed to sync cart", error);
        }
      };
      syncCartToDb();
    }
  }, [status]);

  // check if cart is empty
  const empty = !loading && cartItems.length === 0;

  // if the user is not logged in add to local storage
  const addToCart = (
    menuId: string,
    name: string,
    image: string,
    basePrice: number,
    totalPrice: number,
    sizes: SizesAndExtraProps | SizesAndExtraProps[],
    extras: SizesAndExtraProps[],
    quantity: number,
  ) => {
    if (typeof window !== "undefined") {
      const newCartItem: CartItem = {
        menuId,
        name,
        image,
        basePrice,
        totalPrice,
        sizes: Array.isArray(sizes) ? sizes : [sizes],
        extras,
        quantity,
      };

      const updatedCart = [...cartItems, newCartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  // clear cart for unauthenticated users
  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        selectedItems,
        setSelectedItems,
        clearCart,
        empty,
        loading,
        setLoading,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
