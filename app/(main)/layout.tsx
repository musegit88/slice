import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getUser } from "@/currentuser/user";
import Image from "next/image";
import React from "react";

const HomeLayout = async ({ children }) => {
  const currentUser = await getUser();
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
      <div className="bg-gray-400/10 backdrop-blur-sm shadow-sm h-fit flex md:flex-row flex-col-reverse gap-2 rounded-md overflow-hidden mb-2 md:px-10">
        <div className="flex-5 h-fit p-4">
          <div className="h-[200px] md:h-[400px]">
            <Image
              src={"/phone.png"}
              alt="Phone"
              width={500}
              height={500}
              quality={100}
              className="object-cover object-top w-full h-full max-sm:scale-150"
            />
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-2 p-4">
          <h1 className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent text-2xl md:text-4xl text-center font-thin">
            Order With Mobile App
          </h1>
          <p className="text-center text-xs md:text-sm">
            Download the app and order your favorite food
          </p>
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/play-store.svg"
              alt="App Store"
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
