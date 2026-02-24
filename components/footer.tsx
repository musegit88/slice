"use client";

import Link from "next/link";
import Facebook from "./ui/icons/facebook";
import Instagram from "./ui/icons/instagram";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="hidden sm:border-t sm:p-8 sm:flex sm:items-center sm:justify-between">
        <div className="text-primary">© {year} All rights reserved </div>
        <div className="text-primary flex items-center gap-x-2">
          <Link href={"/"}>Contact</Link>
          <div className="border-l-[4px] border-secondary ml-2" />
          <div className="flex items-center gap-x-4">
            <a
              title="facebook"
              href="https://www.facebook.com"
              target="_blank"
              className="bg-base p-2 rounded-full"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              title="instagram"
              href="https://www.instagram.com"
              target="_blank"
              className="bg-base p-2 rounded-full"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden border-t p-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-x-2 mb-2">
            <div className="flex items-center gap-x-4 text-primary">
              <Link href={"/"}>Contact</Link>
            </div>
            <div className="flex items-center gap-x-4">
              <a
                title="facebook"
                href="https://www.facebook.com"
                target="_blank"
                className="bg-base p-1 rounded-full"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                title="instagram"
                href="https://www.instagram.com"
                target="_blank"
                className="bg-base p-1 rounded-full"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            © {year} All rights reserved
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
