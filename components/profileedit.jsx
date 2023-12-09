"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Edit from "./ui/icons/edit";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProfileEdit = ({ filteredData }) => {
  console.log(filteredData);
  const [name, setName] = useState(filteredData.name);
  const [phone, setPhone] = useState(filteredData.phonenumber);
  const [loading, setLoading] = useState(false);
  const [isApartement, setIsApartement] = useState(false);
  const [edit, setEdit] = useState(true);

  const isGoogle = filteredData.emailVerified;

  const id = filteredData.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { phone, street } = data;

    const promise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        {
          !isGoogle
            ? await fetch(`/api/profile/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.assign(data, { id })),
              })
            : await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, street, id }),
              });
        }

        setLoading(false);
        // window.location.reload();
        resolve();
      } catch (error) {
        console.log(error);
        reject();
      }
    });
    toast.promise(promise, {
      loading: "updating",
      success: "Profile updated",
      error: "Something went wrong",
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={filteredData.email}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <div className="flex items-center gap-x-2">
            <input
              disabled={loading || edit}
              name="name"
              type="text"
              value={name}
              {...register("name", {
                onChange: (e) => setName(e.target.value),
                minLength: 4,
                required: true,
              })}
            />
            <div
              className="border px-2 py-2 rounded-md cursor-pointer bg-primary text-white"
              onClick={() => setEdit((prev) => !prev)}
            >
              <Edit />
            </div>
          </div>
          {errors.name?.type === "minLength" && (
            <p role="alert" className="text-center text-secondary">
              Name must be at least 4 characters
            </p>
          )}
          {errors.name?.type === "required" && (
            <p role="alert" className="text-center text-secondary">
              Name is required
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone">Phone number</label>
          <input
            name="phone"
            type="tel"
            value={phone}
            {...register("phone", {
              onChange: (e) => setPhone(e.target.value),
            })}
          />
        </div>
        <div>
          <label htmlFor="street">Street name</label>
          <input
            disabled={loading}
            name="street"
            type="text"
            {...register("street", { minLength: 20 })}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={isApartement}
            value={isApartement}
            onChange={() => setIsApartement((prev) => !prev)}
          />
          <span>Apartement/condo</span>
        </div>
        {isApartement && (
          <div className="flex gap-x-2">
            <div>
              <label htmlFor="block">Block</label>
              <input
                type="text"
                name="block"
                disabled={loading}
                {...register("block")}
              />
            </div>
            <div>
              <label htmlFor="floor">Floor</label>
              <input
                type="text"
                name="floor"
                disabled={loading}
                {...register("floor")}
              />
            </div>
            <div>
              <label htmlFor="number">House Number</label>
              <input
                type="text"
                name="number"
                disabled={loading}
                {...register("house")}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-primary text-white font-semibold rounded-md px-2 py-2 max-w-[180px] disabled:cursor-not-allowed disabled:bg-primary/40"
          >
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
