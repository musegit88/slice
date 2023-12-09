"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import Edit from "@/components/ui/icons/edit";
import Plus from "@/components/ui/icons/plus";

const ImageUploader = ({ currentUser }) => {
  const handleChange = async (e) => {
    const file = e.target.files;
    if (file.length === 1) {
      const data = new FormData();
      data.set("file", file[0]);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  };

  return (
    <div className=" relative flex flex-col items-center gap-y-4">
      <div
        className={cn(
          "relative w-40 h-40 rounded-full overflow-hidden",
          currentUser.image
            ? "border-2 shadow-md"
            : "shadow-md border-2 bg-white"
        )}
      >
        {currentUser.image ? (
          <Image
            className="w-full h-full object-cover"
            src={currentUser?.image}
            fill
            alt={currentUser.name}
          />
        ) : (
          <span className="flex items-center justify-center h-full text-7xl">
            {currentUser.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {/*  */}
      <div className="absolute bottom-0 left-0 bg-slate-400">
        <div className="border-2 px-4 py-1">
          <label>
            <input
              name="photo"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <span className="flex items-center gap-x-1  cursor-pointer">
              {currentUser?.image ? (
                <>
                  <Edit />
                  <h4>Edit</h4>
                </>
              ) : (
                <>
                  <Plus />
                  <h4>Add</h4>
                </>
              )}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
// onChange: (e) => setPhoto(e.target.files)
