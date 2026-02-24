"use client";

import React, { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "./loader";
import Trash from "./ui/icons/trash";
import { cn } from "@/libs/utils";
import ChevronDown from "./ui/icons/chevron-down";
import ChevronUp from "./ui/icons/chevron-up";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import Plus from "./ui/icons/plus";
import AlertModal from "./modals/alert-modal";

type Address = {
  id?: string;
  label: string;
  phonenumber: string;
  street: string;
  housenumber: string;
  isApartement: boolean;
  isDefault: boolean;
  block?: string;
  floor?: string;
};

type ProfileFormData = {
  name: string;
  email: string;
  addresses: Address[];
};

const ProfileEdit = ({
  formatedData,
}: {
  formatedData: ProfileFormData & { userId: string };
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  // address id to pass to alert modal
  const [addressId, setAddressId] = useState("");
  // address label to pass to alert modal
  const [addressLabel, setAddressLabel] = useState("");
  // address index to pass to alert modal to delete address that does not have id
  const [addressIndex, setAddressIndex] = useState<number | null>(null);
  // to expand address
  const [expandedAddresses, setExpandedAddresses] = useState<number[]>([0]);
  const userId = formatedData.userId;

  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: formatedData.name,
      email: formatedData.email,
      addresses: (formatedData.addresses
        ? [...formatedData.addresses]
        : []
      ).sort((a: any, b: any) => {
        if (a.isDefault === b.isDefault) return 0;
        return a.isDefault ? -1 : 1;
      }),
      // sort by isDefault to change default address position to top
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  // scroll to submit button if dirty fields
  if (dirtyFields.addresses || dirtyFields.name) {
    setTimeout(() => {
      submitButtonRef.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, 1000);
  }

  // handle default address change
  const handleDefaultAddressChange = (index: number) => {
    const updatedAddresses = getValues("addresses").map(
      (addr: any, i: number) => ({
        ...addr,
        isDefault: i === index,
      }),
    );
    updatedAddresses.forEach((_: any, i: number) => {
      setValue(`addresses.${i}.isDefault`, i === index, { shouldDirty: true });
    });
  };

  // toggle address to open and close
  const toggleAddress = (index: number) => {
    setExpandedAddresses((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // handle submit form
  const onSubmit = async (data: ProfileFormData) => {
    try {
      const isValidPhone = data.addresses.every((addr: any) =>
        addr.phonenumber ? isValidPhoneNumber(addr.phonenumber) : false,
      );

      if (isValidPhone) {
        setLoading(true);
        await fetch(`/api/profile/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            addresses: data.addresses,
          }),
        });
        setLoading(false);
        // window.location.reload();
      }

      if (!isValidPhone) {
        toast.error("Invalid phone number");
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete address from database
  const removeAddress = async (addressId: string) => {
    try {
      setLoading(true);
      await fetch(`/api/profile/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addressId,
        }),
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // remove address by index
  const removeByIndex = (index: number) => {
    remove(index);
    setAlertOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() =>
          addressId ? removeAddress(addressId) : removeByIndex(addressIndex)
        }
        description={addressLabel}
      />
      {loading && <Loader />}
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <label htmlFor="email" className="text-xs sm:text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formatedData.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="name" className="text-xs sm:text-sm">
              Name
            </label>
            <input
              disabled={loading}
              type="text"
              {...register("name", {
                minLength: 4,
                required: true,
              })}
            />
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
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-slate-700  text-lg font-semibold">Address</h2>
            {/* Add Address Button */}
            <button
              title="Add Address"
              type="button"
              onClick={() => {
                const newIndex = fields.length;
                toggleAddress(newIndex);
                append({
                  label: "",
                  phonenumber: "",
                  street: "",
                  housenumber: "",
                  isApartement: false,
                  isDefault: false,
                  block: "",
                  floor: "",
                });
              }}
              className="flex items-center gap-2 bg-base border text-slate-700 text-sm cursor-pointer font-semibold rounded-full px-4 py-2 hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add address
            </button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="relative border p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleAddress(index)}
                >
                  <h3 className="font-semibold text-slate-700">
                    {watch(`addresses.${index}.label`) ||
                      `Address ${index + 1}`}
                  </h3>
                  {watch(`addresses.${index}.isDefault`) && (
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                  {expandedAddresses.includes(index) ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {fields.length > 1 && (
                  <div
                    onClick={() => {
                      setAddressId(getValues(`addresses.${index}.id`));
                      setAddressLabel(getValues(`addresses.${index}.label`));
                      setAddressIndex(index);
                      setAlertOpen(true);
                    }}
                    className="bg-white p-1 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    <Trash className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </div>

              <div
                className={cn(
                  "flex flex-col gap-2 transition-all duration-300",
                  !expandedAddresses.includes(index) && "hidden",
                )}
              >
                <input type="hidden" {...register(`addresses.${index}.id`)} />
                <label
                  className={cn(
                    "bg-base border rounded-full cursor-pointer w-fit px-2",
                    watch(`addresses.${index}.isDefault`) &&
                      "bg-primary text-white",
                  )}
                >
                  <input
                    type="radio"
                    disabled={loading}
                    checked={watch(`addresses.${index}.isDefault`)}
                    onChange={() => handleDefaultAddressChange(index)}
                    className="hidden"
                  />
                  <span className="text-xs">
                    {watch(`addresses.${index}.isDefault`)
                      ? "Default"
                      : "Mark as default"}
                  </span>
                </label>
                <div>
                  <label
                    htmlFor={`addresses.${index}.label`}
                    className="text-xs sm:text-sm"
                  >
                    Label
                  </label>
                  <input
                    type="text"
                    disabled={loading}
                    {...register(`addresses.${index}.label`, {
                      required: true,
                      minLength: 2,
                      maxLength: 20,
                    })}
                  />
                  {errors.addresses?.[index]?.label?.type === "required" && (
                    <p role="alert" className="text-center text-secondary">
                      Label is required
                    </p>
                  )}
                  {errors.addresses?.[index]?.label?.type === "minLength" && (
                    <p role="alert" className="text-center text-secondary">
                      Label must be at least 2 characters
                    </p>
                  )}
                  {errors.addresses?.[index]?.label?.type === "maxLength" && (
                    <p role="alert" className="text-center text-secondary">
                      Label must be at most 20 characters
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`addresses.${index}.phone`}
                    className="text-xs sm:text-sm"
                  >
                    Phone number
                  </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    international
                    countrySelectProps={{
                      disabled: true,
                    }}
                    countryCallingCodeEditable={false}
                    defaultCountry="ET"
                    disabled={loading}
                    value={watch(`addresses.${index}.phonenumber`)}
                    onChange={(value) => {
                      setValue(`addresses.${index}.phonenumber`, value, {
                        shouldDirty: true,
                      });
                    }}
                  />
                  {errors.addresses?.[index]?.phonenumber?.type ===
                    "required" && (
                    <p role="alert" className="text-center text-secondary">
                      Phone number is required
                    </p>
                  )}
                  {errors.addresses?.[index]?.phonenumber?.type ===
                    "minLength" && (
                    <p role="alert" className="text-center text-secondary">
                      Phone number is too short
                    </p>
                  )}
                  {errors.addresses?.[index]?.phonenumber?.type ===
                    "maxLength" && (
                    <p role="alert" className="text-center text-secondary">
                      Phone number is too long
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`addresses.${index}.street`}
                    className="text-xs sm:text-sm"
                  >
                    Street name
                  </label>
                  <input
                    type="text"
                    disabled={loading}
                    {...register(`addresses.${index}.street`)}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`addresses.${index}.number`}
                    className="text-xs sm:text-sm"
                  >
                    House Number
                  </label>
                  <input
                    type="text"
                    disabled={loading}
                    {...register(`addresses.${index}.housenumber`)}
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    disabled={loading}
                    {...register(`addresses.${index}.isApartement`)}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`addresses.${index}.isApartement`}
                    className="text-xs sm:text-sm"
                  >
                    Apartement/condo
                  </label>
                </div>
                {watch(`addresses.${index}.isApartement`) && (
                  <div className="flex gap-x-2">
                    <div>
                      <label
                        htmlFor={`addresses.${index}.block`}
                        className="text-xs sm:text-sm"
                      >
                        Block
                      </label>
                      <input
                        type="text"
                        disabled={loading}
                        {...register(`addresses.${index}.block`, {
                          required: getValues(
                            `addresses.${index}.isApartement`,
                          ),
                        })}
                      />
                      {errors.addresses?.[index]?.block?.type ===
                        "required" && (
                        <p role="alert" className="text-center text-secondary">
                          Block is required
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`addresses.${index}.floor`}
                        className="text-xs sm:text-sm"
                      >
                        Floor
                      </label>
                      <input
                        type="text"
                        disabled={loading}
                        {...register(`addresses.${index}.floor`, {
                          required: getValues(
                            `addresses.${index}.isApartement`,
                          ),
                        })}
                      />
                      {errors.addresses?.[index]?.floor?.type ===
                        "required" && (
                        <p role="alert" className="text-center text-secondary">
                          Floor is required
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              ref={submitButtonRef}
              disabled={loading || !isDirty}
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
