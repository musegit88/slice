"use client";

// import React, { useState } from "react";
// import Edit from "@/components/ui/icons/edit";
// import Plus from "@/components/ui/icons/plus";
// import { useForm } from "react-hook-form";

const PhotoUploader = ({ currentUser }) => {
  // const { register, handleSubmit } = useForm();
  // const [photo, setPhoto] = useState();
  // // console.log(photo);
  // const onSubmit = async (data) => {
  //   // console.log(data);
  //   const file = data;
  //   console.log(file);
  //   if (file.length === 1) {
  //     const formdata = new FormData();
  //     formdata.set("file", file);
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: data,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //   }
  // };
  return (
    <div></div>
    // <div className="border-2 px-4 py-1">
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     {!photo ? (
    //       <label>
    //         <input
    //           name="photo"
    //           type="file"
    //           className="hidden"
    //           {...register("photo", {
    //             onChange: (e) => setPhoto(e.target.files),
    //           })}
    //         />
    //         <span className="flex items-center gap-x-1  cursor-pointer">
    //           {currentUser?.image ? (
    //             <>
    //               <Edit />
    //               <h4>Edit</h4>
    //             </>
    //           ) : (
    //             <>
    //               <Plus />
    //               <h4>Add</h4>
    //             </>
    //           )}
    //         </span>
    //       </label>
    //     ) : (
    //       <button
    //         className="bg-primary text-white font-semibold
    //       px-2 py-2"
    //         type="submit"
    //       >
    //         Update
    //       </button>
    //     )}
    //   </form>
    // </div>
  );
};

export default PhotoUploader;
