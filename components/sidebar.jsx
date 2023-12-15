"use client";

import Link from "next/link";
import React from "react";
import { cn, navLinks } from "@/libs/utils";

const Sidebar = ({ handleClose, showSidebar }) => {
  return (
    <>
      <div
        className={cn(
          "fixed w-full h-full right-0 top-0 z-50 bg-white transition ease-in-out duration-500",
          showSidebar ? "show-animate" : "hide-animate"
        )}
      >
        <div
          onClick={handleClose}
          className="absolute right-6 top-4 disabled:pointer-events-none"
        >
          X
        </div>
        <div className="flex flex-col gap-y-8 items-center justify-center h-full sm:flex-row sm:justify-end sm:space-x-2">
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
    </>
  );
};

export default Sidebar;
