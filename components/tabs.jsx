"use client";

import { cn, links } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex justify-center gap-x-4 my-4">
        {links.map((link) => (
          <Link
            className={cn(
              "bg-primary text-white px-5 py-2 rounded-sm",
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
