"use client";

import React, { useState } from "react";
import Google from "./ui/icons/google";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const LogIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading((prev) => !prev);
    await signIn("credentials", {
      ...data,
      redirect: false,
    }).then((result) => {
      setLoading(false);
      if (result.ok) {
        router.refresh();
        router.push("/");
      }
      if (result.error) {
        console.log(result.error);
        toast.error("something went wrong");
      }
    });
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0  bg-[#ffffff]/40 backdrop-blur-xs z-50">
          <div class="fixed left-[50%] top-[50%] w-full loader"></div>
        </div>
      )}
      <div className="bg-base flex items-center w-full rounded-md overflow-hidden my-12 sm:my-4 shadow-lg">
        <div className="relative hidden w-1/2 h-full lg:block">
          <Image
            src="/pizza_bg.jpg"
            fill
            alt="pizza_bg"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:p-20 md:p-52 p-2">
          {" "}
          <h1 className="text-center text-primary text-2xl font-bold mb-4">
            Log In
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="mb-4">
              <label for="email" className="block font-medium">
                Email address
              </label>
              <input
                type="email"
                name="email"
                disabled={loading}
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="text-center text-secondary">
                  Email is required
                </p>
              )}
            </div>
            <div class="mb-4">
              <label for="password" className="block font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                disabled={loading}
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password?.type === "minLength" && (
                <p role="alert" className="text-center text-secondary">
                  Password must be at least 8 characters
                </p>
              )}
              {errors.password?.type === "required" && (
                <p role="alert" className="text-center text-secondary">
                  Password is required
                </p>
              )}
            </div>
            <button
              disabled={loading}
              className="bg-secondary text-white rounded-md w-full  px-3 py-2 mb-4 disabled:opacity-50"
            >
              Log In
            </button>
          </form>
          <div className="text-center">
            <span>Don't have account?</span>
            <Link href={"/sign-up"} className="underline text-primary">
              {" "}
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
