"use client";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal = ({ isOpen, onClose, onConfirm }: AlertModalProps) => {
  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10 bg-black/25 backdrop-blur-sm" />
          <div className="fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full max-w-md bg-white rounded-md p-6 shadow-lg z-50">
            <div className="text-center">
              <span className="text-lg font-semibold leading-none tracking-tight">
                Are you sure? you want to delete?
              </span>
              <p className="text-sm text-gray-400">
                This action cannot be undone
              </p>
            </div>
            <div className="flex items-center justify-end w-full pt-6 gap-x-2">
              <button
                onClick={onClose}
                name="button"
                className="border px-4 py-2 rounded-md"
              >
                cancle
              </button>
              <button
                onClick={onConfirm}
                name="button"
                className="bg-secondary text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AlertModal;
