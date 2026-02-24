import MenuItem from "./ui/menu-item-card";
import Link from "next/link";
import { MenuItemType } from "@/types";
import Ribbon from "./ui/icons/ribbon";

const HomeMenu = async () => {
  const menuItems: MenuItemType[] = await prisma.menu.findMany({
    where: {
      category: {
        name: "pizza",
      },
    },
    take: 4,
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-center gap-x-2 text-primary">
        <Ribbon className="w-10 h-10 fill-current" />
        <h1 className="text-center text-4xl ">Our Menu</h1>
        <Ribbon className="w-10 h-10 fill-current" />
      </div>
      <div>
        <MenuItem data={menuItems} />
      </div>
      <div className="flex items-center justify-center my-8">
        <Link href={"/menu"}>
          <button className="bg-secondary  text-white font-semibold px-7 py-2 rounded-full border hover:border hover:border-primary transition">
            Explore Our Full Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeMenu;
