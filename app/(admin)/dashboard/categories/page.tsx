import { DataTabel } from "./components/data-tabel";
import { columns } from "./components/columns";
import { format } from "date-fns";
import CreateCategory from "@/components/create-category";
import { prisma } from "@/libs/prismaDB";
const page = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedCategory = categories.map((category) => ({
    id: category.id,
    name: category.name,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <CreateCategory />
      <div className="my-8">
        <DataTabel columns={columns} data={formatedCategory} />
      </div>
    </div>
  );
};

export default page;
