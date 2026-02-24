"use client";

import Link from "next/link";
import { cn } from "@/libs/utils";
import Close from "./ui/icons/close";
import { signOut } from "next-auth/react";
import { navLinks } from "@/libs/constants";

const Sidebar = ({ handleClose, isOpen, currentUser }) => {
  const logOut = () => {
    try {
      signOut();
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className={cn(
            "fixed w-full h-full right-0 top-0 z-50 bg-white transition ease-in-out duration-500",
            isOpen ? "show-animate" : "hide-animate",
          )}
        >
          <div
            onClick={handleClose}
            className="fixed right-6 top-5 disabled:pointer-events-none"
          >
            <Close props="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-y-8 items-center justify-center h-full sm:flex-row sm:justify-end sm:space-x-2">
            {currentUser ? (
              <div className="inline-flex items-center gap-2">
                {currentUser.isAdmin && (
                  <Link
                    href={"/dashboard"}
                    className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full cursor-pointer"
                  >
                    Admin
                  </Link>
                )}
                <div
                  onClick={logOut}
                  className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full cursor-pointer"
                >
                  Sign out
                </div>
              </div>
            ) : (
              ""
            )}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn("text-4xl text-primary")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
