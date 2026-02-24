"use client";

import Image from "next/image";
import { cn } from "@/libs/utils";
import Link from "next/link";

interface AvatarProps {
  currentUser: any;
  admin?: boolean;
}

const Avatar = ({ currentUser, admin }: AvatarProps) => {
  return (
    <Link
      href="/profile"
      className={cn(
        "relative bg-base sm:w-10 sm:h-10 w-8 h-8 rounded-full cursor-pointer overflow-hidden shadow-sm",
        admin && "bg-primary text-white",
      )}
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
    </Link>
  );
};

export default Avatar;
