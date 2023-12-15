import React from "react";
import CategoryForm from "@/components/category-form";
import CategoryList from "@/components/category-list";

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
    <div className="">
      <CategoryForm filteredCategory={filteredCategory} />
      {/* <CategoryList  /> */}
    </div>
  );
};

export default page;
