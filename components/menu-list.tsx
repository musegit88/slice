"use client";

import Loader from "./loader";
import { cn } from "@/libs/utils";
import { Category, MenuItemType } from "@/types";
import MenuItemCard from "./ui/menu-item-card";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface MenuListProps {
  menuData: MenuItemType[];
  categories: Category[];
}

const MenuList = ({ menuData, categories }: MenuListProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [menu, setMenu] = useState<MenuItemType[]>(menuData);
  const [loading, setLoading] = useState<boolean>(false);
  const categoryId: string | null = searchParams.get("category");

  useEffect(() => {
    // search menu based on category id and pass the response to setMenu
    const handleSearch = async (categoryId: string | null) => {
      // If there is searchParams in the url fetch menus by their category
      try {
        setLoading(true);
        await fetch(`/api/menu/${categoryId}`, {
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          const data = await response.json();
          setMenu(data);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    };

    // Execute handelSearch only when there is no category is in the searchparams
    if (categoryId !== null) {
      handleSearch(categoryId);
    }
    // If ther is no cattegory id show all the menus
    else {
      setMenu(menuData);
    }
  }, [categoryId, menuData]);

  const currentQuery = (
    categoryId: string | null,
    categoryName: string | null,
  ) => {
    let url = new URL(window.location.href + `?`);
    // If there there is no category id and category name set the url without searchparams
    if (categoryId === null) {
      url = new URL(window.location.href.split("?")[0]);
      router.push(url.toString());
    }
    // If there there is category id and category name set the url with category id and category name as searchparams
    else {
      url.searchParams.set("category", categoryId);
      url.searchParams.set("name", categoryName);
      router.push(url.toString());
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-start md:justify-center gap-2 md:gap-4 my-8 overflow-x-scroll">
        <button
          onClick={() => {
            currentQuery(null, "");
          }}
          className={cn(
            "px-4 py-1 text-white capitalize cursor-pointer text-sm md:text-lg rounded-full transition-all duration-300 ease-in-out",
            categoryId === null ? "bg-secondary" : "bg-primary",
          )}
        >
          All
        </button>
        {categories.map((category) => {
          // Only show category if it have menu item associated with the category
          if (category.menu.length > 0)
            return (
              <button
                key={category.id}
                className={cn(
                  "border px-4 py-1 text-white capitalize cursor-pointer text-sm md:text-lg rounded-full transition-all duration-300 ease-in-out min-w-fit",
                  category.id === categoryId ? "bg-secondary" : "bg-primary",
                )}
                onClick={() => {
                  currentQuery(category.id, category.name);
                }}
              >
                {category.name}
              </button>
            );
        })}
      </div>
      <div>
        <MenuItemCard data={menu} />
      </div>
    </>
  );
};

export default MenuList;
