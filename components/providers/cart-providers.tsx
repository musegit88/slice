"use client";

import { Cart } from "@prisma/client";
import React, { createContext, useEffect, useState } from "react";

export interface CartContextType {
  cartItems: Cart[];
  setCartItems: React.Dispatch<React.SetStateAction<Cart[]>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  clearCart: () => void;
  empty: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // cart items
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  // selected items for delete
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // loading state
  const [loading, setLoading] = useState(false);

  // fetch cart items from database
  useEffect(() => {
    try {
      const fetchCart = async () => {
        const response = await fetch("/api/cart");
        const data = await response.json();
        setCartItems(data);
      };
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const empty = cartItems.length === 0;

  // clear cart for unauthenticated users
  const clearCart = () => {
    setCartItems([]);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
