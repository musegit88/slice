import { getUser } from "@/app/currentuser/user";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = async () => {
  const currentUser = getUser();
  if (!(await currentUser)?.isAdmin) {
    return redirect("/");
  }
  return <div className="">AdminPage</div>;
};

export default AdminPage;
