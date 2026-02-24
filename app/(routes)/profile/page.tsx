import { Suspense } from "react";
import { redirect } from "next/navigation";
import ProfileEdit from "@/components/profileedit";
import { getUser } from "@/currentuser/user";
import { prisma } from "@/libs/prismaDB";

// Parent component: renders Suspense boundary
const profilePage = () => {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
};

export default profilePage;

// Child async component: does the data fetching (Suspense catches this)
const ProfileContent = async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    redirect("/login");
  }
  const userProfile = await prisma.user.findUnique({
    where: {
      email: currentUser.email,
    },
    include: {
      address: {
        select: {
          id: true,
          label: true,
          phonenumber: true,
          street: true,
          block: true,
          floor: true,
          housenumber: true,
          isApartement: true,
          isDefault: true,
        },
      },
    },
  });
  const formatedData = {
    userId: userProfile.id,
    name: userProfile.name,
    email: userProfile.email,
    image: userProfile.image,
    addresses: userProfile.address,
  };
  return (
    <div className="my-8">
      <div className="max-w-4xl h-full mx-auto">
        <ProfileEdit formatedData={formatedData} />
      </div>
    </div>
  );
};

// Skeleton Component
const ProfileSkeleton = () => {
  return (
    <div className="max-w-md mx-auto mt-4">
      <div className="flex flex-col gap-y-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-y-2">
            <div className="w-12 h-5 bg-muted rounded-md animate-pulse" />
            <div className="w-full h-10 bg-muted rounded-md animate-pulse" />
          </div>
        ))}

        <div className="w-full h-96 bg-muted rounded-md animate-pulse" />
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-20 bg-muted rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
