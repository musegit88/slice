"use client";

import CategoryForm from "../category-form";
import Close from "../ui/icons/close";

interface CategoryModalProps {
  isOpen: boolean;
  onClose?: () => void;
  initialData?: {
    id: string;
    name: string;
  };
}

const CategoryModal = ({
  isOpen,
  onClose,
  initialData,
}: CategoryModalProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="relative z-10">
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <div className="w-full max-w-md transform overflow-auto bg-white p-8 rounded-md text-left align-middle shadow-xl transition-all">
                <span
                  onClick={handleClose}
                  className="absolute top-1 right-2 bg-base p-1 rounded-full cursor-pointer"
                >
                  <Close props="w-3 h-3" />
                </span>
                <div className="">
                  <CategoryForm initialData={initialData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryModal;
