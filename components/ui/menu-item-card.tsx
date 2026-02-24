"use client";

import Image from "next/image";
import { useState } from "react";
import MenuModal from "../modals/menu-modal";
import { MenuItemProps } from "@/types";

const MenuItemCard = ({ data }: MenuItemProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="bg-base p-4 rounded-md hover:shadow-md w-full"
          >
            <div className="flex flex-col items-center gap-2 w-full overflow-hidden">
              <div className="relative block mx-auto w-40 h-40">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold text-2xl text-primary text-center">
                {item.name}
              </span>
              <div className="w-full h-16 overflow-y-auto">
                <p className="text-sm text-center break-words">
                  {item.description}
                </p>
              </div>
              <button
                onClick={() => {
                  setOpen(true);
                  setSelected(
                    data.filter((selected) => selected.id === item.id),
                  );
                }}
                className="bg-secondary text-white text-lg font-bold px-5 py-2 rounded-full w-full mt-auto"
              >
                View more
              </button>
            </div>
          </div>
        ))}
      </div>
      <MenuModal
        key={selected?.[0]?.id || "modal"}
        isOpen={open}
        onClose={() => setOpen(false)}
        selected={selected}
      />
      {data.length === 0 && (
        <div className="flex items-center justify-center h-[40vh]">
          <p className="">Oops, Nothing to show here</p>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
