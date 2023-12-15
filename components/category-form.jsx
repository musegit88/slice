"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { handleDelete, handleUpdate } from "@/libs/utils";

const CategoryForm = ({ filteredCategory }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await fetch("/api/admin/category", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    window.location.reload();
    if (response.status === 400) {
      toast.error("Category already exist");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0  bg-gray-400/40 backdrop-blur-xs z-50">
          <div class="fixed left-[50%] top-[50%] w-full loader"></div>
        </div>
      )}
      <form className="mx-auto max-w-md" onSubmit={handleSubmit(onSubmit)}>
        {errors.category?.type === "required" && (
          <p role="alert" className="text-center text-secondary">
            Category name is required
          </p>
        )}
        <div className="flex items-center gap-x-4">
          <div className="grow">
            <input
              name="category"
              type="text"
              placeholder="pizza"
              value={value}
              {...register("category", {
                required: true,
                onChange: (e) => setValue(e.target.value),
              })}
              className={cn(
                "outline-primary",
                errors.category?.type === "required" ? "outline-red-500" : ""
              )}
            />
          </div>
          <div>
            {edit ? (
              <div className="flex gap-x-2">
                <button
                  disabled={loading}
                  onClick={() => handleUpdate(edit.id, setLoading, value)}
                  className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  Update
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleDelete(edit.id, setLoading)}
                  className="bg-secondary text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="my-12">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col gap-4 border p-2 rounded-md">
            {filteredCategory.map((category) => (
              <div
                onClick={() => {
                  setEdit(category), setValue(category.name);
                }}
                key={category.id}
                className="flex items-center justify-between gap-2 border p-1 rounded-md bg-gray-500/10 cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <span className="bg-primary/80 text-white p-1 rounded-md">
                    Category
                  </span>
                  <span className="bg-blue-500/40 p-1 rounded-md">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-4">
                  <span className="bg-primary/80 text-white p-1 rounded-md">
                    ID
                  </span>{" "}
                  <span className="bg-blue-500/40 p-1 rounded-md">
                    {category.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
