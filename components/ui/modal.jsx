import React, { useState } from "react";
import CatgoryUpload from "../cloudinary-upload";
import ChevronUp from "./icons/chevron-up";
import ChevronDown from "./icons/chevron-down";
import Close from "./icons/close";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { cn } from "@/libs/utils";

const Modal = ({ setOpen, filteredCategory }) => {
  const [selected, setSelected] = useState(filteredCategory[0]);
  const [link, setLink] = useState(null);
  const [opened, setOpened] = useState(false);
  const [id, setId] = useState(filteredCategory[0].id);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data) => {
    console.log(data);
    if (link === null) {
      setImageError(true);
    } else {
      setLoading(true);
      const response = await fetch("/api/admin/menus", {
        method: "POST",
        body: JSON.stringify(Object.assign(data, { link, id })),
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      handleClose();
      if (response.ok) {
        window.location.reload();
      }
      if (response.status === 400) {
        toast.error("Menu already exist");
      }
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0  bg-gray-400/40 backdrop-blur-xs z-50">
          <div class="fixed left-[50%] top-[50%] w-full loader"></div>
        </div>
      )}
      <div className="relative z-10">
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="w-full max-w-md transform overflow-hidden bg-white p-6 rounded-md text-left align-middle shadow-xl transition-all">
              <span
                onClick={handleClose}
                className="absolute top-2 right-4 bg-base p-1 rounded-full cursor-pointer"
              >
                <Close className="w-4 h-4" />
              </span>
              <div className="grid">
                <CatgoryUpload
                  link={link}
                  setLink={setLink}
                  imageError={imageError}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      {...register("name", { required: true })}
                      className={cn(
                        "outline-primary",
                        errors.name?.type === "required"
                          ? "outline-red-500"
                          : ""
                      )}
                    />
                    {errors.name?.type === "required" && (
                      <p
                        role="alert"
                        className="text-secondary text-center text-sm"
                      >
                        Name is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      name="description"
                      {...register("description", { required: true })}
                      className={cn(
                        "outline-primary",
                        errors.name?.type === "required"
                          ? "outline-red-500"
                          : ""
                      )}
                    />
                    {errors.description?.type === "required" && (
                      <p
                        role="alert"
                        className="text-secondary text-center text-sm"
                      >
                        description is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="category">Category</label>
                    <div
                      onClick={() => setOpened((prev) => !prev)}
                      className="relative bg-white w-full rounded-md py-2 pl-4 text-left  sm:text-sm border "
                    >
                      <sapn>{selected.name}</sapn>
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        {opened ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 transition" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 transition" />
                        )}
                      </span>
                      {opened && (
                        <div
                          className={cn(
                            "absolute mt-3 max-h-60 w-full left-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg overflow-hidden z-50",
                            opened
                              ? "transition ease-in duration-200 opacity-100"
                              : "transition ease-in duration-200 opacity-0"
                          )}
                        >
                          {filteredCategory.map((item) => (
                            <div
                              key={item.id}
                              className={cn(
                                "py-2 pl-4 pr-4 hover:bg-base",
                                selected.name === item.name && "bg-base "
                              )}
                              onClick={() => {
                                setSelected(item), setId(item.id);
                              }}
                            >
                              <>
                                <span
                                  className={cn(
                                    "block truncate text-primary",
                                    selected.name === item.name
                                      ? "font-bold"
                                      : "font-normal"
                                  )}
                                >
                                  {item.name}
                                </span>
                              </>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      {...register("price", { required: true })}
                      className={cn(
                        "outline-primary",
                        errors.name?.type === "required"
                          ? "outline-red-500"
                          : ""
                      )}
                    />
                    {errors.price?.type === "required" && (
                      <p
                        role="alert"
                        className="text-secondary text-center text-sm"
                      >
                        Price is required
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-primary w-full text-white rounded-md px-3 py-2 mb-4 disabled:opacity-50 mt-2"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
