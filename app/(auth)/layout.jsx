import Link from "next/link";
import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <>
      <Link href={"/"} className="text-primary font-bold">
        Slice & Spice Pizzeria
      </Link>
      <main className="block items-center justify-center h-full">
        {children}
      </main>
    </>
  );
};

export default LoginLayout;
