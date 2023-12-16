import MenusForm from "@/components/menus-form";
import { DataTabel } from "./components/data-tabel";
import { columns } from "./components/columns";
import AlertModal from "../../../../components/modals/alert-modal";
import { format } from "date-fns";

const page = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
    price: menu.price,
    category: menu.category.name,
    createdAt: format(menu.createdAt, "MMMM do, yyyy"),
  }));

  const filteredCategory = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <div className="">
      <MenusForm filteredCategory={filteredCategory} />
      <div className="my-8">
        <DataTabel columns={columns} data={formatedMenu} />
      </div>
    </div>
  );
};

export default page;
// mx-auto max-w-md
