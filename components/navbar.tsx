"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";
import Bars from "./ui/icons/bars";
import Sidebar from "./sidebar";
import { signOut } from "next-auth/react";
import Avatar from "@/components/ui/avatar";
import Image from "next/image";
import { CartContext, CartContextType } from "./providers/cart-providers";
import ShoppingCart from "./ui/icons/shopping-cart";
import { cn } from "@/libs/utils";
import { navLinks } from "@/libs/constants";

const Navbar = ({ currentUser }) => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const handleClick = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleClose = () => {
    setShowSidebar(false);
  };

  const { cartItems }: CartContextType = useContext(CartContext);

  return (
    <>
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <Link href={"/"} className="text-primary font-bold">
          <Image
            src="/s&s.png"
            width={100}
            height={100}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
        </Link>
        <div className="hidden sm:flex items-center justify-center gap-5">
          {navLinks?.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative pb-[4px]",
                pathname === link.href ? "text-primary " : "text-secondary ",
              )}
            >
              <p
                className={cn(
                  "text-lg after:absolute after:w-full after:h-[2px] after:bg-primary after:bottom-0 after:left-0 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left hover:after:duration-200 hover:after:transition",
                  pathname === link.href && "after:scale-x-100",
                )}
              >
                {link.label}
              </p>
            </Link>
          ))}
          {currentUser ? (
            <div className="flex items-center gap-x-2">
              {currentUser?.isAdmin && (
                <Link
                  href={"/dashboard"}
                  className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full cursor-pointer"
                >
                  Admin
                </Link>
              )}
              <div
                className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </div>

              <Avatar currentUser={currentUser} />
            </div>
          ) : (
            <Link
              href={"/login"}
              className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full"
            >
              Sign In
            </Link>
          )}
          <Link href={"/cart"} title="cart">
            <div className="relative">
              <ShoppingCart
                className={cn(
                  "w-8 h-8",
                  pathname === "/cart" && "text-primary",
                )}
              />
              {currentUser && (
                <div
                  className={cn(
                    cartItems.length > 0
                      ? "absolute -top-1 right-0 bg-secondary rounded-full w-5 h-5 text-sm text-center text-white"
                      : "",
                  )}
                >
                  <span>{cartItems.length === 0 ? "" : cartItems?.length}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between">
        <Link href={"/"} className="text-primary font-bold">
          <Image
            src="/s&s.png"
            width={100}
            height={100}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
        </Link>
        <div className="flex items-center gap-x-1">
          <Link href={"/cart"} title="cart">
            <div className="relative">
              <ShoppingCart
                className={cn(
                  "w-7 h-7",
                  pathname === "/cart" && "text-primary",
                )}
              />
              {currentUser && (
                <div
                  className={cn(
                    cartItems.length > 0
                      ? "absolute -top-1 right-0 bg-secondary rounded-full sm:w-5 sm:h-5 w-4 h-4 text-white"
                      : "",
                  )}
                >
                  <span className="text-xs sm:text-sm flex items-center justify-center h-full">
                    {cartItems.length === 0 ? "" : cartItems.length}
                  </span>
                </div>
              )}
            </div>
          </Link>
          {currentUser ? (
            <div className="flex items-center gap-x-2">
              {currentUser?.isAdmin && (
                <Avatar currentUser={currentUser} admin={true} />
              )}
              {!currentUser?.isAdmin && <Avatar currentUser={currentUser} />}
            </div>
          ) : (
            <Link
              href={"/login"}
              className="bg-primary text-[#F2F2F2] px-4 py-1 rounded-full"
            >
              Sign In
            </Link>
          )}
          <div
            className={`${showSidebar} ? "show-animate" : "hide-animate"`}
            onClick={handleClick}
          >
            <Bars props="w-6 h-6" />
          </div>
        </div>
      </div>

      <Sidebar
        handleClose={handleClose}
        isOpen={showSidebar}
        currentUser={currentUser}
      />
    </>
  );
};

export default Navbar;
