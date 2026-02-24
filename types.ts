import { Menu } from "@prisma/client";

export type Category = {
  id: string;
  name: string;
  menu: Menu[];
  createdAt: Date;
  updatedAt: Date;
};

export type UpdatedData = {
  id: string;
  categoryId: string;
  description: string;
  image: string;
  name: string;
  price: number;
  extras: SizesAndExtraProps[];
  sizes: ExtraSizeProps[];
};

export type SizesAndExtraProps = {
  name: string;
  extraPrice: number;
};

export type ExtraSizeProps = {
  name: string;
  extraPrice: number;
};

export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  sizes: SizesAndExtraProps[];
  extras: SizesAndExtraProps[];
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAddressType = {
  userId: string;
  username: string;
  email: string;
  phonenumber: string;
  street: string;
  block: string;
  floor: string;
  housenumber: string;
};

export type CartItemsType = {
  name: string;
  id: string;
  image?: string;
  basePrice: number;
  totalPrice: number;
  quantity: number;
  sizes: {
    name: string;
    extraPrice: number;
  }[];
  extras: { name: string; extraPrice: number }[];
}[];

export type OrderType = {
  id: string;
  cartItems: CartItemsType;
  userId: string;
  username: string;
  email: string;
  label: string;
  phoneNumber: string;
  street: string;
  block: string;
  floor: string;
  houseNumber: string;
  paid: boolean;
  status: "PENDING" | "PREPARING" | "COMPLETED" | "DELIVERING" | "DELIVERED";
  deletedByUserAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface MenuItemProps {
  data: MenuItemType[];
}

export interface UserAddress {
  userId: string;
  username: string;
  email: string;
  label: string;
  phoneNumber: string;
  street: string;
  block: string;
  floor: string;
  houseNumber: string;
  isApartement: boolean;
  isDefault: boolean;
}

export interface CartItem {
  name: string;
  id: string;
  menuId: string;
  basePrice: number;
  sizes: SizesAndExtraProps[];
  extras: SizesAndExtraProps[];
  quantity: number;
  image: string;
  totalPrice: number;
}
