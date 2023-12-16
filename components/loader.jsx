import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0  bg-[#ffffff]/40 backdrop-blur-xs z-50">
      <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full loader"></div>
    </div>
  );
};

export default Loader;
/* HTML: <div class="loader"></div> */
