"use client";

export type UserColumn = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import AdminSwitch from "./admin-switch";

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "User name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isAdmin",
    header: () => <div>Admin</div>,
    cell: ({ row }) => <AdminSwitch data={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  { id: "actions", cell: ({ row }) => <CellActions data={row.original} /> },
];
