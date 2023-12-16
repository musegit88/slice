import { cn } from "@/libs/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Suspense } from "react";

const CatgoryUpload = ({ link, setLink, imageError }) => {
  const handleUpload = (response) => {
    setLink(response.info.url);
  };
  return (
    <div className="my-4">
      <CldUploadWidget
        uploadPreset="rentify"
        onUpload={handleUpload}
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open()}
              className="relative p-20 border rounded-md cursor-pointer shadow-md hover:opacity-80"
            >
              <div
                className={cn(
                  "text-center",
                  imageError ? "text-secondary" : ""
                )}
              >
                {imageError ? "Image is required" : "Click to upload"}
              </div>

              {link && (
                <div className="absolute inset-0 w-full h-full">
                  <Image src={link} alt="image" fill className="object-cover" />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default CatgoryUpload;
