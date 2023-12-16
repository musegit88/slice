"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Edit from "./ui/icons/edit";
import Loader from "./loader";

const ProfileEdit = ({ filteredData }) => {
  const [name, setName] = useState(filteredData.name);
  const [phone, setPhone] = useState(filteredData.phonenumber);
  const [street, setStreet] = useState(filteredData.street);
  const [block, setBlock] = useState(filteredData.block);
  const [floor, setFloor] = useState(filteredData.floor);
  const [house, setHouse] = useState(filteredData.housenumber);
  const [loading, setLoading] = useState(false);
  const [isApartement, setIsApartement] = useState(filteredData.isApartement);
  const [isAdmin, setIsAdmin] = useState(filteredData.isAdmin);
  const [edit, setEdit] = useState(true);

  const id = filteredData.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await fetch("/api/profile/", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.assign(data, { id, isApartement })),
        });
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
  const handleChange = () => {
    setIsApartement(true);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
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
              value={street}
              {...register("street", {
                onChange: (e) => setStreet(e.target.value),
              })}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={isApartement}
              value={isApartement}
              onChange={handleChange}
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
                  value={block}
                  disabled={loading}
                  {...register("block", {
                    onChange: (e) => setBlock(e.target.value),
                  })}
                />
              </div>
              <div>
                <label htmlFor="floor">Floor</label>
                <input
                  disabled={loading}
                  type="text"
                  name="floor"
                  value={floor}
                  {...register("floor", {
                    onChange: (e) => setFloor(e.target.value),
                  })}
                />
              </div>
              <div>
                <label htmlFor="number">House Number</label>
                <input
                  disabled={loading}
                  name="number"
                  type="text"
                  value={house}
                  {...register("house", {
                    onChange: (e) => setHouse(e.target.value),
                  })}
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
    </>
  );
};

export default ProfileEdit;
