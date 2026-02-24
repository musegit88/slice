import MenuList from "@/components/menu-list";
import { prisma } from "@/libs/prismaDB";
import { Category, MenuItemType } from "@/types";
import { Suspense } from "react";

// Parent component: renders Suspense boundary
const MenuPage = () => {
  return (
    <Suspense fallback={<MenuSkeleton />}>
      <MenuContent />
    </Suspense>
  );
};

export default MenuPage;

// Child async component: does the data fetching (Suspense catches this)
const MenuContent = async () => {
  const menu: MenuItemType[] = await prisma.menu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const category: Category[] = await prisma.category.findMany({
    include: {
      menu: true,
    },
  });

  return <MenuList menuData={menu} categories={category} />;
};

// Skeleton component
export const MenuSkeleton = () => {
  return (
    <>
      <div className="flex justify-start md:justify-center gap-2 md:gap-4 my-8 overflow-x-scroll">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={"px-8 py-1 w-28 h-8 bg-muted rounded-full animate-pulse"}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-80 bg-muted rounded-md animate-pulse"
          />
        ))}
      </div>
    </>
  );
};
