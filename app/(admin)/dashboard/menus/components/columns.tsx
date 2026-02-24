"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellActions from "./cell-actions";

export type MenuColumn = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<MenuColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: () => <div className="">Description</div>,
    cell: ({ row }) => {
      const description = row.getValue("description");
      return (
        <div className="max-w-[140px] sm:max-w-xs h-12 overflow-y-auto">
          <p className="text-sm break-words">{description as string}</p>
        </div>
      );
    },
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
          />
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
    cell: ({ row }) => {
      const price = row.getValue("price");
      return <p>{((price as number) / 100).toFixed(2)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
