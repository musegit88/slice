import React from "react";
import { DataTabel } from "./components/data-tabel";
import { columns } from "./components/columns";
import { format } from "date-fns";
import { prisma } from "@/libs/prismaDB";

const userspage = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const formatedUser = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    password: user.password,
    isAdmin: user.isAdmin,
    createdAt: format(user.createdAt, "MMMM do, yyyy"),
    updatedAt: format(user.updatedAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <DataTabel columns={columns} data={formatedUser} />
    </div>
  );
};

export default userspage;
