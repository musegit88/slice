"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Menu = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "image",
    header: () => <div className="">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image");
      return (
        <div className="w-10 h-10">
          <Image
            src={image as string}
            width={100}
            height={100}
            alt="image"
            className="w-full h-full object-cover"
          />{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
