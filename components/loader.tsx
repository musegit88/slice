import React from "react";

const Loader = ({ message }: { message?: string }) => {
  return (
    <div className="relative">
      <div className="fixed inset-0  bg-[#ffffff]/40 backdrop-blur-xs z-50">
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full loader" />
        <div className="flex items-center justify-center h-full mt-5">
          {message && (
            <p className="text-center text-xs sm:text-md md:text-lg">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loader;
