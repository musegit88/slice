"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import AlertModal from "./modals/alert-modal";
import Trash from "./ui/icons/trash";
import Loader from "./loader";

interface CategoryFormProps {
  initialData?: { id: string; name: string };
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  // loading state while submitting
  const [loading, setLoading] = useState<boolean>(false);
  // operation type state
  const [operationType, setOperationType] = useState<"update" | "create">();
  // alert open state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<{ category: string }>({
    defaultValues: {
      category: initialData?.name || "",
    },
  });
  const onSubmit = async (data: { category: string }) => {
    if (operationType === "update") {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/category/${initialData?.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: data.category }),
        });

        if (response.status === 400) {
          toast.error("Category already exist");
        }
        window.location.reload();
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (operationType === "create") {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/category", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 400) {
          toast.error("Category already exist");
        }
        window.location.reload();
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const onDelete = async (id: string) => {
    setLoading(true);
    setAlertOpen(false);
    await fetch(`/api/admin/category/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    toast.success("category deleted");
    window.location.reload();
  };
  return (
    <>
      {loading && <Loader />}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => onDelete(initialData.id)}
      />
      <form className="mx-auto max-w-md" onSubmit={handleSubmit(onSubmit)}>
        {errors.category?.type === "required" && (
          <p role="alert" className="text-center text-secondary">
            Category name is required
          </p>
        )}
        <div className="flex items-center gap-x-4">
          <div className="grow">
            <input
              type="text"
              placeholder="pizza"
              {...register("category", {
                required: true,
              })}
              className={cn(
                "outline-primary",
                errors.category?.type === "required" ? "outline-red-500" : "",
              )}
            />
          </div>
          <div className="flex gap-2">
            <button
              title={initialData ? "Update Category" : "Create Category"}
              disabled={loading || !isDirty}
              onClick={() =>
                setOperationType(initialData?.id ? "update" : "create")
              }
              className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {initialData ? "Update" : "Submit"}
            </button>
            {initialData && (
              <button
                title="Delete Category"
                onClick={() => setAlertOpen(true)}
                className="bg-red-500 w-full text-white px-4 py-2 rounded-md "
              >
                <span className="sr-only">Delete</span>
                <Trash className="w- h-5" />
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
