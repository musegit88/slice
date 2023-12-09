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
        toast.error(result.error);
      }
    });
  };
  return (
    <div className="bg-base flex items-center justify-center h-[70vh] sm:h-[80vh] rounded-md overflow-hidden my-12 sm:my-4">
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
        <div className="text-center mb-4">
          <span className="text-center text-gray-700 my-4">
            Or continue with
          </span>
        </div>
        <div className="mb-4">
          <button
            disabled={loading}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="relative flex items-center justify-center gap-x-4 w-full border border-primary text-center rounded-md px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-12">
              <Google />
            </span>
            <span>Login with Google</span>
          </button>
        </div>
        <div className="text-center">
          <span>Don't have account?</span>
          <Link href={"/sign-up"} className="underline text-primary">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
