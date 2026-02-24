"use client";

import Close from "../ui/icons/close";
import { MenuItemType } from "@/types";
import MenuForm from "../menu-form";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  initialData?: MenuItemType;
}

const Modal = ({ isOpen, onClose, initialData }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="relative z-10">
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-center justify-center min-h-full p-4 text-center">
              <div className="w-full max-w-md transform overflow-auto bg-white p-6 rounded-md text-left align-middle shadow-xl transition-all">
                <span
                  onClick={() => onClose()}
                  className="absolute top-2 right-4 bg-base p-1 rounded-full cursor-pointer"
                >
                  <Close props="w-4 h-4" />
                </span>

                <div className="grid">
                  <MenuForm initialData={initialData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
