"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import { format } from "date-fns";

export type orderColumn = {
  id: string;
  username: string;
  email: string;
  paid: boolean;
  status: string;
  createdAt: Date;
};

export const columns: ColumnDef<orderColumn>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "paid",
    header: "Paid",
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const orderStatus = row.getValue("status") as string;
      const orderId = row.original.id;
      return (
        <div>
          <div>
            {orderStatus.charAt(0).toUpperCase() +
              orderStatus.slice(1).toLocaleLowerCase()}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      return <div>{format(row.getValue("createdAt"), "MMMM do, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
