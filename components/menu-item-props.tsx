"use client";

import { SizesAndExtraProps } from "@/types";
import { useState } from "react";
import ChevronDown from "./ui/icons/chevron-down";
import ChevronUp from "./ui/icons/chevron-up";

interface MenuItemsPropsProps {
  props: SizesAndExtraProps[];
  setProps: React.Dispatch<React.SetStateAction<SizesAndExtraProps[]>>;
  buttonTitle: string;
  label: string;
  placeholder: string;
  title: string;
}

const MenuItemsProps = ({
  props,
  setProps,
  buttonTitle,
  label,
  placeholder,
  title,
}: MenuItemsPropsProps) => {
  const [showItems, setShowItems] = useState(false);

  // add a new size or extra when the add button is clicked
  const handleAddSizeOrExtra = () => {
    setProps((allSizesAndExtras: SizesAndExtraProps[]) => {
      return [...allSizesAndExtras, { name: "", extraPrice: 0 }];
    });
  };

  const editProps = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: string,
  ) => {
    let newValue: string | number = e.target.value;
    // convert string to number if the key is extraPrice
    if (key === "extraPrice") {
      newValue = Math.round(parseFloat(newValue) * 100);
    }
    // update the state when the input value changes
    setProps((prevProps: SizesAndExtraProps[]) => {
      const newProps = [...prevProps];
      newProps[index][key] = newValue;
      return newProps;
    });
  };

  // delete the size or extra when the delete button is clicked
  const handlePropsDelete = (index: number) => {
    setProps((prev) => prev.filter((n: any, i: number) => i !== index));
  };

  return (
    <div>
      <div className="border p-1 rounded-md mt-4">
        <div
          onClick={() => setShowItems((prev) => !prev)}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>
            {title}({props.length})
          </span>
          <span>
            {showItems ? (
              <ChevronUp className="w-4 h-4 mr-4" />
            ) : (
              <ChevronDown className="w-4 h-4 mr-4" />
            )}
          </span>
        </div>
        {showItems && (
          <div className="transition">
            {props.length > 0 &&
              props.map((prop, index) => (
                <div
                  key={index}
                  className="bg-blue-400/20 border px-3 py-2 rounded-md flex flex-col gap-2 my-2"
                >
                  <div>
                    <label>{label}</label>
                    <input
                      type="text"
                      name="name"
                      placeholder={placeholder}
                      value={prop.name}
                      onChange={(e) => editProps(e, index, "name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="extraPrice">Price</label>
                    <input
                      type="number"
                      name="extraPrice"
                      placeholder={placeholder}
                      value={(prop.extraPrice / 100).toFixed(2)}
                      min={0}
                      step={0.01}
                      onChange={(e) => editProps(e, index, "extraPrice")}
                    />
                  </div>
                  <button
                    type="button"
                    title="remove"
                    onClick={() => handlePropsDelete(index)}
                    className="bg-secondary w-full text-white rounded-md px-3 py-2 mb-4 disabled:opacity-50 mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              onClick={handleAddSizeOrExtra}
              type="button"
              className="border w-full rounded-md px-3 py-2 mb-4 disabled:opacity-50 mt-2"
            >
              {buttonTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemsProps;
