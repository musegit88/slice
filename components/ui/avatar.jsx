"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Avatar = ({ currentUser }) => {
  const router = useRouter();
  return (
    <div
      className="relative bg-base w-10 h-10 rounded-full cursor-pointer overflow-hidden"
      onClick={() => router.push("/profile")}
    >
      {currentUser.image ? (
        <Image
          src={currentUser.image}
          alt={currentUser.name}
          fill
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="flex items-center justify-center h-full">
          {currentUser?.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;
