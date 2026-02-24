"use client";

import { useEffect, useState } from "react";
import MenuItemsProps from "./menu-item-props";
import CategorySelect from "./category-select";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { cn } from "@/libs/utils";
import Loader from "./loader";
import { SizesAndExtraProps, MenuItemType } from "@/types";
import ImageUpload from "./image-upload";
import AlertModal from "./modals/alert-modal";

interface MenuFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  sizes: SizesAndExtraProps[];
  extras: SizesAndExtraProps[];
}

const MenuForm = ({ initialData }: { initialData: MenuItemType }) => {
  const [link, setLink] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [updatedCategoryId, setUpdatedCategoryId] = useState<string | null>(
    initialData?.categoryId,
  );
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sizes, setSizes] = useState<SizesAndExtraProps[]>(
    initialData?.sizes || [],
  );
  const [extras, setExtras] = useState<SizesAndExtraProps[]>(
    initialData?.extras || [],
  );
  const [operationType, setOperationType] = useState<"update" | "create">();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<MenuFormData>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price / 100 || 0,
      categoryId: initialData?.categoryId || "",
      image: initialData?.image,
      sizes: initialData?.sizes || [],
      extras: initialData?.extras || [],
    },
  });
  console.log(isDirty);
  // Register manual fields for validation
  useEffect(() => {
    register("categoryId", { required: "Category is required" });
    register("image", { required: "Image is required" });
    register("sizes");
    register("extras");
  }, [register]);

  useEffect(() => {
    setValue("sizes", sizes, { shouldValidate: true, shouldDirty: true });
    setValue("extras", extras, { shouldValidate: true, shouldDirty: true });
  }, [sizes, extras, setValue]);

  // Sync state to form values
  useEffect(() => {
    if (link) {
      setValue("image", link, { shouldValidate: true, shouldDirty: true });
    } else if (updatedImage) {
      setValue("image", updatedImage, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [link, updatedImage, setValue]);

  // Sync state to form values
  useEffect(() => {
    if (categoryId) {
      setValue("categoryId", categoryId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (updatedCategoryId) {
      setValue("categoryId", updatedCategoryId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [categoryId, updatedCategoryId, setValue]);

  const onSubmit = async (data: MenuFormData) => {
    if (operationType === "update") {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/menus/${initialData.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...data,
            sizes,
            extras,
          }),
          headers: { "Content-Type": "application/json" },
        });
        setLoading(false);
        if (response.ok) {
          window.location.reload();
        }
        if (response.status === 400) {
          toast.error("Menu already exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (operationType === "create") {
      if (link === null) {
        setImageError(true);
      }
      try {
        setLoading(true);
        const response = await fetch("/api/admin/menus", {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: { "Content-Type": "application/json" },
        });
        setLoading(false);
        if (response.ok) {
          window.location.reload();
        }
        if (response.status === 400) {
          toast.error("Menu already exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onDelete = async (id: string) => {
    setLoading(true);
    setAlertOpen(false);
    await fetch(`/api/admin/menus/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    window.location.reload();
  };
  return (
    <>
      {loading && <Loader />}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => onDelete(initialData?.id)}
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ImageUpload
              link={link}
              setLink={setLink}
              imageError={imageError || !!errors.image}
              updatedImage={updatedImage}
              setUpdatedImage={setUpdatedImage}
              initialImage={initialData?.image}
            />
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              maxLength={50}
              {...register("name", {
                required: true,
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be at most 50 characters long",
                },
              })}
              className={cn(
                "outline-primary",
                errors.name?.type === "required" ? "outline-red-500" : "",
              )}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-secondary text-center text-sm">
                Name is required
              </p>
            )}
            {errors.name?.type === "maxLength" && (
              <p role="alert" className="text-secondary text-center text-sm">
                Name must be at most 50 characters long
              </p>
            )}
            {errors.name?.type === "minLength" && (
              <p role="alert" className="text-secondary text-center text-sm">
                Name must be at least 2 characters long
              </p>
            )}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              maxLength={100}
              {...register("description", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Description must be at least 5 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Description must be at most 100 characters long",
                },
              })}
              className={cn(
                "outline-primary",
                errors.name?.type === "required" ? "outline-red-500" : "",
              )}
            />
            {errors.description?.type === "required" && (
              <p role="alert" className="text-secondary text-center text-sm">
                description is required
              </p>
            )}
            {errors.description?.type === "maxLength" && (
              <p role="alert" className="text-secondary text-center text-sm">
                Description must be at most 100 characters long
              </p>
            )}
            {errors.description?.type === "minLength" && (
              <p role="alert" className="text-secondary text-center text-sm">
                Description must be at least 5 characters long
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <CategorySelect
              setCategoryId={setCategoryId}
              categoryError={!!errors.categoryId}
              setUpdatedCategoryId={setUpdatedCategoryId}
              initialCategoryId={initialData?.categoryId}
            />
            {errors.categoryId?.type === "required" && (
              <p role="alert" className="text-secondary text-center text-sm">
                category is required
              </p>
            )}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              min={0}
              step={0.01}
              {...register("price", {
                required: true,
                valueAsNumber: true,
              })}
              className={cn(
                "outline-primary",
                errors.name?.type === "required" ? "outline-red-500" : "",
              )}
            />
            {errors.price?.type === "required" && (
              <p role="alert" className="text-secondary text-center text-sm">
                Price is required
              </p>
            )}
          </div>

          <MenuItemsProps
            props={sizes}
            setProps={setSizes}
            buttonTitle="Add Sizes"
            label="Size"
            placeholder="size"
            title="Sizes"
          />

          <MenuItemsProps
            props={extras}
            setProps={setExtras}
            buttonTitle="Add Extras"
            label="Extra"
            placeholder="extra"
            title="Extras"
          />

          <button
            disabled={loading || !isDirty}
            onClick={() =>
              setOperationType(initialData?.id ? "update" : "create")
            }
            className="bg-primary w-full text-white px-4 py-2 rounded-md disabled:opacity-50 mt-2"
          >
            {initialData ? "Update" : "Submit"}
          </button>
          {initialData && (
            <button
              onClick={() => setAlertOpen(true)}
              className="bg-secondary w-full text-white px-4 py-2 rounded-md mt-2"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default MenuForm;
