"use client";

import React, { useRef, useState } from "react";
import Google from "./ui/icons/google";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./loader";

const SignUp = () => {
  const recaptcha = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const captchaValue = await recaptcha.current.executeAsync();
    // console.log(captchaValue);
    setIsLoading(true);
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ captchaValue }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    // console.log(response);
    setIsLoading(false);
    if (response.success) {
      const promise = new Promise((resolve, reject) => {
        try {
          setLoading((prev) => !prev);
          fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(
              Object.assign(data, {
                phonenumber: "",
                street: "",
                block: "",
                floorNumber: "",
                housenumber: "",
                isApartement: false,
                isAdmin: false,
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
              // router.push("/login");
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
    } else {
      toast.error("reCAPTCHA validation error");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full bg-base rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl text-center">
            Sign up
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <label
                for="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
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
            <div className="">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
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
            <div className="">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
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
            <div className="flex flex-col justify-center">
              <ReCAPTCHA
                ref={recaptcha}
                sitekey="6LfrNi4pAAAAAGP5fgdlDyZ2RJliulAzlUieWD2W"
                size="invisible"
              />
              <div className="text-center">
                <span>Already have an account?</span>
                <Link href={"/login"} className="underline text-primary">
                  {" "}
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
