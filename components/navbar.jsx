"use client";

import { cn, links } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Bars from "./ui/icons/bars";
import Sidebar from "./sidebar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = ({ currentUser }) => {
  // console.log(currentUser);
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const { data: session } = useSession();

  const handleClick = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleClose = () => {
    setShowSidebar(false);
  };

  const handleLogOut = () => {
    try {
      signOut();
      router.refresh();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <Link href={"/"} className="text-primary font-bold">
          Slice Pizzeria
          {/* & Spice */}
        </Link>
        <div className="hidden sm:flex items-center justify-center gap-5">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-secondary font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
          {session?.user ? (
            <div className="flex items-center gap-x-2">
              <div
                className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full cursor-pointer"
                onClick={handleLogOut}
              >
                Sign out
              </div>

              <div
                className="relative bg-base w-10 h-10 rounded-full cursor-pointer overflow-hidden"
                onClick={() => router.push("/profile")}
              >
                {session.user?.image ? (
                  <Image
                    src={session.user?.image}
                    alt={session.user.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="flex items-center justify-center h-full">
                    {session.user?.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <Link
              href={"/login"}
              className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between">
        <Link href={"/"} className="text-primary font-bold">
          Slice Pizzeria
        </Link>
        <div
          className={`${showSidebar} ? "show-animate" : "hide-animate"`}
          onClick={handleClick}
        >
          <Bars />
        </div>
      </div>
      {showSidebar && (
        <Sidebar handleClose={handleClose} showSidebar={showSidebar} />
      )}
    </>
  );
};

export default Navbar;
