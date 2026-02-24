"use client";
import React, { useEffect, useState } from "react";
import ChevronDown from "./ui/icons/chevron-down";
import ChevronUp from "./ui/icons/chevron-up";
import { cn } from "@/libs/utils";
import { Category } from "@prisma/client";
import CheckCircle from "./ui/icons/check-circle";

interface CategorySelectProps {
  setCategoryId: any;
  categoryError?: boolean;
  setUpdatedCategoryId?: any;
  initialCategoryId: string;
}

const CategorySelect = ({
  setCategoryId,
  categoryError,
  setUpdatedCategoryId,
  initialCategoryId,
}: CategorySelectProps) => {
  // dropdown state
  const [opened, setOpened] = useState<boolean>(false);
  // category state
  const [category, setCategory] = useState<Category[]>([]);
  // selected category name
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // updated category name
  const [updatedCategory, setUpdatedCategory] = useState<string>("");

  // fetch categories
  useEffect(() => {
    const fetchcategory = async () => {
      const response = await fetch("/api/admin/category");
      const result = await response.json();
      setCategory(result);
    };
    fetchcategory();
  }, []);

  // set initial category
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(
        category.find((item: Category) => item.id === initialCategoryId)?.name,
      );
    }
  }, [category, initialCategoryId]);
  return (
    <div>
      <div
        onClick={() => setOpened((prev) => !prev)}
        className={cn(
          "relative bg-white w-full rounded-md py-2 pl-4 text-left  sm:text-sm border",
          categoryError ? "border-red-700" : "",
        )}
      >
        {updatedCategory ? (
          <span>{updatedCategory}</span>
        ) : initialCategoryId ? (
          <span className="flex gap-4">{selectedCategory}</span>
        ) : (
          <span>
            {!selectedCategory ? "Select category" : selectedCategory}
          </span>
        )}
        <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {opened ? (
            <ChevronUp className="w-4 h-4 text-gray-400 transition" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400 transition" />
          )}
        </span>
        {opened && (
          <div
            className={cn(
              "absolute mt-3 max-h-60 w-full left-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg z-[999]",
              opened
                ? "transition ease-in duration-200 opacity-100"
                : "transition ease-in duration-200 opacity-0",
            )}
          >
            <div>
              {category.map((item: Category) => (
                <div
                  key={item.id}
                  className={cn(
                    "py-2 pl-4 pr-4 hover:bg-base",
                    selectedCategory === item.name && "bg-base ",
                  )}
                  onClick={() => {
                    setCategoryId(item.id);
                    setUpdatedCategoryId(item.id);
                    setUpdatedCategory(item.name);
                  }}
                >
                  <>
                    <div
                      className={cn(
                        "flex items-center justify-between truncate text-primary",
                        selectedCategory === item.name
                          ? "font-bold"
                          : "font-normal",
                        item.id === initialCategoryId && "font-bold",
                      )}
                    >
                      <span>{item.name}</span>
                      <span>
                        {item.id === initialCategoryId && (
                          <CheckCircle className="w-4 h-5 text-primary" />
                        )}
                      </span>
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
