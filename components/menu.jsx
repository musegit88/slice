import Image from "next/image";
import React from "react";
import MenuItem from "./ui/menu_item";
import Link from "next/link";

const Menu = () => {
  return (
    <div>
      <div className="text-center text-primary text-4xl mb-8">Our Menu</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MenuItem />
      </div>
      <div className="flex items-center justify-center my-8">
        <Link href={"/menu"}>
          <button className="bg-secondary  text-white font-semibold px-7 py-2 rounded-full border hover:border hover:border-primary transition">
            EXPLORE OUR FULL MENU
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
