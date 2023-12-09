import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import { getUser } from "@/app/currentuser/user";

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
