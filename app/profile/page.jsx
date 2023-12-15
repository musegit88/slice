import React from "react";
import { getUser } from "../currentuser/user";
import { redirect } from "next/navigation";
import ProfileEdit from "@/components/profileedit";
import ImageUploader from "@/components/imageuploader";
import prismaDB from "@/libs/prismaDB";

const ProfilePage = async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    redirect("/login");
  }

  const userProfile = await prismaDB.user.findUnique({
    where: {
      email: currentUser.email,
    },
    include: {
      address: true,
    },
  });

  const filteredData = {
    id: userProfile.id,
    name: userProfile.name,
    email: userProfile.email,
    image: userProfile.image,
    emailVerified: userProfile?.emailVerified,
    phonenumber: userProfile.address?.phonenumber,
    street: userProfile.address?.street,
    block: userProfile.address?.block,
    floor: userProfile.address?.floor,
    housenumber: userProfile.address?.housenumber,
    isApartement: userProfile.address?.isApartement,
    isAdmin: userProfile.isAdmin,
  };
  return (
    <div className="my-8 h-screen">
      <div className="max-w-4xl h-full mx-auto bg-base backdrop-blur-sm rounded-md shadow-lg">
        <div className="flex justify-center p-4">
          <ImageUploader currentUser={currentUser} />
        </div>
        <ProfileEdit filteredData={filteredData} />
      </div>
    </div>
  );
};

export default ProfilePage;
