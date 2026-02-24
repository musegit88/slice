"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import EyeSlash from "./ui/icons/eye-slash";
import Eye from "./ui/icons/eye";
import Google from "./ui/icons/google";
import ReCAPTCHA from "react-google-recaptcha";

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const recaptcha = useRef<ReCAPTCHA>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const { status } = useSession();
  status === "authenticated" && router.push("/");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SignInProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInProps) => {
    const captchaValue = await recaptcha.current.executeAsync();

    setIsVerifying(true);
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ captchaValue }),
      headers: { "Content-Type": "application/json" },
    });
    setIsVerifying(false);
    const response = await res.json();
    if (response.success) {
      try {
        setLoading(true);
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
            toast.error(result.error);
          }
        });
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    } else {
      setIsVerifying(false);
      toast.error("reCAPTCHA validation error");
      router.refresh();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="w-full bg-base rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 sm:p-8 space-y-4 md:space-y-6">
          <h1 className="text-sm sm:text-xl font-semibold leading-tight tracking-tight text-primary text-center">
            Sign in
          </h1>
          <button
            onClick={() => signIn("google", { redirect: false })}
            className="bg-white rounded-md w-full px-3 py-2 mb-4 flex items-center justify-center gap-x-2"
          >
            <Google className="w-4 h-4" />
            <span className="text-primary text-xs sm:text-sm">
              Continue with Google
            </span>
          </button>
          <div className="flex items-center justify-center gap-x-2">
            <span className="border-b-2 border-red-500 w-full rounded-full" />
            <span className="text-primary">or</span>
            <span className="border-b-2 border-red-500 w-full rounded-full" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                disabled={loading}
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p
                  role="alert"
                  className="text-center text-secondary text-xs sm:text-sm"
                >
                  Email is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  disabled={loading}
                  {...register("password", { required: true, minLength: 8 })}
                />
                <span
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                  className="absolute right-4 top-2"
                >
                  {passwordVisibility ? (
                    <EyeSlash className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </span>
              </div>
              {errors.password?.type === "minLength" && (
                <p
                  role="alert"
                  className="text-center text-secondary text-xs sm:text-sm"
                >
                  Password must be at least 8 characters
                </p>
              )}
              {errors.password?.type === "required" && (
                <p
                  role="alert"
                  className="text-center text-secondary text-xs sm:text-sm"
                >
                  Password is required
                </p>
              )}
            </div>
            <button
              disabled={loading || isVerifying || !isDirty}
              className="bg-secondary text-white text-xs sm:text-sm rounded-md w-full px-3 py-2 mb-4 disabled:opacity-50"
            >
              Sign In
            </button>
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_INVISIBLE_SITE_KEY!}
              size="invisible"
            />
          </form>
          <div className="text-center text-xs sm:text-sm">
            <span>Don&apos;t have an account?</span>
            <Link href={"/signup"} className=" text-primary">
              {" "}
              Sign up
            </Link>
          </div>
          <Link
            href={"/"}
            className="block text-primary text-xs sm:text-sm text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
