"use client";

import React, { createContext, useState } from "react";

export interface OrderContextType {
  selectedOrders: string[];
  setSelectedOrders: React.Dispatch<React.SetStateAction<string[]>>;
}

export const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType,
);

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  return (
    <OrderContext.Provider value={{ selectedOrders, setSelectedOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
