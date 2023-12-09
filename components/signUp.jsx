"use client";

import React, { useState } from "react";
import Google from "./ui/icons/google";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isGoogle, setIsGoogle] = useState(true);
  console.log(isGoogle);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = () => {
    signIn(
      "google"
      // { callbackUrl: "/" }
    );
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(
        // Object.assign(data, {
        {
          phonenumber: "000-000-0000",
          street: "",
          block: "",
          floorNumber: "",
          housenumber: "",
        },
        // })
        isGoogle
      ),
      headers: { "Content-type": "application/json" },
    });
  };

  const onSubmit = (data) => {
    const promise = new Promise((resolve, reject) => {
      setLoading((prev) => !prev);
      setIsGoogle(false);
      try {
        fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(
            Object.assign(data, {
              phonenumber: "000-000-0000",
              street: "",
              block: "",
              floorNumber: "",
              housenumber: "",
              isGoogle,
            })
          ),
          headers: { "Content-type": "application/json" },
        }).then((result) => {
          setLoading(false);
          if (result.ok) {
            router.push("/login");
            resolve();
          }
          if (result.status === 401) {
            // toast.error("User already exist please login");
            router.push("/login");
            reject();
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    toast.promise(promise, {
      loading: "Registering",
      success: "User registered successfully",
      error: "User already exist please login",
    });
  };
  return (
    <div className="bg-base flex items-center justify-center h-[70vh] sm:h-[100vh] rounded-md overflow-hidden my-12 sm:my-4">
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
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label for="username" className="block font-medium">
              Username
            </label>
            <input
              disabled={loading}
              type="text"
              name="username"
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-center text-secondary">
                Name is required
              </p>
            )}
          </div>
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
            Sign up
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
            onClick={handleSignIn}
            className="relative flex items-center justify-center gap-x-4 w-full border border-primary text-center  rounded-md px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-12">
              <Google />
            </span>
            <span>Login with Google</span>
          </button>
        </div>
        <div className="text-center">
          <span>Already have account?</span>
          <Link href={"/login"} className="underline text-primary">
            {" "}
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
