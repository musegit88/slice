"use client";

import Link from "next/link";
import React from "react";
import Facebook from "./ui/icons/facebook";
import Instagram from "./ui/icons/instagram";

const Footer = () => {
  const year = new Date().getFullYear();
  const handleClick = () => {
    scrollTo({ top, behavior: "smooth" });
  };
  return (
    <>
      <div className="hidden sm:border-t sm:p-8 sm:flex sm:items-center sm:justify-between">
        <div className="text-primary">© {year} All rights reserved </div>
        <div className="text-primary flex items-center gap-x-2">
          <Link href={"/"}>Contact</Link>
          <div className="border-l-[4px] border-secondary ml-2" />
          <Link
            href={"facebook.com"}
            target="_blank"
            className="bg-base p-2 rounded-full"
          >
            <Facebook />
          </Link>
          <Link
            href={"instagram.com"}
            target="_blank"
            className="bg-base p-2 rounded-full"
          >
            <Instagram />
          </Link>
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden border-t p-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2 mb-2">
            <div className=" flex-1 flex items-center  gap-x-2">
              <Link
                href={"facebook.com"}
                target="_blank"
                className="bg-base p-1 rounded-full"
              >
                <Facebook />
              </Link>
              <Link
                href={"instagram.com"}
                target="_blank"
                className="bg-base p-1 rounded-full"
              >
                <Instagram />
              </Link>
            </div>
            <div className="flex-1 flex items-center gap-x-4 text-primary">
              <Link href={"/"}>Contact</Link>
              <Link href={"/"}>Address</Link>
            </div>
          </div>
          <div className="flex justify-center mt-2" onClick={handleClick}>
            © {year} All rights reserved
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
