import { cn } from "@/libs/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import UploadIcon from "./ui/icons/upload-icon";
import ExclamiationTriangle from "./ui/icons/exclamiation-triangle";

interface ImageUploadProps {
  link: string;
  setLink: any;
  imageError?: boolean;
  updatedImage?: any;
  setUpdatedImage: any;
  initialImage: string;
}

const ImageUpload = ({
  link,
  setLink,
  imageError,
  updatedImage,
  setUpdatedImage,
  initialImage,
}: ImageUploadProps) => {
  const handleUpload = (response: { info: { url: string } }) => {
    // If there is already an image, upload another image for update
    if (!!initialImage) {
      setUpdatedImage(response.info.url);
    }
    // When uploading for the first time
    else {
      setLink(response.info.url);
    }
  };
  return (
    <div className="my-4">
      <CldUploadWidget
        uploadPreset="slice pizza"
        onUpload={handleUpload}
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open()}
              className={cn(
                "relative p-20 border rounded-md cursor-pointer shadow-md overflow-hidden hover:opacity-80",
              )}
            >
              {updatedImage ? (
                <div className="absolute inset-0 w-full">
                  <Image
                    src={updatedImage}
                    alt="image"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : initialImage ? (
                <div className="absolute inset-0 w-full">
                  <Image
                    src={initialImage}
                    alt="image"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <>
                  <div
                    className={cn(
                      "text-center",
                      imageError ? "text-secondary" : "",
                    )}
                  >
                    {imageError ? (
                      <div className="flex flex-col items-center">
                        <ExclamiationTriangle props="w-8 h-8 text-red-400" />
                        <span>Image is required</span>
                      </div>
                    ) : (
                      <>
                        {/* show upload button if there is no image link*/}
                        {!link && (
                          <div className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
                            <UploadIcon props="w-5 h-5" />
                            <span>Click to upload</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {link && (
                    <div className="absolute inset-0 w-full">
                      <Image
                        src={link}
                        alt="image"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
