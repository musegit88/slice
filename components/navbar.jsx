"use client";

import { cn, navLinks } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Bars from "./ui/icons/bars";
import Sidebar from "./sidebar";
import { signOut, useSession } from "next-auth/react";
import Avatar from "@/components/ui/avatar";
import Image from "next/image";

const Navbar = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  // const { data: session } = useSession();

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
          <Image src="/logo.svg" width={100} height={100} alt="logo" />
          {/* Slice Pizzeria */}
          {/* & Spice */}
        </Link>
        <div className="hidden sm:flex items-center justify-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative pb-[4px]",
                pathname === link.href ? "text-primary " : "text-secondary "
              )}
            >
              <p className="text-lg after:absolute after:w-full after:h-[4px] after:bg-primary after:bottom-0 after:left-0 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left hover:after:duration-500 hover:after:transition">
                {link.label}
              </p>
            </Link>
          ))}
          {currentUser ? (
            <div className="flex items-center gap-x-2">
              {currentUser?.isAdmin && (
                <Link
                  href={"/dashboard"}
                  className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-sm cursor-pointer"
                >
                  Admin
                </Link>
              )}
              <div
                className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-sm cursor-pointer"
                onClick={handleLogOut}
              >
                Sign out
              </div>

              <Avatar currentUser={currentUser} />
            </div>
          ) : (
            <Link
              href={"/login"}
              className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between">
        <Link href={"/"} className="text-primary font-bold">
          <Image src="/logo.svg" width={100} height={100} alt="logo" />
        </Link>
        <div className="flex items-center gap-x-1">
          <Link
            href={"/login"}
            className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-sm"
          >
            Sign In
          </Link>
          <div
            className={`${showSidebar} ? "show-animate" : "hide-animate"`}
            onClick={handleClick}
          >
            <Bars />
          </div>
        </div>
      </div>
      {showSidebar && (
        <Sidebar handleClose={handleClose} showSidebar={showSidebar} />
      )}
    </>
  );
};

export default Navbar;
