"use client";

import { links } from "@/libs/constants";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex justify-start md:justify-center gap-x-4 my-4 overflow-x-scroll">
        {links.map((link) => (
          <Link
            className={cn(
              "bg-primary text-white text-sm md:text-lg px-4 py-1 rounded-full min-w-fit",
              pathname === link.href &&
                "bg-secondary backdrop-blur-sm transition"
            )}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="border mb-8"></div>
    </>
  );
};

export default Tabs;
