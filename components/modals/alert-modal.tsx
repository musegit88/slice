"use client";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description?: string;
}

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  description,
}: AlertModalProps) => {
  return (
    <div>
      {isOpen && (
        <div className="relative z-10">
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          <div className="fixed inset-0">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md transform overflow-auto bg-white p-6 rounded-md text-left align-middle shadow-xl transition-all">
                <div className="text-center">
                  <span className="text-lg font-semibold leading-none tracking-tight">
                    {description ? (
                      <>
                        Are you sure? you want to delete
                        <h1 className="text-secondary">{description}</h1>
                      </>
                    ) : (
                      "Are you sure? you want to delete?"
                    )}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
