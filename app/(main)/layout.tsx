import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getUser } from "@/currentuser/user";
import React from "react";

const HomeLayout = async ({ children }) => {
  const currentUser = await getUser();
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
