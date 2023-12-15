import MenusForm from "@/components/menus-form";

const page = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const filteredCategory = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <div className="mx-auto max-w-md">
      <MenusForm filteredCategory={filteredCategory} />
    </div>
  );
};

export default page;
