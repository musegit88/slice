import Navbar from "@/components/navbar";
import React from "react";
import { getUser } from "../currentuser/user";

const MenuLayout = async ({ children }) => {
  const currentUser = await getUser();
  return (
    <div>
      <Navbar currentUser={currentUser} />
      {children}
    </div>
  );
};

export default MenuLayout;
