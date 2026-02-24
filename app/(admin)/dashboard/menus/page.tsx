import CreateMenu from "@/components/create-menu";
import { DataTabel } from "./components/data-tabel";
import { columns } from "./components/columns";
import { format } from "date-fns";

const menusPage = async () => {
  const menus = await prisma.menu.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedMenu = menus.map((menu) => ({
    id: menu.id,
    name: menu.name,
    description: menu.description,
    image: menu.image,
    price: menu.price.toString(),
    sizes: menu.sizes,
    extras: menu.extras,
    category: menu.category.name,
    createdAt: format(menu.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div>
      <CreateMenu />
      <div className="my-8">
        <DataTabel columns={columns} data={formatedMenu} />
      </div>
    </div>
  );
};

export default menusPage;
